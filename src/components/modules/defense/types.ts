
export interface NetworkEvent {
  id: string;
  timestamp: string;
  type: 'connection' | 'authentication' | 'data' | 'error';
  source: string;
  destination: string;
  status: 'normal' | 'suspicious' | 'malicious';
  details: string;
}

export interface SystemMetric {
  name: string;
  value: number;
  max: number;
  unit: string;
}

export interface AnomalyData {
  category: string;
  normal: number;
  suspicious: number;
  malicious: number;
}
