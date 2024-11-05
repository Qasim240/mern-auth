import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/baseApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';

const Login = () => {
    const [login, { data, error, isLoading }] = useLoginMutation();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard');
        }
    }, [isLoggedIn, navigate]);




    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData).unwrap();
            // console.log("User logged in successfully", response);
            const userData = response.data
            // Dispatch the user data to Redux store
            dispatch(setUser({
                message: userData.message,
                id: userData._id,
                name: userData.name,
                email: userData.email,
                token: userData.token,
            }));

            navigate("/dashboard");
        } catch (error) {
            console.log("Error", error);
        }
    };

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
                <button>  <Link to="/">signup</Link></button>
                <button type='submit'>Login</button>

            </div>
        </form>
    );
};

export default Login;
