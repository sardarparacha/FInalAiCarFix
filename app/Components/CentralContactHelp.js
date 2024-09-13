import React from 'react';

const CentralContactHelp = () => {
  return (
    <section className="relative bg-[#011E33] flex items-center justify-center  flex-col">
      <h1 style={{textAlign:"center",
    fontSize:"45px",
    fontWeight:"bold",
    color:"white",margin:"30px"}}>
    
       Free Advice in Minutes
    </h1>
    
      <div className="shadow-lg rounded-lg overflow-hidden" style={{ 
        width: "400px",
       height: "600px",margin:"40px" }}>
   
        <iframe style={{
          width: "100%",
          height: "calc(100% - 72px)", // Deduct the height of the header
          border: "none"
        }}
          src="i will add later"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>




      </div>
    </section>
  );
};

export default CentralContactHelp;

