import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../utils/Logout';
import { logo } from '../../imagesPath';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const user = useSelector((state) => state.user.user);



    const navData = [
        {
            name: "dashboard",
            Link: '/dashboard'
        },
        {
            name: "Settings",
            Link: '/Settings'
        },
        {
            name: "Reports",
            Link: '/Reports'
        },


    ]

    return (
        <>
            {/* Navbar */}
            <nav className="bg-white shadow-md fixed w-full z-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <a href="/" className="text-2xl font-semibold text-gray-800 hover:text-gray-600 transition duration-300">
                            <img src={logo} alt="" />
                        </a>
                        <div className="flex items-center space-x-10">
                            <Link to="/" className="text-gray-800 font-medium hover:text-gray-600 transition duration-300">
                                Home
                            </Link>
                            <Link to="about" className="text-gray-800 font-medium hover:text-gray-600 transition duration-300">
                                About
                            </Link>
                            {isLoggedIn ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="text-gray-800 font-medium hover:text-gray-600 transition duration-300 flex items-center"
                                    >
                                        <span className="mr-2">{user.name}</span>
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                            <ul className="py-2 text-gray-700">
                                                {
                                                    navData.map((item) => (
                                                        <li key={item.index}>
                                                            <Link to={item.Link} className="block px-4 py-2 hover:bg-gray-100">
                                                                {item.name}
                                                            </Link>
                                                        </li>

                                                    ))
                                                }
                                                <hr className="my-2" />
                                                <li>
                                                    <button
                                                        onClick={() => handleLogout(dispatch, navigate)}
                                                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                                                    >
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <a href="/login" className="text-gray-800 font-medium hover:text-gray-600 transition duration-300">
                                    Log In
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
