import React from 'react';

const PricingPlanPro = () => {
  return (
    <section className="bg-[#011E33] text-white py-12 px-6 lg:px-32 mt-4 sm:p-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">PRICING</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Premium Plan</h2>
        <p className="text-center text-lg mb-6">Only $15 for up to 10 Cars! You will get:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
          {/* Feature 1 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Technical Service Bulletins and Recalls</h3>
            <p className="text-sm">Stay updated with real-time Technical Service Bulletins and Recalls, integrated seamlessly into our chat functionality for instant access to critical safety notices and manufacturer bulletins on our site.</p>
          </div>
          {/* Feature 2 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Comprehensive Vehicle Specifications, OEM Data</h3>
            <p className="text-sm">Access detailed vehicle specifications and OEM data, including dimensions, engine specs, and more, integrated into our chat system for instant, accurate safety information, with all data available on our site.</p>
          </div>
          {/* Feature 3 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Vehicle History and OEM Recommended Fixes</h3>
            <p className="text-sm">Discover comprehensive vehicle history records and OEM-recommended maintenance schedules, integrated into our chat model for easy retrieval and accessible on our site.</p>
          </div>
          {/* Feature 4 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Detailed Wiring Diagrams</h3>
            <p className="text-sm">Get professional-grade wiring diagrams for electrical repairs, integrated into our chat system for real-time instructions, and accessible on our site for confident and precise fixes.</p>
          </div>
          {/* Feature 5 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Repair Manual and Car Owner Manual</h3>
            <p className="text-sm">Access your car's repair and owner's manuals through our platform, integrated into our chat functionality for real-time guidance and available on our site for reliable reference.</p>
          </div>
          {/* Feature 6 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Powerful Chat Functionality For Quick Answers</h3>
            <p className="text-sm">Revolutionize your car repair experience with our advanced chat feature, offering instant, precise assistance with detailed car information, diagnostics, and repair instructions, all easily accessible on our site.</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <button className="bg-[#011E33] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up!</button>
        </div>
      </div>
    </section>
  );
};

export default PricingPlanPro;
