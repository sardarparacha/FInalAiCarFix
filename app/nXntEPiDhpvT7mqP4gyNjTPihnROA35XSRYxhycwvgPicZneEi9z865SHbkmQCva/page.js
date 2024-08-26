"use client";
import React, { useState, useEffect } from "react";
import { backend_url } from "../data";

const Payment = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || !userInfo._id) {
      setError("User information is missing.");
      setLoading(false);
      return;
    }

    const savePaymentDetails = async () => {
      try {
        const response = await fetch(`${backend_url}/api/payments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userInfo._id,
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
    
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save payment details.");
        }

        const data = await response.json();
        console.log('data', data);
        if (data) {
          window.location.href = "/Dashboard";
        } else {
          setError("Payment failed. Please try again.");
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    savePaymentDetails();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>Redirecting...</div>
      )}
    </div>
  );
};

export default Payment;
