import React from 'react';
import { Check } from 'lucide-react';
import { formatTime } from '../../utils/dateUtils';

interface MessageProps {
  content: string;
  timestamp: Date;
  sent: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export const Message: React.FC<MessageProps> = ({ content, timestamp, sent, status }) => {
  return (
    <div className={`flex ${sent ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          sent ? 'bg-[#2979FF] text-white' : 'bg-[#354766] text-[#E0E0E0]'
        }`}
      >
        <p>{content}</p>
        <div className="flex items-center gap-1 text-xs mt-1">
          <span className={sent ? 'text-[#E0E0E0]' : 'text-[#9E9E9E]'}>
            {formatTime(timestamp)}
          </span>
          {sent && (
            <span className="flex">
              <Check
                size={14}
                className={status === 'read' ? 'text-blue-300' : 'text-[#E0E0E0]'}
              />
              {(status === 'delivered' || status === 'read') && (
                <Check
                  size={14}
                  className={
                    status === 'read' ? 'text-blue-300' : 'text-[#E0E0E0]'
                  }
                />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;