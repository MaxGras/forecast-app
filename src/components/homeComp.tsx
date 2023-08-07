import { selectWeathersIds } from "../features/weather/weatherSlice"
import { useAppSelector } from "../hooks/hooks"
import WeatherCard from "./weatherCard";

export default function ForecastMain() {
    const countOfNeed = useAppSelector((state) => state.weather.countOfNeed);
    let smallerInfo = false;
    const weatherCardsIds = useAppSelector(selectWeathersIds).slice(0, countOfNeed);
    const weatherCity = useAppSelector((state) => state.weather.city);
    const weatherError = useAppSelector((state) => state.weather.error);
    let str = { display: "grid", gap: '20px', gridTemplateColumns: "repeat(5,1fr)", gridTemplateRows: "repeat(1,1fr)" };
    if (weatherError !== undefined) {
        return <h1 className="flex items-center justify-center text-3xl">{weatherError}</h1>
    }
    if (countOfNeed == 5 || countOfNeed == 7) {
        str.gridTemplateColumns = `repeat(${countOfNeed},1fr)`
        smallerInfo=false;
    }
    else {
        str.gridTemplateColumns = `repeat(${countOfNeed / 2},1fr)`
        str.gridTemplateRows = `repeat(${2},1fr)`
        smallerInfo=true;
    }
    const weatherCards = weatherCardsIds.map(a => {
        return <WeatherCard key={a} idWeather={a} smallerInfo ={smallerInfo} />;
    });

    return (
        <div className="flex justify-center items-center h-[92vh] flex-col">
            <h2 className="mb-[2%] text-2xl capitalize">Forecast in {weatherCity}</h2>
            <div className={`w-[85%] bg-gray-200 h-[80%] rounded-3xl shadow-[0px_0px_0px_25px] shadow-emerald-700 px-[1%]`} style={str}>
                {weatherCards}
            </div>
        </div>)
}