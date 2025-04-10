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

    const [filteredFlights, setfilteredFlights] = useState(flightsRecords)
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
        setfilteredFlights(flightsRecords)
    }, [flightsRecords])

    useEffect(() => {
        setfilteredFlights(dateFilteredFlights);
    }, [dateFilteredFlights]);



    const handleUpdateFlight = async (updatedFlight) => {
        try {
            // console.log("Sending to backend:", updatedFlight);
            const response = await updateFlight(updatedFlight).unwrap();
            console.log(response.data.child_fare)
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
                        time: response.data.time,
                        adult_fare: response.data.adult_fare,
                        child_fare: response.data.child_fare,
                        infant_fare: response.data.infant_fare
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
        <div className="bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#0ea5e9]
 min-h-screen">
            <Navbar />
            <div className="pt-24 container-fluid lg:mx-20 mx-5">
                {isLoggedIn ? (
                    <div>
                        <Greetings />
                        <div className="text-right">

                            <div className='flex items-end justify-between mb-3'>
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
                            <div className="relative overflow-x-auto">
                                <table className="min-w-full bg-white shadow-md rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b text-left whitespace-nowrap">Flight Name</th>
                                            <th className="py-2 px-4 border-b text-left whitespace-nowrap">From</th>
                                            <th className="py-2 px-4 border-b text-left whitespace-nowrap">to</th>
                                            <th className="py-2 px-4 border-b text-left whitespace-nowrap">Stop</th>
                                            <th className="py-2 px-4 border-b text-left whitespace-nowrap">Class Type</th>
                                            <th className="py-2 px-4 border-b text-left whitespace-nowrap">Adult fare</th>
                                            <th className="py-2 px-4 border-b text-left whitespace-nowrap">Child fare</th>
                                            <th className="py-2 px-4 border-b text-left whitespace-nowrap">Infant fare</th>
                                            <th className="py-2 px-4 border-b text-left whitespace-nowrap"> Departure </th>
                                            <th className="py-2 px-4 border-b text-left whitespace-nowrap">Return</th>
                                            <th className="py-2 px-4 border-b text-left whitespace-nowrap">Time</th>
                                            <th className="py-2 px-4 border-b text-right whitespace-nowrap">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredFlights.map((flight) => (
                                            <tr key={flight.id} className="hover:bg-gray-100 transition-all">
                                                <td className="py-2 px-4 border-b whitespace-nowrap lg:whitespace-normal">{flight.flightName}</td>
                                                <td className="py-2 px-4 border-b whitespace-nowrap lg:whitespace-normal ">{flight.origin}</td>
                                                <td className="py-2 px-4 border-b whitespace-nowrap lg:whitespace-normal ">{flight.destination}</td>
                                                <td className="py-2 px-4 border-b whitespace-nowrap lg:whitespace-normal ">{flight.stop}</td>
                                                <td className="py-2 px-4 border-b whitespace-nowrap lg:whitespace-normal ">{flight.flight_class}</td>
                                                <td className="py-2 px-4 border-b whitespace-nowrap lg:whitespace-normal ">{flight.adult_fare}</td>
                                                <td className="py-2 px-4 border-b whitespace-nowrap lg:whitespace-normal ">{flight.child_fare}</td>
                                                <td className="py-2 px-4 border-b whitespace-nowrap lg:whitespace-normal ">{flight.infant_fare}</td>
                                                <td className="py-2 px-4 border-b whitespace-nowrap">{flight.departure}</td>
                                                <td className="py-2 px-4 border-b whitespace-nowrap">{flight.returnFlight}</td>
                                                <td className="py-2 px-4 border-b ">{flight.time}</td>
                                                <td className="py-2 px-4 border-b  text-right whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleDelete(flight.id)}
                                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={() => openEditPopup(flight)}
                                                        className="px-3 ml-2 py-1 bg-green-600 text-white rounded hover:bg-green-500 transition-all"
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

                        <div className='flex  items-center justify-end mt-4'>
                            <DownloadCsv flightsRecords={flightsRecords} hasRecords={hasRecords} />
                            <button
                                onClick={handleOpenPopup}
                                className="px-3 ml-2 py-1 font-bold bg-white text-black rounded transition-all px-4 py-2"
                            >
                                <div className='flex items-center'>
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