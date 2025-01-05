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
  const [search, setSearch] = useState("");
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


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleSearch = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signup");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/search`,
        { username: search },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setFilteredChats(response.data);
      console.log("filtered chats",filteredChats);
    } catch (error: any) {
      console.error("Error during search:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during search."
      );
    }
  };

  return (
    <div className="bg-[#1A2238] h-full overflow-y-auto">
      <div>
        <div className="relative md:w-[350px] w-[250px] m-4">
          <input
            value={search}
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
        <p className="text-center text-gray-400 mt-4">No chats found.</p>
      )}
    </div>
  );
};

export default ChatList;
