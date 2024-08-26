"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useRegisterMutation } from '../slices/usersApiSlice';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from "../Components/Navbar";


const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const user = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          mobileNumber: formData.mobileNumber || "-- -- -- -- --",
          email: formData.email,
          password: formData.password,
        };

        const response = await register(user).unwrap();
        toast.success("Account created successfully!");

        window.location.href = "/Login";
      } catch (err) {
        toast.error(err?.data?.message || "Registration failed");
      }
    } else {
      toast.error("Please fill all required fields correctly.");
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white">
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
        <form onSubmit={handleSubmit} className="w-full p-8 rounded-lg shadow-sm space-y-6">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">SETUP YOUR ACCOUNT</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border text-black border-gray-300 p-2 rounded" />
              {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border text-black border-gray-300 p-2 rounded" />
              {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Mobile Number (optional)</label>
              <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-full border text-black border-gray-300 p-2 rounded" />
              {formErrors.mobileNumber && <p className="text-red-500 text-sm">{formErrors.mobileNumber}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border text-black border-gray-300 p-2 rounded" />
              {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border text-black border-gray-300 p-2 rounded" />
              {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full border text-black border-gray-300 p-2 rounded" />
              {formErrors.confirmPassword && <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>}
            </div>
          </div>
          <div className="flex items-center mt-6">
            <input type="checkbox" name="terms" className="mr-2" required />
            <label htmlFor="terms" className="text-gray-700">I agree to the terms and conditions</label>
          </div>
          <button type="submit" className="w-1/3 bg-[#011E33] text-white py-2 text-center rounded mt-4 flex justify-center">
            {isLoading ? (
              <>
                <svg className="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </>
            ) : "Continue"}
          </button>
          <p className="text-left mt-4">
            Already have an account?{" "}
            <a href="/Login" className="text-blue-900 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
