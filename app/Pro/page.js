// app/components/Page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from 'axios';

import proicon from "../../public/Pro/proicon.png";
import carClinicLogo from "../../public/Signup/signup_left.png";
import { backend_url } from "../data";

const Page = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});


  const fetchPaymentDetails = async () => {
    try {
      let userid = JSON.parse(localStorage.getItem('userInfo'));
      if (!userid) return;
      const response = await axios.get(`${backend_url}/api/payments/${userid._id}`);
      setPaymentDetails(response.data);
    } catch (error) {
      console.error(`Error fetching payment details: ${error.response?.status} - ${error.message}`);
    }
  };

  useEffect(() => {
    fetchPaymentDetails();
  }, [])

  const handleSkipClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white">
        <button
          style={{ position: "fixed", top: "10%", left: "10%" }}
          onClick={() => window.history.back()}
          className="self-start mb-4 ml-4 p-2 px-4 bg-[#011E33] rounded-md hover:bg-gray-300"
        >
          <p className="text-white">←</p>
        </button>

        <div className="w-full md:w-1/3 flex flex-col items-center mb-8 md:mb-0">
          <Image src={carClinicLogo} alt="CarClinic Logo" width={200} height={200} />
        </div>

        {/* Right Side Pricing Card */}
        <div className="w-full lg:w-2/3 p-8 flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-[#011E33] mb-4">Go Premium</h3>
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-8 text-center">
            <div className="flex">
              <Image src={proicon} alt="Pro Icon" width={72} height={72} />
              <div className="m-2">
                <h4 className="text-md font-bold text-left">For individuals</h4>
                <h5 className="text-md font-bold text-left">Premium</h5>
              </div>
            </div>
            <p className="text-gray-600 text-xs mt-4 mb-2">
              Get all these amazing features in just
            </p>
            <div className="text-left">
              <div className="flex align-center">
                <div className="text-4xl font-bold text-blue-900 mb-2">$15</div>
                <div className="text-sm font-medium text-gray-500 mb-6 justify-center mt-3 ml-2">/monthly</div>
              </div>
            </div>
            <ul className="list-none mb-6">
              <li className="flex items-center mb-2">
                <span className="inline-block w-4 h-4 mr-2 bg-[#011E33] text-white rounded-full text-center text-xs">✔</span>
                <span>Technical Bulletins</span>
              </li>
              <li className="flex items-center mb-2">
                <span className="inline-block w-4 h-4 mr-2 bg-[#011E33] text-white rounded-full text-center text-xs">✔</span>
                <span className="text-black">Recall</span>
              </li>
              <li className="flex items-center mb-2">
                <span className="inline-block w-4 h-4 mr-2 bg-[#011E33] text-white rounded-full text-center text-xs">✔</span>
                <span className="text-black">Vehicle Specifications</span>
              </li>
              <li className="flex items-center mb-2">
                <span className="inline-block w-4 h-4 mr-2 bg-[#011E33] text-white rounded-full text-center text-xs">✔</span>
                <span className="text-black">OEM Data</span>
              </li>
              <li className="flex items-center mb-2">
                <span className="inline-block w-4 h-4 mr-2 bg-[#011E33] text-white rounded-full text-center text-xs">✔</span>
                <span className="text-black">Wiring Diagrams</span>
              </li>
              <li className="flex items-center mb-2">
                <span className="inline-block w-4 h-4 bg-[#011E33] text-white rounded-full text-left text-xs">✔</span>
                <span className="ml-2 text-black">User Manuals</span>
              </li>
              <li className="flex items-center mb-2">
                <span className="inline-block w-4 h-4 mr-2 bg-[#011E33] text-white rounded-full text-center text-xs">✔</span>
                <span className="text-black">Ability to Upload Files</span>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => {
                // https://buy.stripe.com/fZe8AD8NCezT5wI9AQ
                window.location.href = "https://buy.stripe.com/bIYdUX7JyfDX0co3ct";
              }}
              className="w-full bg-[#011E33] text-white py-2 rounded hover:bg-blue-800"
            >
              Get Now
            </button>
            <i>
              <p className="text-xs mt-2 text-gray-600">
                Payment will be done through Stripe. Please make sure you are not in <mark>Incognito Mode</mark>
              </p>
            </i>
          </div>

          {paymentDetails && paymentDetails?.remainingDays > 0 ? (
            <></>
          ) : (
            <button
              onClick={handleSkipClick}
              className="mt-4  text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              Skip
            </button>
          )}

        </div>
      </div>


      {showPopup && (
      <div   className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center" >
          <h2 className="text-xl font-bold mb-4 text-black">Get a Trial Account</h2>
          <p className="mb-4 text-black">
            To get a trial account, email us at{" "}
            <a
              href="mailto:support@carAifix.com"
              className="text-blue-500 underline"
            >
              support@carAifix.com
            </a>
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleClosePopup}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              Close
            </button>
            <button
              onClick={() => window.location.href = "/AddCar"}
              className="bg-[#011E33] text-white py-2 px-4 rounded hover:bg-blue-800"
            >
              Add Car
            </button>
          </div>
        </div>
      </div>
    )}


    </>
  );
};

export default Page;
