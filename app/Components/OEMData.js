import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../data";

const OEMData = () => {
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));
    if (!selectedCar || !selectedCar.vin) {
      setError("No car selected.");
      setLoading(false);
      return;
    }
  
    const fetchData = async () => {
      const { vin, carYear, carMake, carModel, carTrim } = selectedCar;
      const endpoint = `${API_URL}/get`;
      const headers = {
        'Content-Type': 'application/json'
      };
  
      const requestBody = {
        endpoint: 'advanced-vin-decode',
        params: { vin, carYear, carMake, carModel, carTrim }
      };
  
      try {
        const response = await axios.post(endpoint, requestBody, { headers });
  
        if (response.data.status === "success") {
          setVehicleData(response.data.data);
        } else {
          setError("No data found for the given VIN.");
        }
      } catch (error) {
        setError("Error fetching vehicle data.");
        console.error(`Error fetching vehicle data: ${error.response?.status} - ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full p-4 md:p-8 shadow-sm space-y-6 max-w-screen-lg flex flex-col items-center justify-center">
      {vehicleData ? (
        <div className="w-full p-4 bg-white rounded-lg">
          <h3 className="text-xl font-bold mb-2">{`${vehicleData.year} ${vehicleData.make} ${vehicleData.model} ${vehicleData.trim}`}</h3>
          <p className="mb-4">{vehicleData.summary}</p>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-200">Specification</th>
                <th className="border p-2 bg-gray-200">Details</th>
              </tr>
            </thead>
            <tbody>
              {vehicleData.engine && vehicleData.engine.length > 0 && (
                <>
                  <tr>
                    <td className="border p-2">Engine Type</td>
                    <td className="border p-2">{vehicleData.specifications.find(spec => spec.engine)?.engine?.type}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Engine Code</td>
                    <td className="border p-2">{vehicleData.specifications.find(spec => spec.engine)?.engine?.code}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Fuel Type</td>
                    <td className="border p-2">{vehicleData.specifications.find(spec => spec.fuel)?.fuel?.type}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Horsepower</td>
                    <td className="border p-2">{vehicleData.engine[0].horsepower[1].value} HP @ {vehicleData.engine[0].horsepower[0].value} rpm</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Torque</td>
                    <td className="border p-2">{vehicleData.engine[0].torque[1].value} lb-ft @ {vehicleData.engine[0].torque[0].value} rpm</td>
                  </tr>
                </>
              )}
              <tr>
                <td className="border p-2">Transmission Type</td>
                <td className="border p-2">{vehicleData.transmission?.type || 'N/A'}</td>
              </tr>
              <tr>
                <td className="border p-2">Number of Speeds</td>
                <td className="border p-2">{vehicleData.transmission?.number_of_speeds || 'N/A'}</td>
              </tr>
              {vehicleData.fuel && vehicleData.fuel.length > 0 && vehicleData.fuel[0].tank_capacity && vehicleData.fuel[0].tank_capacity.length > 0 && (
                <tr>
                  <td className="border p-2">Fuel Tank Capacity</td>
                  <td className="border p-2">{vehicleData.fuel[0].tank_capacity[0].value} {vehicleData.fuel[0].tank_capacity[0].unit}</td>
                </tr>
              )}
              <tr>
                <td className="border p-2">EPA City Economy</td>
                <td className="border p-2">{vehicleData.specifications.find(spec => spec.mpg)?.mpg?.epa_city_economy || 'N/A'}</td>
              </tr>
              <tr>
                <td className="border p-2">EPA Highway Economy</td>
                <td className="border p-2">{vehicleData.specifications.find(spec => spec.mpg)?.mpg?.epa_hwy_economy || 'N/A'}</td>
              </tr>
              {vehicleData.dimensions && vehicleData.dimensions.length > 0 && vehicleData.dimensions[0].exterior && vehicleData.dimensions[0].exterior.length > 0 && (
                <tr>
                  <td className="border p-2">Overall Length</td>
                  <td className="border p-2">{vehicleData.dimensions[0].exterior.find(dim => dim.overall_length)?.overall_length[0]?.value} {vehicleData.dimensions[0].exterior.find(dim => dim.overall_length)?.overall_length[0]?.unit}</td>
                </tr>
              )}

              {vehicleData.dimensions && vehicleData.dimensions.length > 0 && vehicleData.dimensions[0].exterior && vehicleData.dimensions[0].exterior.length > 0 && (
                <tr>
                  <td className="border p-2">Overall Width</td>
                  <td className="border p-2">{vehicleData.dimensions[0].exterior.find(dim => dim.overall_width)?.overall_width[0]?.value} {vehicleData.dimensions[0].exterior.find(dim => dim.overall_width)?.overall_width[0]?.unit}</td>
                </tr>
              )}

              {vehicleData.weights && vehicleData.weights.length > 0 && (
                <tr>
                  <td className="border p-2">Curb Weight</td>
                  <td className="border p-2">{vehicleData.weights[0].curb_weight[0]?.value} {vehicleData.weights[0].curb_weight[0]?.unit}</td>
                </tr>
              )}

              {vehicleData.ground_clearance && vehicleData.ground_clearance.length > 0 && (
                <tr>
                  <td className="border p-2">Ground Clearance (Max)</td>
                  <td className="border p-2">{vehicleData.ground_clearance[0].ground_clearance_max[0]?.value} {vehicleData.ground_clearance[0].ground_clearance_max[0]?.unit}</td>
                </tr>
              )}

              {vehicleData.specifications && vehicleData.specifications.find(spec => spec.suspensions) && (
                <tr>
                  <td className="border p-2">Suspension Type (Front)</td>
                  <td className="border p-2">{vehicleData.specifications.find(spec => spec.suspensions)?.suspensions?.front_type}</td>
                </tr>
              )}

              {vehicleData.specifications && vehicleData.specifications.find(spec => spec.suspensions) && (
                <tr>
                  <td className="border p-2">Suspension Type (Rear)</td>
                  <td className="border p-2">{vehicleData.specifications.find(spec => spec.suspensions)?.suspensions?.rear_type}</td>
                </tr>
              )}

              {vehicleData.specifications && vehicleData.specifications.find(spec => spec.braking) && (
                <tr>
                  <td className="border p-2">Brake Type (Front)</td>
                  <td className="border p-2">{vehicleData.specifications.find(spec => spec.braking)?.braking?.front_disc}</td>
                </tr>
              )}

              {vehicleData.specifications && vehicleData.specifications.find(spec => spec.braking) && (
                <tr>
                  <td className="border p-2">Brake Type (Rear)</td>
                  <td className="border p-2">{vehicleData.specifications.find(spec => spec.braking)?.braking?.rear_disc}</td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      ) : (
        <div>No data found for the given VIN.</div>
      )}
    </div>
  );
};

export default OEMData;
