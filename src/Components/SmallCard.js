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
        <div className="flex flex-col h-fit cursor-pointer bg-white/80 shadow p-1 ml-2 rounded-lg border-1 justify-between m-1 flex-wrap ">
        <div className="flex flex-row w-52 items-center justify-between">
          <div className="flex items-center">
              {!error ?
              (<img className="h-9 w-9" 
               src={`https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`} 
               alt={res.data.weather[0].description && res.data.weather[0].description}
               onError={()=>{setError(true)}}
               ></img>):
               null}
               <h1>{res.data.main.temp && Math.floor(res.data.main.temp-273.15)}°C</h1>
              </div>
              <div className="flex flex-row max-w-md gap-1 items-center">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
              <h1>{`${res.location[0].toUpperCase()}${res.location.slice(1).toLowerCase()}`}</h1>
              </div>
        </div>
        <h1 className="border-b-1 font-light">{`${res.data.weather[0]["description"] && res.data.weather[0]["description"][0].toUpperCase()+res.data.weather[0]["description"].slice(1)}`}</h1>
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
           <h1 className="select-none text-sm">More details</h1>
        </div>
        <svg onClick={handleDelete} className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path className="svgtored svg-path" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
        </div>
        </div>)}
        </>
    );
}
export default SmallCard;
