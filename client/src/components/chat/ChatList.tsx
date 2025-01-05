import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ChatPreview {
  id: string;
  username: string;
  profileImage: string;
}

interface ChatListProps {
  onChatSelect?: (chatId: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ onChatSelect }) => {
  const navigate = useNavigate();
  const [filteredChats, setFilteredChats] = useState<ChatPreview[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signup");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/chats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFilteredChats(response.data);
      } catch (error: any) {
        console.error("Error fetching chats:", error);
        toast.error(
          error.response?.data?.message || "Failed to load chats. Please try again."
        );
      }
    };

    fetchChats();
  }, [navigate]);


  return (
    <div className="bg-[#1A2238] h-full overflow-y-auto">
      <div>
      </div>
      {filteredChats.length > 0 ? (
        filteredChats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-3 p-4 hover:bg-[#354766] cursor-pointer transition-colors active:bg-[#2979FF] active:bg-opacity-20"
            onClick={() => onChatSelect?.(chat.id)}
          >
            <img
              src={chat.profileImage}
              alt={chat.username}
              className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-[#E0E0E0] text-xs md:text-lg font-medium truncate">
                {chat.username}
              </h3>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 mt-4">no recent chats</p>
      )}
    </div>
  );
};

export default ChatList;