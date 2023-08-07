import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import {createEntityAdapter,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

interface Weather{
    dt:string,
    sunrise:string,
    sunset: string,
    temp:{
        day: number,
        min: number,
        max: number,
        night: number,
        eve: number,
        morn: number,
    },
    feels_like:{
        day: number,
        night: number,
        eve: number,
        morn: number
    },
    pressure: number,
    humidity: number,
    weather: [{
        id: number,
        main: string,
        description: string,
        icon: string
    }],
    speed: number,
    deg: number,
    gust: number,
    clouds: number,
    pop: number,
    rain: number,
    
    city: string,
    countOfNeed: number;
    status: 'idle'|'pending'|'succeeded'|'failed',
    error: string | undefined
    
}


export const getWeatherList = createAsyncThunk<Weather[],undefined,{state:RootState, rejectValue:string }>( 
    'weather/fetchWeather',
    async (_, thunkAPI) => {
      try{
            const state = thunkAPI.getState();
            const city = state.weather.city;
           const numb = 14;
            const response = await axios.request(
                {
                    method: 'GET',
                    url: `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${numb}&units=metric&mode=json&appid=c8d5b1517def51c5101652e515512484`,
                }
            );
          
          
          return response.data.list;
        } 
    catch(error){
        throw thunkAPI.rejectWithValue('Error No such city');
    }
    }
);


const weatherAdapt = createEntityAdapter<Weather>({
    
    selectId: (weather)=>weather.dt,
})
const initialState = weatherAdapt.getInitialState({
    status:'idle',
    countOfNeed: 5,
    city: "Lviv",
   error: undefined as string | undefined
 
})

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers:{
       editCityName:(state,action:PayloadAction<string>)=>{
        state.city = action.payload;
       },
       editCountOfNumber:(state,action:PayloadAction<number>)=>{
        state.countOfNeed = action.payload
       }
    },
    extraReducers(builder){
        builder
        .addCase(getWeatherList.pending,(state)=>{
            state.status = 'pending'
            state.error = undefined;
        
        })
        .addCase(getWeatherList.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            state.error = undefined;
            weatherAdapt.setAll(state, action.payload);
        })
        .addCase(getWeatherList.rejected,(state, action)=>{
            state.status = 'failed';
            state.error = action.payload;
           
        })
    }
}
)
export const {
    selectAll: selectAllWeather,
    selectById: selectWeatherById,
    selectIds: selectWeathersIds

} = weatherAdapt.getSelectors((state:RootState) => state.weather);
export default weatherSlice.reducer;
export const {editCityName,editCountOfNumber} = weatherSlice.actions;