"use client";
import React, { useState } from "react";
import Image from "next/image";
import carClinicLogo from "../../public/Signup/signup_left.png";
import { useForgetPasswordMutation } from '../slices/usersApiSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [forgotPassword, { isLoading }] = useForgetPasswordMutation();

  const validateForm = () => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await forgotPassword({ email }).unwrap();
        toast.success("Password reset email sent!");
        setEmail("");
      } catch (err) {
        toast.error("You are not registered with this email. Please sign up.");
        setEmail("");
      }
    } else {
      toast.error("Please enter your email address.");
      
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen ">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
   
      <div className="w-full md:w-1/3 flex flex-col items-center mb-8 md:mb-0">
          <Image src={carClinicLogo} alt="CarClinic Logo" width={150} height={150} />
        </div>

      {/* Right Side Form */}
      <form onSubmit={handleSubmit} className="w-full md:w-2/3 p-8 b shadow-sm space-y-6">
        <h3 className="text-2xl font-semibold text-[#011E33] mb-4">Forgot Password</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700">Email Address</label>
            <br/>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-black"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
        </div>
        
        <button
          type="submit"
          className="w-1/3 bg-[#011E33] text-white py-2 rounded mt-4 flex justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.268 0 0 6.268 0 14h4z"></path>
            </svg>
          ) : "Continue"}
        </button>
        <div style={{height:"2px",marginTop:"50px"}} className="w-full bg-slate-200 md:mt-10"></div>
        
        <p className="text-left mt-4">
          Already have an account?{" "}
          <a href="/Login" className="text-blue-900 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
