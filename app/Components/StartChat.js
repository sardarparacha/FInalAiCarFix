"use client"
const StartChat = ({ openchat }) => {
  return (
   <div className="flex justify-center align-center">
     <button 
      onClick={() => { openchat() }} 
      style={{ cursor: "pointer" }}
      className="bg-[#011E33] text-white py-3 px-6 m
      b-20 rounded-full flex justify-center items-center w-1/3 m-2  mb-9"
    >
      <p className="text-lg">Chat Now</p>
    </button>
   </div>
  );
};

export default StartChat;
