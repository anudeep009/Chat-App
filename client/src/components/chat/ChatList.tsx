import React from 'react';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface ChatPreview {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
}

interface ChatListProps {
  onChatSelect?: () => void;
}

export const ChatList: React.FC<ChatListProps> = ({ onChatSelect }) => {
  const chats: ChatPreview[] = [
    {
      id: '1',
      username: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      lastMessage: 'Hey, are we still meeting today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      unread: 2,
    },
    {
      id: '2',
      username: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      lastMessage: 'The project looks great! 👍',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      unread: 0,
    },
  ];

  return (
    <div className="bg-[#1A2238] h-full overflow-y-auto">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex items-center gap-3 p-4 hover:bg-[#354766] cursor-pointer transition-colors active:bg-[#2979FF] active:bg-opacity-20"
          onClick={onChatSelect}
        >
          <img
            src={chat.avatar}
            alt={chat.username}
            className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="text-[#E0E0E0] text-xs md:text-lg font-medium truncate">
                {chat.username}
              </h3>
              <span className="text-xs text-[#9E9E9E] whitespace-nowrap ml-2">
                {formatDistanceToNow(chat.timestamp)}
              </span>
            </div>
            <p className="text-xs md:text-lg text-[#9E9E9E] truncate">{chat.lastMessage}</p>
          </div>
          {chat.unread > 0 && (
            <span className="bg-[#2979FF] text-white text-xs font-medium px-2 py-1 rounded-full shrink-0">
              {chat.unread}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatList;