import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiEndpoints } from './apiEndpoints';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5252/api/', // Consider using an env variable here
    responseHandler: async (response) => {
      try {
        const data = await response.json();
        return { data }; // Return JSON data if successful
      } catch (error) {
        throw new Error('Expected JSON response from server, but received non-JSON data.');
      }
    },
    prepareHeaders: (headers, { getState }) => {
      const user = getState().user.user; // Access the user from the state
      const token = user ? user.token : null; // Get token if user exists

      if (token) {
        console.log('Token:', token); // Log token for debugging
        headers.set('x-auth-key', `${token}`); // Set the token in the header
      } else {
        console.log('No token available');
      }

      return headers;
    },
  }),
  endpoints: (builder) => {
    const endpoints = {};

    Object.keys(apiEndpoints).forEach((key) => {
      const endpoint = apiEndpoints[key];
      endpoints[key] = builder.mutation({
        query: (body) => {
          const url = endpoint.url.includes(':id') ? endpoint.url.replace(':id', body.id) : endpoint.url; // Dynamically handle the :id
          return {
            url,
            method: endpoint.method,
            body: body.id ? { ...body, id: undefined } : body, // Remove `id` from the body if it's in the URL
          };
        },
      });
    });

    return endpoints;
  },
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useFlightRecordMutation,
  useDeleteFlightMutation,
} = baseApi;