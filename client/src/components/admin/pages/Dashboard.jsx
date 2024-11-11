import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFlightRecordMutation, useDeleteFlightMutation, useUpdatedFlightMutation } from '../../../redux/baseApi';
import { deleteFlightRecord, updateFlightRecord } from '../../../redux/slices/flightRecordSlice';
import Navbar from '../../compotent/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import AddFlightPopup from '../../compotent/AddFlightPopup';
import EditFlightPopup from '../EditFlightPopup';

const Dashboard = () => {
    const [{ isLoading }] = useFlightRecordMutation();
    const [deleteFlight] = useDeleteFlightMutation();
    const [updateFlight] = useUpdatedFlightMutation();  // API hook for flight update

    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const flightsRecords = useSelector((state) => state.flightRecord.flightRecord);
    console.log(flightsRecords)
    const dispatch = useDispatch();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);

    const handleOpenPopup = () => setIsPopupOpen(true);

    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = hours < 12 ? 'Morning' : hours < 17 ? 'Afternoon' : 'Evening';

    // Delete flight handler
    const handleDeleteFlight = async (id) => {
        try {
            const response = await deleteFlight({ id }).unwrap();
            if (response.data?.message === "Flight deleted successfully") {
                dispatch(deleteFlightRecord({ id }));
            }
        } catch (error) {
            console.log("handleDeleteFlight:", error);
        }
    };

    // Open edit popup
    const openEditPopup = (flight) => {
        setSelectedFlight(flight);
        setIsEditPopupOpen(true);
    };

    // Handle flight update
    const handleUpdateFlight = async (updatedFlight) => {
        try {
            const response = await updateFlight(updatedFlight).unwrap();
    
            // Log the response for debugging
            console.log("API Response:", response);
    
            if (response && response.data) {
                const updatedFlightData = response.data;
                if (updatedFlightData._id) {
                    dispatch(updateFlightRecord({
                        id: updatedFlightData._id,
                        flightName: updatedFlightData.flightName,
                        departure: updatedFlightData.departure,
                        destination: updatedFlightData.destination,
                        date: updatedFlightData.date,
                        time: updatedFlightData.time,
                    }));
                    setIsEditPopupOpen(false);
                }
            } else {
  
                console.error("Flight not found or unexpected response format:", response);
            }
        } catch (error) {

            if (error.status === 404) {
                console.error("Flight not found. Please check the flight details.");
            } else if (error.status === "PARSING_ERROR") {
                console.error("Server response was not in JSON format.");
            } else {
                console.error('Could not update flight:', error);
            }
        }
    };
    
    
    
    

    return (
        <div className="bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 min-h-screen">
            <Navbar />
            <div className="pt-24 container mx-auto">
                {isLoggedIn ? (
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Good {timeOfDay}, {user.name}</h1>

                        <div className='text-right'>
                            <button
                                onClick={handleOpenPopup}
                                className="mb-4 shadow-lg rounded-lg px-4 py-2 bg-white text-dark hover:bg-blue-600 hover:text-white transition-all"
                            >
                                Add Flight
                            </button>
                        </div>

                        {isLoading && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[9999]">
                                <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}

                        {flightsRecords.length === 0 ? (
                            <h3 className="text-center font-bold text-gray-600 p-5 text-[30px] mt-[150px]">
                                No flight records found. <br /> Please add a flight to get started!.</h3>
                        ) : (
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b text-left">Flight Name</th>
                                        <th className="py-2 px-4 border-b text-left">Departure</th>
                                        <th className="py-2 px-4 border-b text-left">Destination</th>
                                        <th className="py-2 px-4 border-b text-left">Date</th>
                                        <th className="py-2 px-4 border-b text-left">Time</th>
                                        <th className="py-2 px-4 border-b text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {flightsRecords.map((flight) => (
                                        <tr key={flight.id} className="hover:bg-gray-100 transition-all">
                                            <td className="py-2 px-4 border-b">{flight.flightName}</td>
                                            <td className="py-2 px-4 border-b">{flight.departure}</td>
                                            <td className="py-2 px-4 border-b">{flight.destination}</td>
                                            <td className="py-2 px-4 border-b">{flight.date}</td>
                                            <td className="py-2 px-4 border-b">{flight.time}</td>
                                            <td className="py-2 px-4 border-b text-right">
                                                <button onClick={() => handleDeleteFlight(flight.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all">Delete</button>
                                                <button onClick={() => openEditPopup(flight)} className="px-3 ml-2 py-1 bg-green-600 text-white rounded hover:bg-green-500 transition-all">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {/* Add Flight Popup */}
                        <AddFlightPopup isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />

                        {/* Edit Flight Popup */}
                        {selectedFlight && (
                            <EditFlightPopup
                                isOpen={isEditPopupOpen}
                                flight={selectedFlight}
                                onClose={() => setIsEditPopupOpen(false)}
                                onUpdate={handleUpdateFlight} // Pass the handleUpdateFlight function here
                            />
                        )}
                    </div>
                ) : (
                    <div>Please log in to view your flight records.</div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
