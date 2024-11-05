// src/redux/api/api.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiEndpoints } from './apiEndpoints';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5252/api/',
    responseHandler: async (response) => {
      try {
        // Attempt to parse response as JSON
        const data = await response.json();
        return { data }; // Return JSON data if successful
      } catch (error) {
        // If parsing fails, throw an error
        throw new Error('Expected JSON response from server, but received non-JSON data.');
      }
    },
  }),
  endpoints: (builder) => {
    const endpoints = {};

    // Loop through apiEndpoints to create each mutation dynamically
    Object.keys(apiEndpoints).forEach((key) => {
      const endpoint = apiEndpoints[key];
      endpoints[key] = builder.mutation({
        query: (body) => ({
          url: endpoint.url,
          method: endpoint.method,
          body,
        }),
      });
    });

    return endpoints;
  },
});

// Export the dynamic hooks based on apiEndpoints
export const {
  useSignUpMutation,
  useLoginMutation,
} = baseApi;
