import React, { useState } from 'react';
import UploadContent from './UploadContent';

const NavigationItems = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item) => {
    setSelectedItem(item);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className='relative'>
      <div className='flex justify-around py-4 bg-white p-4'>
        <div 
          style={{ height: "100px", margin: "5px" }} 
          className='flex flex-col items-center justify-center shadow-md w-1/3 p-4 cursor-pointer' 
          onClick={() => handleClick('Maintenance Records')}
        >
          <p className='font-semibold text-black'>Maintenance Records</p>
        </div>
        <div 
          style={{ height: "100px", margin: "5px" }} 
          className='flex flex-col items-center justify-center shadow-md w-1/3 p-4 cursor-pointer' 
          onClick={() => handleClick('Car Manual')}
        >
          <p className='font-semibold text-black'>Car Manual</p>
        </div>
        <div 
          style={{ height: "100px", margin: "5px" }} 
          className='flex flex-col items-center justify-center shadow-md w-1/3 p-4 cursor-pointer' 
          onClick={() => handleClick('Miscellaneous')}
        >
          <p className='font-semibold text-black'>Miscellaneous</p>
        </div>
      </div>
      {isSidebarOpen && (
        <UploadContent closeSidebar={closeSidebar} selectedItem={selectedItem} />

      )}
    </div>
  );
};

export default NavigationItems;
