import React, { useContext, useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import Message from './Message';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

export interface Message {
  content: string;
  timestamp: Date;
  sent: boolean;
  status: string;
}

export const ChatWindow: React.FC = () => {
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const usercontext = useContext(UserContext)!;
  const { selectedChat, user } = usercontext;

  const fetchSelectedChat = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/getMessages`,
        {
          userId1: user.id,
          userId2: selectedChat?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setMessages(
        response.data.messages.map((msg: any) => ({
          content: msg.content,
          timestamp: new Date(msg.createdAt),
          sent: msg.sender._id === user.id,
          status: 'delivered',
        }))
      );
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      fetchSelectedChat();
    }
  }, [selectedChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /*
  send message handler
  */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message?.content.trim()) return;

    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/send-message`,
        {
          toUserid: selectedChat?._id,
          fromUserid: user.id,
          message: message.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content: res.data.newMessage.content,
            timestamp: new Date(res.data.newMessage.createdAt),
            sent: true,
            status:'delivered',
          },
        ]);
        setMessage(null);
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1A2238]">
      <div className="flex items-center gap-3 border-b border-[#354766] p-4">
        {selectedChat && (
          <>
            <img
              className="w-12 h-12 rounded-full object-cover cursor-pointer"
              src={selectedChat.profileImage}
              alt={selectedChat.username}
            />
            <h3 className="text-[#E0E0E0] font-medium truncate">{selectedChat.username}</h3>
          </>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <Message
          key={index}
          content={msg.content}
          timestamp={msg.timestamp}
          sent={msg.sent}
          status={"delivered"}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="border-t border-[#354766] p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message?.content || ''}
            onChange={(e) =>
              setMessage({
                content: e.target.value,
                timestamp: new Date(),
                sent: true,
                status: 'draft',
              })
            }
            placeholder="Type a message..."
            className="flex-1 md:p-3 bg-[#354766] text-[#E0E0E0] placeholder-[#9E9E9E] px-1 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
            disabled={loading}
          />
          <button
            type="submit"
            className="p-1 text-[#2979FF] hover:text-[#E0E0E0] cursor-pointer transition-colors disabled:opacity-50 disabled:hover:text-[#2979FF]"
            disabled={loading || !(message?.content.trim())}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;