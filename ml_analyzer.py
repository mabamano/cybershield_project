from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import OneHotEncoder
import uvicorn
import numpy as np
import os

app = FastAPI()

# Allow all origins (adjust as needed for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def parse_windows_logs(file_contents: str) -> pd.DataFrame:
    try:
        events = json.loads(file_contents)
        if not isinstance(events, list):
            raise ValueError("Invalid format: Expected an array of events")
    except (json.JSONDecodeError, TypeError) as e:
        raise ValueError(f"Invalid JSON format: {str(e)}")

    parsed_data = []
    for event in events:
        event_data = event.get("Event", {})
        try:
            event_id = int(event_data.get("EventID", 0))
        except ValueError:
            event_id = 0  # Default value if conversion fails
        data = {
            "EventID": event_id,
            "User": event_data.get("TargetUserName", "UNKNOWN"),
            "SourceIP": event_data.get("IpAddress", "0.0.0.0"),
            "LogonType": int(event_data.get("LogonType", -1)),
            "FailureCode": event_data.get("Status", "0x0"),
            "EventType": event_data.get("EventType", 0),
            "AuthenticationPackage": event_data.get("AuthenticationPackageName", "UNKNOWN"),
            "IsAdmin": int("Administrator" in event_data.get("TargetUserName", "")),
            "Timestamp": event.get("System", {}).get("TimeCreated", {}).get("SystemTime", "")
        }
        parsed_data.append(data)
    
    df = pd.DataFrame(parsed_data)
    print("Parsed events count:", len(df))
    return df

def extract_features(df: pd.DataFrame) -> pd.DataFrame:
    # One-hot encode categorical features
    categorical_cols = ["User", "SourceIP", "AuthenticationPackage"]
    encoder = OneHotEncoder(sparse_output=False, handle_unknown="ignore")
    encoded_features = encoder.fit_transform(df[categorical_cols])
    features = pd.DataFrame(encoded_features, columns=encoder.get_feature_names_out(categorical_cols))
    
    features["EventID"] = df["EventID"]
    features["LogonType"] = df["LogonType"]
    features["FailureCode"] = df["FailureCode"].str.replace("0x", "").fillna("0").apply(lambda x: int(x, 16))
    features["IsAdmin"] = df["IsAdmin"]
    
    # Add time-based feature: Hour if available
    if pd.to_datetime(df["Timestamp"], errors="coerce").notnull().any():
        df["Hour"] = pd.to_datetime(df["Timestamp"], errors="coerce").dt.hour
        features["Hour"] = df["Hour"]
    
    print("Extracted features shape:", features.shape)
    return features

@app.post("/analyze")
async def analyze_logs(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        raw_content = contents.decode("utf-8")
        print("Raw file content:", raw_content)
        df = parse_windows_logs(raw_content)
        if df.empty:
            raise HTTPException(status_code=400, detail="No valid events found in log")
            
        features = extract_features(df)
        
        model = IsolationForest(
            n_estimators=200,
            contamination=0.25,  # Adjust as needed
            random_state=42,
            verbose=1
        )
        # Fit the model before predicting
        model.fit(features)
        predictions = model.predict(features)
        df["IsAnomaly"] = np.where(predictions == -1, 1, 0)
        df["AnomalyScore"] = model.decision_function(features)

        print("Anomaly scores:", df["AnomalyScore"].tolist())
        print("Predictions:", predictions.tolist())

        anomalies = df[df["IsAnomaly"] == 1]
        print("Anomalies detected:", anomalies)
        
        return {
            "stats": {
                "totalEvents": len(df),
                "anomalyCount": len(anomalies),
                "commonEventTypes": df["EventID"].value_counts().head(5).to_dict()
            },
            "anomalies": anomalies.to_dict(orient="records")
        }
        
    except Exception as e:
        print("Internal server error:", e)
        raise HTTPException(status_code=500, detail=f"Analysis error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
