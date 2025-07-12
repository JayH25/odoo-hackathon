import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  User,
  Settings,
  LogOut,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [username, setUsername] = useState("JayH25");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3004/api/v1/user/me", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setIsLoggedIn(true);
          // Assuming the API returns user data with username
          setUsername(data.username || "User");
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3004/api/v1/user/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLoginClick = () => navigate("/login");

  // Hide navbar on login/signup pages
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";
  if (hideNavbar) return null;

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/team", label: "Team" },
  ];

  const profileMenuItems = [
    { icon: User, label: "My Profile", action: () => navigate("/profile") },

    { icon: LogOut, label: "Logout", action: handleLogout },
  ];

  const commonBtnClasses =
    "px-5 py-2 rounded-full text-base font-bold flex items-center justify-start shadow-sm";

  return (
    <nav className="w-full bg-gray-950 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-20 px-4 md:px-10">
        <div className="text-white text-xl font-semibold">StackIt</div>

        <div className="hidden md:flex items-center gap-4">
          {links.map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? `${commonBtnClasses} bg-[#d5d5d5] text-black`
                  : `px-4 py-2 text-base font-bold text-gray-300 hover:text-[#ff2400]`
              }
            >
              {label}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <div className="relative profile-dropdown">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full hover:bg-gray-700/50 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-white font-medium hidden sm:block">{username}</span>
                <ChevronDown 
                  size={16} 
                  className={`text-gray-400 transition-transform duration-200 ${
                    showProfileDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm text-gray-400">Signed in as</p>
                    <p className="text-white font-semibold">{username}</p>
                  </div>
                  <div className="py-2">
                    {profileMenuItems.map((item, index) =>
                      item.divider ? (
                        <div key={index} className="my-2 border-t border-gray-700" />
                      ) : (
                        <button
                          key={index}
                          onClick={() => {
                            item.action();
                            setShowProfileDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
                        >
                          <item.icon size={18} />
                          <span>{item.label}</span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="text-white bg-blue-500 px-5 py-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
