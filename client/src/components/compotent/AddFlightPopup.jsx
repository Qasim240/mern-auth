import React, { useState, useEffect } from 'react';
import { useFlightRecordMutation } from '../../redux/baseApi';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setFlightRecord } from '../../redux/slices/flightRecordSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    departure: yup.date().required('Departure time is required'),
    returnFlight: yup.date().required('Return time is required'),
    origin: yup.string().required('Origin is required'),
    stop: yup.string().required('Stop is required'),
    destination: yup.string().required('Destination is required'),
    date: yup.date().required('Flight date is required'),
    flight_class: yup.string().required('Flight Class is required'),
    adult_fare: yup.number().typeError("Must be a number").required('Adult fare is required'),
    child_fare: yup.number().typeError("Must be a number").required('Child fare is required'),
    infant_fare: yup.number().typeError("Must be a number").required('Infant fare is required'),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [flightRecord, { isLoading }] = useFlightRecordMutation();
  const dispatch = useDispatch();

  const handleSubmitFlight = async (data) => {
    try {
      const formattedData = {
        ...data,
        departure: data.departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        returnFlight: data.returnFlight.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: data.date.toISOString().split('T')[0],
      };

      const response = await flightRecord(formattedData).unwrap();
      dispatch(setFlightRecord(response.data));
      toast.success("Flight added successfully!", { autoClose: 1000 });
      setIsPopupOpen(false);
    } catch (err) {
      toast.error("Flight already exists", { autoClose: 1000 });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Enter Flight Info</h3>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center"
              >
                <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleSubmitFlight)} className="p-4 md:p-5 grid gap-4 grid-cols-2">
              {isLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center rounded-lg">
                  <div className="w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                </div>
              )}

              {/* Text fields */}
              {[
                { label: "Flight Name", name: "flightName", type: "text", colSpan: 2 },
                { label: "From", name: "origin", type: "text" },
                { label: "To", name: "destination", type: "text" },
                { label: "Stop", name: "stop", type: "text" },
                { label: "Adult Fare", name: "adult_fare", type: "text" },
                { label: "Child Fare", name: "child_fare", type: "text" },
                { label: "Infant Fare", name: "infant_fare", type: "text" },
              ].map(({ label, name, type, colSpan = 1 }) => (
                <div key={name} className={`col-span-2 sm:col-span-${colSpan}`}>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                  <input
                    type={type}
                    {...register(name)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  />
                  {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}
                </div>
              ))}

              {/* Departure Time */}
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Departure Time</label>
                <Controller
                  control={control}
                  name="departure"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      placeholderText="Select time"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white w-[100%]"
                    />
                  )}
                />
                {errors.departure && <p className="text-red-500 text-xs mt-1">{errors.departure.message}</p>}
              </div>

              {/* Return Time */}
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Return Time</label>
                <Controller
                  control={control}
                  name="returnFlight"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      placeholderText="Select time"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    />
                  )}
                />
                {errors.returnFlight && <p className="text-red-500 text-xs mt-1">{errors.returnFlight.message}</p>}
              </div>

              {/* Date */}
              <div className="col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Flight Date</label>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    />
                  )}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
              </div>

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
                {errors.flight_class && <p className="text-red-500 text-xs mt-1">{errors.flight_class.message}</p>}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 col-span-2 mt-6">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="bg-gray-500 text-white px-5 py-2.5 rounded-lg hover:bg-gray-600 transition"
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
