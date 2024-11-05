import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/baseApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema
const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
});

const Login = () => {
    const [login, { data, error, isLoading }] = useLoginMutation();
    const [serverError, setServerError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard');
        }
    }, [isLoggedIn, navigate]);

    const onSubmit = async (data) => {
        setServerError(''); // Reset error state before the request

        try {
            const response = await login(data).unwrap();
            const userData = response.data;
            dispatch(setUser({
                message: userData.message,
                id: userData._id,
                name: userData.name,
                email: userData.email,
                token: userData.token,
            }));
            navigate("/dashboard");
        } catch (err) {

            if (err.data) {
                setServerError(err.data);
            } else {
                console.error("Error", err);
            }
        }
    };

    return (
        <section className="bg-gray-900 min-h-screen flex items-center justify-center relative">
            {isLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <div className={`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ${isLoading ? "opacity-50" : ""}`}>
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow dark:border dark:border-gray-700">
                    <div className="p-6 space-y-6">
                        <h1 className="text-xl font-bold leading-tight text-white md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    id="email"
                                    className={`bg-gray-700 border ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-600"} text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                    placeholder="name@company.com"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input
                                    {...register('password')}
                                    type="password"
                                    id="password"
                                    className={`bg-gray-700 border ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-600"} text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-primary-600 dark:ring-offset-gray-800"
                                    />
                                    <label htmlFor="remember" className="ml-3 text-sm text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                            {serverError && <p className="text-red-500 text-sm">{serverError}</p>} 

                            <p className="text-sm font-light text-gray-400">
                                Don’t have an account yet? <Link to="/" className="font-medium text-primary-500 hover:underline">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
