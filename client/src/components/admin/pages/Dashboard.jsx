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
    console.log("dateFilteredFlights", dateFilteredFlights)

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
            const response = await updateFlight(updatedFlight).unwrap();
            if (response?.data?._id) {
                dispatch(
                    updateFlightRecord({
                        id: response.data._id,
                        flightName: response.data.flightName,
                        departure: response.data.departure,
                        returnFlight: response.data.returnFlight,
                        origin: response.data.origin,
                        destination: response.data.destination,
                        date: response.data.date,
                        time: response.data.time,
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
        <div className="bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 min-h-screen">
            <Navbar />
            <span>test</span>
            <div className="pt-24 container mx-auto">
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
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b text-left">Flight Name</th>
                                        <th className="py-2 px-4 border-b text-left">From</th>
                                        <th className="py-2 px-4 border-b text-left">Destination</th>
                                        <th className="py-2 px-4 border-b text-left">Departure</th>
                                        <th className="py-2 px-4 border-b text-left">Return</th>
                                        <th className="py-2 px-4 border-b text-left">Time</th>
                                        <th className="py-2 px-4 border-b text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFlights.map((flight) => (
                                        <tr key={flight.id} className="hover:bg-gray-100 transition-all">
                                            <td className="py-2 px-4 border-b">{flight.flightName}</td>
                                            <td className="py-2 px-4 border-b">{flight.origin}</td>
                                            <td className="py-2 px-4 border-b">{flight.destination}</td>
                                            <td className="py-2 px-4 border-b">{flight.departure}</td>
                                            <td className="py-2 px-4 border-b">{flight.returnFlight}</td>
                                            <td className="py-2 px-4 border-b">{flight.time}</td>
                                            <td className="py-2 px-4 border-b text-right">
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
                        )}

                        <div className='flex  items-center justify-end mt-4'>
                            <DownloadCsv flightsRecords={flightsRecords} hasRecords={hasRecords} />
                            <button
                                onClick={handleOpenPopup}
                                className="px-3 ml-2 py-1 font-bold bg-white text-black rounded transition-all px-4 py-2"
                            >
                                Add Flight
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