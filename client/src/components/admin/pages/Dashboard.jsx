import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFlightRecordMutation } from '../../../redux/baseApi';
import { deleteFlightRecord } from '../../../redux/slices/flightRecordSlice';
import Navbar from '../../compotent/Navbar';
import { useDeleteFlightMutation } from '../../../redux/baseApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddFlightPopup from '../../compotent/AddFlightPopup';


const Dashboard = () => {
    const [{ isLoading }] = useFlightRecordMutation();
    const [deleteFlight] = useDeleteFlightMutation();
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const flightsRecords = useSelector((state) => state.flightRecord.flightRecord);
    const dispatch = useDispatch();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handleOpenPopup = () => setIsPopupOpen(true);

    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;

    if (hours >= 5 && hours < 12) {
        timeOfDay = "Morning";
    } else if (hours >= 12 && hours < 17) {
        timeOfDay = "Afternoon";
    } else {
        timeOfDay = "Evening";
    }


    const handleDeleteFlight = async (id) => {
        try {
            const response = await deleteFlight({ id }).unwrap();
            if (response.data && response.data.message === "Flight deleted successfully") {
                dispatch(deleteFlightRecord({ id }));
                toast.success("Flight deleted successfully!", { autoClose: 1000 });
            } else {
                toast.error("Error deleting flight: " + response.data.message, { autoClose: 1000 });
            }
        } catch (error) {
            toast.error("Could not delete flight");
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
                                className="mb-4 shadow-lg rounded-lg px-4 py-2 bg-white text-dark rounded hover:bg-blue-600 hover:text-white transition-all"
                            >
                                Add Flight
                            </button>
                        </div>

                        {isLoading && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[9999]">
                                <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}

                        {
                            flightsRecords.length === 0 ? (
                                <h3 className="text-center font-bold text-gray-600 p-5 text-[30px] mt-[150px]">
                                    No flight records found. <br /> Please add a flight to get started!.
                                </h3>
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
                                                    <button
                                                        onClick={() => handleDeleteFlight(flight.id)}
                                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )
                        }


                        {/* Popup for Flight Info */}

                        <AddFlightPopup isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />







                    </div>
                ) : (
                    <div>Please log in to view your flight records.</div>
                )}
            </div>

            <ToastContainer />
        </div>
    );
};

export default Dashboard;
