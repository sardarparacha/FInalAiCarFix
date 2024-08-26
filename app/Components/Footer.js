import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white py-8 mb-5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 px-6">
        {/* Follow Us */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link href="https://www.facebook.com/profile.php?id=61552221532543" >
            <div className="bg-facebook "style={{width: "30px", height: "30px"}}></div>

            </Link>
            <Link href="https://www.instagram.com/carclinic_fix/" >
            <div className="bg-instagram "style ={{width: "30px", height: "30px"}}></div>

            </Link>
           
          </div>
        </div>
        {/* Contact Us */}
        <div className="text-center">
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <p href="mailto:abcdonukul@gmail.com" className="text-gray-600 
          text-black
          cursor-pointer
          hover:underline">
          support@carAifix.com
          </p>
        </div>
        {/* Privacy Policy */}
        <div className="text-center md:text-right">
          <Link className="font-semibold underline text-black" href="/Privacy-Policy">
            Data Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
