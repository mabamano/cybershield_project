
import { NetworkEvent, SystemMetric } from '../types';

export const generateRandomTimeseries = (points = 24, baseline = 50, variance = 20, trend = 0) => {
  return Array.from({ length: points }, (_, i) => {
    const value = Math.max(0, Math.min(100, baseline + (Math.random() - 0.5) * variance + trend * i));
    return {
      time: `${i}:00`,
      value: Math.round(value)
    };
  });
};

export const generateRandomEvents = (count = 10): NetworkEvent[] => {
  const eventTypes = ['connection', 'authentication', 'data', 'error'];
  const statuses = ['normal', 'normal', 'normal', 'normal', 'suspicious', 'suspicious', 'malicious'];
  
  return Array.from({ length: count }, (_, i) => {
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)] as NetworkEvent['type'];
    const status = statuses[Math.floor(Math.random() * statuses.length)] as NetworkEvent['status'];
    const timestamp = new Date(Date.now() - Math.random() * 3600000 * 24).toISOString();
    
    return {
      id: `evt-${i}`,
      timestamp,
      type,
      source: `192.168.1.${Math.floor(Math.random() * 255)}`,
      destination: `10.0.0.${Math.floor(Math.random() * 255)}`,
      status,
      details: `${type.charAt(0).toUpperCase() + type.slice(1)} event detected`
    };
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const generateDefaultMetrics = (): SystemMetric[] => [
  { name: 'CPU Usage', value: 42, max: 100, unit: '%' },
  { name: 'Memory Usage', value: 3.7, max: 8, unit: 'GB' },
  { name: 'Disk Usage', value: 186, max: 500, unit: 'GB' },
  { name: 'Network Speed', value: 28, max: 100, unit: 'Mbps' },
];

export const getDefaultAnomalyData = () => [
  { category: 'Login Attempts', normal: 87, suspicious: 11, malicious: 2 },
  { category: 'Network Traffic', normal: 92, suspicious: 5, malicious: 3 },
  { category: 'File Access', normal: 94, suspicious: 6, malicious: 0 },
  { category: 'System Events', normal: 89, suspicious: 8, malicious: 3 },
];
