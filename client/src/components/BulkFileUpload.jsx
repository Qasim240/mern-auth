import React, { useEffect, useState } from 'react';
import { useUploadBulkFileMutation } from '../redux/baseApi';
import { setFlightRecord } from '../redux/slices/flightRecordSlice';
import { useDispatch, useSelector } from 'react-redux';
const BulkFileUpload = () => {
    const flightsRecords = useSelector((state) => state.flightRecord.flightRecord);
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

            console.log("Response from API:", response);

            // Extract inserted flight records
            const flightData = response.data.insertedFlights;
            console.log("Flights inserted:", flightData);
            if (Array.isArray(flightData) && flightData.length > 0) {

                flightData.forEach((flight) => {
                    dispatch(setFlightRecord({
                        id: flight._id,
                        flightName: flight.flightName,
                        departure: flight.departure,
                        origin: flight.origin,
                        stop: flight.stop,
                        destination: flight.destination,
                        date: flight.date,
                        time: flight.time,
                        returnFlight: flight.returnFlight,
                        flight_class: flight.flight_class,
                        adult_fare: flight.adult_fare,
                        infant_fare: flight.infant_fare,
                    }));
                });

                console.log("Flight records added to Redux store.");
            } else {
                alert("No new flights were inserted.");
            }
        } catch (err) {
            console.error("API Error:", err);
        }
    };

    return (
        <>

            <input
                id="file-upload"
                type="file"
                onChange={fileChangeHandler}
                disabled={isLoading}
                hidden
            />
            <label
                htmlFor="file-upload"
                className="px-4 py-2 ml-2 font-semibold bg-blue-600 text-white rounded cursor-pointer transition-all hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Upload CSV File
            </label>

            {selectedFile && (
                <div className="flex items-center gap-2 ml-2  bg-gray-100 px-3 py-2 rounded-md shadow-sm border border-gray-300">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 011-1h6a1 1 0 01.707.293l4 4A1 1 0 0118 6v10a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h2zm2 1v3a1 1 0 001 1h3V3H8zm-3 9a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="text-gray-700 truncate max-w-[150px] text-[12px]">{selectedFile.name}</span>
                    <button
                        onClick={() => setSelectedFile(null)}
                        className="text-red-500 hover:text-red-700 transition-all"
                    >
                        ❌
                    </button>
                </div>
            )}

            {selectedFile && (
                <button
                    onClick={fileUploadHandler}
                    disabled={isLoading}
                    className="px-4 py-2 ml-2 font-semibold bg-green-600 text-white rounded transition-all hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
                >
                    {isLoading ? (
                        <div className="flex items-center">
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-200 animate-spin fill-white"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="ml-2">Uploading...</span>
                        </div>
                    ) : (
                        "Upload CSV File"
                    )}
                </button>
            )}

            {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}


        </>
    );
};

export default BulkFileUpload;