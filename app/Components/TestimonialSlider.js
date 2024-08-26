"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";
import user1 from "../../public/Pro/proicon.png";
import user2 from "../../public/Pro/proicon.png";
import user3 from "../../public/Pro/proicon.png";
import next from "../../public/Pro/proicon.png"; // Assuming you have next.png image
import prev from "../../public/Pro/proicon.png"; // Assuming you have prev.png image

const testimonials = [
  {
    id: 1,
    text: "This website has been great. I used to wonder how an automotive AI tool could be helpful. I've found it very useful.",
    name: "Jennifer Anderson",
    image: user1,
  },
  {
    id: 2,
    text: "I m considering getting an associate's in automotive technology. The AI helps when I'm unsure of what's wrong.",
    name: "Robert Johnson",
    image: user2,
  },
  {
    id: 3,
    text: "It points out things I could be missing. Very helpful tool. It's amazing how much I've learned from using this website.",
    name: "Emily Davis",
    image: user3,
  },
  {
    id: 4,
    text: "After using this tool, I've found it very useful. It's a great resource when you need quick insights about car issues.",
    name: "Michael Smith",
    image: user1,
  },
  {
    id: 5,
    text: "This AI tool has made it easier to understand car problems. I'm now considering a career in  technology.",
    name: "Sarah Johnson",
    image: user2,
  },
  {
    id: 6,
    text: "Whenever I'm unsure about what's wrong with my car, this tool provides valuable suggestions. Very helpful and informative.",
    name: "David Wilson",
    image: user2,
  },
];



const TestimonialSlider = () => {
  const sliderRef = React.useRef(null);
  

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const settings = {
    dots: true,
    infinite: testimonials.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    appendDots: dots => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          marginTop: "60px !Important",
          margin: "-35px",
          marginleft: "10px"
          
        }}
      >
        <button
          onClick={prevSlide}
          className="p-2 bg-gray-200 rounded-full focus:outline-none text-black"
          style={{
            width: "50px",
            height: "50px",
            fontSize: "20px",
            borderRadius: "0%",
            background: "none",
            border: "1px solid #011E33",
            marginRight: "10px"
          }}
        >
          &#8249;
        </button>
        <ul style={{ display: "flex", gap: "10px" }}> {dots} </ul>
        <button
          onClick={nextSlide}
          className="p-2 bg-gray-200 rounded-full focus:outline-none text-black"
          style={{
            width: "50px",
            height: "50px",
            fontSize: "20px",
            borderRadius: "0%",
            background: "none",
            border: "1px solid #011E33",
            marginLeft: "10px"
          }}
        >
          &#8250;
        </button>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4" style={{ width: "90vw" ,height:"600px"
,marginTop:"80px"

    }}>
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-black">
      We Have Helped Thousands of Customers - <br /> 
      Here is What They Are Saying
    
            </h2>
      <Slider ref={sliderRef} {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="px-2 mb-4">
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md h-full">
              <div style={{ maxWidth: "400px" }}>
                <div className="w-full flex items-start justify-start">
                  <div className="w-10 h-10 bg-white text-4xl font-bold text-black rounded-full flex items-center justify-center mb-4">“</div>
                </div>
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
                <div className="w-full flex items-end justify-end mt-4">
                  <div className="flex items-center bg-[#011E33] text-white p-2 rounded-lg">
                    {/* <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                      width={48}
                      height={48}
                    />
                    <p className="text-gray-100 font-semibold">{testimonial.name}</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
