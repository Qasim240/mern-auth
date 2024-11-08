import React from 'react';
import { useFlightRecordMutation } from '../../redux/baseApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setFlightRecord } from '../../redux/slices/flightRecordSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFlightPopup = ({ isPopupOpen, setIsPopupOpen }) => {
    const schema = yup.object().shape({
        flightName: yup.string().required('Flight Name is required'),
        departure: yup.string().required('Departure is required'),
        destination: yup.string().required('Destination is required'),
        date: yup.string().required('Date is required'),
        time: yup.string().required('Time is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const [flightRecord, { isLoading }] = useFlightRecordMutation();
    const dispatch = useDispatch();

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

    return (
        <>
            {isPopupOpen && (
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
                    onClick={() => setIsPopupOpen(false)}
                >
                    <div
                        className="bg-white p-5 rounded shadow-lg w-[30%]"
                        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={() => setIsPopupOpen(false)}
                        >
                            ✖
                        </button>
                        <h2 className="text-2xl font-semibold mb-4">Enter Flight Info</h2>
                        <form onSubmit={handleSubmit(handleSubmitFlight)}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Flight Name</label>
                                <input
                                    {...register('flightName')}
                                    type="text"
                                    className="w-full p-2 border rounded"
                                />
                                {errors.flightName && <p className="text-red-500 text-sm mt-1">{errors.flightName.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Departure</label>
                                <input
                                    {...register('departure')}
                                    type="text"
                                    className="w-full p-2 border rounded"
                                />
                                {errors.departure && <p className="text-red-500 text-sm mt-1">{errors.departure.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Destination</label>
                                <input
                                    {...register('destination')}
                                    type="text"
                                    className="w-full p-2 border rounded"
                                />
                                {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Date</label>
                                <input
                                    {...register('date')}
                                    type="date"
                                    className="w-full p-2 border rounded"
                                />
                                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Time</label>
                                <input
                                    {...register('time')}
                                    type="time"
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
        </>
    );
};

export default AddFlightPopup;