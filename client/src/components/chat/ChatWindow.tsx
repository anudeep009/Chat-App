import React, { useContext, useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import Message from './Message';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { toast } from 'sonner';

export interface Message {
  content: string;
  timestamp?: Date;
  sent: boolean;
  status: string;
}

const ChatWindow: React.FC = () => {
  const [messageContent, setMessageContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { selectedChat, user } = useContext(UserContext)!;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchSelectedChat = async () => {
    if (!selectedChat) return;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/get-messages`,
        {
          userId1: user.id,
          userId2: selectedChat._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const fetchedMessages = data?.messages || [];
      if (fetchedMessages.length > 0) {
        setMessages(
          fetchedMessages.map((msg: any) => ({
            content: msg.content,
            timestamp: new Date(msg.createdAt),
            sent: msg.sender._id === user.id,
            status: 'delivered',
          }))
        );
      } else {
        toast.warning('Start messaging the user.');
      }
    } catch (error : any) {
      toast.error(error?.response?.data?.message || 'Failed to fetch messages. Please try again.');
      console.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      setMessageContent('');
      fetchSelectedChat();
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageContent.trim()) return;

    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/send-message`,
        {
          toUserid: selectedChat?._id,
          fromUserid: user.id,
          message: messageContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          content: data.newMessage.content,
          timestamp: new Date(data.newMessage.createdAt),
          sent: true,
          status: 'delivered',
        },
      ]);
      setMessageContent('');
      scrollToBottom();
    } catch (error : any) {
      toast.error(error?.response?.data?.message || 'Failed to send the message. Please try again.');
      console.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1A2238]">
      {/* Chat Header */}
      <div className="flex items-center gap-3 border-b border-[#354766] p-4">
        {selectedChat?.profileImage && selectedChat?.username ? (
          <>
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={selectedChat.profileImage}
              alt={selectedChat.username}
            />
            <h3 className="text-[#E0E0E0] font-medium truncate">
              {selectedChat.username}
            </h3>
          </>
        ) : (
          <h1 className="text-xs md:text-lg text-[#9E9E9E]">
            Select a chat and start messaging
          </h1>
        )}
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <Message
            key={index}
            content={msg.content}
            timestamp={msg.timestamp || new Date}
            sent={msg.sent}
            status={'delivered'}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="border-t border-[#354766] p-4">
        <div className="flex items-center gap-2">
          {selectedChat?.username ? (
            <>
              <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 md:p-3 bg-[#354766] text-[#E0E0E0] placeholder-[#9E9E9E] px-1 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
                disabled={loading}
              />
              <button
                type="submit"
                className="p-1 text-[#2979FF] hover:text-[#E0E0E0] disabled:opacity-50"
                disabled={loading || !messageContent.trim()}
              >
                <Send size={20} />
              </button>
            </>
          ) : (
            <h1 className="text-sm text-[#9E9E9E]">
              Please select a chat to send messages.
            </h1>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
