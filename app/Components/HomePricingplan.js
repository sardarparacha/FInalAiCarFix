import React from 'react';

const HomePricingPlan = () => {
    return (

        <section style={{minHeight:"650px",
            display:"flex",justifyContent:"center",alignItems:"center"
        }} className="bg-[#011E33] bg-fromback  text-black py-12 px-6 lg:px-32 mt-4 sm:p-10">
            <div className="flex flex-wrap justify-center gap-4 items-center">
                <div className="bg-white rounded-lg shadow-md p-6 w-72"  >
                    <h2 className="text-lg font-semibold text-center">Free</h2>
                    <p className="text-sm text-gray-600 text-center">$0/month</p>
                    <div className="text-left mt-4">
                        <p className="text-sm font-medium">What you get:</p>
                        <ul className="list-none">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2 ">✔</span>Saved Conversations form Previous Chats

                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2 ">✔</span>The Ability to Connect with Mechanics in Your Area for Free

                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2 ">✔</span>Customized car advice based on your car’s make, model and repair history

                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2 ">✔</span>
                                Ability to save all your car related information in one spot

                            </li>
                        </ul>
                    </div>
                    <button 
                     
                     onClick={() => window.location.href = 'https://www.carclinicfix.com/Signup'}
                    className="mt-4 bg-[#011E33]  hover:bg-[#011E33] text-white font-bold py-2 px-4 rounded w-full">Get started</button>
                </div>

                <div style={{height:"450px"}} className="bg-white rounded-lg shadow-md p-6 w-72 border-2 border-blue-500 relative ">
                    <h2 className="text-lg font-semibold text-center">Premium</h2>
                    <p className="text-sm text-gray-600 text-center">$15/month</p>
                    <div className="text-left mt-4">
                        <p className="text-sm font-medium">What you get:</p>
                        <ul className="list-none">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✔</span>
                                Technical Service Bulletins and Recall

                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✔</span>
                                Vehicle Specifications and OEM Data

                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✔</span>Wiring Diagrams

                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✔</span>
                                Ability to Upload Images, 
                                Videos and Audio To Diagnose Car Issues

                            </li>
                        </ul>
                    </div>
                    <button
                        onClick={() => {
                            window.location.href = 'https://www.carclinicfix.com/Signup'
                            localStorage.setItem('planpremium', true);
                        }}
                        className="mt-20 bg-[#011E33] hover:bg-[#011E33] text-white font-bold py-2 px-4 rounded w-full"
                        >
                    Go Premium                        
                    </button>

                </div>
            </div>
        </section>
    );
};

export default HomePricingPlan;