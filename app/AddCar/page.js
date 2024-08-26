"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Components/Navbar";
import { backend_url, openai_key , API_URL } from "../data";
import { useSelector } from "react-redux";
import ProPlanLock from "../Components/ProPlanLock";


const CarForm = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [cars, setCars] = useState([]);
  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [trims, setTrims] = useState([]);

  const [formData, setFormData] = useState({
    carMake: "",
    carModel: "",
    carTrim: "",
    carYear: "",
    carMileage: "",
    vin: "",
    previousThreadId: "",
  });

  const fetchPaymentDetails = async (userId) => {
    try {
      const response = await axios.get(`${backend_url}/api/payments/${userId}`);
      setPaymentDetails(response.data);
    } catch (error) {
      console.error(`Error fetching payment details: ${error.response?.status} - ${error.message}`);
    }
  };

  const fetchCars = async () => {
    try {
      const data = await axios.get(`${backend_url}/api/cars/${userInfo._id}`);
      setCars(data.data);
    } catch (error) {
      toast.error("Failed to load cars.");
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchPaymentDetails(userInfo._id);
      fetchCars();
      fetchYears();
    }
  }, [userInfo]);

  const fetchYears = async () => {
  console.log('fetching years');
    try {
      const response = await fetch(`${API_URL}/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: 'vehicle-media/year', params: {} })
      });
      console.log('response', response);
      const data = await response.json();
      console.log('data', data.data);
      setYears(data.data);
    } catch (error) {
      console.error('Error fetching years:', error);
    }
  };

  const fetchMakes = async (year) => {
    try {
      const response = await fetch(`${API_URL}/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: 'vehicle-media/make', params: { year } })
      });
      const data = await response.json();
      setMakes(data.data);
    } catch (error) {
      console.error('Error fetching makes:', error);
    }
  };

  const fetchModels = async (year, make) => {
    try {
      const response = await fetch(`${API_URL}/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: 'vehicle-media/model', params: { year, make } })
      });
      const data = await response.json();
      setModels(data.data);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const fetchTrims = async (year, make, model) => {
    try {
      const response = await fetch(`${API_URL}/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: 'vehicle-media/trim', params: { year, make, model } })
      });
      const data = await response.json();
      setTrims(data.data);
    } catch (error) {
      console.error('Error fetching trims:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'carYear') {
      setFormData((prevState) => ({
        ...prevState,
        carMake: '',
        carModel: '',
        carTrim: ''
      }));
      setMakes([]);
      setModels([]);
      setTrims([]);
      fetchMakes(value);
    } else if (name === 'carMake') {
      setFormData((prevState) => ({
        ...prevState,
        carModel: '',
        carTrim: ''
      }));
      setModels([]);
      setTrims([]);
      fetchModels(formData.carYear, value);
    } else if (name === 'carModel') {
      setFormData((prevState) => ({
        ...prevState,
        carTrim: ''
      }));
      setTrims([]);
      fetchTrims(formData.carYear, formData.carMake, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      toast.error("You need to be logged in to add a car.");
      return;
    }

    try {
      const newThreadId = await createNewThread();

      const carData = {
        carMake: formData.carMake,
        carModel: formData.carModel,
        carTrim: formData.carTrim,
        carYear: formData.carYear,
        carMileage: formData.carMileage,
        vin: formData.vin,
        threadId: newThreadId,
        userId: userInfo._id,
      };

      // Create JSON file from car data
      const carDataJson = JSON.stringify(carData);
      const blob = new Blob([carDataJson], { type: 'application/json' });
      const file = new File([blob], 'file.json', { type: 'application/json' });

      const assistantData = await uploadFileToAssistant(file, newThreadId);
      carData.assistantId = assistantData.assistantId;
      carData.threadId = newThreadId;

      await axios.post(`${backend_url}/api/cars`, carData);
      toast.success("Car details added successfully!");

      await saveChat(userInfo._id, assistantData.assistantId, newThreadId, "system", "Assistant created successfully with car details");

      // Redirect to dashboard page
      window.location.href = "/SelectCar";
    } catch (err) {
      toast.error("Failed to add car details");
    }
  };

  return (
    <>
    
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    
        <form onSubmit={handleSubmit} className="w-full p-8 rounded-lg shadow-sm space-y-6">
          <button
            onClick={() => window.history.back()}
            className="self-start mb-4 ml-4 p-2 px-4 bg-[#011E33] rounded-md hover:bg-gray-300"
          >
            <p className="text-white">←</p>
          </button>
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">ADD NEW CAR</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Car Year</label>
              <select name="carYear" value={formData.carYear} onChange={handleChange} className="w-full border text-black border-gray-300 p-2 rounded">
                <option value="">Select Year</option>
                {years && years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Car Make</label>
              <select name="carMake" value={formData.carMake} onChange={handleChange} className="w-full border text-black border-gray-300 p-2 rounded" disabled={!formData.carYear}>
                <option value="">Select Make</option>
                {makes && makes?.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Car Model</label>
              <select name="carModel" value={formData.carModel} onChange={handleChange} className="w-full border text-black border-gray-300 p-2 rounded" disabled={!formData.carMake}>
                <option value="">Select Model</option>
                {models && models?.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Model Trim</label>
              <select name="carTrim" value={formData.carTrim} onChange={handleChange} className="w-full border text-black border-gray-300 p-2 rounded" disabled={!formData.carModel}>
                <option value="">Select Trim</option>
                {trims && trims?.map(trim => (
                  <option key={trim} value={trim}>{trim}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Mileage</label>
              <input type="text" name="carMileage" value={formData.carMileage} onChange={handleChange} className="w-full border text-black border-gray-300 p-2 rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Vin (optional)</label>
              <input type="text" name="vin" value={formData.vin} onChange={handleChange} className="w-full border text-black border-gray-300 p-2 rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Previous thread-id (optional)</label>
              <input type="text" name="previousThreadId" value={formData.previousThreadId} onChange={handleChange} className="w-full border text-black border-gray-300 p-2 rounded" />
            </div>
          </div>

          {paymentDetails && paymentDetails?.remainingDays > 0 ? (
            <button type="submit" className="w-1/3 bg-[#011E33] text-white py-2 text-center rounded mt-4">
              Add Car
            </button>
          ) : (
            cars.length < 1 ? (
              <button type="submit" className="w-1/3 bg-[#011E33] text-white py-2 text-center rounded mt-4">
                Add Car
              </button>
            ) : (
              <ProPlanLock isLocked={true}>
                <button type="submit" style={{height:"63px"}} className="w-1/3 bg-[#011E33] text-white py-2 text-center rounded mt-4">
                  Add Car
                </button>
              </ProPlanLock>
            )
          )}
        </form>
      </div>
    </>
  );
};

export default CarForm;

async function uploadFileToAssistant(file, assistantId) {
  const apiUrl = `${openai_key}/create-assistant-with-upload`;
  const formData = new FormData();
  formData.append("files", file, "file.json");

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to upload: ${error.response ? error.response.statusText : error.message}`);
  }
}

async function saveChat(userId, assistantId, threadId, sender, message) {
  try {
    await axios.post(`${backend_url}/api/chat/save`, {
      userId,
      assistantId: assistantId || "",
      threadId: threadId || "",
      sender: sender || "",
      message: message || "",
    });
    console.log(`Chat saved successfully for userId: ${userId}, assistantId: ${assistantId}, threadId: ${threadId}`);
  } catch (error) {
    console.error('Error saving chat:', error);
  }
}

async function createNewThread() {
  try {
    const response = await axios.get(`${openai_key}/new-thread`);
    return response.data['threadId v1'];
  } catch (error) {
    console.error('Error creating new thread:', error);
    return null;
  }
}
