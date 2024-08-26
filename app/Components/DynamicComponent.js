import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { backend_url } from "../data";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DynamicComponent = ({ serviceName }) => {
  const { userInfo } = useSelector(state => state.auth);
  const [isRequested, setIsRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const featureRequested = localStorage.getItem(`featureRequested_${serviceName}`);
    if (featureRequested) {
      setIsRequested(true);
    }
  }, [serviceName]);

  const handleRequestFeature = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${backend_url}/api/users/getFeature`, {
        email: userInfo.email,
        service:serviceName,
      });
   
      setIsRequested(true);
      toast.success("Your request has been submitted. We will contact you shortly.");
      localStorage.setItem(`featureRequested_${serviceName}`, "true");
    } catch (error) {
      console.error("Error requesting feature:", error);
      toast.error("Failed to submit your request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-4 md:p-8 bg-gray-50 shadow-sm space-y-6 max-w-screen-lg flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">{serviceName}</h2>
      {!isRequested ? (
        <button
          className="bg-blue-900 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
          onClick={handleRequestFeature}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Request This Feature"}
        </button>
      ) : (
        <p className="text-gray-700">Your request has been submitted. We will contact you shortly.</p>
      )}
    </div>
  );
};

export default DynamicComponent;
