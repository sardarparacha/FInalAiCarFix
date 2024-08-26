import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../data";

const VehicleHistory = () => {
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));
    if (!selectedCar || !selectedCar.vin) {
      setError("No car selected or VIN not available.");
      setLoading(false);
      return;
    }
  
    const fetchData = async () => {
      const { vin } = selectedCar;
      const endpoint = `${API_URL}/get`;
      const headers = {
        'Content-Type': 'application/json'
      };
  
      const requestBody = {
        endpoint: 'saleshistory',
        params: { vin }
      };
  
      try {
        const response = await axios.post(endpoint, requestBody, { headers });
        if (response.data.status === "success") {
          setVehicleData(response.data.data);
        } else {
          setError("No data found for the given VIN.");
        }
      } catch (error) {
        setError("No data found for the given VIN");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full p-4 md:p-8 bg-gray-50  space-y-6 max-w-screen-lg flex flex-col items-center justify-center">
      {vehicleData ? (
        <div className="w-full p-4 bg-white  rounded-lg">
          <h3 className="text-xl font-bold mb-2">{`${vehicleData.year} ${vehicleData.make} ${vehicleData.model}`}</h3>
          <p>Trim: {vehicleData.trim}</p>
          <p>VIN: {vehicleData.vin}</p>
          <h4 className="text-lg font-semibold mt-4">Sales History:</h4>
          {vehicleData.sales_history.map((sale, index) => (
            <div key={index} className="mb-4 p-4 border-t border-gray-300">
              <h5 className="font-bold text-md">Sale Date: {sale.data.sale_date}</h5>
              <p>Odometer: {sale.data.odometer_mi} miles</p>
              <p>Drivetrain: {sale.data.drivetrain}</p>
              <p>Transmission: {sale.data.transmission}</p>
              <p>Fuel: {sale.data.fuel}</p>
              <p>Cylinders: {sale.data.cylinders}</p>
              <div className="mt-2">
                <h5 className="font-semibold">Images:</h5>
                <div className="flex space-x-2 overflow-x-auto">
                  {sale.data.images.map((image, idx) => (
                    <img key={idx} src={image} alt={`Car Image ${idx + 1}`} className="w-32 h-32 object-cover rounded" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No data found for the given VIN.</div>
      )}
    </div>
  );
};

export default VehicleHistory;
