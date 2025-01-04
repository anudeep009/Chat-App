import React from "react";
import { Bell, User, Menu } from "lucide-react";
import { NotificationsDropdown } from "../notifications/NotificationsDropdown";
import { ProfileDropdown } from "../profile/ProfileDropdown";
import { UserContext  } from "../../context/UserContext"
import { Link } from "react-router-dom";
import { useContext } from "react";


interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const userContext = useContext(UserContext)!;
  const { userLoggedIn,user } = userContext;
  console.log(userLoggedIn);
  console.log(user);
  const toggleDropdown = (type: "notifications" | "profile") => {
    if (type === "notifications") {
      setShowNotifications((prev) => !prev);
      setShowProfile(false);
    } else if (type === "profile") {
      setShowProfile((prev) => !prev);
      setShowNotifications(false);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".dropdown-trigger")) {
        setShowNotifications(false);
        setShowProfile(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="bg-[#1A2238] border-b border-[#354766] h-16 flex items-center justify-between px-4 lg:px-6 relative">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 text-[#9E9E9E] hover:text-[#E0E0E0] transition-colors md:hidden"
          aria-label="Toggle Menu"
        >
          <Menu size={20} />
        </button>
        <Link to="/">
        <h1 className="text-[#E0E0E0] hidden text-xl md:block font-bold">
            ChatApp
        </h1>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown("notifications");
          }}
          className="dropdown-trigger p-2 text-[#9E9E9E] hover:text-[#E0E0E0] transition-colors relative"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#2979FF] rounded-full"></span>
        </button>
        {
          userLoggedIn ? (
            <button
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown("profile");
          }}
          className="dropdown-trigger p-2 text-[#9E9E9E] hover:text-[#E0E0E0] transition-colors"
          aria-label="Profile"
        >
          <User size={20} />
        </button>
          ) : (
          <button>
            <Link to={"/signup"}>
            <User size={20} className="text-white" />
            </Link>
          </button>
          )
        }
      </div>

      {showNotifications && <NotificationsDropdown />}
      {showProfile && <ProfileDropdown />}
    </header>
  );
};

export default Header;