import React, { useState, useEffect } from 'react';

const EditFlightPopup = ({ flight, isOpen, onClose, onUpdate }) => {
  const [updatedFlight, setUpdatedFlight] = useState({});
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);



  useEffect(() => {
    if (isOpen && flight) {
      setUpdatedFlight({ ...flight });
    }
  }, [flight, isOpen]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFlight({ ...updatedFlight, [name]: value });
    console.log(value)

  };

  const handleSubmit = () => {
    console.log("Updated Flight Data:", updatedFlight);
    if (updatedFlight.id) {
      onUpdate(updatedFlight);
      console.log("updated Flight here", updatedFlight)
    } else {
      console.error("No flight ID found for update.");
    }
  };


  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[9999]">
      <div
        className="bg-white p-8 rounded-xl shadow-xl transform transition-all duration-500 ease-out max-w-3xl w-full"
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <h2 className="text-3xl font-semibold text-center mb-6">Update Flight</h2>
        <div className="space-y-6">
          {/* Flight Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Flight Name</label>
            <input
              type="text"
              name="flightName"
              value={updatedFlight.flightName || ''}
              onChange={handleChange}
              placeholder="Enter flight name"
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Departure Date</label>
            <input
              type="date"
              name="departure"
              value={updatedFlight.departure || ''}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

       
          {/* Return Flight */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Return Date</label>
            <input
              type="date"
              name="returnFlight"
              value={updatedFlight.returnFlight || ''}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>


          {/* origin */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Origin</label>
            <input
              type="text"
              name="origin"
              value={updatedFlight.origin || ''}
              onChange={handleChange}
              placeholder="Enter origin"
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Destination</label>
            <input
              type="text"
              name="destination"
              value={updatedFlight.destination || ''}
              onChange={handleChange}
              placeholder="Enter destination"
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>


          {/* Flight Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Flight Time</label>
            <input
              type="time"
              name="time"
              value={updatedFlight.time || ''}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFlightPopup;
