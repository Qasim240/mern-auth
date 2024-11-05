// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,  // Initialize user as null for clarity
    isLoggedIn: false, // Track login status
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, name, email, token } = action.payload;
            state.user = { id, name, email, token };
            state.isLoggedIn = true; // Update login status
        },
        clearUser: (state) => {
            state.user = null; // Clear user data
            state.isLoggedIn = false; // Update login status
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
