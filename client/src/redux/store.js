// src/redux/store.js

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './baseApi';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './slices/userSlice'; // Import the user slice reducer

// Configure persist for `baseApi`
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [baseApi.reducerPath, 'user'], 
};

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  user: userReducer, // the user reducer here
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
