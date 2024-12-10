import React, { useState } from 'react';
import Header from './components/layout/Header';
import ChatList from './components/chat/ChatList';
import ChatWindow from './components/chat/ChatWindow';
import { Menu } from 'lucide-react';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#1A2238] text-[#E0E0E0]">
      <Header onMenuClick={() => setShowSidebar(!showSidebar)} />
      <div className="flex-1 flex overflow-hidden relative">
        <aside
          className={`${
            isMobileView
              ? `absolute inset-y-0 left-0 z-30 transform ${
                  showSidebar ? 'translate-x-0' : '-translate-x-full'
                }`
              : 'relative'
          } w-80 border-r border-[#354766] bg-[#1A2238] transition-transform duration-300 ease-in-out`}
        >
          <ChatList onChatSelect={() => isMobileView && setShowSidebar(false)} />
        </aside>
        
        {/* Overlay for mobile */}
        {isMobileView && showSidebar && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <main className="flex-1 flex flex-col min-w-0">
          <ChatWindow />
        </main>
      </div>
    </div>
  );
}

export default App;