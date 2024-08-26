"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { setCredentials } from '../slices/authSlice';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faTachometerAlt, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';


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
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        {userInfo ? (
          <div className="flex flex-col items-center space-y-4">
            <Link href="/Profile">
              <div className="cursor-pointer">
                <FontAwesomeIcon icon={faUser} size="2x" />
              </div>
            </Link>
            <button
              onClick={handleLogout}
              style={{ background: "#011E33", color: "white", width: "120px" }}
              className="px-4 py-2 rounded-full flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Log Out
            </button>
            <Link
              style={{ background: "#EDEDFE", color: "black", width: "120px" }}
              className="px-4 py-2 text-center rounded-full shadow-md hover:bg-indigo-800 cursor-pointer ml-3 flex items-center justify-center"
              href="/Dashboard"
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <Link href="/Login">
              <div
                style={{ background: "#EDEDFE", color: "black", width: "120px" }}
                className="px-4 py-2 text-center rounded-full cursor-pointer mb-2 md:mb-0 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Log In
              </div>
            </Link>
            <Link
              style={{ background: "#011E33", color: "white", width: "120px" }}
              className="px-4 py-2 text-center rounded-full shadow-md hover:bg-indigo-800 cursor-pointer ml-3 flex items-center justify-center"
              href="/Signup"
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
    <nav className="bg-white shadow-md">
      <UserActions isMobileScreen={isMobileScreen} />
    </nav>
  );
};

export default Navbar;
