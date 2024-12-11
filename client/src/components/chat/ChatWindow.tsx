import React from 'react';
import { Send } from 'lucide-react';
import Message from './Message';

export const ChatWindow: React.FC = () => {
  const [message, setMessage] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message submission here
      setMessage('');
      scrollToBottom();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1A2238]">
      <div
          className="flex items-center gap-3 border-b border-[#354766] p-4"
        >
          <img
            className="w-12 h-12 rounded-full object-cover cursor-pointer"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
          />
          <h3 className="text-[#E0E0E0] font-medium truncate">
                Sarah Wilson
          </h3>
        </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Message
          content="Hey! How are you?"
          timestamp={new Date(Date.now() - 1000 * 60 * 10)}
          sent={false}
          status="read"
        />
        <Message
          content="I'm doing great, thanks! How about you?"
          timestamp={new Date(Date.now() - 1000 * 60 * 5)}
          sent={true}
          status="delivered"
        />
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
          />
          <button
            type="submit"
            className="p-1 text-[#2979FF] hover:text-[#E0E0E0] cursor-pointer transition-colors disabled:opacity-50 disabled:hover:text-[#2979FF]"
            disabled={!message.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;