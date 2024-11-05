





import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {

    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log("Is User Logged In:", isLoggedIn); // true or false
    console.log("User Data:", user); // user data if logged in

    const handleLogout = () => {
        dispatch(clearUser())
    }

    return (
        <>
            {isLoggedIn ? <h1>Welcome, {user.name}</h1> : <h1>Please log in.</h1>}
            <button onClick={handleLogout}>logout</button>
        </>
    );
};

export default Dashboard;
