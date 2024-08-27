"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { setCredentials } from '../slices/authSlice';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faTachometerAlt, faSignInAlt, faUserPlus, faSmile, faHandSparkles } from '@fortawesome/free-solid-svg-icons';

const UserActions = ({ isMobileScreen }) => {
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    await logout().unwrap();
    dispatch(setCredentials(null));
    window.location.href = '/';
  };

  if (!isClient) {
    return null; // Avoid rendering on the server
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-lg shadow-lg w-80 text-white">
        {userInfo ? (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-xl font-bold flex items-center">
              <FontAwesomeIcon icon={faSmile} className="mr-2" />
              Welcome back, {userInfo.name}!
            </h2>
            <Link href="/Profile">
              <div className="cursor-pointer">
                <FontAwesomeIcon icon={faUser} size="2x" />
              </div>
            </Link>
            <Link
              href="/Dashboard"
              className="w-full text-center bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-full flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-center px-4 py-2 rounded-full flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-xl font-bold flex items-center">
              <FontAwesomeIcon icon={faHandSparkles} className="mr-2" />
              Welcome to Our Site!
            </h2>
            <Link href="/Login">
              <div
                className="w-full text-center bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-full flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Log In
              </div>
            </Link>
            <Link
              href="/Signup"
              className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };

    handleResize(); // Check the initial window size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to determine if a link is active
  const isActive = (linkPath) => pathname === linkPath;

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <h1  className="text-black " style={{
            fontSize:"30px"
          }} >
            AIcarfix
          </h1>
          <button
            onClick={toggleMenu}
            className="block md:hidden focus:outline-none text-black"
          >
            <FontAwesomeIcon icon={isOpen ? faSignOutAlt : faUser} size="lg" />
          </button>
          <div className={`${isOpen ? "block" : "hidden"} md:flex items-center`}>
            <UserActions isMobileScreen={isMobileScreen} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
