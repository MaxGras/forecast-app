
import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from '../../src/features/weather/weatherSlice'
export const store = configureStore({
    reducer:{
        weather: weatherReducer,
    }
})
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch