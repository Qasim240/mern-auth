import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useFlightRecordMutation,
    useDeleteFlightMutation,
    useUpdatedFlightMutation,
} from '../../../redux/baseApi';
import { updateFlightRecord } from '../../../redux/slices/flightRecordSlice';
import Navbar from '../../compotent/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import AddFlightPopup from '../../compotent/AddFlightPopup';
import EditFlightPopup from '../EditFlightPopup';
import Greetings from '../../../utils/Greetings';
import { handleDeleteFlight } from '../../../utils/DeleteFlight';
import DownloadCsv from '../DownloadCsv';
import SearchFlight from '../../SearchFlight';
import RangeFilter from '../../RangeFilter';
import BulkFileUpload from '../../BulkFileUpload';

const Dashboard = () => {
    const [{ isLoading }] = useFlightRecordMutation();
    const [deleteFlight] = useDeleteFlightMutation();
    const [updateFlight] = useUpdatedFlightMutation();

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const flightsRecords = useSelector((state) => state.flightRecord.flightRecord);
    const hasRecords = flightsRecords?.length > 0;

    const [filteredFlights, setfilteredFlights] = useState(flightsRecords);
    const [dateFilteredFlights, setDateFilteredFlights] = useState(flightsRecords);
    const dispatch = useDispatch();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleDelete = (id) => handleDeleteFlight(id, deleteFlight, dispatch);

    const openEditPopup = (flight) => {
        setSelectedFlight(flight);
        setIsEditPopupOpen(true);
    };

    useEffect(() => {
        setfilteredFlights(flightsRecords);
    }, [flightsRecords]);

    useEffect(() => {
        setfilteredFlights(dateFilteredFlights);
    }, [dateFilteredFlights]);

    const handleUpdateFlight = async (updatedFlight) => {
        try {
            const response = await updateFlight(updatedFlight).unwrap();
            if (response?.data?._id) {
                dispatch(
                    updateFlightRecord({
                        id: response.data._id,
                        flightName: response.data.flightName,
                        departure: response.data.departure,
                        returnFlight: response.data.returnFlight,
                        origin: response.data.origin,
                        stop: response.data.stop,
                        flight_class: response.data.flight_class,
                        destination: response.data.destination,
                        date: response.data.date,
                        adult_fare: response.data.adult_fare,
                        child_fare: response.data.child_fare,
                        infant_fare: response.data.infant_fare,
                    })
                );
                setIsEditPopupOpen(false);
            } else {
                console.error('Unexpected response format:', response);
            }
        } catch (error) {
            console.error('Error updating flight:', error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#0ea5e9] min-h-screen">
            <Navbar />
            <div className="pt-24 container-fluid lg:mx-20 mx-5">
                {isLoggedIn ? (
                    <div>
                        <Greetings />
                        <div className="text-right">
                            <div className="flex items-end justify-between mb-3">
                                <RangeFilter flightsRecords={flightsRecords} setDateFilteredFlights={setDateFilteredFlights} />
                                <SearchFlight flightsRecords={flightsRecords} setfilteredFlights={setfilteredFlights} />
                            </div>
                        </div>

                        {isLoading && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[9999]">
                                <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}

                        {!hasRecords ? (
                            <h3 className="text-center font-bold text-gray-600 p-5 text-[30px] mt-[150px]">
                                No flight records found. <br /> Please add a flight to get started!
                            </h3>
                        ) : (
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Flight Name</th>
                                            <th scope="col" className="px-6 py-3">From</th>
                                            <th scope="col" className="px-6 py-3">To</th>
                                            <th scope="col" className="px-6 py-3">Stop</th>
                                            <th scope="col" className="px-6 py-3">Class Type</th>
                                            <th scope="col" className="px-6 py-3">Adult Fare</th>
                                            <th scope="col" className="px-6 py-3">Child Fare</th>
                                            <th scope="col" className="px-6 py-3">Infant Fare</th>
                                            <th scope="col" className="px-6 py-3">Departure Time</th>
                                            <th scope="col" className="px-6 py-3">Return Time</th>
                                            <th scope="col" className="px-6 py-3">Date</th>
                                            <th scope="col" className="px-6 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredFlights.map((flight) => (
                                            <tr key={flight.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{flight.flightName}</td>
                                                <td className="px-6 py-4">{flight.origin}</td>
                                                <td className="px-6 py-4">{flight.destination}</td>
                                                <td className="px-6 py-4">{flight.stop}</td>
                                                <td className="px-6 py-4">{flight.flight_class}</td>
                                                <td className="px-6 py-4">{flight.adult_fare}</td>
                                                <td className="px-6 py-4">{flight.child_fare}</td>
                                                <td className="px-6 py-4">{flight.infant_fare}</td>
                                                <td className="px-6 py-4">{flight.departure}</td>
                                                <td className="px-6 py-4">{flight.returnFlight}</td>
                                                <td className="px-6 py-4">{flight.date}</td>
                                                <td className="px-6 py-4 text-right flex nowrap">
                                                    <button
                                                        onClick={() => handleDelete(flight.id)}
                                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={() => openEditPopup(flight)}
                                                        className="px-2 ml-2 py-1 bg-green-600 text-white rounded hover:bg-green-500 transition-all"
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="flex items-center justify-end mt-4">
                            <DownloadCsv flightsRecords={flightsRecords} hasRecords={hasRecords} />
                            <button
                                onClick={handleOpenPopup}
                                className="px-3 ml-2 py-1 font-bold dark:bg-gray-900 text-white text-[12px] text-black rounded transition-all text-[12px]"
                            >
                                <div className="flex items-center">
                                    <span>Add New Flight</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        width="24"
                                        height="24"
                                    >
                                        <path
                                            d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"
                                        />
                                    </svg>
                                </div>
                            </button>
                            <BulkFileUpload />
                        </div>
                        <AddFlightPopup isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />

                        {selectedFlight && (
                            <EditFlightPopup
                                isOpen={isEditPopupOpen}
                                flight={selectedFlight}
                                onClose={() => setIsEditPopupOpen(false)}
                                onUpdate={handleUpdateFlight}
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
