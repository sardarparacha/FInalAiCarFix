"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import axios from 'axios';
import homeIcon from "../../public/Chat/home.png";
import conceptCar from "../../public/Chat/carimage.png";
import Lock_MaintenanceRecord from '../../public/Main/lock_MaintenanceRecords.png';
import StartChat from "../Components/StartChat";
import Partner from "../Components/Partner";

import GoogleMapComponent from "../Components/GoogleMapComponent";
import Footer from "../Components/Footer";
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import ProtectedRoute from "../Components/ProtectedRoute";
import WelcomePopup from "../Components/WelcomePopup";
import MaintenanceRecords from "../Components/MaintenanceRecords";
import { API_URL, backend_url } from "../data";
import ProPlanLock from "../Components/ProPlanLock";

const VisionSConcept = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [logout] = useLogoutMutation();
    const [carImage, setCarImage] = useState(conceptCar); // Default image
    const dispatch = useDispatch();
    const [resdata, setResponse] = useState({});
    const [paymentDetails, setPaymentDetails] = useState({});

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            setEmail(userInfo.email);
            setName(userInfo.firstName + ' ' + userInfo.lastName);

            fetchPaymentDetails(userInfo._id); // Fetch payment details when userInfo is available
        }
    }, [userInfo]);

    useEffect(() => {
        fetchCarImage();
    }, []);

    const fetchCarImage = async () => {
        const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));
        if (!selectedCar) {
          console.error('No car selected');
          window.location.href = '/SelectCar';
          return;
        }
      
        const { carMake, carModel, carYear, carTrim } = selectedCar;
      
        const endpoint = `${API_URL}/get`;
        const headers = {
          'Content-Type': 'application/json'
        };
      
        const requestBody = {
          endpoint: 'vehicle-media-images',
          params: { carYear, carMake, carModel, carTrim }
        };
      
        try {
          const response = await axios.post(endpoint, requestBody, { headers });
          console.log('Get response', response);
      
          if (response.status !== 200) {
            return;
          }
          setResponse(response.data);
          const imageUrl = response.data.data.images[0] || conceptCar;
          setCarImage(imageUrl);
        } catch (error) {
          console.error(`Error fetching car image: ${error.response?.status} - ${error.message}`);
        }
      };
      


    const fetchPaymentDetails = async (userId) => {

        try {
            const response = await axios.get(`${backend_url}/api/payments/${userId}`);
            setPaymentDetails(response.data);
        } catch (error) {
            console.error(`Error fetching payment details: ${error.response?.status} - ${error.message}`);
        }
    };

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(setCredentials(null));
            localStorage.removeItem("hasSeenPopup");
            window.location.href = '/Login';
        } catch (err) {
            console.error('Failed to logout:', err);
        }
    };

    const openchat = () => {
        window.location.href = '/Chat';
    }

    return (
        <>
            <ProtectedRoute>
                <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

                <div className="flex flex-col md:flex-row bg-gray-100">
                    {/* Right Side Vision S Concept */}
                    <div className="w-full p-8 bg-white rounded-lg shadow-sm flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6 flex-wrap">

                            <div className="flex items-center  md:mb-0">
                                <Image src={homeIcon} alt="Home Icon"
                                    onClick={() => { window.location.href = "#" }}
                                    width={24} height={24} className="mr-2 cursor-pointer" />
                                <h3 className="text-xl font-semibold text-blue-900">Chat</h3>
                            </div>







                            <div className="relative flex">
                                <div
                                    style={{ paddingRight: "20px" }}
                                    className="flex items-center cursor-pointer bg-[#011E33] text-white py-1 px-2 ml-5 rounded-full" onClick={() => setDropdownVisible(!dropdownVisible)}>
                                    <div className="cursor-pointer pl-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 16 16"><path fill="#FFFFFF" d="M3 14s-1 0-1-1s1-4 6-4s6 3 6 4s-1 1-1 1zm5-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6" /></svg>
                                    </div>
                                    <p className="ml-2 text-white "
                                        style={{ fontSize: "1rem" }}
                                    >{name.substring(0, 5)}
                                    </p>
                                </div>
                              
                                {dropdownVisible && (
                                    <>

                                        <div className="absolute right-0 mt-10 w-48 bg-white border rounded-lg shadow-lg">
                                            <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left text-black" onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </div>

                                    </>
                                )}
                            </div>


                        </div>


                        <div className="flex justify-center">
                            <button
                                style={{ width: "150px" }}
                                className="border border-[#011E33]-900 text-black py-1 rounded-full flex items-center justify-center"
                                onClick={() => {
                                    window.location.href = "/SelectCar";
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v2m0 4v2m-7-6h14m2 0h1m-1 0v-2a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m6 0h-6m6 0v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2" />
                                </svg>
                                Select Car
                            </button>
                        </div>


                        {/* Concept Car */}
                        <div className="flex flex-col items-center justify-center p-8">
                            <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-6"> {JSON.parse(localStorage.getItem("selectedCar"))?.carMake + " - " +
                                JSON.parse(localStorage.getItem("selectedCar"))?.carModel
                            }</h2>
                            <Image src={carImage} alt="Vision S Concept Car" width={600} height={400} className="rounded-lg" />
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <StartChat openchat={openchat} />
                </div>

             

                <MaintenanceRecords />
           
                <Footer />
            </ProtectedRoute>
        </>
    );
};

export default VisionSConcept;
