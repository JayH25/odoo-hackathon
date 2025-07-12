import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3004/api/v1/user/me", {
          method: "GET",
          credentials: "include",
        });
        setIsLoggedIn(res.ok);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
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
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-5 py-2 rounded-full"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              className="text-white bg-blue-500 px-5 py-2 rounded-full"
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
