
import React from 'react';
import { cn } from '@/lib/utils';
import { NetworkEvent } from '../types';
import { Shield, AlertTriangle } from 'lucide-react';

interface EventTableProps {
  events: NetworkEvent[];
  showDate?: boolean;
  highlightRows?: boolean;
}

export const EventTable: React.FC<EventTableProps> = ({ 
  events, 
  showDate = false,
  highlightRows = false 
}) => {
  const getStatusIcon = (status: NetworkEvent['status']) => {
    switch (status) {
      case 'malicious':
        return <AlertTriangle className="w-5 h-5 text-cybershield-danger" />;
      case 'suspicious':
        return <AlertTriangle className="w-5 h-5 text-cybershield-warning" />;
      case 'normal':
      default:
        return <Shield className="w-5 h-5 text-cybershield-success" />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Status</th>
            {showDate && (
              <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Date</th>
            )}
            <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Time</th>
            <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Type</th>
            <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Source</th>
            <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Destination</th>
            <th className="text-left py-2 px-4 text-sm font-medium text-cybershield-400">Details</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr 
              key={event.id} 
              className={cn(
                "border-b border-white/5",
                highlightRows && event.status === 'malicious' && "bg-cybershield-danger/5",
                highlightRows && event.status === 'suspicious' && "bg-cybershield-warning/5"
              )}
            >
              <td className="py-2 px-4">
                {getStatusIcon(event.status)}
              </td>
              {showDate && (
                <td className="py-2 px-4 text-sm">
                  {new Date(event.timestamp).toLocaleDateString()}
                </td>
              )}
              <td className="py-2 px-4 text-sm">
                {new Date(event.timestamp).toLocaleTimeString()}
              </td>
              <td className="py-2 px-4 text-sm capitalize">{event.type}</td>
              <td className="py-2 px-4 text-sm font-mono">{event.source}</td>
              <td className="py-2 px-4 text-sm font-mono">{event.destination}</td>
              <td className="py-2 px-4 text-sm text-cybershield-400">{event.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
