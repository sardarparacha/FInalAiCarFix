"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backend_url } from '../data';

const Form = ({ formtitle }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${backend_url}/api/users/contact`, { name, phone, email, feedback });
      toast.success("Message sent successfully!");
      setName("");
      setPhone("");
      setEmail("");
      setFeedback("");
    } catch (err) {
      toast.error("Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px" }} className="bg-white rounded-lg shadow-lg p-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h2 className="text-2xl font-bold mb-6 text-[#011E33]">
        {formtitle}
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 text-black rounded-md text-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 text-black rounded-md text-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 text-black rounded-md text-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Feedback</label>
          <textarea
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 text-black rounded-md text-sm shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#011E33] text-white font-semibold rounded-lg shadow-md hover:bg-[#011233]"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Form;
