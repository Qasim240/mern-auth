import React, { useState } from 'react';
import { useUploadBulkFileMutation } from '../redux/baseApi';
import { setFlightRecord } from '../redux/slices/flightRecordSlice';
import { useDispatch } from 'react-redux';
const BulkFileUpload = () => {
    const [uploadBulkFile, { isLoading, error }] = useUploadBulkFileMutation();
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch()
    const fileChangeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const fileUploadHandler = async () => {
        if (!selectedFile) {
            console.log("No file selected");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", selectedFile);
    
        try {
            console.log("Uploading file...");
            const response = await uploadBulkFile(formData).unwrap();
            
            console.log("Response from API:", response); // Debugging step
    
            // Extract inserted flight records
            const flightData = response.data.insertedFlights; // Optional chaining to avoid undefined errors
            console.log("Flights inserted:", flightData); // Debugging step
            if (Array.isArray(flightData) && flightData.length > 0) {
             
                
                flightData.forEach((flight) => {
                    dispatch(setFlightRecord({
                        id: flight._id,  // Correctly use _id from MongoDB
                        flightName: flight.flightName,
                        departure: flight.departure,
                        origin: flight.origin,
                        destination: flight.destination,
                        date: flight.date,
                        time: flight.time,
                        returnFlight: flight.returnFlight,
                    }));
                });
    
                console.log("Flight records added to Redux store.");
            } else {
                console.warn("No new flights were inserted.");
            }
        } catch (err) {
            console.error("API Error:", err);
        }
    };
    


    return (
        <>
            <input type="file" onChange={fileChangeHandler} disabled={isLoading} />
            <button onClick={fileUploadHandler} disabled={isLoading} className='px-3 ml-2 py-1 font-bold bg-white text-black rounded transition-all px-4 py-2'>
                Upload
            </button>
            {error && <p className="text-red-500">Error: {error.message}</p>}
        </>
    );
};

export default BulkFileUpload;