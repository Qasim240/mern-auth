// src/redux/api/api.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiEndpoints } from './apiEndpoints';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5252/api/' }),
  endpoints: (builder) => {
    const endpoints = {};
    console.log("Initializing endpoints...");  // Step 2: Start defining endpoints

    // Loop through apiEndpoints to create each mutation dynamically
    Object.keys(apiEndpoints).forEach((key) => {
      const endpoint = apiEndpoints[key];
      console.log(`Setting up mutation for endpoint: ${key}`);  // Step 3: Log the key for each endpoint
      console.log("Endpoint details:", endpoint);  // Step 4: Log endpoint details (url and method)

      endpoints[key] = builder.mutation({
        query: (body) => {
          console.log(`Querying ${key} with body:`, body);  // Step 5: Log the body being sent in the mutation
          return {
            url: endpoint.url,
            method: endpoint.method,
            body,
          };
        },
      });

      console.log(`Mutation for ${key} created`);  // Step 6: Confirm mutation creation
    });

    console.log("All endpoints set up:", endpoints);  // Step 7: Log all created endpoints

    return endpoints;
  },
});

console.log("baseApi created:", baseApi);  // Step 8: Log the baseApi setup

// Export the dynamic hooks based on apiEndpoints
export const {
  useSignUpMutation,
  useLoginMutation,
} = baseApi;

console.log("Hooks exported: useSignUpMutation, useLoginMutation");  // Step 9: Confirm hook export
