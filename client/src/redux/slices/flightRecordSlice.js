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

        }

    }
});

// Export the actions
export const { setFlightRecord, deleteFlightRecord } = flightRecordSlice.actions;

// Export the reducer
export default flightRecordSlice.reducer;
