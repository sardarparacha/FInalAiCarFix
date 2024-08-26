// app/components/VisionSConcept.tsx
"use client";
import React from "react";
import Image from "next/image";

import userAvatar from "../../public/Chat/user.png";
import homeIcon from "../../public/Chat/home.png";

import conceptCar from "../../public/Chat/carimage.png";
import StartChat from "../Components/StartChat";
import MaintenanceRecords from "../Components/MaintenanceRecords";
import Partner from "../Components/Partner";

const VisionSConcept = () => {
  return (
   <>
    <div className="flex flex-col md:flex-row  bg-gray-100">
    
    {/* Right Side Vision S Concept */}
    <div className="w-full  p-8 bg-white rounded-lg shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Image src={homeIcon} alt="Home Icon" width={24} height={24} className="mr-2 cursor-pointer" />
          <h3 className="text-xl font-semibold text-blue-900">Chat</h3>
        </div>
        <div className="flex items-center">
          <Image src={userAvatar} alt="User Avatar" width={30} height={30} className="rounded-full" />
          <span className="ml-2">Jon Doe</span>
        </div>
      </div>

      {/* Concept Car */}
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-6">
          {JSON.parse(localStorage.getItem("selectedCar")).carMake +" - "+
          JSON.parse(localStorage.getItem("selectedCar")).carModel
          }
        </h2>
        <Image src={conceptCar} alt="Vision S Concept Car" width={600} height={400} className="rounded-lg" />
      </div>
    </div>
  </div>

  <StartChat/>
  
  <Partner/>
   </>


  );
};

export default VisionSConcept;
