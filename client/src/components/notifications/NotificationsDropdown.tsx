import React from 'react';
import { formatDistanceToNow } from '../../utils/dateUtils';

export const NotificationsDropdown: React.FC = () => {
  const notifications = [
    {
      id: 1,
      type: 'message',
      content: 'New message from Sarah Wilson',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: 2,
      type: 'mention',
      content: 'Mike mentioned you in a chat',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
  ];

  return (
    <div className="absolute top-16 right-4 w-80 bg-[#1A2238] border border-[#354766] rounded-lg shadow-lg z-50">
      <div className="p-4 border-b border-[#354766]">
        <h3 className="text-[#E0E0E0] font-medium">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 border-b border-[#354766] hover:bg-[#354766] cursor-pointer"
          >
            <p className="text-[#E0E0E0]">{notification.content}</p>
            <span className="text-xs text-[#9E9E9E]">
              {formatDistanceToNow(notification.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsDropdown;