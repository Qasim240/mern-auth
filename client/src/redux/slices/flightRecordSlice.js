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
            const { id, flightName, departure, destination, date, time } = action.payload;
            if (!Array.isArray(state.flightRecord)) {
                state.flightRecord = [];
            }
            state.flightRecord.push({ id, flightName, departure, destination, date, time });
        },

        // Action to delete a flight record by id
        deleteFlightRecord: (state, action) => {
            const { id } = action.payload;
            state.flightRecord = state.flightRecord.filter(record => record.id !== id);
        },

        // Action to update a flight record by id
        updateFlightRecord: (state, action) => {
            const { id, flightName, departure, destination, date, time } = action.payload;
            console.log("Action Payload:", action.payload);  // Log action payload for debugging
        
            const index = state.flightRecord.findIndex(record => record.id === id);
            console.log("Index of Record to Update:", index);  // Log the index found
            
            if (index !== -1) {
                console.log("Updating record at index:", index);  // Confirm that the index is found
                state.flightRecord[index] = { id, flightName, departure, destination, date, time };
            } else {
                console.log("No matching record found for update.");
            }
        }
        
        
        
        
    }
});

// Export the actions
export const { setFlightRecord, deleteFlightRecord, updateFlightRecord } = flightRecordSlice.actions;

// Export the reducer
export default flightRecordSlice.reducer;
