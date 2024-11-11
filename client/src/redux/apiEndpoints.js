// src/redux/api/apiEndpoints.js

export const apiEndpoints = {
  signUp: {
    url: 'register',
    method: 'POST',
  },

  login: {
    url: 'login',
    method: 'POST',
  },

  FlightRecord: {
    url: 'flightrecord',
    method: 'POST',
  },
  deleteFlight: {
    url: 'deleteflight/:id',
    method: 'DELETE'
  },

  updatedFlight: {
    url: 'updatedflight/:id',
    method: 'PUT'
  }
  
};
