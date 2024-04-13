import { useCallback, useEffect, useState } from "react";

function useLocationInfo(){
    let [currentLocation,setCurrentLocation]=useState("");
    let getPosition=useCallback(()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(async (position)=>{
                let response=await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)
                let data=await response.json();
                if(data && data.address && data.address.city){ 
                    setCurrentLocation(data.address.city); 
                }})
        }
},[])

    useEffect(()=>{
        getPosition();
    },[getPosition])

    return currentLocation;
}
export default useLocationInfo;