import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProPlanLock = ({ isLocked, children }) => {
  const handleLockClick = (event) => {
    event.stopPropagation();
    if (isLocked) {
      toast.info("Activate Premium Plan to Access this feature");
    }
  };

  return (
    <div className="relative inline" style={{ width: "100%", height: "100%" }}>
      {children}
      {isLocked && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-slate-200 bg-opacity-50"
          style={{
            backdropFilter: 'blur(2px)',
            cursor: 'not-allowed',
            width: '100%',
            height: '100%',
          }}
          onClick={handleLockClick}
        >
          <div
            className='bg-[#011E33] flex items-center justify-center'
            style={{
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 36 36">
              <path fill="#FFFFFF" d="M18.09 20.59A2.41 2.41 0 0 0 17 25.14V28h2v-2.77a2.41 2.41 0 0 0-.91-4.64" className="clr-i-outline clr-i-outline-path-1" />
              <path fill="#FFFFFF" d="M26 15v-4.28a8.2 8.2 0 0 0-8-8.36a8.2 8.2 0 0 0-8 8.36V15H7v17a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V15Zm-14-4.28a6.2 6.2 0 0 1 6-6.36a6.2 6.2 0 0 1 6 6.36V15H12ZM9 32V17h18v15Z" className="clr-i-outline clr-i-outline-path-2" />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProPlanLock;
