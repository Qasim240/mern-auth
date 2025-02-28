



import { useState } from "react";

const SearchFlight = ({ flightsRecords, setfilteredFlights }) => {
    const [searchvalue, setSearchvalue] = useState("")

    const SearchFlightHanlder = (e) => {
        const SearchResult = flightsRecords.filter((flight) =>
            flight.flightName.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setfilteredFlights(SearchResult)
        setSearchvalue(e.target.value)
    }
    return (
        <div>
            <div className="flex items-center justify-end">
                <div className="relative w-full max-w-md">
                    <input
                        onChange={SearchFlightHanlder}
                        type="text"
                        value={searchvalue}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-md"
                        placeholder="Search by name..."
                    />
                    <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1011 3.5a7.5 7.5 0 005.65 13.15z"
                        />
                    </svg>
                </div>
            </div>

        </div>
    )
}

export default SearchFlight