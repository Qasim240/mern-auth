import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    flightRecord: [],
};

const flightRecordSlice = createSlice({
    name: 'flightRecord',
    initialState,
    reducers: {
        // Action to add a flight record
        setFlightRecord: (state, action) => {
            const { id, flightName, departure, origin, stop, destination, date, time, returnFlight } = action.payload;
            if (!Array.isArray(state.flightRecord)) {
                state.flightRecord = [];
            }
            state.flightRecord.push({ id, flightName, departure, origin, stop, destination, date, time, returnFlight });
        },

        // Action to delete a flight record by id
        deleteFlightRecord: (state, action) => {
            const { id } = action.payload;
            state.flightRecord = state.flightRecord.filter(record => record.id !== id);
        },

        // Action to update a flight record by id
        updateFlightRecord: (state, action) => {
            const { id, flightName, departure, origin, stop, destination, date, time, returnFlight } = action.payload;
            const index = state.flightRecord.findIndex(record => record.id === id);
            if (index !== -1) {
                state.flightRecord[index] = { id, flightName, departure, origin, stop, destination, date, time, returnFlight };
             
            } else {
                console.error("No matching record found for update.");
            }
        }
        
    }
});

// Export the actions
export const { setFlightRecord, deleteFlightRecord, updateFlightRecord } = flightRecordSlice.actions;

// Export the reducer
export default flightRecordSlice.reducer;
