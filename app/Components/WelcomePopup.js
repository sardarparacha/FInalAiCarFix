"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { backend_url } from "../data";

const WelcomePopup = ({ username }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [close, setClose] = useState(false);

  const { userInfo } = useSelector(state => state.auth);
  
  console.log('userInfo:', userInfo);
  console.log('hasSeenPopup:', userInfo.hasSeenPopup); 


  useEffect(() => {
    if (userInfo && !userInfo.hasSeenPopup) {
      setIsVisible(true);
    }
  }, [userInfo]);

  const handleClose = async () => {
    try {
      await axios.post(`${backend_url}/api/users/update-popup-status/${userInfo._id}`);
      setIsVisible(false);
    } catch (error) {
      console.error('Error updating popup status:', error);
    }
     localStorage.setItem("hasSeenPopup", true);
  };


  useEffect(() => {
    if (localStorage.getItem("hasSeenPopup")) {
      setIsVisible(false);
    }
  }, []);



  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4 text-black">Hey {username}</h2>
        <p className="mb-4 text-black">
        We're thrilled to welcome you to our community! To keep this platform accessible for everyone, we kindly ask if you could consider making a donation of any size. I used my personal savings to build this platform, and we need your support to keep it running. However, please feel free to continue using it on the free tier if you're unable to contribute at this time. Thank you
        </p>
        <a href="https://buy.stripe.com/7sI047gg41N7bV6cMY" 
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >Donate</a>
        <div className="mt-4">
          <button
            onClick={handleClose}
           className="text-blue-500 hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
