import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/logo.png";
import { LiaTimesSolid } from 'react-icons/lia';
import { FaBars, FaPhone } from 'react-icons/fa6';
import Theme from '../Theme/Theme';

const NavBar = () => {
  const [open, setOpen] = React.useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/bus", label: "Bus" },
    { href: "/view", label: "LogIn/SignUp" },
  ];

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full h-[8ch] bg-neutral-100 dark:bg-neutral-900 flex items-center justify-between px-4 sm:px-7 md:px-16 lg:px-28 fixed top-0 z-50">
      {/* Logo Section */}
      <Link to="/" className="mr-16">
        <img src={Logo} alt="logo" className="w-28 h-auto object-contain" />
      </Link>

      {/* Navigation Links */}
      <div className="hidden lg:flex flex-1 items-center gap-x-5 text-neutral-600 dark:text-neutral-500 font-medium">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className=" no-underline text-neutral-600 hover:ext-violet-600 hover:underline ease-in-out duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Need Help and Theme Section (visible on large screens) */}
      <div className="hidden lg:flex items-center gap-x-5">
        <div className="relative bg-violet-600 rounded-md px-8 py-2 w-fit cursor-pointer">
          <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-9 h-9 rounded-full bg-violet-600 border-4 border-neutral-100 dark:border-neutral-900 flex items-center justify-center">
            <FaPhone className="text-neutral-50 text-sm" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-neutral-200 font-light">Need Help?</p>
            <p className="text-xs font-normal text-neutral-50 tracking-wide">+91 9931122072</p>
          </div>
        </div>
        <Theme />
      </div>

      {/* Hamburger Menu Button (visible on smaller screens) */}
      <button
        onClick={handleClick}
        className="lg:hidden text-neutral-600 dark:text-neutral-300 ease-in-out duration-300 flex items-center justify-end"
      >
        {open ? <LiaTimesSolid className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      {/* Dropdown Menu (visible on smaller screens when open) */}
      <div className={`${open ? 'flex' : 'hidden'} lg:hidden flex-col w-full bg-neutral-100 dark:bg-neutral-900 shadow-md rounded-md absolute top-14 left-0 px-4 py-4`}>
        <ul className="flex flex-col gap-y-2 text-base text-neutral-600 dark:text-neutral-500 font-medium">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.href}
                onClick={handleClose}
                className="hover:text-violet-600 ease-in-out duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Need Help and Theme Section (included in dropdown for smaller screens) */}
        <div className="flex flex-col gap-y-2 mt-4">
          <div className="relative bg-violet-600 rounded-md px-8 py-2 w-fit cursor-pointer">
            <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-9 h-9 rounded-full bg-violet-600 border-4 border-neutral-100 dark:border-neutral-900 flex items-center justify-center">
              <FaPhone className="text-neutral-50 text-sm" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-neutral-200 font-light">Need Help?</p>
              <p className="text-xs font-normal text-neutral-50 tracking-wide">+91 9931122072</p>
            </div>
          </div>
          <Theme />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
