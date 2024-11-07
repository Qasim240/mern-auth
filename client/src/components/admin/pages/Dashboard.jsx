import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFlightRecordMutation } from '../../../redux/baseApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setFlightRecord, deleteFlightRecord } from '../../../redux/slices/flightRecordSlice';
import Navbar from '../../compotent/Navbar';
import { useDeleteFlightMutation } from '../../../redux/baseApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Validation schema
const schema = yup.object().shape({
    flightName: yup.string().required('Flight Name is required'),
    departure: yup.string().required('Departure is required'),
    destination: yup.string().required('Destination is required'),
    date: yup.string().required('Date is required'),
    time: yup.string().required('Time is required'),
});

const Dashboard = () => {
    const [flightRecord, { data, error, isLoading }] = useFlightRecordMutation();
    const [deleteFlight] = useDeleteFlightMutation();
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const flightsRecords = useSelector((state) => state.flightRecord.flightRecord);
    const dispatch = useDispatch();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);


    const date = new Date();
    const hours = date.getHours(); // Get the current hour (0-23)

    let timeOfDay;

    if (hours >= 5 && hours < 12) {
        timeOfDay = "Morning";
    } else if (hours >= 12 && hours < 17) {
        timeOfDay = "Afternoon";
    } else {
        timeOfDay = "Evening";
    }

    console.log("Good", timeOfDay);



    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const handleSubmitFlight = async (data) => {
        try {
            const response = await flightRecord(data).unwrap();
            const flightData = response.data;

            dispatch(setFlightRecord({
                id: flightData.id,
                flightName: flightData.flightName,
                departure: flightData.departure,
                destination: flightData.destination,
                date: flightData.date,
                time: flightData.time,
            }));

            toast.success("Flight added successfully!", { autoClose: 1000 });
            setIsPopupOpen(false);

        } catch (err) {
            toast.error("Error submitting flight: " + (err?.message || err), { autoClose: 1000 });

        }
    };

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
                        {isPopupOpen && (
                            <div
                                className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
                                onClick={handleClosePopup}>
                                <div className="bg-white p-5 rounded shadow-lg w-[30%]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <h2 className="text-2xl font-semibold mb-4">Enter Flight Info</h2>
                                    <form className='' onSubmit={handleSubmit(handleSubmitFlight)}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Flight Name</label>
                                            <input
                                                {...register('flightName')}
                                                type="text"
                                                name="flightName"
                                                className="w-full p-2 border rounded"
                                            />
                                            {errors.flightName && <p className="text-red-500 text-sm mt-1">{errors.flightName.message}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Departure</label>
                                            <input
                                                {...register('departure')}
                                                type="text"
                                                name="departure"
                                                className="w-full p-2 border rounded"
                                            />
                                            {errors.departure && <p className="text-red-500 text-sm mt-1">{errors.departure.message}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Destination</label>
                                            <input
                                                {...register('destination')}
                                                type="text"
                                                name="destination"
                                                className="w-full p-2 border rounded"
                                            />
                                            {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Date</label>
                                            <input
                                                {...register('date')}
                                                type="date"
                                                name="date"
                                                className="w-full p-2 border rounded"
                                            />
                                            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Time</label>
                                            <input
                                                {...register('time')}
                                                type="time"
                                                name="time"
                                                className="w-full p-2 border rounded"
                                            />
                                            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
                                        </div>
                                        <div className="text-right">
                                            <button
                                                type="submit"
                                                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
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
