"use client"
import { useState, useEffect } from "react";
import Link from "next/link";



const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        "/Main/Hero_back.png",
        "/Main/car_1.jpg",
        "/Main/car_2.jpg",
        "/Main/car_3.jpg",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [images.length]);
    
    return (
        <section
            className="relative  bg-center bg-no-repeat h-[500px] flex items-center px-6 md:px-16 lg:px-32"
            style={{ backgroundImage: `url(${images[currentImage]})`,backgroundSize: "cover"}}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-10 text-left text-white max-w-lg">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Get Instant Answers to Your Car Questions For Free
                </h1>
                <p className="mb-6 md:mb-8 text-lg md:text-xl">
                Our chat tool delivers precise and customized advice for your car’s make and model. We ensure accuracy by drawing on a comprehensive range of resources, including OEM manuals, car forums, YouTube videos, and other verified online information.
                </p>
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                    <Link href="/Aichat">
                        <div
                            className="px-6 py-3 bg-[#011E33] text-white rounded-full shadow-md text-center cursor-pointer hover:bg-[#011233]"
                        >
                            Chat Now
                        </div>
                    </Link>
                    <div className="flex flex-coltext-left justify-center flex-row">
                        {/* <div className="bgphone"
                            style={{ height: "40px", width: "40px", marginTop: "6px", marginLeft: "10px", marginRight: "12px" }}
                        >
                        </div> */}
                        <div className="flex flex-col">
                            {/* <span className="font-semibold text-lg md:text-xl">
                                123 456 789 0
                            </span> */}
                            {/* <span className="text-sm md:text-base">24-hour Emergency Assistance</span> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
