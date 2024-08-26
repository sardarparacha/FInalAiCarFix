// app/components/KeyFeatures.tsx
const KeyFeatures = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8 lg:px-16 xl:px-32">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
          Key Features
        </h2>
        <p className="text-lg italic font-semibold text-gray-600 mt-2 mb-8">
          Preliminary Diagnosis & Advanced Troubleshooting
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {featureData.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <p className="text-center text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const featureData = [
  {
    icon: (

      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.9993 19.1663C20.8252 19.1663 21.593 18.8355 23.1285 18.1738L24.2365 17.6963C26.9673 16.5197 28.3327 15.9314 28.3327 14.9997C28.3327 14.068 26.9673 13.4796 24.2365 12.303L23.1285 11.8255C21.593 11.1638 20.8252 10.833 19.9993 10.833C19.1735 10.833 18.4057 11.1638 16.8702 11.8255L15.7621 12.303C13.0314 13.4796 11.666 14.068 11.666 14.9997C11.666 15.9314 13.0314 16.5197 15.7621 17.6963L16.8702 18.1738C18.4057 18.8355 19.1735 19.1663 19.9993 19.1663ZM19.9993 19.1663V29.1663" stroke="white" stroke-width="2.5" stroke-linejoin="round" />
        <path d="M28.3327 15V25C28.3327 25.9317 26.9673 26.52 24.2365 27.6967L23.1285 28.1742C21.593 28.8358 20.8252 29.1667 19.9993 29.1667C19.1735 29.1667 18.4057 28.8358 16.8702 28.1742L15.7621 27.6967C13.0314 26.52 11.666 25.9317 11.666 25V15" stroke="white" stroke-width="2.5" stroke-linejoin="round" />
        <path d="M15.2398 4.16699C10.8114 4.26824 8.22483 4.69126 6.45757 6.45854C4.69028 8.22581 4.26727 10.8124 4.16602 15.2408M24.7588 4.16699C29.1873 4.26824 31.7738 4.69126 33.5412 6.45854C35.3083 8.22581 35.7313 10.8124 35.8327 15.2408M24.7588 35.8337C29.1873 35.7323 31.7738 35.3093 33.5412 33.5422C35.3083 31.7748 35.7313 29.1883 35.8327 24.7598M15.2398 35.8337C10.8114 35.7323 8.22483 35.3093 6.45757 33.5422C4.69028 31.7748 4.26727 29.1883 4.16602 24.7598" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

    ),
    description:
      "Our tool offers a preliminary diagnosis by analyzing the car’s make and model, reported symptoms, and known issues associated with the vehicle.",
  },
  {
    icon: (

      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.6673 7.49967C8.9059 7.49967 6.66732 9.73826 6.66732 12.4997C6.66732 13.4474 6.93102 14.3336 7.38905 15.0888C5.07943 15.5306 3.33398 17.5613 3.33398 19.9997C3.33398 22.438 5.07943 24.4687 7.38905 24.9105M11.6673 7.49967C11.6673 5.19849 13.5328 3.33301 15.834 3.33301C18.1352 3.33301 20.0007 5.19849 20.0007 7.49967V32.4997C20.0007 34.8008 18.1352 36.6663 15.834 36.6663C13.5328 36.6663 11.6673 34.8008 11.6673 32.4997C8.9059 32.4997 6.66732 30.2612 6.66732 27.4997C6.66732 26.5518 6.93102 25.6657 7.38905 24.9105M11.6673 7.49967C11.6673 8.86286 12.322 10.0731 13.334 10.8333M7.38905 24.9105C7.98312 23.931 8.9041 23.1717 10.0007 22.7842" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M28.3333 32.4997C31.0948 32.4997 33.3333 30.2612 33.3333 27.4997C33.3333 26.5518 33.0697 25.6657 32.6117 24.9105C34.9212 24.4687 36.6667 22.438 36.6667 19.9997C36.6667 17.5613 34.9212 15.5306 32.6117 15.0888M28.3333 32.4997C28.3333 34.8008 26.4678 36.6663 24.1667 36.6663C21.8655 36.6663 20 34.8008 20 32.4997V7.49967C20 5.19849 21.8655 3.33301 24.1667 3.33301C26.4678 3.33301 28.3333 5.19849 28.3333 7.49967C31.0948 7.49967 33.3333 9.73826 33.3333 12.4997C33.3333 13.4474 33.0697 14.3336 32.6117 15.0888M28.3333 32.4997C28.3333 31.1365 27.6787 29.9262 26.6667 29.166M32.6117 15.0888C32.0175 16.0684 31.0965 16.8275 30 17.2152" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

    ),
    description:
      "Leveraging a comprehensive database compiled from decades of data from car forums, OEM manuals, and repair guides, we accurately pinpoint probable causes of your car’s problems and help you troubleshoot possible causes.",
  },
  {
    icon: (

      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29.13 13.3331C29.1423 13.333 29.1548 13.333 29.1673 13.333C33.3095 13.333 36.6673 16.6908 36.6673 20.833C36.6673 24.0985 34.5803 26.8767 31.6673 27.9062M29.13 13.3331C29.1547 13.0586 29.1673 12.7806 29.1673 12.4997C29.1673 7.43706 25.0633 3.33301 20.0007 3.33301C15.2061 3.33301 11.2712 7.01404 10.868 11.7042M29.13 13.3331C28.9595 15.2238 28.215 16.949 27.072 18.333M10.868 11.7042C6.64062 12.1065 3.33398 15.6669 3.33398 19.9997C3.33398 23.4168 5.39082 26.3537 8.33398 27.6397M10.868 11.7042C11.1311 11.6791 11.3977 11.6663 11.6673 11.6663C13.5437 11.6663 15.2752 12.2865 16.6682 13.333" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M30.416 35.4163L26.666 31.6663V28.333M30.416 34.1663C29.7257 34.1663 29.166 34.726 29.166 35.4163C29.166 36.1067 29.7257 36.6663 30.416 36.6663C31.1063 36.6663 31.666 36.1067 31.666 35.4163C31.666 34.726 31.1063 34.1663 30.416 34.1663Z" fill="white" />
        <path d="M30.416 35.4163L26.666 31.6663V28.333M30.416 34.1663C29.7257 34.1663 29.166 34.726 29.166 35.4163C29.166 36.1067 29.7257 36.6663 30.416 36.6663C31.1063 36.6663 31.666 36.1067 31.666 35.4163C31.666 34.726 31.1063 34.1663 30.416 34.1663Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9.58398 35.4163L13.334 31.6663V28.333M9.58398 34.1663C10.2743 34.1663 10.834 34.726 10.834 35.4163C10.834 36.1067 10.2743 36.6663 9.58398 36.6663C8.89363 36.6663 8.33398 36.1067 8.33398 35.4163C8.33398 34.726 8.89363 34.1663 9.58398 34.1663Z" fill="white" />
        <path d="M9.58398 35.4163L13.334 31.6663V28.333M9.58398 34.1663C10.2743 34.1663 10.834 34.726 10.834 35.4163C10.834 36.1067 10.2743 36.6663 9.58398 36.6663C8.89363 36.6663 8.33398 36.1067 8.33398 35.4163C8.33398 34.726 8.89363 34.1663 9.58398 34.1663Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M20 35.4163V28.333V35.4163ZM20 34.1663C19.3097 34.1663 18.75 34.726 18.75 35.4163C18.75 36.1067 19.3097 36.6663 20 36.6663C20.6903 36.6663 21.25 36.1067 21.25 35.4163C21.25 34.726 20.6903 34.1663 20 34.1663Z" fill="white" />
        <path d="M20 35.4163V28.333M20 34.1663C19.3097 34.1663 18.75 34.726 18.75 35.4163C18.75 36.1067 19.3097 36.6663 20 36.6663C20.6903 36.6663 21.25 36.1067 21.25 35.4163C21.25 34.726 20.6903 34.1663 20 34.1663Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

    ),
    description:
      "We are also excited to announce the development of a fully operational version of our tool. This enhanced version will include wiring diagrams and support for uploading audio and images during the diagnostic process, among other innovative features.",
  },
  {
    icon: (

      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.6907 3.33301C10.3943 3.33301 7.24607 3.33301 5.29002 5.28562C3.33398 7.23826 3.33398 10.3809 3.33398 16.6663C3.33398 22.9517 3.33398 26.0945 5.29002 28.047C7.24607 29.9997 10.3943 29.9997 16.6907 29.9997H23.369C29.6655 29.9997 32.8137 29.9997 34.7697 28.047C36.119 26.7002 36.5375 24.7868 36.6673 21.6663" stroke="white" stroke-width="2.5" stroke-linecap="round" />
        <path d="M20 30V36.6667V30Z" fill="white" />
        <path d="M20 30V36.6667" stroke="white" stroke-width="2.5" />
        <path d="M13.334 36.667H26.6673H13.334Z" fill="white" />
        <path d="M13.334 36.667H26.6673" stroke="white" stroke-width="2.5" stroke-linecap="round" />
        <path d="M18.334 25H21.6673H18.334Z" fill="white" />
        <path d="M18.334 25H21.6673" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M30.0007 6.66699H26.6673C25.096 6.66699 24.3103 6.66699 23.8222 7.15514C23.334 7.64331 23.334 8.42898 23.334 10.0003V13.3337C23.334 14.905 23.334 15.6907 23.8222 16.1788C24.3103 16.667 25.096 16.667 26.6673 16.667H30.0007C31.572 16.667 32.3577 16.667 32.8458 16.1788C33.334 15.6907 33.334 14.905 33.334 13.3337V10.0003C33.334 8.42898 33.334 7.64331 32.8458 7.15514C32.3577 6.66699 31.572 6.66699 30.0007 6.66699Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M25.8333 16.6663V19.9997V16.6663ZM30.8333 16.6663V19.9997V16.6663ZM25.8333 3.33301V6.66634V3.33301ZM30.8333 3.33301V6.66634V3.33301ZM23.3333 9.16634H20H23.3333ZM23.3333 14.1663H20H23.3333ZM36.6667 9.16634H33.3333H36.6667ZM36.6667 14.1663H33.3333H36.6667Z" fill="white" />
        <path d="M25.8333 16.6663V19.9997M30.8333 16.6663V19.9997M25.8333 3.33301V6.66634M30.8333 3.33301V6.66634M23.3333 9.16634H20M23.3333 14.1663H20M36.6667 9.16634H33.3333M36.6667 14.1663H33.3333" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

    ),
    description:
      "Our goal is to provide you with a more interactive and detailed diagnostic experience. Please share your feedback with us by clicking 'Contact Us' at the bottom.",
  },
];

export default KeyFeatures;
