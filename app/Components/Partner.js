"use client";
import React from "react";
import Image from "next/image";

import oreillyLogo from "../../public/Partners/olive.png";
import advanceAutoPartsLogo from "../../public/Partners/aap.png";
import amazonLogo from "../../public/Partners/amazon.png";
import autozoneLogo from "../../public/Partners/rz.png";
import napaLogo from "../../public/Partners/napa.png";
import ebayLogo from "../../public/Partners/ebay.png";

const Partner = () => {
  const partners = [
    {
      name: "Amazon",
      logo: amazonLogo,
      link: "https://www.amazon.com",
    },
    {
      name: "O'Reilly Auto Parts",
      logo: oreillyLogo,
      link: "https://www.oreillyauto.com",
    },
    {
      name: "Advance Auto Parts",
      logo: advanceAutoPartsLogo,
      link: "https://shop.advanceautoparts.com",
    },
    {
      name: "AutoZone",
      logo: autozoneLogo,
      link: "https://www.autozone.com",
    },
    {
      name: "NAPA Auto Parts",
      logo: napaLogo,
      link: "https://www.napaonline.com",
    },
    {
      name: "eBay",
      logo: ebayLogo,
      link: "https://www.ebay.com",
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen  p-8 mt-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#011E33] mb-8">Shops For parts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {partners.map((partner, index) => (
          <div
            key={index}
            style={{boxShadow: "0 0 4px 0  #011E33",borderRadius:"20px"}}
            className="flex flex-col items-center justify-between bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center p-6 border-b-4 border-[#011E33] w-full">
              <Image src={partner.logo} alt={`${partner.name} Logo`} width={200} height={100} className="mb-4" />
            </div>
            <a
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#011E33] text-white py-2 px-4 w-full text-center"
            >
              SHOP
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partner;
