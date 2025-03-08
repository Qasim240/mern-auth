




import React, { useEffect, useState } from "react";

const RangeFilter = ({ flightsRecords, setDateFilteredFlights }) => {
    const [startDate, setStartDate] = useState("");
    const [toDate, setToDate] = useState("");

    const startDateHandler = (e) => {
        const startDateValue = e.target.value;
        setStartDate(startDateValue)
        // console.log("From", startDate)

    }
    const toDateHandler = (e) => {
        const toDateValue = e.target.value;
        setToDate(toDateValue)
        // console.log("To", toDate)
    }

    useEffect(() => {
        if (startDate && toDate) {
            const datedFilter = flightsRecords?.filter((flight) =>
                new Date(flight.departure) >= new Date(startDate) &&
                new Date(flight.departure) <= new Date(toDate));
            setDateFilteredFlights(datedFilter)

        } else {
            setDateFilteredFlights(flightsRecords);
        }


    }, [startDate, toDate, flightsRecords])


    return (
        <div className="flex flex-col md:flex-row items-center gap-2 bg-white shadow-lg rounded-[50px] p-2">
            <div className="flex flex-col gap-1">

                <input
                    onChange={startDateHandler}
                    value={startDate}
                    type="date"
                    className="text-[12px] font-medium bg-gray-100 text-gray-700 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all hover:bg-gray-200"
                />
            </div>

            <span className="text-xl text-gray-500">&rarr;</span>

            <div className="flex flex-col gap-1">
                <input
                    onChange={toDateHandler}
                    value={toDate}
                    type="date"
                    className="text-[12px] font-medium bg-gray-100 text-gray-700 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all hover:bg-gray-200"
                />
            </div>
        </div>
    );
};

export default RangeFilter;
