import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import { NotificationsDropdown } from '../notifications/NotificationsDropdown';
import { ProfileDropdown } from '../profile/ProfileDropdown';
import { SearchBar } from '../search/SearchBar';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown-trigger')) {
        setShowNotifications(false);
        setShowProfile(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#1A2238] border-b border-[#354766] h-16 flex items-center justify-between px-4 lg:px-6 relative">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 text-[#9E9E9E] hover:text-[#E0E0E0] transition-colors md:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-[#E0E0E0] hidden text-xl md:block font-bold">ChatApp</h1>
      </div>

      <div className="hidden md:block flex-1 max-w-xl mx-4">
        <SearchBar />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="p-2 text-[#9E9E9E] hover:text-[#E0E0E0] transition-colors md:hidden"
        >
          <Search size={20} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowNotifications(!showNotifications);
            setShowProfile(false);
          }}
          className="dropdown-trigger p-2 text-[#9E9E9E] hover:text-[#E0E0E0] transition-colors relative"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#2979FF] rounded-full"></span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowProfile(!showProfile);
            setShowNotifications(false);
          }}
          className="dropdown-trigger p-2 text-[#9E9E9E] hover:text-[#E0E0E0] transition-colors"
        >
          <User size={20} />
        </button>
      </div>

      {showNotifications && <NotificationsDropdown />}
      {showProfile && <ProfileDropdown />}
      {showSearch && (
        <div className="absolute top-16 left-0 text-sm right-0 p-4 bg-[#1A2238] border-b border-[#354766] md:hidden z-50">
          <SearchBar onClose={() => setShowSearch(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;