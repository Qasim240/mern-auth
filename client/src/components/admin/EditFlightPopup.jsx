import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updatedFlight.id) {
      onUpdate(updatedFlight);
    } else {
      console.error("No flight ID found for update.");
    }
  };

  const isValidDate = (date) => {
    const parsed = Date.parse(date);
    return !isNaN(parsed);
  };

  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white";

  if (!isVisible) return null;

  return (
    <div id="crud-modal" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Flight</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Flight Name</label>
                <input
                  type="text"
                  name="flightName"
                  value={updatedFlight.flightName || ''}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter flight name"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From</label>
                <input
                  type="text"
                  name="origin"
                  value={updatedFlight.origin || ''}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter origin"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To</label>
                <input
                  type="text"
                  name="destination"
                  value={updatedFlight.destination || ''}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter destination"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stop</label>
                <input
                  type="text"
                  name="stop"
                  value={updatedFlight.stop || ''}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter stop"
                  required
                />
              </div>

              {/* Departure Time */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departure Time</label>
                <DatePicker
               
                  selected={isValidDate(updatedFlight.departure) ? new Date(updatedFlight.departure) : null}
                  onChange={(date) =>
                    setUpdatedFlight({ ...updatedFlight})
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select time"
                  className={inputClass}
                />
              </div>

              {/* Return Time */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Return Time</label>
                <DatePicker
                  selected={isValidDate(updatedFlight.returnFlight) ? new Date(updatedFlight.returnFlight) : null}
                  onChange={(date) =>
                    setUpdatedFlight({ ...updatedFlight, returnFlight: date})
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select time"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adult Fare</label>
                <input
                  type="number"
                  name="adult_fare"
                  value={updatedFlight.adult_fare || ''}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter adult fare"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Child Fare</label>
                <input
                  type="number"
                  name="child_fare"
                  value={updatedFlight.child_fare || ''}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter child fare"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Infant Fare</label>
                <input
                  type="number"
                  name="infant_fare"
                  value={updatedFlight.infant_fare || ''}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter infant fare"
                  required
                />
              </div>

              {/* Flight Date */}
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Flight Date</label>
                <input
                  type="date"
                  name="date"
                  value={updatedFlight.date || ''}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              {/* Flight Class */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Flight Class</label>
                <select
                  name="flight_class"
                  value={updatedFlight.flight_class || ''}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select a class</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Economy">Economy</option>
                  <option value="Business Class">Business Class</option>
                  <option value="First Class">First Class</option>
                </select>
              </div>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Update Flight
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-5 py-2.5 rounded-lg shadow hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFlightPopup;