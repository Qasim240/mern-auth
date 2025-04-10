

import React from 'react'

const DownloadCsv = ({ flightsRecords, hasRecords }) => {
  const downloadCSV = (flightsRecords) => {
    if (!flightsRecords || flightsRecords.length === 0) {
      console.log("No Record found!");
      return;
    }

    const CsvHeader = ["Flight Name", "From", "Destination", "Departure", "Return", "Time", "stop", "adult fare" ];
    const csvRows = [CsvHeader.join(",")];

    flightsRecords.forEach((flight) => {
      const row = [
        flight.flightName,
        flight.origin,
        flight.destination,
        flight.departure,
        flight.returnFlight,
        flight.time,
        flight.stop,
        flight.adult_fare
      ].join(",");
      csvRows.push(row);
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUrl = encodeURI(csvContent);

    const date = new Date().toISOString().split("T")[0];
    const fileName = `flights_${date}.csv`;

    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", encodedUrl);
    downloadLink.setAttribute("download", fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>

      <div className="text-right ">
        <button
          className={`${hasRecords
            ? 'px-3 ml-2 py-1 font-bold bg-white text-black rounded transition-all px-4 py-2'
            : 'bg-gray-400 opacity-[0.5] text-gray-700 cursor-not-allowed px-4 py-2'
            }`}
          disabled={!hasRecords}
          onClick={() => downloadCSV(flightsRecords)}
        >
         <div className='flex items-center'>
         <span>Download Report</span> <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path
              d="M12 3a1 1 0 0 1 1 1v10.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-4.99 5a1 1 0 0 1-1.42 0l-5-5a1 1 0 1 1 1.42-1.42l3.29 3.3V4a1 1 0 0 1 1-1zM5 19a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2H5z"
            />
          </svg>
         </div>

        </button>
      </div>


    </div>
  )
}

export default DownloadCsv