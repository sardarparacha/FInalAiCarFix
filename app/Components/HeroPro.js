"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

const HeroPro = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        "/Main/11.png",
        "/Main/22.png",
        "/Main/44.png",
        "/Main/55.png",
        "/Main/66.png",

    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section
            className="relative bg-center bg-no-repeat h-[500px] flex items-center px-6 md:px-16 lg:px-32"
            style={{ backgroundImage: `url(${images[currentImage]})`, backgroundSize: "cover" }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-10 text-left text-white max-w-lg">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    CARCLINIC PREMIUM
                </h1>
                <p className="mb-6 md:mb-8 text-lg md:text-xl">
                Our platform revolutionizes   car repairs with real-time updates on bulletins and recalls, comprehensive specs, and detailed histories for your cars. Integrated into our powerful chat, you get instant assistance and step-by-step repair guidance. Access professional-grade wiring diagrams and full manuals anytime, ensuring you have all the essential information at your fingertips.                </p>
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                    <Link href="/Signup">
                        <div
                            className="px-6 py-3 bg-[#011E33] text-white rounded-full shadow-md text-center cursor-pointer hover:bg-[#011233]"
                        >
                            SUBSCRIBE NOW
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroPro;
