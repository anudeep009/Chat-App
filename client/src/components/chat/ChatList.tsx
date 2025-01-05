import React, { useState } from "react";
import { formatDistanceToNow } from "../../utils/dateUtils";

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
  const [search, setSearch] = useState(""); 
  const [filteredChats, setFilteredChats] = useState<ChatPreview[]>([]);

const chats: ChatPreview[] = [
    {
      id: "1",
      username: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      lastMessage: "Hey, are we still meeting today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      unread: 2,
    },
    {
      id: "2",
      username: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      lastMessage: "The project looks great! 👍",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      unread: 0,
    },
  ];

  const handleSearch = () => {
    const filtered = chats.filter((chat) =>
      chat.username.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredChats(filtered);
  };

  return (
    <div className="bg-[#1A2238] h-full overflow-y-auto">
      <div>
        <div className="relative md:w-[350px] w-[250px] m-4">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search by username"
            required
          />
          <button
            type="button"
            onClick={handleSearch}
            className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
      {(filteredChats.length > 0 ? filteredChats : chats).map((chat) => (
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
            <p className="text-xs md:text-lg text-[#9E9E9E] truncate">
              {chat.lastMessage}
            </p>
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
