// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,  // Initialize user 
    isLoggedIn: false, // Track login status
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, name, email, token } = action.payload;
            state.user = { id, name, email, token };
            state.isLoggedIn = true; 
        },
        clearUser: (state) => {
            state.user = null; // logout the user
            state.isLoggedIn = false; 
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
