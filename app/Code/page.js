// app/components/Code.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import carClinicLogo from "../../public/Signup/signup_left.png";

const Code = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [codeError, setCodeError] = useState("");

  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
  };

  const validateForm = () => {
    if (code.includes("")) {
      setCodeError("Please fill all code fields");
      return false;
    }
    setCodeError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem("verificationCode", code.join(""));
      alert("Code verified successfully!");
    } else {
      alert("Please enter the full code.");
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
      <form onSubmit={handleSubmit} className="w-full md:w-2/3 p-8  shadow-sm text-center space-y-6">
        <h3 className="text-2xl font-semibold text-blue-900 mb-4">Enter Code</h3>
        <div className="space-y-6">
          <div className="flex justify-center space-x-4">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="w-12 h-12 border border-gray-300 p-2 text-center rounded"
                maxLength={1}
              />
            ))}
          </div>
          {codeError && <p className="text-red-500 text-sm">{codeError}</p>}
        </div>
        
        <button
          type="submit"
          className="w-1/3 bg-[#011E33] text-white py-2 rounded mt-4 "
        >
          Verify Code
        </button>
        
      </form>

      
    </div>
  );
};

export default Code;
