const GuaranteesAndCertifications = () => {
    return (
      <section className="bg-[#011E33] text-white py-8">
        <div className="container mx-auto flex   justify-evenly flex-wrap md:flex-nowrap items-center space-y-6 md:space-y-0 md:space-x-6 px-4 md:px-0">
          
          {/* Technical Service Bulletins & Recalls */}
          <div className="flex flex-col  items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex-shrink-0">
              <div
                className="bg-technical-service-bulletins"
                style={{
                  height: "50px",
                  width: "50px",
                  backgroundImage: "url('/ProGur/mdi_car-repair.png')",
                  backgroundSize: "cover"
                }}
              ></div>
            </div>
            <div className="text-center ">
              <h3 className="text-lg font-semibold">Technical Service Bulletins & Recalls</h3>
            </div>
          </div>
          
          {/* Comprehensive Vehicle Specifications */}
          <div className="flex flex-col  items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex-shrink-0">
              <div
                className="bg-comprehensive-vehicle-specifications"
                style={{
                  height: "50px",
                  width: "50px",
                  backgroundImage: "url('/ProGur/carbon_report.png')",
                  backgroundSize: "cover"
                }}
              ></div>
            </div>
            <div className="text-center ">
              <h3 className="text-lg font-semibold">Comprehensive Vehicle Specifications</h3>
            </div>
          </div>
  
          {/* OEM Data */}
          <div className="flex flex-col  items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex-shrink-0">
              <div
                className="bg-oem-data"
                style={{
                  height: "50px",
                  width: "50px",
                  backgroundImage: "url('/ProGur/ph_engine.png')",
                  backgroundSize: "cover"
                }}
              ></div>
            </div>
            <div className="text-center ">
              <h3 className="text-lg font-semibold">Vehicle OEM Data {" "} </h3>
            </div>
          </div>
  
          {/* Vehicle History */}
          <div className="flex flex-col  items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex-shrink-0">
              <div
                className="bg-vehicle-history"
                style={{
                  height: "50px",
                  width: "50px",
                  backgroundImage: "url('/ProGur/carbon_vehicle-insights.png')",
                  backgroundSize: "cover"
                }}
              ></div>
            </div>
            <div className="text-center ">
              <h3 className="text-lg font-semibold">Get Vehicle Complete History</h3>
            </div>
          </div>
  
          {/* Detailed Wiring Diagrams */}
          <div className="flex flex-col  items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex-shrink-0">
              <div
                className="bg-detailed-wiring-diagrams"
                style={{
                  height: "50px",
                  width: "50px",
                  backgroundImage: "url('/ProGur/ph_blueprint.png')",
                  backgroundSize: "cover"
                }}
              ></div>
            </div>
            <div className="text-center ">
              <h3 className="text-lg font-semibold">Detailed Wiring Diagrams</h3>
            </div>
          </div>
  
          {/* Repair Manual and Owners Manual */}
          <div className="flex flex-col  items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex-shrink-0">
              <div
                className="bg-repair-manual"
                style={{
                  height: "50px",
                  width: "50px",
                  backgroundImage: "url('/ProGur/material-symbols-light_unknown-document-outline.png')",
                  backgroundSize: "cover"
                }}
              ></div>
            </div>
            <div className="text-center ">
              <h3 className="text-lg font-semibold">Repair Manual and Owners Manual</h3>
            </div>
          </div>
  
        </div>
      </section>
    );
  };
  
  export default GuaranteesAndCertifications;
  