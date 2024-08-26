import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { Manufacturers } from "../data";

const ProblemArea = ({ serviceName }) => {
    const { userInfo } = useSelector(state => state.auth);
    const [isRequested, setIsRequested] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [manufacturers, setManufacturers] = useState([]);
    const [models, setModels] = useState([]);
    const [variants, setVariants] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedVariant, setSelectedVariant] = useState("");
    const [problemAreas, setProblemAreas] = useState([]);
    const [selectedProblemArea, setSelectedProblemArea] = useState(null);
    const [loadingProblemAreas, setLoadingProblemAreas] = useState(false);
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
        const savedProblemAreas = JSON.parse(localStorage.getItem('problemAreas'));

        if (savedManufacturer) setSelectedManufacturer(savedManufacturer);
        if (savedModel) setSelectedModel(savedModel);
        if (savedVariant) setSelectedVariant(savedVariant);
        if (savedProblemAreas) setProblemAreas(savedProblemAreas);

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
        setProblemAreas([]);
        localStorage.removeItem('problemAreas');

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
        setProblemAreas([]);
        localStorage.removeItem('problemAreas');

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
        setProblemAreas([]);
        localStorage.removeItem('problemAreas');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingProblemAreas(true);
        setError(null);

        try {
            const response = await axios.get(`https://api.autodata-group.com/docs/v1/vehicles/${selectedVariant}?links=yes&country-code=${countryCode}&api_key=${apiKey}`);
            const mid = response.data.data.mid;

            const problemAreasResponse = await axios.get(`https://api.autodata-group.com/docs/v1/vehicles/${mid}/known-problem-areas?country-code=${countryCode}&api_key=${apiKey}`);

            if (problemAreasResponse.status === 400) {
                setError("No known problem areas available for this vehicle.");
            } else {
                const problemAreasData = problemAreasResponse.data.data;
                setProblemAreas(problemAreasData);
                localStorage.setItem('problemAreas', JSON.stringify(problemAreasData));
                localStorage.setItem('selectedManufacturer', selectedManufacturer);
                localStorage.setItem('selectedModel', selectedModel);
                localStorage.setItem('selectedVariant', selectedVariant);
            }
        } catch (error) {
            setError("No Data Found.");
            console.error("Error fetching known problem areas:", error);
        } finally {
            setLoadingProblemAreas(false);
        }
    };

    const handleProblemAreaClick = async (problemArea) => {
        try {
            const response = await axios.get(`https://api.autodata-group.com/docs${problemArea.href}&api_key=${apiKey}`);
            setSelectedProblemArea(response.data.data);
        } catch (error) {
            console.error("Error fetching problem area details:", error);
            toast.error("Failed to fetch problem area details. Please try again later.");
        }
    };

    const closeModal = () => {
        setSelectedProblemArea(null);
    };

    return (
        <div className="w-full p-4 md:p-8 bg-gray-50 shadow-sm space-y-6 max-w-screen-lg flex flex-col items-center justify-center">
            <form id="problemAreasForm" className="space-y-4 w-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="manufacturer" className="block text-gray-700">Manufacturer:</label>
                        <select
                            id="manufacturer"
                            name="manufacturer"
                            onChange={handleManufacturerChange}
                            value={selectedManufacturer}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                            focus:border-blue-500 focus:ring focus:ring-blue-500 p-2 focus:ring-opacity-50 text-black"
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
                            className="mt-1 text-black block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
                            className="mt-1 text-black block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
                    {loadingProblemAreas ? "Loading..." : "Get Known Problem Areas"}
                </button>
            </form>

            <h2 className="text-xl font-semibold text-blue-900 mt-6">Known Problem Areas</h2>
            <div id="problemAreasList" className="w-full overflow-x-auto mt-4">
                <div className="flex flex-col space-y-4">
                    {problemAreas.length > 0 ? (
                        problemAreas.map((problemArea, index) => (
                            <div key={index} className="flex-shrink-0 shadow-sm m-4 p-4 border border-gray-300 rounded">
                                <h3 className="text-lg font-medium text-gray-900 mb-2"
                                    style={{ textTransform: "capitalize" }}
                                >{problemArea.known_problem_area_description}</h3>
                                <button
                                    onClick={() => handleProblemAreaClick(problemArea)}
                                    className="bg-blue-900 text-white py-1 px-2 mt-4 rounded shadow hover:bg-blue-700"
                                >
                                    View All Details
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-700">No known problem areas available.</p>
                    )}
                </div>
            </div>

            {selectedProblemArea && (
                <Modal
                    isOpen={true}
                    onRequestClose={closeModal}
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <div className="relative w-full h-full p-4 bg-white rounded overflow-auto">
                        <h2 className="text-xl font-semibold text-blue-900 mb-4"
                            style={{ textTransform: "capitalize" }}
                        >{selectedProblemArea.problem_area_description}</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 ">Problems</h3>
                                <ol className="list-disc ml-6">
                                    {selectedProblemArea.problems.map((problem, index) => (
                                        <li key={index} className="text-gray-700">{problem.value[0].value.value}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
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

export default ProblemArea;
