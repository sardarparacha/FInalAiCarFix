// app/components/page.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import carClinicLogo from "../../public/Signup/signup_left.png";

const page = () => {
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [formErrors, setFormErrors] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors= {};
    if (!formData.cardholderName) errors.cardholderName = "Cardholder's name is required";
    if (!formData.cardNumber || formData.cardNumber.length < 16) errors.cardNumber = "Valid card number is required";
    if (!formData.expiryDate) errors.expiryDate = "Expiry date is required";
    if (!formData.cvv || formData.cvv.length < 3) errors.cvv = "CVV is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem("cardDetails", JSON.stringify(formData));
      alert("Payment processed successfully!");
    } else {
      alert("Please fill all required fields correctly.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white">
    

    
    
      {/* Left Side Image */}
      <div className="w-full md:w-1/3 flex flex-col items-center mb-8 md:mb-0">
        <Image src={carClinicLogo} alt="CarClinic Logo" width={150} height={150} />
        <h2 className="text-2xl font-bold mt-4">CarClinic</h2>
        <p className="text-gray-600">Expert Car Advice in Seconds</p>
      </div>

      {/* Right Side Form */}
      <form onSubmit={handleSubmit} className="w-full md:w-2/3 p-8   space-y-6">
        <h3 className="text-2xl font-semibold text-[#011E33] mb-4">Go Premium</h3>
        <h4 className="text-lg font-semibold text-[#011E33] mb-4">Enter Your Card Details</h4>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700">Cardholder's Name</label>
            <input
              type="text"
              name="cardholderName"
              placeholder="Enter cardholder's full name"
              value={formData.cardholderName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {formErrors.cardholderName && <p className="text-red-500 text-sm">{formErrors.cardholderName}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="4968 XXXX XXXX XXXX"
              maxLength={16}
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {formErrors.cardNumber && <p className="text-red-500 text-sm">{formErrors.cardNumber}</p>}
          </div>
          <div className="flex space-x-4">
            <div>
              <label className="block text-gray-700">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-24 border border-gray-300 p-2 rounded"
              />
              {formErrors.expiryDate && <p className="text-red-500 text-sm">{formErrors.expiryDate}</p>}
            </div>
            <div>
              <label className="block text-gray-700">CVV</label>
              <input
                type="text"
                name="cvv"
                placeholder="***"
                maxLength={3}
                value={formData.cvv}
                onChange={handleChange}
                className="w-16 border border-gray-300 p-2 rounded"
              />
              {formErrors.cvv && <p className="text-red-500 text-sm">{formErrors.cvv}</p>}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-1/3 bg-[#011E33] text-white py-2 rounded hover:bg-blue-800"
          >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default page;
