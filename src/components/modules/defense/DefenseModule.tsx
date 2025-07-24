
import React, { useState } from 'react';
import { Upload, Shield, Activity, Layers, Server } from 'lucide-react';
import { TabButton } from './components/TabButton';
import DashboardTab from './tabs/DashboardTab';
import LogsTab from './tabs/LogsTab';
import AnalysisTab from './tabs/AnalysisTab';
import UploadTab from './tabs/UploadTab';
import { generateRandomTimeseries, generateRandomEvents, generateDefaultMetrics, getDefaultAnomalyData } from './utils/dataGenerators';

const DefenseModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [networkTraffic, setNetworkTraffic] = useState(generateRandomTimeseries(24, 60, 30));
  const [cpuUsage, setCpuUsage] = useState(generateRandomTimeseries(24, 35, 15));
  const [events, setEvents] = useState(generateRandomEvents(15));
  const [metrics, setMetrics] = useState(generateDefaultMetrics());
  const [anomalyData, setAnomalyData] = useState(getDefaultAnomalyData());
  
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const handleFileUpload = () => {
    setIsLoading(true);
    
    // Simulate file processing
    setTimeout(() => {
      setIsLoading(false);
      setUploadSuccess(true);
      
      // Refresh the data
      setNetworkTraffic(generateRandomTimeseries(24, 65, 35));
      setCpuUsage(generateRandomTimeseries(24, 40, 25));
      setEvents(generateRandomEvents(15));
      
      // Reset upload success message
      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <TabButton
          icon={Activity}
          title="Dashboard"
          description="System overview"
          isActive={activeTab === 'dashboard'}
          onClick={() => setActiveTab('dashboard')}
        />
        
        <TabButton
          icon={Layers}
          title="Event Logs"
          description="Network activity"
          isActive={activeTab === 'logs'}
          onClick={() => setActiveTab('logs')}
        />
        
        <TabButton
          icon={Server}
          title="Analysis"
          description="Anomaly detection"
          isActive={activeTab === 'analysis'}
          onClick={() => setActiveTab('analysis')}
        />
        
        <TabButton
          icon={Upload}
          title="Upload Logs"
          description="Import log files"
          isActive={activeTab === 'upload'}
          onClick={() => setActiveTab('upload')}
        />
      </div>
      
      {activeTab === 'dashboard' && (
        <DashboardTab 
          networkTraffic={networkTraffic}
          cpuUsage={cpuUsage}
          events={events}
          metrics={metrics}
        />
      )}
      
      {activeTab === 'logs' && (
        <LogsTab events={events} />
      )}
      
      {activeTab === 'analysis' && (
        <AnalysisTab 
          events={events}
          anomalyData={anomalyData}
        />
      )}
      
      {activeTab === 'upload' && (
        <UploadTab 
          isLoading={isLoading}
          uploadSuccess={uploadSuccess}
          handleFileUpload={handleFileUpload}
        />
      )}
    </div>
  );
};

export default DefenseModule;
