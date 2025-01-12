import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserContext } from "../../context/UserContext";

interface ChatPreview {
  id: string;
  username: string;
  profileImage: string;
  recentMessage: string;
}

interface ChatListProps {
  onChatSelect?: (chatId: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ onChatSelect }) => {
  const navigate = useNavigate();
  const [filteredChats, setFilteredChats] = useState<ChatPreview[]>([]);
  const token = localStorage.getItem("token");
  const usercontext = useContext(UserContext)!;
  const { setSelectedChat } = usercontext;

  const handleSelectedChat = (chat: ChatPreview) => {
    setSelectedChat({
      _id : chat.id,
      username : chat.username,
      profileImage : chat.profileImage
    });
    if (onChatSelect) {
      onChatSelect(chat.id);
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      if (!token) {
        navigate("/signup");
        return;
      }

      const user = localStorage.getItem("user");
      if (user) {
        let parsedUser = JSON.parse(user);
        const userId = parsedUser._id;

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/recent-chats`,
            { userId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const chats = response.data.recentChats.map((chat: any) => ({
            id: chat?.lastMessage?.sender?._id,
            username: chat.participants[0]?.username,
            profileImage: chat.participants[0]?.profileImage,
            recentMessage: chat.lastMessage.content,
          }));
          setFilteredChats(chats);
        } catch (error: any) {
          console.error("Error fetching chats:", error);
          toast.error(
            error.response?.data?.message || "Failed to load chats. Please try again."
          );
        }
      }
    };

    fetchChats();
  }, [navigate, token]);

  return (
    <div className="bg-[#1A2238] h-full overflow-y-auto">
      {filteredChats.length > 0 ? (
        filteredChats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-3 p-4 hover:bg-[#354766] cursor-pointer transition-colors active:bg-[#2979FF] active:bg-opacity-20"
            onClick={() => handleSelectedChat(chat)} 
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
              <h5>{chat.recentMessage}</h5>
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
