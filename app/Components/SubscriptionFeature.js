const SubscriptionFeature = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 px-4 md:px-0">
        {/* Video Thumbnail */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/MQP_3OUCqCw?si=KIPMtwgmokWObdCw" // Replace with actual video ID
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Subscription Feature Video"
            ></iframe>
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl text-black font-bold mb-4">
            Your All-In-One Vehicle Support Subscription
          </h2>
          <p className="text-sm md:text-base mb-6 text-black">
            Streamline Your Car Management With Our Subscription-Based Service That Lets You Add Multiple Vehicles To Your Account. Get Personalized, Real-Time Assistance For Any Car Issues Through Our AI-Powered Chat Feature. Stay On Top Of Maintenance, Repairs, And More With Ease And Convenience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionFeature;
