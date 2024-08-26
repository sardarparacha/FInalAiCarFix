import Form from "./Form";

const TrustOurService = ({formtitle,heading,subheading}) => {
  return (
    <section
    style={{minHeight:"750px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    className="bg-[#011E33] bg-fromback  text-white py-12 px-6 lg:px-32  sm:p-10">
      <div className=" container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-10">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">

          {heading}
                    </h2>
          <p className="text-gray-300">
          {subheading}
          </p>
          <div className="space-y-4">
           
            <div className="flex items-start space-x-4">
            <div className="bg-email "style={{width: "50px", height: "50px"}}></div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-gray-300">support@carAifix.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
            <div className="bg-call "style={{width: "50px", height: "50px"}}></div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-sm text-gray-300">401-349-1992</p>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side: Form */}
        <div>
          <Form formtitle={formtitle} />
        </div>
      </div>
    </section>
  );
};

export default TrustOurService;
