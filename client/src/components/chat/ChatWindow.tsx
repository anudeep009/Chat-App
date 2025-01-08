import React, { useContext, useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import Message from './Message';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

export const ChatWindow: React.FC = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      content: "Hey! How are you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      sent: false,
      status: "read",
    },
    {
      content: "I'm doing great, thanks! How about you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      sent: true,
      status: "delivered",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const usercontext = useContext(UserContext)!;
  const { selectedChat, user } = usercontext;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/send-message`,
        {
          toUserid: selectedChat._id,
          fromUserid: user.id,
          message,
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
            content: message,
            timestamp: new Date(),
            sent: true,
            status: 'sent',
          },
        ]);
        setMessage('');
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
        <img
          className="w-12 h-12 rounded-full object-cover cursor-pointer"
          src={selectedChat.profileImage}
          alt={selectedChat.username}
        />
        <h3 className="text-[#E0E0E0] font-medium truncate">{selectedChat.username}</h3>
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 md:p-3 bg-[#354766] text-[#E0E0E0] placeholder-[#9E9E9E] px-1 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
            disabled={loading}
          />
          <button
            type="submit"
            className="p-1 text-[#2979FF] hover:text-[#E0E0E0] cursor-pointer transition-colors disabled:opacity-50 disabled:hover:text-[#2979FF]"
            disabled={loading || !message.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
