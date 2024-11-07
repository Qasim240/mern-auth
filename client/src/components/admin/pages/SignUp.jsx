import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../../redux/baseApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const SignUp = () => {
    const navigate = useNavigate();
    const [signUp, { error, isLoading }] = useSignUpMutation();

    // Set up react-hook-form
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), });

    // Form submission
    const onSubmit = async (data) => {
        try {
            const response = await signUp(data).unwrap();
            console.log("User registered successfully", response);
            navigate("/login");
        } catch (error) {
            console.log("Could not signup", error);
        }
    };

    return (
        <section className="bg-gray-900 min-h-screen flex items-center justify-center">
              {isLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow dark:border dark:border-gray-700">
                <div className="p-6 space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold text-white">
                        Create an account
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">Your Name</label>
                            <input
                                {...register('name')}
                                className={`bg-gray-700 border ${errors.name ? "border-red-500 focus:ring-red-500 border-2" : "border-gray-600"} text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-white`}
                                type="text"
                                placeholder="Name"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">Your Email</label>
                            <input
                                {...register('email')}
                                className={`bg-gray-700 border ${errors.email ? "border-red-500 focus:ring-red-500 border-2" : "border-gray-600"} text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-white`}
                                type="email"
                                placeholder="name@company.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">Password</label>
                            <input
                                {...register('password')}
                                className={`bg-gray-700 border ${errors.password ? "border-red-500 focus:ring-red-500 border-2" : "border-gray-600"} text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-white`}
                                type="password"
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing up...' : 'Sign up'}
                        </button>
                        <p className="text-sm font-light text-gray-400">
                            Already have an account? <Link to="/login" className="font-medium text-white hover:underline">Login here</Link>
                        </p>
                        {error && <p className="text-red-500 text-sm">Error: {error.message}</p>}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
