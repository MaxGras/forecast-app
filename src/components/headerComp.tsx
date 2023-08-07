
import {useState} from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { editCityName,editCountOfNumber } from '../features/weather/weatherSlice';
export default function HeaderBar(){

    const cityOldValue = useAppSelector((state)=>state.weather.city);
  const  dispatch = useAppDispatch();
    const [cityValue, setCityValue]= useState<string>(cityOldValue);
    const hadleChange:React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        setCityValue(e.target.value);
    }
    const handleOnBlured: React.FocusEventHandler<HTMLInputElement> =()=>{
        dispatch(editCityName(cityValue));
    }
    function handleChangeCount(n:number){
      dispatch(editCountOfNumber(n));
    }


    return (
        <div className="bg-emerald-700 h-[8vh] flex items-center px-[7%] justify-between">
          <input 
          type="search" 
          className='border-none outline-none bg-gray-100' 
          onChange={hadleChange} 
          value={cityValue} 
          onBlur={handleOnBlured}
          placeholder='City for Forecast'
           />
           <div className='w-[70%] flex justify-end  gap-x-6'>
           <button className='bg-gray-100 w-[15%] h-[40%] rounded-xl' onClick={()=>handleChangeCount(5)}> For 5 Days</button>
           <button className='bg-gray-100 w-[15%] h-[40%] rounded-xl'onClick={()=>handleChangeCount(7)}> For 7 Days</button>
           <button className='bg-gray-100 w-[15%] h-[40%] rounded-xl'onClick={()=>handleChangeCount(10)}> For 10 Days</button>
           <button className='bg-gray-100 w-[15%] h-[40%] rounded-xl'onClick={()=>handleChangeCount(14)}> For 14 Days</button>
           </div>
        </div>
        )
}