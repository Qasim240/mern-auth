// src/redux/api/api.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiEndpoints } from './apiEndpoints';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5252/api/' }),
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
