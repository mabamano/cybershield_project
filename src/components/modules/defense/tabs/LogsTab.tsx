
import React from 'react';
import GlassContainer from '../../../ui-custom/GlassContainer';
import { NetworkEvent } from '../types';
import { EventTable } from '../components/EventTable';

interface LogsTabProps {
  events: NetworkEvent[];
}

const LogsTab: React.FC<LogsTabProps> = ({ events }) => {
  return (
    <GlassContainer className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">Network Event Logs</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-cybershield-success mr-1"></div>
            <span className="text-xs text-cybershield-400">Normal</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-cybershield-warning mr-1"></div>
            <span className="text-xs text-cybershield-400">Suspicious</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-cybershield-danger mr-1"></div>
            <span className="text-xs text-cybershield-400">Malicious</span>
          </div>
        </div>
      </div>
      <EventTable events={events} showDate={true} highlightRows={true} />
    </GlassContainer>
  );
};

export default LogsTab;
