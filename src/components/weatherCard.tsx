import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks/hooks";
import { selectWeatherById } from "../features/weather/weatherSlice";
import ArrowSVG from "../svgs/arrowsvg";
import { useState } from "react";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
function dataConvert(dt: string) {
    if (dt === undefined) return ""

    const date = new Date(Number(dt) * 1000);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}`;
}




export default function WeatherCard({ idWeather, smallerInfo }: { idWeather: EntityId, smallerInfo: boolean }) {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen: React.MouseEventHandler<HTMLDivElement> = () => {

        setOpen(true);

    }
    const handleClose = () => {

        setOpen(false);
    }

    const weatherCard = useAppSelector((state) => selectWeatherById(state, idWeather));
    if (!weatherCard) return null
    const strForImage = `https://openweathermap.org/img/wn/${weatherCard?.weather[0].icon}@2x.png`;
    const data = [
        { name: "Morning", temperature: `${weatherCard?.temp.morn}` },
        { name: "Day", temperature: `${weatherCard?.temp.day}` },
        { name: "Eventide", temperature: `${weatherCard?.temp.eve}` },
        { name: "Night", temperature: `${weatherCard?.temp.night}` },

    ]
    const dataFeels = [
        { name: "Morning", temperature: `${weatherCard?.feels_like.morn}` },
        { name: "Day", temperature: `${weatherCard?.feels_like.day}` },
        { name: "Eventide", temperature: `${weatherCard?.feels_like.eve}` },
        { name: "Night", temperature: `${weatherCard?.feels_like.night}` },

    ]
    return (<>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className="bg-gray-400/95 w-[60%] h-[80%] mx-auto my-[5%] text-white outline-none flex flex-col">

                <p className="mx-auto text-2xl">{dataConvert(weatherCard.dt)}</p>
                <div className="grid grid-cols-2 px-[4%]">
                    <div className="flex flex-col  gap-y-4">
                        <img src={strForImage} alt="weather image" className="w-[40%]" />
                        <h5 className="text-2xl mb-5">{weatherCard?.weather[0].main}</h5>
                        <p className="capitalize">{weatherCard?.weather[0].description} - Humidity: {weatherCard?.humidity}%</p>
                        <p className="">Pressure: {weatherCard?.pressure} psi</p>
                        <p>Cloudness: {weatherCard?.clouds}%</p>
                        <p>Probability of precipitation: {weatherCard?.pop * 100}% </p>
                        <p>Rain volume: {weatherCard?.rain} mm</p>
                        <div className="flex items-center">
                            <p className=" mr-[15px] ">Wind speed: {weatherCard?.speed} m/s</p>
                            <ArrowSVG width={20} height={20} fill="#fff" deg={weatherCard?.deg}></ArrowSVG>
                        </div>
                        <p>Wind gust: {weatherCard?.gust} m/s</p>
                    </div>
                    <div className="flex flex-col gap-y-4">
                        <h5 className="self-center text-2xl">Real Temperature</h5>
                        <LineChart width={500} height={200} data={data}>
                            <XAxis dataKey="name" stroke="#000000" />
                            <YAxis stroke="#000000" />
                            <Tooltip />
                            <Line type="monotone" dataKey="temperature" stroke="#000000" />
                        </LineChart>
                        <h5 className="self-center text-2xl">Temperature Feels Like</h5>
                        <LineChart width={500} height={200} data={dataFeels}>
                            <XAxis dataKey="name" stroke="#000000" />
                            <YAxis stroke="#000000" />
                            <Tooltip />
                            <Line type="monotone" dataKey="temperature" stroke="#000000" />
                        </LineChart>
                        <div className="flex justify-evenly">
                            <p>Max Temperature: {weatherCard?.temp.max}°</p>
                            <p>Min Temperature: {weatherCard?.temp.min}°</p>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
        <div className="bg-gray-300 rounded-xl flex flex-col justify-center items-center " onClick={handleOpen}>

            <p>{dataConvert(weatherCard.dt)}</p>
            <img src={strForImage} alt="weather image" className="h-[25%]" />
            <h5 className="text-2xl mb-5">{weatherCard?.weather[0].main}</h5>
            <p className="capitalize">{weatherCard?.weather[0].description} - Humidity: {weatherCard?.humidity}%</p>
            <div className="flex items-center">
                <p className=" mr-[15px] my-4">Wind speed: {weatherCard?.speed} m/s</p>
                <ArrowSVG width={20} height={20} fill="#000" deg={weatherCard?.deg}></ArrowSVG>
            </div>
            <p>Max/Min Temperature: {weatherCard?.temp.max}°/{weatherCard?.temp.min}°</p>
            {!smallerInfo && (
                <>
                    <p className="mb-4">Pressure: {weatherCard?.pressure} psi</p>
                   
                    <p className="my-4">Real Temperature: </p>
                    <div className="grid grid-cols-2 gap-x-[15px]">
                        <p>Day: {weatherCard?.temp.day}°</p>
                        <p>Night: {weatherCard?.temp.night}°</p>
                    </div>
                    <p className="my-4">Feels like Temperature: </p>
                    <div className="grid grid-cols-2 gap-x-[15px]">
                        <p>Day: {weatherCard?.feels_like.day}°</p>
                        <p>Night: {weatherCard?.feels_like.night}°</p>
                    </div>
                </>
            )}

        </div></>)
}