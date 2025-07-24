
import React from 'react';
import { Cpu, Server, Layers, Wifi } from 'lucide-react';
import GlassContainer from '../../../ui-custom/GlassContainer';
import { SystemMetric } from '../types';

interface MetricsGridProps {
  metrics: SystemMetric[];
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <GlassContainer key={index} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-cybershield-400 text-sm">{metric.name}</span>
            {index === 0 && <Cpu className="w-4 h-4 text-cybershield-accent" />}
            {index === 1 && <Server className="w-4 h-4 text-cybershield-accent" />}
            {index === 2 && <Layers className="w-4 h-4 text-cybershield-accent" />}
            {index === 3 && <Wifi className="w-4 h-4 text-cybershield-accent" />}
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold">
              {metric.value}
              <span className="text-sm text-cybershield-400 ml-1">{metric.unit}</span>
            </div>
            <div className="text-sm text-cybershield-400">
              of {metric.max} {metric.unit}
            </div>
          </div>
          <div className="mt-2 w-full bg-cybershield-100/30 rounded-full h-2">
            <div 
              className="bg-cybershield-accent h-2 rounded-full" 
              style={{ width: `${(metric.value / metric.max) * 100}%` }}
            ></div>
          </div>
        </GlassContainer>
      ))}
    </div>
  );
};
