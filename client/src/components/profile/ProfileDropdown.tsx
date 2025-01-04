import React from 'react';
import { User, LogOut } from 'lucide-react';
import { UserContext } from '../../context/UserContext';

export const ProfileDropdown: React.FC = () => {
  const userContext = React.useContext(UserContext)!;
  const { setUserLoggedIn, user } = userContext;
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserLoggedIn(false);
    user.username = "";
    user.profileImage = "";
    user.id = "";
    console.log("Logging out...");
  };
  return (
    <div className="absolute top-16 right-4 w-48 bg-[#1A2238] border border-[#354766] rounded-lg shadow-lg z-50">
      <div className="py-2">
        <button className="w-full px-4 py-2 text-left text-[#E0E0E0] hover:bg-[#354766] flex items-center gap-2">
          <User size={16} />
          View Profile
        </button>
        <button 
        onClick={handleLogout}
        className="w-full px-4 py-2 text-left text-[#E0E0E0] hover:bg-[#354766] flex items-center gap-2">
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;