
import React from 'react';
import { Activity, Clock, Lock } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlassContainer from '../../../ui-custom/GlassContainer';
import { NetworkEvent } from '../types';

interface AnomalyData {
  category: string;
  normal: number;
  suspicious: number;
  malicious: number;
}

interface AnalysisTabProps {
  events: NetworkEvent[];
  anomalyData: AnomalyData[];
}

const AnalysisTab: React.FC<AnalysisTabProps> = ({ events, anomalyData }) => {
  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassContainer className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Anomaly Detection</h3>
            <div className="text-xs text-cybershield-400">By Category</div>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={anomalyData}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 80, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  type="number"
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.6)' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis 
                  dataKey="category" 
                  type="category"
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.6)' }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="normal" name="Normal" stackId="a" fill="#10B981" />
                <Bar dataKey="suspicious" name="Suspicious" stackId="a" fill="#F59E0B" />
                <Bar dataKey="malicious" name="Malicious" stackId="a" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassContainer>
        
        <GlassContainer className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Event Distribution</h3>
            <div className="text-xs text-cybershield-400">By Status</div>
          </div>
          <div className="h-60 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Normal', value: events.filter(e => e.status === 'normal').length },
                    { name: 'Suspicious', value: events.filter(e => e.status === 'suspicious').length },
                    { name: 'Malicious', value: events.filter(e => e.status === 'malicious').length }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '0.5rem'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassContainer>
      </div>
      
      <GlassContainer className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Advanced Anomaly Detection</h3>
            <p className="text-sm text-cybershield-400 mb-4">
              The system uses machine learning algorithms to establish a baseline of normal network behavior and detect deviations that may indicate security threats.
            </p>
            <div className="space-y-3">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-cybershield-accent" />
                  <span className="font-medium">Behavioral Analysis</span>
                </div>
                <p className="mt-1 text-sm text-cybershield-400">
                  Monitors user and system behaviors to detect unusual patterns that may indicate compromise
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-cybershield-accent" />
                  <span className="font-medium">Network Flow Analysis</span>
                </div>
                <p className="mt-1 text-sm text-cybershield-400">
                  Analyzes network traffic patterns to identify unusual data transfers or communications
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-cybershield-accent" />
                  <span className="font-medium">Real-time Monitoring</span>
                </div>
                <p className="mt-1 text-sm text-cybershield-400">
                  Continuous analysis of system and network events with immediate alerts for potential threats
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium mb-3">Detection Methods</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Statistical Anomaly Detection</span>
                  <span className="text-xs text-cybershield-400">92% accuracy</span>
                </div>
                <div className="w-full bg-cybershield-100/30 rounded-full h-2">
                  <div className="bg-cybershield-accent h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Machine Learning Models</span>
                  <span className="text-xs text-cybershield-400">88% accuracy</span>
                </div>
                <div className="w-full bg-cybershield-100/30 rounded-full h-2">
                  <div className="bg-cybershield-accent h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Rule-based Detection</span>
                  <span className="text-xs text-cybershield-400">95% accuracy</span>
                </div>
                <div className="w-full bg-cybershield-100/30 rounded-full h-2">
                  <div className="bg-cybershield-accent h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Behavioral Analytics</span>
                  <span className="text-xs text-cybershield-400">86% accuracy</span>
                </div>
                <div className="w-full bg-cybershield-100/30 rounded-full h-2">
                  <div className="bg-cybershield-accent h-2 rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-cybershield-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/5 mt-4">
              <h4 className="text-sm font-medium mb-2">Recommendation</h4>
              <p className="text-sm text-cybershield-400">
                Based on current analysis, we recommend implementing additional monitoring for authentication events, as they show the highest anomaly rate in your network.
              </p>
            </div>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};

export default AnalysisTab;
