import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../redux/baseApi';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    // Use the signUp mutation hook
    const [signUp, { data, error, isLoading }] = useSignUpMutation();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the signUp mutation
            const response = await signUp(formData).unwrap();

            // User registration was successful, navigate to login
            console.log("User registered successfully", response);

            navigate("/login");

            // Store user data in localStorage (if needed)
            localStorage.setItem('user', JSON.stringify(response));

        } catch (error) {
            console.log("Could not signup", error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder='Name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
            />
            <input
                style={{ margin: '10px' }}
                type="email"
                placeholder='Email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
            />
            <input
                type="password"
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
            />
            <div>
                <button type='submit' disabled={isLoading}>Signup</button>
                {isLoading && <p>Signing up...</p>} 
                {error && <p style={{ color: 'red' }}>Error: {error.message}</p>} 
            </div>
        </form>
    );
};

export default SignUp;
