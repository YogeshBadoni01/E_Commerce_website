import React, { useState } from "react";
import LogoImg from "../utils/Images/Logo.png";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { SearchRounded, FavoriteBorder, ShoppingCartOutlined, MenuRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/reducers/userSlice";

const Navbar = ({ OpenAuth, setOpenAuth, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Dispatch = useDispatch();

  return (
    <nav className="bg-theme-bg h-20 flex items-center justify-center sticky top-0 z-[999] text-white p-4">
      <div className="w-full max-w-7xl px-6 flex gap-4 items-center justify-start">
        {/* Mobile Icon for Menu */}
        <div className="md:hidden flex items-center" onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded className="text-theme-text-primary" />
        </div>

        {/* Logo */}
        <div className="flex items-center px-1 font-medium text-lg">
          <img src={LogoImg} alt="Logo" className="h-9" />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center justify-center gap-8 px-2 list-none">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-theme-text-primary font-medium cursor-pointer transition-all duration-300 no-underline ${
                isActive ? "border-b-2 border-theme-primary text-theme-primary" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className="text-theme-text-primary font-medium cursor-pointer transition-all duration-300 no-underline hover:text-theme-primary"
          >
            Shop
          </NavLink>
          <NavLink
            to="/Deshboard"
            className="text-theme-text-primary font-medium cursor-pointer transition-all duration-300 no-underline hover:text-theme-primary"
          >
            Deshboard
          </NavLink>
          <NavLink
            to="/orders"
            className="text-theme-text-primary font-medium cursor-pointer transition-all duration-300 no-underline hover:text-theme-primary"
          >
            Orders
          </NavLink>
          <NavLink
            to="/contact"
            className="text-theme-text-primary font-medium cursor-pointer transition-all duration-300 no-underline hover:text-theme-primary"
          >
            Contact
          </NavLink>
        </ul>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className={`md:hidden flex flex-col items-start gap-5 p-3 list-none w-4/5 bg-theme-card-light bg-opacity-95 absolute top-20 right-0 transition-all duration-500 transform rounded-b-lg shadow-md z-50 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} `}>
            <NavLink to="/" onClick={() => setIsOpen(false)} className="text-theme-text-primary font-medium hover:text-theme-primary">
              Home
            </NavLink>
            <NavLink to="/shop" onClick={() => setIsOpen(false)} className="text-theme-text-primary font-medium hover:text-theme-primary">
              Shop
            </NavLink>
            <NavLink to="/Deshboard" onClick={() => setIsOpen(false)} className="text-theme-text-primary font-medium hover:text-theme-primary">
              Deshboard
            </NavLink>
            <NavLink to="/orders" onClick={() => setIsOpen(false)} className="text-theme-text-primary font-medium hover:text-theme-primary">
              Orders
            </NavLink>
            <NavLink to="/contact" onClick={() => setIsOpen(false)} className="text-theme-text-primary font-medium hover:text-theme-primary">
              Contact
            </NavLink>

            <div className="flex gap-4">
              {currentUser ? (
                <Button text="Logout" onClick={() => Dispatch(logout())} />
              ) : (
                <>
                  <Button text="SignIn" outlined small onClick={() => setOpenAuth(!OpenAuth)} />
                  <Button text="SignUp" small />
                </>
              )}
            </div>
          </ul>
        )}
         </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-3">
          <NavLink to="/search" className="text-theme-text-primary">
            <SearchRounded className="text-lg" />
          </NavLink>
          <NavLink to="/favourite" className="text-theme-text-primary">
            <FavoriteBorder className="text-lg" />
          </NavLink>
          <NavLink to="/cart" className="text-theme-text-primary">
            <ShoppingCartOutlined className="text-lg" />
          </NavLink>
          {currentUser ? (
            <>
              <Avatar src={currentUser?.img} className="text-lg">
                {currentUser?.name[0]}
              </Avatar>
              <button className="text-theme-secondary cursor-pointer" onClick={() => Dispatch(logout())}>
                Logout
              </button>
            </>
          ) : (
            <Button text="SignIn" small onClick={() => setOpenAuth(!OpenAuth)} />
          )}
        </div>

        {/* Button Container */}
        <div className="hidden md:flex items-center gap-7 px-2 text-theme-primary">
          <NavLink to="/search" className="text-theme-primary">
            <SearchRounded className="text-2xl" />
          </NavLink>
          <NavLink to="/favourite" className="text-theme-primary">
            <FavoriteBorder className="text-2xl" />
          </NavLink>
          <NavLink to="/cart" className="text-theme-primary">
            <ShoppingCartOutlined className="text-2xl" />
          </NavLink>

          {currentUser ? (
            <>
              <Avatar src={currentUser?.img} className="text-2xl">
                {currentUser?.name[0]}
              </Avatar>
              <button className="text-theme-secondary cursor-pointer" onClick={() => Dispatch(logout())}>
                Logout
              </button>
            </>
          ) : (
            <Button text="SignIn" small onClick={() => setOpenAuth(!OpenAuth)} />
          )}
        </div>
      
    </nav>
  );
};

export default Navbar;
