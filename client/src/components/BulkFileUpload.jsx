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
            console.log("testing in tryCatch")
            const response = await uploadBulkFile(formData).unwrap();
            const flightData = response.data
            console.log("flightData", flightData)
            dispatch(setFlightRecord({
                flightName:flightData.flightName,
                id: flightData.id,
                flightName: flightData.flightName,
                departure: flightData.departure,
                origin: flightData.origin,
                destination: flightData.destination,
                date: flightData.date,
                time: flightData.time,
                returnFlight: flightData.returnFlight,
            }))




            console.log("Success:", JSON.stringify(response.data.insertedFlights));
        } catch (err) {
            console.log("API Error:", err);
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