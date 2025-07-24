import React from 'react';

interface Anomaly {
  EventID: number;
  User: number | string;
  SourceIP: number | string;
  Action: number | string;
  Anomaly: number;
}

interface AnalysisResultsProps {
  anomalies: Anomaly[];
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ anomalies }) => {
  return (
    <div className="mt-8">
      <h4 className="text-lg font-medium mb-4 text-white">Analysis Results</h4>
      {anomalies.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-gray-800 rounded-lg">
            <thead className="bg-cybershield-600">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Event ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">User</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Source IP</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {anomalies.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 text-sm text-white">{item.EventID}</td>
                  <td className="px-4 py-2 text-sm text-white">{item.User}</td>
                  <td className="px-4 py-2 text-sm text-white">{item.SourceIP}</td>
                  <td className="px-4 py-2 text-sm text-white">{item.Action}</td>
                  <td className="px-4 py-2 text-sm text-white">
                    {item.Anomaly === -1 ? (
                      <span className="text-red-400 font-bold">Anomalous</span>
                    ) : (
                      <span className="text-green-400">Normal</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-cybershield-400 text-sm">No anomalies detected.</p>
      )}
    </div>
  );
};

export default AnalysisResults;
