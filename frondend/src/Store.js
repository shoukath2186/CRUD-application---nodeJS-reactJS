import {configureStore} from '@reduxjs/toolkit';

import authReduducer from './Slices/authSlice';

import {apiSlice} from './Slices/apiSlice'

const Store=configureStore({
    reducer:{
        auth:authReduducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware()
    .concat(apiSlice.middleware),
    devTools:true
})

export default Store;