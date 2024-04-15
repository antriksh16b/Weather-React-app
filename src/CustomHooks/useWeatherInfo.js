import {useEffect, useState} from "react";

function useWeatherInfo({city,component}){
    let [data,setData]=useState(null);
    let [fetchError,setFetchError]=useState(null)
    useEffect(()=>{
        let fetchData=async ()=>{
            try{
            if(city){
            let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9e654b72087bc9a2b044d9ab6a7c3bbd`);
            if(!response.ok){
                throw new Error("Not result found");;
            }
            let data=await response.json();
            setData(data);
            setFetchError(null);
        }
        else if(component!=="City" && component!=="SmallCard"){
             if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(async (position)=>{
                    let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=9e654b72087bc9a2b044d9ab6a7c3bbd`)
                    if(!response.ok){
                        throw new Error("Cannot fetch current location");
                    }
                    let data=await response.json();
                    setData(data);
                    setFetchError(null);
                })
            }
        }
    }
        catch(error){
            setData(null);
            setFetchError("No results found");
        }
        }
    fetchData();
    },[city,component])
    return {data,fetchError};
}
export default useWeatherInfo;