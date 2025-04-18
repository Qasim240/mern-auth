import React, { useState, useEffect } from 'react';
import { useFlightRecordMutation } from '../../redux/baseApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setFlightRecord } from '../../redux/slices/flightRecordSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFlightPopup = ({ isPopupOpen, setIsPopupOpen }) => {
  const [isVisible, setIsVisible] = useState(isPopupOpen);

  useEffect(() => {
    if (isPopupOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isPopupOpen]);

  const schema = yup.object().shape({
    flightName: yup.string().required('Flight Name is required'),
    departure: yup.string().required('Departure is required'),
    returnFlight: yup.string().required('Return Flight is required'),
    origin: yup.string().required('Origin is required'),
    stop: yup.string().required('Stop is required'),
    destination: yup.string().required('Destination is required'),
    date: yup.string().required('Date is required'),
    flight_class: yup.string().required('Flight Class is required'),
    adult_fare: yup.number().typeError("Must be a number").required('Adult fare is required'),
    child_fare: yup.number().typeError("Must be a number").required('Child fare is required'),
    infant_fare: yup.number().typeError("Must be a number").required('Infant fare is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const [flightRecord, { isLoading }] = useFlightRecordMutation();
  const dispatch = useDispatch();

  const handleSubmitFlight = async (data) => {
    try {
      const response = await flightRecord(data).unwrap();
      const flightData = response.data;

      dispatch(setFlightRecord(flightData));
      toast.success("Flight added successfully!", { autoClose: 1000 });
      setIsPopupOpen(false);
    } catch (err) {
      toast.error("Flight already exists", { autoClose: 1000 });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div id="crud-modal" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Enter Flight Info</h3>
              <button
                type="button"
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={handleSubmit(handleSubmitFlight)} className="p-4 md:p-5 grid gap-4 mb-4 grid-cols-2">
              {isLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center rounded-lg">
                  <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
              )}

              {[
                { label: "Flight Name", name: "flightName", type: "text", colSpan: 2 },
                { label: "From", name: "origin", type: "text" },
                { label: "To", name: "destination", type: "text" },
                { label: "Stop", name: "stop", type: "text" },
                { label: "Departure Time", name: "departure", type: "time" },
                { label: "Return Time", name: "returnFlight", type: "time" },
                { label: "Adult Fare", name: "adult_fare", type: "text" },
                { label: "Child Fare", name: "child_fare", type: "text" },
                { label: "Infant Fare", name: "infant_fare", type: "text" },
                { label: "Flight Date", name: "date", type: "date", colSpan: 2 },
              ].map(({ label, name, type, colSpan = 1 }) => (
                <div key={name} className={`col-span-2 sm:col-span-${colSpan}`}>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                  <input
                    type={type}
                    {...register(name)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  />
                  {errors[name] && <p className="error-text">{errors[name]?.message}</p>}
                </div>
              ))}

              {/* Flight Class */}
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Flight Class</label>
                <select
                  {...register("flight_class")}
                  defaultValue=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                >
                  <option value="" disabled>Select a class</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Economy">Economy</option>
                  <option value="Business Class">Business Class</option>
                  <option value="First Class">First Class</option>
                </select>
                {errors.flight_class && <p className="error-text">{errors.flight_class.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4 col-span-2 mt-6">
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="bg-gray-500 text-white px-5 py-2.5 rounded-lg shadow hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddFlightPopup;
