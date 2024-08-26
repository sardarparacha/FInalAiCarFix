"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from 'axios';
import homeIcon from "../../public/Chat/home.png";
import { backend_url, openai_key } from "../data";
import ReactMarkdown from 'react-markdown';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(true);
  const [popupMessage, setPopupMessage] = useState("Connecting...");
  const [popupError, setPopupError] = useState(false);
  const inputRef = useRef(null);
  const messageContainerRef = useRef(null);
  const assistantId = useRef("asst_nx6RSQ42gbsef4rsLdchuh5r");
  const [threadId, setThreadId] = useState(null);
  const [showThread, setShowThread] = useState('');

  useEffect(() => {
    createNewThread();
    sendGreetingMessage();
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const createNewThread = async () => {
    try {
      const response = await axios.get(`${openai_key}/new-thread`);
      const newThreadId = response.data['threadId v1'];
      localStorage.setItem('landingpagethreadid', newThreadId);
      setThreadId(newThreadId);
      setShowThread(newThreadId);
      setPopupVisible(false);
    } catch (error) {
      setPopupMessage("Error occurred. Please refresh and try again.");
      setPopupError(true);
    }
  };

  const sendGreetingMessage = () => {
    const greetingMessage = {
      content: "Hi! We are happy to help you get to the bottom of your car issues. How can we help today?",
      sender: "bot",
      timestamp: new Date().toLocaleString(),
      role: "bot"
    };
    setMessages([greetingMessage]);
    saveChatToDb([greetingMessage]);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const newMessage = {
        content: inputValue,
        sender: "user",
        timestamp: new Date().toLocaleString(),
        role: "user"
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputValue("");
      setLoading(true);

      try {
        const response = await axios.post(`${openai_key}/assistant-chat`, {
          question: inputValue,
          assistantId: assistantId.current,
          threadId: threadId
        });

        const botReply = {
          content: response.data.response,
          sender: "bot",
          timestamp: new Date().toLocaleString(),
          role: "system"
        };
        setMessages(prevMessages => [...prevMessages, botReply]);

        await saveChatToDb([...messages, newMessage, botReply]);
      } catch (error) {
        console.error('Error communicating with the AI:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const saveChatToDb = async (updatedMessages) => {
    try {
      await axios.post(`${backend_url}/api/lpchat/save`, {
        threadId: threadId,
        messages: updatedMessages
      });
    } catch (error) {
      console.error('Error saving chat to DB:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleRefresh = () => {
    setPopupVisible(true);
    setPopupMessage("Connecting...");
    setPopupError(false);
    createNewThread();
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
     {popupVisible && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <div className="flex items-center justify-center mb-4">
        {!popupError ? (
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg className="h-10 w-10 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>
      <p className="mb-4">{popupMessage}</p>
      {popupError && (
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      )}
    </div>
  </div>
)}

      <div className="w-full md:w-4/4 h-[100vh] p-8 bg-white rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center justify-around">
            <div className="flex  md:flex">
              <Image
                src={homeIcon}
                alt="Home Icon"
                onClick={() => window.location.href = 'https://www.carclinicfix.com'}
                width={24}
                height={24}
                className="mr-2 cursor-pointer"
              />
              <h3 className="text-xl font-semibold text-[#011E33]">Chat</h3>
            </div>
            <div className="flex items-center justify-between">
              {showThread?.length > 0 && (
                <span className="text-sm text-gray-500 ml-2">
                  <div className="flex justify-around align-center h-5 justify-between bg-gray-500 float-right text-white text-xs font-bold py-1 px-2 rounded-full">
                    <div className="mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
                        <g fill="currentColor">
                          <path d="M232 98.36c-1.27 38.56-33.33 69.64-71.91 69.64a71.7 71.7 0 0 1-26.92-5.17L120 176H96v24H72v24H40a8 8 0 0 1-8-8v-28.69a8 8 0 0 1 2.34-5.65l58.83-58.83A71.7 71.7 0 0 1 88 95.91c0-38.58 31.08-70.64 69.64-71.87A72 72 0 0 1 232 98.36" opacity="0.2" />
                          <path d="M216.57 39.43a80 80 0 0 0-132.66 81.35L28.69 176A15.86 15.86 0 0 0 24 187.31V216a16 16 0 0 0 16 16h32a8 8 0 0 0 8-8v-16h16a8 8 0 0 0 8-8v-16h16a8 8 0 0 0 5.66-2.34l9.56-9.57A79.7 79.7 0 0 0 160 176h.1a80 80 0 0 0 56.47-136.57M224 98.1c-1.09 34.09-29.75 61.86-63.89 61.9H160a63.7 63.7 0 0 1-23.65-4.51a8 8 0 0 0-8.84 1.68L116.69 168H96a8 8 0 0 0-8 8v16H72a8 8 0 0 0-8 8v16H40v-28.69l58.83-58.82a8 8 0 0 0 1.68-8.84A63.7 63.7 0 0 1 96 95.92c0-34.14 27.81-62.8 61.9-63.89A64 64 0 0 1 224 98.1M192 76a12 12 0 1 1-12-12a12 12 0 0 1 12 12" />
                        </g>
                      </svg>
                    </div>
                    <p className="mr-2">{showThread}</p>
                  </div>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 mb-6 bg-gray-100 p-4 rounded-lg shadow-inner overflow-y-auto h-[80vh]" ref={messageContainerRef}>
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs p-3 rounded-lg ${message.sender === "user" ? "bg-[#011E33] text-white" : "bg-gray-200 text-black"}`}>
                <ReactMarkdown>{message.content}</ReactMarkdown>
                <small className="block text-gray-500 mt-2">{message.timestamp}</small>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center bg-[#011E33] p-3 rounded-lg shadow relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message..."
            className="w-full bg-transparent text-white border-none outline-none px-3"
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            className="text-white text-lg hover:text-gray-300 ml-3"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <span>&#9658;</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
