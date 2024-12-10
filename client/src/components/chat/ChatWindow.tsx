import React from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
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
          <button
            type="button"
            className="p-2 text-[#9E9E9E] hover:text-[#E0E0E0] transition-colors"
          >
            <Paperclip size={20} />
          </button>
          <button
            type="button"
            className="p-2 text-[#9E9E9E] hover:text-[#E0E0E0] transition-colors"
          >
            <Smile size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-[#354766] text-[#E0E0E0] placeholder-[#9E9E9E] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
          />
          <button
            type="submit"
            className="p-2 text-[#2979FF] hover:text-[#E0E0E0] transition-colors disabled:opacity-50 disabled:hover:text-[#2979FF]"
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