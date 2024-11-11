import React, { useState } from 'react';


const EditFlightPopup = ({ flight, isOpen, onClose, onUpdate }) => {
  const [updatedFlight, setUpdatedFlight] = useState({ ...flight });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFlight({ ...updatedFlight, [name]: value });
  };

  const handleSubmit = () => {
    onUpdate(updatedFlight);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Update Flight</h2>
        <input
          type="text"
          name="flightName"
          value={updatedFlight.flightName}
          onChange={handleChange}
          placeholder="Flight Name"
          className="block mb-3 p-2 border rounded"
        />
        <input
          type="text"
          name="departure"
          value={updatedFlight.departure}
          onChange={handleChange}
          placeholder="Departure"
          className="block mb-3 p-2 border rounded"
        />
        <input
          type="text"
          name="destination"
          value={updatedFlight.destination}
          onChange={handleChange}
          placeholder="Destination"
          className="block mb-3 p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={updatedFlight.date}
          onChange={handleChange}
          placeholder="Destination"
          className="block mb-3 p-2 border rounded"
        />
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
          Save
        </button>
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>

      </div>
  );
};

export default EditFlightPopup;
