import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch,useAppSelector } from './hooks/hooks';
import { getWeatherList, selectAllWeather } from './features/weather/weatherSlice';
import HeaderBar from './components/headerComp';
import ForecastMain from './components/homeComp';
function App() {
  const dispatch = useAppDispatch();
const weatherStatus = useAppSelector(state=>state.weather.status);
const weatherCityName = useAppSelector(state=>state.weather.city);
  useEffect(() => {
   
    if (weatherStatus === 'idle') {
      dispatch(getWeatherList());
    }
  }, [weatherStatus, dispatch]);
  useEffect(() => {
      dispatch(getWeatherList());
   
  }, [weatherCityName, dispatch]);



  return (
    <div className="w-[100vw] h-[100vh]">
      <HeaderBar />
      <ForecastMain/>
    </div>
  );
}

export default App;
