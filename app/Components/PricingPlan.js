"use client"
import React from 'react';

const PricingPlan = () => {
  return (
    <>
      <div className="w-full bg-[#011E33] text-center py-8">
        <h1 className="text-4xl font-bold text-white">PRICING</h1>
      </div>
      <section className="bg-[#011E33] text-white py-12 px-6 lg:px-32 mt-4 sm:p-10">
        <div className="bg-white text-black  rounded-lg shadow-md p-8 max-w-5xl mx-auto">
          <button className="bg-[#011E33] float-right rounded-md hover:bg-blue-700 text-white font-bold py-2 px-4">
            Most Popular
          </button>
          <br/> <br/>
          <h1
            style={{
              textAlign: "center",
              fontSize: "31px",
              marginLeft: "1%",
              color: "#011E33",
              fontWeight: "bold",
            }}
          >
            Premium Plan
          </h1>
          <p className="text-center text-lg mb-6">
          Only $15 per month, email us at support@carAifix.com to get a trial account.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Feature 1 */}
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-black ">Technical Service Bulletins and Recalls</h3>
              <p className="text-sm text-black ">
                Stay updated with real-time Technical Service Bulletins and Recalls, integrated seamlessly into our chat functionality for instant access to critical safety notices and manufacturer bulletins on our site.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-black ">Comprehensive Vehicle Specifications, OEM Data</h3>
              <p className="text-sm text-black ">
                Access detailed vehicle specifications and OEM data, including dimensions, engine specs, and more, integrated into our chat system for instant, accurate information, with all data available on our site.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-black ">Vehicle History and OEM Recommended Fixes</h3>
              <p className="text-sm text-black ">
                Discover comprehensive vehicle history records and OEM-recommended maintenance schedules, integrated into our chat model for easy retrieval and accessible on our site.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-black ">Detailed Wiring Diagrams</h3>
              <p className="text-sm text-black ">
                Get professional-grade wiring diagrams for electrical repairs, integrated into our chat system for real-time instructions, and accessible on our site for confident and precise fixes.
              </p>
            </div>
            {/* Feature 5 */}
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-black ">Repair Manual and Car Owner Manual</h3>
              <p className="text-sm text-black ">
                Access your car's repair and owner's manuals through our platform, integrated into our chat functionality for real-time guidance and available on our site for reliable reference.
              </p>
            </div>
            {/* Feature 6 */}
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-black ">Powerful Chat Functionality For Quick Answers</h3>
              <p className="text-sm text-black  ">
                Revolutionize your car repair experience with our advanced chat feature, offering instant, precise assistance with detailed car information, diagnostics, and repair instructions, all easily accessible on our site.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              style={{ paddingLeft: "20px", paddingRight: "20px" }}
              href="/Signup"
              className="bg-[#011E33] hover:bg-[#011E33]-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Up!
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
export default PricingPlan;