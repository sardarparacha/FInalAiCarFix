"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from 'axios';
import homeIcon from "../../public/Chat/home.png";
import { useSelector } from "react-redux";
import { backend_url, openai_key } from "../data";
import ReactMarkdown from 'react-markdown';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [file, setFile] = useState(null);
  const messageContainerRef = useRef(null);
  const [assistantId, setAssistantId] = useState('');
  const [threadId, setThreadId] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({});

  const { userInfo } = useSelector(state => state.auth);

  const fetchPaymentDetails = async (userId) => {
    try {
      const response = await axios.get(`${backend_url}/api/payments/${userId}`);
      setPaymentDetails(response.data);
    } catch (error) {
      console.error(`Error fetching payment details: ${error.response?.status} - ${error.message}`);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchPaymentDetails(userInfo._id);
    }
  }, [userInfo]);

  useEffect(() => {
    const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));
    if (selectedCar) {
      setAssistantId(selectedCar.assistantId);
      setThreadId(selectedCar.threadId);
      fetchPreviousMessages(selectedCar.threadId);
    } else {
      showInitialGreeting();
    }
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchPreviousMessages = async (threadId) => {
    try {
      const response = await axios.get(`${backend_url}/api/chat/${threadId}`);
      const chat = response.data;
      if (chat && chat.messages) {
        setMessages(chat.messages.map(message => {
          try {
            return {
              ...message,
              content: JSON.parse(<ReactMarkdown>{message.content}</ReactMarkdown>)
            };
          } catch (e) {
            return message; // If parsing fails, return the message as is
          }
        }));
      } else {
        showInitialGreeting();
      }
    } catch (error) {
      console.error('Error fetching previous messages:', error);
      showInitialGreeting();
    }
  };

  const showInitialGreeting = () => {
    setMessages([
      {
        content: "Hi! We are happy to help you get to the bottom of your car issues. How can we help today?",
        sender: "bot",
        timestamp: new Date().toLocaleString(),
        role: "bot"
      }
    ]);
  };

  const saveChat = async (messages) => {
    try {
      await axios.post(`${backend_url}/api/chat/save`, {
        userId: userInfo._id,
        assistantId: assistantId || "",
        threadId: threadId || "",
        messages: messages.map(msg => ({ ...msg, content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content) })) // Ensure content is a string
      });
    } catch (error) {
      console.error('Error saving chat:', error.response ? error.response.data : error.message);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) {
      return;
    }

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
      const payload = {
        threadId: threadId,
        assistantId: assistantId,
        question: inputValue
      };

      const chatResponse = await axios.post(`${openai_key}/assistant-chat`, payload, {
        headers: {
          "Content-Type": "application/json",
        }
      });


      // in contentadd ReactMarkdown
      const botReply = {
        content:  <ReactMarkdown>{chatResponse.data.answer}</ReactMarkdown>,
        sender: "bot",
        timestamp: new Date().toLocaleString(),
        role: "system"
      };

      setMessages(prevMessages => [...prevMessages, botReply]);
      saveChat([...messages, newMessage, botReply]);
    } catch (error) {
      console.error('Error communicating with the AI:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size should not exceed 10MB.');
      setFile(null);
      return;
    }

    const formData = new FormData();
    formData.append("userId", userInfo._id);
    formData.append("assistantId", assistantId);
    formData.append("threadId", threadId);
    formData.append("files", file);
    formData.append('file', file);

    setFileLoading(true);

    try {
      const upload_file_to_Assistant = await axios.post(`${openai_key}/upload-to-assistant`, formData);

      console.log('upload_file_to_Assistant', upload_file_to_Assistant.data);

      formData.delete('file');

      const uploadedFileUrl = URL.createObjectURL(file); // Using local URL for display
      const fileMessage = {
        content: `File uploaded: ${file.name}`,
        sender: "bot",
        timestamp: new Date().toLocaleString(),
        role: "system",
        fileUrl: uploadedFileUrl
      };

      setMessages(prevMessages => [...prevMessages, fileMessage]);
      saveChat([...messages, fileMessage]);

      setFile(null); // Clear the file after upload
    } catch (error) {
      console.error('Error uploading the file:', error);
    } finally {
      setFileLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !loading && !file) {
      handleSendMessage();
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile?.size > 10 * 1024 * 1024) {
      alert('File size should not exceed 10MB.');
      setFile(null);
    } else {
      setFile(selectedFile);
    }
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full md:w-4/4 h-[100vh] p-8 bg-white rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button onClick={handleBackClick} className="mr-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M2 12A10 10 0 0 1 12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12m16-1h-8l3.5-3.5l-1.42-1.42L6.16 12l5.92 5.92l1.42-1.42L10 13h8z" /></svg>
            </button>
            <Image src={homeIcon} alt="Home Icon" width={24} height={24}
            onClick={()=>{window.location.href = '/Dashboard';}}
            className="mr-2 cursor-pointer" />
            <h3 className="text-xl font-semibold text-[#011E33]">Chat</h3>
          </div>
          <div className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16"><path fill="currentColor" d="M3 14s-1 0-1-1s1-4 6-4s6 3 6 4s-1 1-1 1zm5-6a3 3 0 1 0 0-6a3 3 0 0 0 0 6" /></svg>
          </div>
        </div>
        <div className="flex flex-col space-y-4 mb-6 bg-gray-100 p-4 rounded-lg shadow-inner overflow-y-auto h-[80vh]" ref={messageContainerRef}>
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs p-3 rounded-lg ${message.sender === "user" ? "bg-[#011E33] text-white" : "bg-gray-200 text-black"}`}>
                {message.fileUrl ? (
                  <a href={message.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{message.content}</a>
                ) : (
                  <p>{typeof message.content === 'string' ?
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                     : JSON.stringify(
                    message.content)}</p>
                )}
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
            disabled={loading || fileLoading}
          />


          {/* {paymentDetails && paymentDetails?.remainingDays > 0 ? (
            <>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label htmlFor="fileInput" className="cursor-pointer text-white text-lg hover:text-gray-300 ml-3">
                📎
              </label>
              {file && (
                <div className="text-white text-sm ml-3 flex">
                  {file.name}
                  <button
                    onClick={handleFileUpload}
                    className="text-white text-lg hover:text-gray-300 ml-3"
                    disabled={fileLoading}
                  >
                    {fileLoading ? (
                      <></>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="cursor-pointer" title="Premium Feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 36 36">
                <path fill="#FFFFFF" d="M18.09 20.59A2.41 2.41 0 0 0 17 25.14V28h2v-2.77a2.41 2.41 0 0 0-.91-4.64" className="clr-i-outline clr-i-outline-path-1" />
                <path fill="#FFFFFF" d="M26 15v-4.28a8.2 8.2 0 0 0-8-8.36a8.2 8.2 0 0 0-8 8.36V15H7v17a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V15Zm-14-4.28a6.2 6.2 0 0 1 6-6.36a6.2 6.2 0 0 1 6 6.36V15H12ZM9 32V17h18v15Z" className="clr-i-outline clr-i-outline-path-2" />
                <path fill="none" d="M0 0h36v36H0z" />
              </svg>
            </div>
          )} */}

          {!file && !loading && !fileLoading && (
            <button
              onClick={handleSendMessage}
              className="text-white text-lg hover:text-gray-300 ml-3"
            >
              &#9658;
            </button>
          )}
          {(loading || fileLoading) && (
            <svg className="animate-spin h-5 w-5 text-white ml-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.268 0 0 6.268 0 14h4z"></path>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
