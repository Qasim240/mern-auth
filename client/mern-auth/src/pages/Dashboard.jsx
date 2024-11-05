import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearUser());
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            {isLoggedIn ? (
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Welcome, {user.name}
                    </h1>
                    <p className="text-gray-600 mb-6">
                        You are successfully logged in. Here is your dashboard.
                    </p>
                    <div className="text-left bg-gray-50 p-4 rounded-lg mb-6 shadow-inner">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                            User Information
                        </h2>
                        <p><strong>Email:</strong> {user.email}</p>
                        {/* Add more user data if available */}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Please log in.</h1>
                    <p className="text-gray-600">Access your dashboard by logging in to your account.</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
