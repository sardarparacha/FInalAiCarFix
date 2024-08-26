import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Manufacturers } from "../data";

const WiringDiagram = ({ serviceName }) => {
  const { userInfo } = useSelector(state => state.auth);
  const [isRequested, setIsRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);
  const [variants, setVariants] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [diagrams, setDiagrams] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingDiagrams, setLoadingDiagrams] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = '3a2ttc8382p8apzj6bqcad33';
  const countryCode = 'gb';

  useEffect(() => {
    const featureRequested = localStorage.getItem(`featureRequested_${serviceName}`);
    if (featureRequested) {
      setIsRequested(true);
    }

    const fetchManufacturers = async () => {
      try {
        setManufacturers(Manufacturers.data);
    } catch (error) {
        console.error("Error fetching manufacturers:", error);
    }
    };

    fetchManufacturers();

    const savedManufacturer = localStorage.getItem('selectedManufacturer');
    const savedModel = localStorage.getItem('selectedModel');
    const savedVariant = localStorage.getItem('selectedVariant');
    const savedDiagrams = JSON.parse(localStorage.getItem('diagrams'));

    if (savedManufacturer) setSelectedManufacturer(savedManufacturer);
    if (savedModel) setSelectedModel(savedModel);
    if (savedVariant) setSelectedVariant(savedVariant);
    if (savedDiagrams) setDiagrams(savedDiagrams);

  }, [serviceName]);

  const handleRequestFeature = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${backend_url}/api/users/getFeature`, {
        email: userInfo.email,
        service: serviceName,
      });

      setIsRequested(true);
      toast.success("Your request has been submitted. We will contact you shortly.");
      localStorage.setItem(`featureRequested_${serviceName}`, "true");
    } catch (error) {
      console.error("Error requesting feature:", error);
      toast.error("Failed to submit your request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleManufacturerChange = async (e) => {
    const manufacturerId = e.target.value;
    setSelectedManufacturer(manufacturerId);
    setModels([]);
    setVariants([]);
    setDiagrams([]);
    localStorage.removeItem('diagrams');

    try {
      const response = await axios.get(`https://api.autodata-group.com/docs/v1/manufacturers/${manufacturerId}?country-code=${countryCode}&api_key=${apiKey}`);
      setModels(response.data.data.models);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const handleModelChange = async (e) => {
    const modelId = e.target.value;
    setSelectedModel(modelId);
    setVariants([]);
    setDiagrams([]);
    localStorage.removeItem('diagrams');

    try {
      const response = await axios.get(`https://api.autodata-group.com/docs/v1/vehicles?manufacturer_id=${selectedManufacturer}&model_id=${modelId}&country-code=${countryCode}&page=1&limit=20&api_key=${apiKey}`);
      setVariants(response.data.data);
    } catch (error) {
      console.error("Error fetching variants:", error);
    }
  };

  const handleVariantChange = async (e) => {
    const variantId = e.target.value;
    setSelectedVariant(variantId);
    setDiagrams([]);
    localStorage.removeItem('diagrams');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingDiagrams(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.autodata-group.com/docs/v1/vehicles/${selectedVariant}?links=yes&country-code=${countryCode}&api_key=${apiKey}`);
      const mid = response.data.data.mid;

      const wiringResponse = await axios.get(`https://api.autodata-group.com/docs/v1/vehicles/${mid}/wiring-diagrams?country-code=${countryCode}&api_key=${apiKey}`);

      if (wiringResponse.status === 400) {
        setError("No wiring diagrams available for this vehicle.");
      } else {
        const diagramsData = [];

        for (const diagram of wiringResponse.data.data) {
          for (const group of diagram.variant_groups) {
            for (const variant of group.variants) {
              const diagramUrl = `https://api.autodata-group.com/docs${variant.href}&api_key=${apiKey}`;
              const diagramResponse = await axios.get(diagramUrl);
              diagramsData.push({ title: diagramResponse.data.data.title, url: diagramResponse.data.data.url });
            }
          }
          for (const variant of diagram.general_variants) {
            const diagramUrl = `https://api.autodata-group.com/docs${variant.href}&api_key=${apiKey}`;
            const diagramResponse = await axios.get(diagramUrl);
            diagramsData.push({ title: diagramResponse.data.data.title, url: diagramResponse.data.data.url });
          }
        }

        setDiagrams(diagramsData);
        localStorage.setItem('diagrams', JSON.stringify(diagramsData));
        localStorage.setItem('selectedManufacturer', selectedManufacturer);
        localStorage.setItem('selectedModel', selectedModel);
        localStorage.setItem('selectedVariant', selectedVariant);
      }
    } catch (error) {
      setError("No Data Found.");
            console.error("Error fetching wiring diagrams:", error);
    } finally {
      setLoadingDiagrams(false);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full p-4 md:p-8 bg-gray-50 shadow-sm space-y-6 max-w-screen-lg flex flex-col items-center justify-center">
      <form id="wiringForm" className="space-y-4 w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="manufacturer" className="block text-gray-700">Manufacturer:</label>
            <select
              id="manufacturer"
              name="manufacturer"
              onChange={handleManufacturerChange}
              value={selectedManufacturer}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring focus:ring-blue-500 p-2 focus:ring-opacity-50
              text-black
              "
            >
              <option value="">Select Manufacturer</option>
              {manufacturers.map(manufacturer => (
                <option key={manufacturer.manufacturer_id} value={manufacturer.manufacturer_id}>
                  {manufacturer.manufacturer}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="model" className="block text-gray-700">Model:</label>
            <select
              id="model"
              name="model"
              onChange={handleModelChange}
              value={selectedModel}
              disabled={!selectedManufacturer}
              className="mt-1  text-black block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">Select Model</option>
              {models.map(model => (
                <option key={model.model_id} value={model.model_id}>
                  {model.model}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="variant" className="block text-gray-700">Variant:</label>
            <select
              id="variant"
              name="variant"
              onChange={handleVariantChange}
              value={selectedVariant}
              disabled={!selectedModel}
              className="mt-1  text-black block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">Select Variant</option>
              {variants.map(variant => (
                <option key={variant.mid} value={variant.mid}>
                  {variant.model} {variant.extra_info}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-900 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
        >
          {loadingDiagrams ? "Loading..." : "Get Wiring Diagram"}
        </button>
      </form>

      <h2 className="text-xl font-semibold text-blue-900 mt-6">Wiring Diagrams</h2>
      <div id="wiringDiagram" className="w-full overflow-x-auto mt-4">
        <div className="flex space-x-4">
          {diagrams.length > 0 ? (
            diagrams.map((diagram, index) => (
              <div key={index} className="flex-shrink-0 shadow-lg m-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2"
                title={diagram.title}
                style={{maxWidth:"140px"}}
                >{(diagram.title).slice(0,15)}...</h3>
                <img
                  src={diagram.url}
                  alt={`Wiring Diagram ${index + 1}`}
                  className="w-64 h-64 object-cover cursor-pointer border border-gray-300 rounded"
                  onClick={() => handleImageClick(diagram.url)}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-700">No wiring diagrams available.</p>
          )}
        </div>
      </div>

      {selectedImage && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div className="relative w-full h-full">
            <Zoom>
              <img
                src={selectedImage}
                alt="Selected Wiring Diagram"
                className="w-full h-full object-contain"
              />
            </Zoom>
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 m-4 text-white bg-red-500 rounded-full p-2"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {error && (
        <div className="w-full p-4 md:p-8 bg-gray-50 shadow-sm space-y-6 max-w-screen-lg flex flex-col items-center justify-center">
          <p className="text-red-500">{error}</p>
          {!isRequested ? (
            <button
              className="bg-blue-900 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
              onClick={handleRequestFeature}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Request This Feature"}
            </button>
          ) : (
            <p className="text-gray-700">Your request has been submitted. We will contact you shortly.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WiringDiagram;
