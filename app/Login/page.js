"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useRouter } from 'next/router';
import axios from 'axios';
import carClinicLogo from "../../public/Signup/signup_left.png";
import Navbar from "../Components/Navbar";
import { backend_url } from "../data";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if (userInfo) {
      checkUserCars(userInfo);
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const user = await login(formData).unwrap();
        dispatch(setCredentials(user));
        toast.success("Signed in successfully!");
        await checkUserCars(user);
      } catch (err) {
        toast.error(err.data?.message || "Failed to sign in");
      }
    } else {
      toast.error("Please fill all required fields correctly.");
    }
  };

  const checkUserCars = async (user) => {

      localStorage.setItem('user', JSON.stringify(user));

    try {
      const { data: cars } = await axios.get(`${backend_url}/api/cars/${user._id}`);
      if (cars.length === 0) {
        

        if (localStorage.getItem("planpremium")) {
          window.location.href = "/Pro";
          return;
        }


        window.location.href = "/AddCar";


      } else {
        window.location.href = "/SelectCar";
      }
    } catch (err) {
      console.error('Error checking user cars:', err);
      toast.error("Failed to retrieve car data.");
    }
  };

  return (
    <>
    
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white" style={{ maxWidth: "1300px" }}>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

        {/* <div className="w-full md:w-1/3 flex flex-col items-center mb-8 md:mb-0">
          <Image src={carClinicLogo} alt="CarClinic Logo" width={150} height={150} />
        </div> */}

        {/* Right Side Form */}
        <form onSubmit={handleSubmit} className="w-full md:w-2/3 p-8 shadow-sm space-y-6">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">Sign In</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 text-black p-2 rounded"
              />
              {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 text-black p-2 rounded"
              />
              {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <a href="/ForgetPassword" className="text-blue-900 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-1/3 bg-[#011E33] text-white py-2 rounded mt-4 "
          >
            Sign In
          </button>
          <div
            style={{ height: "2px", marginTop: "50px" }}
            className="w-full bg-slate-200 md:mt-10"
          ></div>

          <div className="flex mt-4">
            Don’t have an account ?
            <a href="/Signup" className="ml-2 text-blue-900 hover:underline">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
