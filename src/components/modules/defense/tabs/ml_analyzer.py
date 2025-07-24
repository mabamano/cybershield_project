# ml_analyzer.py
from fastapi import FastAPI, UploadFile, File
import pandas as pd
from sklearn.ensemble import IsolationForest
import uvicorn
import json

app = FastAPI()

# Function to parse logs from an uploaded JSON file (adjust if logs are in CSV or XML)
def parse_log_file(file_contents):
    logs = json.loads(file_contents)
    data = []
    for event in logs:
        data.append({
            "EventID": int(event.get("EventID", 0)),
            "User": event.get("UserID", "unknown"),
            "SourceIP": event.get("IpAddress", "unknown"),
            "Action": event.get("Action", "unknown")
        })
    return pd.DataFrame(data)

@app.post("/analyze")
async def analyze_logs(file: UploadFile = File(...)):
    contents = await file.read()
    df = parse_log_file(contents.decode('utf-8'))
    
    # Convert categorical fields to codes
    df["User"] = df["User"].astype("category").cat.codes
    df["SourceIP"] = df["SourceIP"].astype("category").cat.codes
    df["Action"] = df["Action"].astype("category").cat.codes

    # Use Isolation Forest for anomaly detection
    features = df[["EventID", "User", "SourceIP", "Action"]]
    model = IsolationForest(n_estimators=100, contamination=0.02, random_state=42)
    df["Anomaly"] = model.fit_predict(features)

    # Extract anomalous events (where prediction == -1)
    anomalies = df[df["Anomaly"] == -1]
    return {"anomalies": anomalies.to_dict(orient="records")}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
