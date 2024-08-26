"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { backend_url, openai_key } from "../data";
import TabBar from "./TabBar";
import DynamicComponent from "./DynamicComponent";
import OEMData from "./OEMData";
import VehicleHistory from "./VehicleHistory";
import WiringDiagram from "./WiringDiagram";
import FixesBulletins from "./FixesBulletins";
import ProblemArea from "./ProblemArea";
import ServiceSchedules from "./ServiceSchedules";

const MaintenanceRecords = () => {
  const [activeTab, setActiveTab] = useState("Maintenance Records");
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    number: "",
    car: "",
    make: "",
    year: "",
    lastOilChanged: "",
    expiringIn: "",
    subscriptionType: ""
  });
  const { userInfo } = useSelector(state => state.auth);
  const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));

  useEffect(() => {
    fetchMaintenanceData();
  }, []);

  const fetchMaintenanceData = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/maintenance-records`, {
        params: { carId: selectedCar._id }
      });
      setMaintenanceData(response.data);
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDelete = async (id, fileName) => {
    try {
      await axios.delete(`${backend_url}/api/maintenance-records/${id}`);
      await deleteFileFromAssistant(fileName);
      fetchMaintenanceData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleAddNewRecord = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({ ...newRecord, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backend_url}/api/maintenance-records`, {
        ...newRecord,
        carId: selectedCar._id
      });
      const recordId = response.data._id;
      const fileName = `record_Maintenance_Records_${maintenanceData.length + 1}.json`;
      await uploadFileToAssistant(fileName, response.data);
      fetchMaintenanceData(); // Refresh data after addition
      handleCloseModal();
    } catch (error) {
      console.error("Error adding new record:", error);
    }
  };

  const uploadFileToAssistant = async (fileName, data) => {
    const fileData = JSON.stringify(data);
    const blob = new Blob([fileData], { type: 'application/json' });
    const file = new File([blob], fileName, { type: 'application/json' });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("assistantId", selectedCar.assistantId);

    try {
      await axios.post(`${openai_key}/upload-file-to-assistant`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const deleteFileFromAssistant = async (fileName) => {
    try {
      await axios.post(`${openai_key}/delete-file-from-assistant`, {
        assistantId: selectedCar.assistantId,
        fileName
      });
    } catch (error) {
      console.error("Error deleting file from assistant:", error);
    }
  };

  const tabs = [
    "Maintenance Records"
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4 mt-6 md:p-8">
      <TabBar tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />

      {activeTab === "Maintenance Records" && (
        <div className="w-full p-4 md:p-8 shadow-sm space-y-6 max-w-screen-lg">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Maintenance Records</h2>
          <div className="flex justify-end space-x-2 mb-4">
            {/* <button
                type="button"
                className="bg-white text-blue-900 py-2 px-2 md:py-2 md:px-4 border border-blue-900 rounded shadow hover:bg-gray-100"
                onClick={handleAddNewRecord}
              >
                Upload Records
              </button> */}
            {/* <button
                type="button"
                className="bg-white text-blue-900 py-2 px-2 md:py-2 md:px-4 border border-blue-900 rounded shadow hover:bg-gray-100"
              >
                Download Template
              </button> */}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-blue-100 text-blue-900">
                <tr>
                  <th className="px-2 py-2 md:px-4 md:py-2">Number</th>
                  <th className="px-2 py-2 md:px-4 md:py-2">Car</th>
                  <th className="px-2 py-2 md:px-4 md:py-2">Make</th>
                  <th className="px-2 py-2 md:px-4 md:py-2">Year</th>
                  <th className="px-2 py-2 md:px-4 md:py-2">Last Oil Changed</th>
                  <th className="px-2 py-2 md:px-4 md:py-2">Expiring In</th>
                  <th className="px-2 py-2 md:px-4 md:py-2">Subscription Type</th>
                  <th className="px-2 py-2 md:px-4 md:py-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {maintenanceData.map((record, index) => (
                  <tr key={index} className="border-b last:border-b-0 hover:bg-gray-100">
                    <td className="px-2 py-2 md:px-4 md:py-2">{record.number}</td>
                    <td className="px-2 py-2 md:px-4 md:py-2">{record.car}</td>
                    <td className="px-2 py-2 md:px-4 md:py-2">{record.make}</td>
                    <td className="px-2 py-2 md:px-4 md:py-2">{record.year}</td>
                    <td className="px-2 py-2 md:px-4 md:py-2">{record.lastOilChanged}</td>
                    <td className="px-2 py-2 md:px-4 md:py-2">{record.expiringIn}</td>
                    <td className="px-2 py-2 md:px-4 md:py-2 whitespace-pre-line">{record.subscriptionType}</td>
                    <td className="px-2 py-2 md:px-4 md:py-2">
                      <button
                        onClick={() => handleDelete(record._id, `record_Maintenance_Records_${index + 1}.json`)}
                        className="text-red-500 hover:text-red-700">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white border border-blue-900 rounded-full shadow-lg mx-auto hover:bg-gray-100"
            onClick={handleAddNewRecord}
          >
            <span className="text-xl md:text-2xl text-blue-900">+</span>
          </button>
        </div>
      )}

      {activeTab === "User Manual" && (
        <div className="w-full p-4 md:p-8 bg-gray-50 shadow-sm space-y-6 max-w-screen-lg">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">User Manual</h2>
          <p className="text-black">
            Please Click Request to gain access to the car manuals for this car, this is included in your membership and will be added for no additional cost
          </p>
          <DynamicComponent serviceName="User Manual" />
        </div>
      )}
      {activeTab === "OEM Data" && (
        <div className="w-full p-4 md:p-8 bg-gray-50 shadow-sm space-y-6 max-w-screen-lg">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">OEM Data</h2>
          <OEMData />
        </div>
      )}

      {activeTab === "Technical Service Bulletin" && (
        <div className="w-full p-4 md:p-8 bg-gray-50 shadow-sm space-y-6 max-w-screen-lg">
          <FixesBulletins serviceName="Technical Service Bulletin" />
        </div>
      )}

        {activeTab === "Problem Area" && (
          <div className="w-full p-4 md:p-8 bg-gray-50 shadow-sm space-y-6 max-w-screen-lg">
            <ProblemArea serviceName="Problem Area" />
          </div>
        )}

        {activeTab === "Service Schedules" && (
              <div className="w-full p-4 md:p-8 bg-gray-50 shadow-sm space-y-6 max-w-screen-lg">
                <ServiceSchedules serviceName="Service Schedules" />
              </div>
            )}



      {activeTab === "Wiring Diagram" && (
        <div className="w-full p-4 md:p-8 bg-gray-50 shadow-sm space-y-6 max-w-screen-lg">

          <WiringDiagram serviceName="Wiring Diagram" />
        </div>
      )}

      {activeTab === "Vehicle History" && (
        <div className="w-full p-4 md:p-8 bg-gray-50 shadow-sm space-y-6 max-w-screen-lg">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Vehicle History</h2>
          <VehicleHistory />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Add Maintenance Record"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Add Maintenance Record</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Number</label>
            <input
              type="text"
              name="number"
              value={newRecord.number}
              onChange={handleInputChange}
              className="w-full border text-black border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Car</label>
            <input
              type="text"
              name="car"
              value={newRecord.car}
              onChange={handleInputChange}
              className="w-full border text-black border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Make</label>
            <input
              type="text"
              name="make"
              value={newRecord.make}
              onChange={handleInputChange}
              className="w-full border text-black border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Year</label>
            <input
              type="number"
              name="year"
              value={newRecord.year}
              onChange={handleInputChange}
              className="w-full border text-black border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Oil Changed</label>
            <input
              type="date"
              name="lastOilChanged"
              value={newRecord.lastOilChanged}
              onChange={handleInputChange}
              className="w-full border text-black border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Expiring In</label>
            <input
              type="text"
              name="expiringIn"
              value={newRecord.expiringIn}
              onChange={handleInputChange}
              className="w-full border text-black border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Subscription Type</label>
            <input
              type="text"
              name="subscriptionType"
              value={newRecord.subscriptionType}
              onChange={handleInputChange}
              className="w-full border text-black border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded"
          >
            Add Record
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default MaintenanceRecords;
