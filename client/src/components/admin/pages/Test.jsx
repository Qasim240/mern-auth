



import React, { useState } from 'react';
import { setTestUSer } from '../../../redux/slices/testSlcie';
import { useDispatch, useSelector } from 'react-redux';

const Test = () => {
    const testUserData = useSelector((state) => state.testUser.testUserData);
    console.log("testUserData", testUserData)
    const dispatch = useDispatch();
    
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [userData, setUserData] = useState([]);
    const [isEditing, setisEdting] = useState(false);

    const hanldechnage = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })

    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(setTestUSer(formData));
        console.log("wokring")
    }


    const handleDelete = (id) => {
        const deletedUserData = userData.filter(item => item.id !== id)
        setUserData(deletedUserData)
    }


   




    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Contact Us</h2>
            <form className="space-y-6" onSubmit={onSubmit}>
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-lg text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={hanldechnage}
                        value={formData.name}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-lg text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={hanldechnage}

                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="block text-lg text-gray-700">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={hanldechnage}
                        placeholder="Enter your message"
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <button
                    type="submit"

                    className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    {isEditing ? 'update': 'submit'}
                </button>
            </form>
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Users List</h3>
                {testUserData.length > 0 ? (
                    <ul className="space-y-4">
                        {testUserData.map((user) => (
                            <li key={user.id} className="p-4 border rounded-md">
                                <p>
                                    <strong>Name:</strong> {user.name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {user.email}
                                </p>
                                <p>
                                    <strong>Message:</strong> {user.message}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users added yet.</p>
                )}
            </div>

        </div>
    );
};

export default Test;
