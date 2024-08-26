"use client";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { storage, firestore } from '../../DB/config'; // Ensure this path matches your firebase utility file
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const UploadContent = ({ closeSidebar, selectedItem }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({});

  useEffect(() => {
    if (userInfo) {
      fetchUploadedFiles();
    }
  }, [selectedItem, userInfo]);

  const fetchUploadedFiles = async () => {
    if (!userInfo) return;
    const docRef = doc(firestore, "Files", `${userInfo._id}_${selectedItem}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUploadedFiles(docSnap.data().fileLinks || []);
    }
  };

  const handleFileChange = (event) => {
    setFiles([...files, ...Array.from(event.target.files)]);
  };

  const uploadFile = async (file) => {
    const storageRef = ref(storage, `UploadedFiles/${userInfo._id}/${selectedItem}/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select files to upload.");
      return;
    }
    setLoader(true);
    setUploadStatus("Uploading...");

    try {
      const uploadPromises = files.map(file => uploadFile(file));
      const fileUrls = await Promise.all(uploadPromises);
      const docRef = doc(firestore, "Files", `${userInfo._id}_${selectedItem}`);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, { fileLinks: fileUrls });
      } else {
        await updateDoc(docRef, {
          fileLinks: arrayUnion(...fileUrls)
        });
      }

      setUploadStatus("Upload Successful!");
      setLoader(false);
      setFiles([]);
      fetchUploadedFiles();
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Upload Failed!");
      setLoader(false);
    }
  };

  const handleDelete = async (fileUrl) => {
    setDeleteLoading(prev => ({ ...prev, [fileUrl]: true }));
    try {
      const fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);

      const docRef = doc(firestore, "Files", `${userInfo._id}_${selectedItem}`);
      await updateDoc(docRef, {
        fileLinks: arrayRemove(fileUrl)
      });

      fetchUploadedFiles();
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeleteLoading(prev => ({ ...prev, [fileUrl]: false }));
    }
  };

  return (
    <div className='fixed top-0 right-0 h-full w-full md:w-1/3 bg-white shadow-lg p-4 z-50'>
      <button
        onClick={closeSidebar}
        className='absolute top-2 right-2 p-2 bg-gray-500 text-white '
      >
        X
      </button>
      <h2 className='font-semibold text-lg mb-4'>{selectedItem}</h2>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md file:bg-gray-50 file:border-0 file:rounded-md file:px-4 file:py-2 file:text-gray-700 file:cursor-pointer hover:file:bg-gray-100 w-full"
      />
      <button
        onClick={handleUpload}
        disabled={loader}
        className={`w-full text-white flex justify-center font-bold py-2 px-4 rounded-lg bg-gray-900 hover:bg-gray-700 ${loader ? "cursor-not-allowed" : ""}`}
      >
        {loader ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : ("Upload Files")}
      </button>
      {uploadStatus && <p className="mt-2">{uploadStatus}</p>}
      <div className="mt-4">
        {uploadedFiles.length > 0 ? (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFiles.map((url, index) => {
                const fileName = decodeURIComponent(url.split('/').pop().split('?')[0]);
                const shortFileName = fileName.length > 7 ? `${fileName.substring(0, 4)}...${fileName.substring(fileName.length - 3)}` : fileName;
                return (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shortFileName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-4">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
                      </a>
                      <button 
                        onClick={() => handleDelete(url)} 
                        className={`bg-red-500 text-white px-2 py-1 rounded ${deleteLoading[url] ? "cursor-not-allowed" : ""}`}
                        disabled={deleteLoading[url]}
                      >
                        {deleteLoading[url] ? (
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default UploadContent;
