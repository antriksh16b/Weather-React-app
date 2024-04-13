import  {useState} from "react";
import {useDispatch} from "react-redux";
import { removeCity,setWeatherData } from "../features/citySlice";

// SmallCard is, card inside dashboard
function SmallCard({res}){                  
   let [error,setError]=useState(false);
   let dispatch=useDispatch();
   function handleClick(){
       let data=`${res.location[0].toUpperCase()}${res.location.slice(1).toLowerCase()}`;
       dispatch(setWeatherData(data));
   }
   function handleDelete(){
       dispatch(removeCity(res.id))
   }
    return(
      <>
      {res && res.data && res.data.main && (
        <div className="flex flex-col cursor-pointer bg-white hover: shadow p-1 rounded-lg border-2 justify-between m-3 flex-wrap ">
        <div className="flex flex-row w-52 items-center justify-between">
          <div className="flex items-center">
              {!error ?
              (<img className="h-10 w-10" 
               src={`https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`} 
               alt={res.data.weather[0].description && res.data.weather[0].description}
               onError={()=>{setError(true)}}
               ></img>):
               null}
               <h1>{res.data.main.temp && Math.floor(res.data.main.temp-273.15)}°C</h1>
              </div>
              <div className="flex flex-row max-w-md items-center">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
              <h1 className="font-semibold">{`${res.location[0].toUpperCase()}${res.location.slice(1).toLowerCase()}`}</h1>
              </div>
        </div>
        <h1 className="border-b-2 pb-1 mb-1">{`${res.data.weather[0]["description"] && res.data.weather[0]["description"][0].toUpperCase()+res.data.weather[0]["description"].slice(1)}`}</h1>
        <div className="flex justify-between items-center">
        <div onClick={handleClick} className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
           >      
           <path d="M9 18L15 12L9 6" />
          </svg>
           <h1 className="select-none">More details</h1>
        </div>
           <svg onClick={handleDelete} className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path className="svg-path" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
        </div>
        </div>)}
        </>
    );
}
export default SmallCard;
