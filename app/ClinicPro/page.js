import Image from "next/image";
import Navbar from "../Components/Navbar";
import CentralHeroLogo from "../Components/CentralHeroLogo";
import StartChat from "../Components/StartChat";
import CentralContactHelp from "../Components/CentralContactHelp";
import TrustOurService from "../Components/TrustOurService";
import Footer from "../Components/Footer";
import KeyFeatures from "../Components/KeyFeatures";
import HeroPro from "../Components/HeroPro";
import GuaranteesAndCertificationsPro from "../Components/GuaranteesAndCertificationsPro";
import DIYToolKitHeader from "../Components/DIYToolKitHeader";
import SubscriptionFeature from "../Components/SubscriptionFeature";
import PricingPlanPro from "../Components/PricingPlanPro";
import PricingPlan from "../Components/PricingPlan";


const TechnicalServiceBulletins = () => {
  return (
    <section className="py-8">
      <div className="container flex-col-reverse md:flex-row mx-auto flex
    
      justify-center items-center  md:flex-row   
       items-start space-y-6 md:space-y-0 md:space-x-6 px-4 md:px-0

       
       ">
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-left md:text-justify">
          <h2 className="text-2xl text-black md:text-3xl font-bold mb-4">
            Technical Service Bulletins And Recalls
          </h2>
          <p className="text-sm text-black md:text-base mb-6">
            Stay Ahead Of The Curve With Our Real-Time Updates On Technical Service Bulletins And Recalls. Our Platform Ensures You Receive The Latest Safety Notices And Manufacturer Bulletins Instantly. Integrated Seamlessly Into Our Advanced Chat Functionality, This Critical Information Is Always At Your Fingertips, Allowing You To Address Potential Issues Promptly And Efficiently. Plus, All This Vital Data Is Accessible On Our Site, So You Can View And Reference It Whenever You Need. Stay Informed, Stay Safe, And Keep Your Car Running Smoothly With Ease.
          </p>
        </div>

        {/* Image Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src='ProGallery/11.png'
            alt="Technical Service Bulletin"
            className="w-full h-auto max-w-md md:max-w-lg lg:max-w-xl"
          />
        </div>
      </div>
    </section>
  );
};

const ComprehensiveVehicleSpecifications = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto flex 
      
      flex-col md:flex-row sm:flex-col-reverse items-start space-y-6 md:space-y-0 md:space-x-6 px-4 md:px-0">
        {/* Image Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            src='ProGallery/33.png'
            alt="Comprehensive Vehicle Specifications"
            className="w-full h-auto max-w-md md:max-w-lg lg:max-w-xl"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 text-left md:text-justify">
          <h2 className="text-2xl text-black md:text-3xl font-bold mb-4">
            Comprehensive Vehicle Specifications, OEM Data
          </h2>
          <p className="text-sm text-black md:text-base mb-6">
            Unlock A Treasure Trove Of Vehicle Specifications And OEM Data With Our Comprehensive Platform. From Precise Dimensions And Exterior Features To Intricate Engine Specs And Transmission Details, We’ve Got You Covered. This Wealth Of Information Is Seamlessly Integrated Into Our Chat System, Providing You With Instant, Accurate Answers To All Your Queries. Whether You’re Performing Routine Maintenance Or Complex Modifications, Our Data Helps You Work Smarter, Not Harder. Plus, You Can Access These Specifications Directly On The Site, Ensuring You Have All The Critical Details At Your Fingertips. Get The Knowledge You Need To Excel In Your   Car Projects.
          </p>
        </div>
      </div>
    </section>
  );
};

const VehicleHistoryAndWiringDiagrams = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-6 px-4 md:px-0">
        {/* Vehicle History and OEM Recommended Fixes */}
        <div className="w-full lg:w-1/2 text-left md:text-justify">
          <h2 className="text-2xl md:text-3xl text-black  font-bold mb-4">
            Vehicle History And OEM Recommended Fixes
          </h2>
          <p className="text-sm md:text-base text-black mb-6">
            Discover The Complete Story Of Your Vehicle With Our Detailed History Records. Our Platform Provides Comprehensive Past Repairs, Salvage, And Accident Records For Each Car You Upload. We Also Deliver OEM-Recommended Maintenance Schedules, Complete With Part Details, Cost Estimates, And Time Schedules. All This Information Is Integrated Into Our Powerful Chat Model, Making It Easy To Retrieve And Use. Ensuring That You Can Diagnose And Fix Issues More Effectively. Additionally, All This Valuable Data Is Accessible On Our Site For Your Convenience. With This Knowledge, You Can Maintain Your Vehicle’s Health Like A Premium.
          </p>
          <div className="flex justify-center lg:justify-start">
            <img
              src='ProGallery/33.png'
              alt="Vehicle History and OEM Recommended Fixes"
              className="w-full h-auto max-w-md md:max-w-lg lg:max-w-xl"
            />
          </div>
        </div>

        {/* Detailed Wiring Diagrams */}
        <div className="w-full lg:w-1/2 text-left md:text-justify order-last md:order-first">
          <h2 className="text-2xl md:text-3xl text-black font-bold mb-4">
            Detailed Wiring Diagrams
          </h2>
          <p className="text-sm md:text-base text-black mb-6">
            Master Electrical Repairs With Our Detailed, Professional-Grade Wiring Diagrams. Our Platform Offers Shop-Quality Diagrams That Walk You Through Every Step Of Your Electrical Fixes, Making The Most Complex Repairs Straightforward. Integrated Into Our Chat System, You Can Get Real-Time, Step-By-Step Instructions To Answer Any Electrical Issues You Encounter. These Diagrams Are Easily Accessible On Our Site, Giving You A Valuable Resource At Your Fingertips. Take Control Of Your Electrical Repairs With Confidence And Precision.
          </p>
          <div className="flex justify-center lg:justify-start">
            <img
              src='ProGallery/44.png'
              alt="Detailed Wiring Diagrams"
              className="w-full h-auto max-w-md md:max-w-lg lg:max-w-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const VehicleHistory = () => {
  return (
    <section className="py-8">
      <div

    className="container flex-col-reverse md:flex-row mx-auto flex
    justify-center items-center  md:flex-row   
     items-start space-y-6 md:space-y-0 md:space-x-6 px-4 md:px-0
"
       >
       
       
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-left md:text-justify">
          <h2 className="text-2xl md:text-3xl text-black font-bold mb-4">
            Vehicle History And OEM Recommended Fixes
          </h2>
          <p className="text-sm md:text-base text-black mb-6">
            Discover The Complete Story Of Your Vehicle With Our Detailed History Records. Our Platform Provides Comprehensive Past Repairs, Salvage, And Accident Records For Each Car You Upload. We Also Deliver OEM-Recommended Maintenance Schedules, Complete With Part Details, Cost Estimates, And Time Schedules. All This Information Is Integrated Into Our Powerful Chat Model, Making It Easy To Retrieve And Use. Ensuring That You Can Diagnose And Fix Issues More Effectively. Additionally, All This Valuable Data Is Accessible On Our Site For Your Convenience. With This Knowledge, You Can Maintain Your Vehicle’s Health Like A Premium.
          </p>
        </div>

        {/* Image Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src='ProGallery/44.png'
            alt="Vehicle History and OEM Recommended Fixes"
            className="w-full h-auto max-w-md md:max-w-lg lg:max-w-xl"
          />
        </div>
      </div>
    </section>
  );
};

const DetailedWiringDiagrams = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6 px-4 md:px-0">
        {/* Image Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            src='ProGallery/55.png'
            alt="Detailed Wiring Diagrams"
            className="w-full h-auto max-w-md md:max-w-lg lg:max-w-xl"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 text-left md:text-justify">
          <h2 className="text-2xl md:text-3xl text-black font-bold mb-4">
            Detailed Wiring Diagrams
          </h2>
          <p className="text-sm md:text-base text-black mb-6">
            Master Electrical Repairs With Our Detailed, Professional-Grade Wiring Diagrams. Our Platform Offers Shop-Quality Diagrams That Walk You Through Every Step Of Your Electrical Fixes, Making The Most Complex Repairs Straightforward. Integrated Into Our Chat System, You Can Get Real-Time, Step-By-Step Instructions To Answer Any Electrical Issues You Encounter. These Diagrams Are Easily Accessible On Our Site, Giving You A Valuable Resource At Your Fingertips. Take Control Of Your Electrical Repairs With Confidence And Precision.
          </p>
        </div>
      </div>
    </section>
  );
};

const RepairManual = () => {
  return (
    <section className="py-8">
      <div 
      
      className="container flex-col-reverse md:flex-row mx-auto flex
    justify-center items-center  md:flex-row   
     items-start space-y-6 md:space-y-0 md:space-x-6 px-4 md:px-0
"
      
      >
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-left md:text-justify">
          <h2 className="text-2xl md:text-3xl text-black font-bold mb-4">
            Repair Manual And Car Owner Manual
          </h2>
          <p className="text-sm md:text-base text-black mb-6">
            Gain Full Access To Your Car's Repair And Owner's Manuals Directly Through Our Platform. These Essential Resources Are Fully Integrated Into Our Chat Functionality, Offering A Dynamic, Interactive Experience. Get Real-Time, Step-By-Step Instructions And Immediate Answers To Your Repair Questions. Both Manuals Are Accessible On Our Site, Ensuring You Always Have A Reliable Reference Available. Maintain Your Repair Process With The Ease And Confidence Of Having Expert Guidance At Your Side.
          </p>
        </div>

        {/* Image Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src='ProGallery/66.png'
            alt="Repair Manual And Car Owner Manual"
            className="w-full h-auto max-w-md md:max-w-lg lg:max-w-xl"
          />
        </div>
      </div>
    </section>
  );
};

const PowerfulChatFunctionality = () => {
  return (
    <section className="">
      <div 
      
      className="container flex-col md:flex-row mx-auto flex
      justify-center items-center  md:flex-row   
       items-start space-y-6 md:space-y-0 md:space-x-6 px-4 md:px-0
  "      >
        {/* Image Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            src='ProGallery/77.png'
            alt="Powerful Chat Functionality"
            className="w-full h-auto max-w-md md:max-w-lg lg:max-w-xl"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 text-left md:text-justify">
          <h2 className="text-2xl md:text-3xl text-black font-bold mb-4">
            Powerful Chat Functionality For Quick Answers
          </h2>
          <p className="text-sm md:text-base text-black mb-6">
            Revolutionize Your Car Repair Experience With Our State-Of-The-Art Chat Feature. Instead Of Phone Or Audio Calls With Your Car Issues And Vehicle Information, Experience Instant, Accurate Answers Through Our Chat System. Our Chat Is Loaded With Information About Your Car’s Make, Model, History, And Maintenance Records, Offering Comprehensive Support And Immediate Access To Any Questions. Our AI Delivers Answers To Your Questions In Seconds. Plus, All This Information Is Easily Accessible On The Site, Making Your Car Repairs Fast And Simple. Take Control Of Your Repair Process With Our Powerful, User-Friendly Chat Functionality.
          </p>
        </div>
      </div>
    </section>
  );
};






export default function ClinicPro() {
  return (
    <main className="flex min-h-screen flex-col  ">
      
     
      <HeroPro/>
      <GuaranteesAndCertificationsPro/>
     
      <section className="relative bg-white h-[400px] flex items-center justify-center">
        <div 
        
        className="bg-CenteralHeroLogo-old"
        style={{width: "450px", height: "400px",marginLeft:"-25px"}}
        >
        
        </div>
      </section>

      <DIYToolKitHeader/>
        <div style={{maxWidth:"95%",margin:"auto"}}>
      
      <SubscriptionFeature/>
      <TechnicalServiceBulletins/>
      <ComprehensiveVehicleSpecifications/>
      <VehicleHistory/>
      <DetailedWiringDiagrams/> 
      <RepairManual/>
      <PowerfulChatFunctionality/>

        </div>

    

      <PricingPlan/>
      <TrustOurService
        formtitle="Share Your Feedback On CarClinic Premium"
        heading="Trust Our Service to Help you Implement the Repair you Need"
        subheading="The ultimate tool for   car repair, instant access to accurate and easily accessible data to make your next repair seamless."
      />
      <Footer/>
    </main>
  );
}
