

import React from 'react'

const DownloadCsv = ({flightsRecords, hasRecords}) => {
  const downloadCSV = (flightsRecords) => {
    if (!flightsRecords || flightsRecords.length === 0) {
        console.log("No Record found!");
        return;
    }

    const CsvHeader = ["Flight Name", "From", "Destination", "Departure", "Return", "Time"];
    const csvRows = [CsvHeader.join(",")];

    flightsRecords.forEach((flight) => {
        const row = [
            flight.flightName,
            flight.origin,
            flight.destination,
            flight.departure,
            flight.returnFlight,
            flight.time
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
          Download Report
        </button>
      </div>


    </div>
  )
}

export default DownloadCsv