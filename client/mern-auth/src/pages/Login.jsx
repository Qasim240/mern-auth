



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/baseApi';

const Login = () => {
    const [login, { data, error, isLoading }] = useLoginMutation()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({

        email: '',
        password: '',
    });

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
            const response = await login(formData).unwrap();
            console.log("User registered successfully", response)
            localStorage.setItem('user', JSON.stringify(response));
            navigate("/dashboard")
        } catch (error) {
            console.log("Error", error)
        }

    }


    return (
        <form onSubmit={onSubmit}>
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
                <button type='submit'> login</button>
            </div>
        </form>
    )
}

export default Login