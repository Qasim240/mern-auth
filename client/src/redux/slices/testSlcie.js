


import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    testUserData: [],
}

const testUSerSlice = createSlice({
    name: 'testUser',
    initialState,
    reducers:{
        setTestUSer: (state, action) => {
            const { name, email, message } = action.payload;
            if (!Array.isArray(state.testUserData)) {
                state.testUserData = []; 
            }
            state.testUserData.push({ id: Date.now(), name, email, message });
        }
        
    }
})  


export const {setTestUSer} = testUSerSlice.actions;
export default testUSerSlice.reducer;