"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import carClinicLogo from "../../public/Signup/signup_left.png";
import nissanLogo from "../../public/nissan.png";
import { useSelector } from "react-redux";
import { backend_url } from "../data";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (userInfo) {
      fetchCars();
    }
  }, [userInfo]);

  const fetchCars = async () => {
    try {
      const data = await axios.get(`${backend_url}/api/cars/${userInfo._id}`);
      console.log('set data', data.data);
      setCars(data.data);
    } catch (error) {
      toast.error("Failed to load cars.");
    }
  };

  const handleCarSelect = (car) => {
    localStorage.setItem("selectedCar", JSON.stringify(car));
    window.location.href = "/Dashboard";
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white">
      {/* Left Side Image */}
      <div className="w-full md:w-1/3 flex flex-col items-center mb-8 md:mb-0">
        <Image src={carClinicLogo} alt="CarClinic Logo" width={150} height={150} />

      </div>



      {/* Right Side Car List */}
      <div className="w-full md:w-1/2 p-8 space-y-6">
        <h3 className="text-2xl font-semibold text-[#011E33] mb-4">Select Your Car</h3>
        <div className="space-y-4">
          {cars.map((car, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 shadow cursor-pointer bg-white rounded-lg hover:shadow-md transition duration-300 ease-in-out"
              onClick={() => handleCarSelect(car)}
            >
              <div className="flex items-center space-x-4">
                <Image src="https://img.freepik.com/premium-vector/car-icon-vehicle-icon-car-vector-icon_564974-1452.jpg?w=360" alt="Nissan Logo" width={50} height={50} />
                <div>
                  <p className="font-semibold text-black">{car.carMake}</p>
                  <p className="text-gray-500">
                    {car.carYear} <br />
                    {car.carMileage} miles
                  </p>
                </div>
              </div>
              <a href="#" className="text-blue-900 hover:text-blue-700">
                →
              </a>
            </div>
          ))}

        </div>
        <button
          type="button"
          className="w-full bg-[#011E33] text-white py-2 rounded mt-4 hover:bg-blue-800"
          onClick={() => { window.location.href = "/AddCar" }}
        >
          Add a New Car
        </button>
      </div>
    </div>
  );
};

export default Page;
