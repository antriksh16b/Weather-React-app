import {useState,useEffect} from "react";
import useWeatherInfo from "../CustomHooks/useWeatherInfo";
import {useSelector} from "react-redux";

//Widget shows all weather Information,it's a bigger card
function Widget(){                                         
    let currentData=useSelector((state)=>state.currentData);      
    let [location,setLocation]=useState("");
    let [date,setDate]=useState(new Date().toString().slice(0,24));
    let [debounceInput,setDebounceInput]=useState("");
    let {data,fetchError}=useWeatherInfo({city:debounceInput,apiKey:"9e654b72087bc9a2b044d9ab6a7c3bbd"});
    let [loading,setLoading]=useState(false);
  
    useEffect(()=>{                          
      setLoading(true);
      const timeOutId=setTimeout(()=>{
        setDebounceInput(currentData);
        setLoading(false)                     //onchangeof currentData useEffect is called
      },300) 
    return(()=>{
      clearTimeout(timeOutId);
     })                                                         
    },[currentData]);

    useEffect(()=>{
       const timeOutId=setTimeout(()=>{
           setDebounceInput(location);
       },700)
       return(()=>{
        clearTimeout(timeOutId);
       })
    },[location])

    useEffect(()=>{
      const interval=setInterval(()=>{
            setDate(new Date().toString().slice(0,24))
      },1000)
      return(()=>{
        clearInterval(interval);
      })
    })

    return(
          
          <div className="sm:p-4 cursor-context-menu shadow-2xl flex greater h-fit flex-col w-full sm:max-w-2xl lg:max-w-2xl xl:max-w-3xl rounded-lg bg-white/60 backdrop-blur-lg m-2 lg:ml-12 smaller small smallest">
            <div className="w-full flex justify-between greater-text gap-5 sm:gap-10 p-2 border-b border-black date">
                <input type="text" className="outline-none bg-transparent placeholder:text-black" 
                  value={location}
                  placeholder="Enter city"
                   onChange={(event)=>{
                     setLocation(event.target.value)
                }}
                ></input>
                <p className="p-0 sm:pr-2 font-light display ">{date}</p>
            </div> 
            <div className="p-2 sm:p-4">
            {
              loading ? (
              <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                    <div class="animate-pulse flex space-x-4">
                      <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                      <div class="flex-1 space-y-6 py-1">
                        <div class="h-2 bg-slate-200 rounded"></div>
                        <div class="space-y-3">
                          <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                          </div>
                          <div class="h-2 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                </div>
                ):fetchError ? (
                  <h1 className="text-4xl">{fetchError}</h1>
            ):(data && data.main) ?
                (
                 <> 
                  <div className="flex justify-between items-center smallest">
                    <div className="flex items-center">
                      <img className="max-[400px]:h-14 max-[400px]:w-14 betweenWeatherImage" 
                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
                        alt={data.weather[0] && data.weather[0].description && data.weather[0].description}></img>
                      <h1 className="max-[820px]:text-[28px] lg:text-3xl max-[270px]:text-[21px] text-3xl">
                      {data.main.temp && Math.floor(data.main.temp-273.15)+"°C"}
                      </h1>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 mt-2">
                      <h1 className="text-2xl xl:text-3xl font-light max-[325px]:text-base between max-[870px]:text-xl max-[800px]:pr-2 pr-7">{data.main.feels_like && `RealFeel ${Math.floor(data.main.feels_like-273.15) + "°"}`}</h1>
                    </div>
                  </div>
                  <div className="pt-2 pb-2 flex pl-5 justify-center">
                  {data && data.name ? 
                      (<h1 className="flex text-3xl gap-2  items-center mt-5 xl:text-3xl">
                        <svg className="h-4 w-4 lg:h-7 lg:w-7 sm:h-4 sm:w-4" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 384 512">
                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                        /></svg>
                        {data.name}
                      </h1>):(<></>)}
                  </div>
                  {(data.weather[0] && data.weather[0].description) ?
                  <h1 className="text-xl lg:text-3xl sm:text-2xl font-light mt-4 pb-2 border-b">
                  {data.weather[0] && data.weather[0].description && `${data.weather[0]["description"][0].toUpperCase()+data.weather[0]["description"].slice(1)}`}
                  </h1>
                  :("")}
                  <div className="flex flex-row justify-between  gap-7 sm:gap-10 mt-7 w-full font-size betweenText arrange"> 
                  {data.wind ?
                    <div className="flex flex-col gap-7 w-full justify-center">
                      {data.wind.speed ?
                        <div className="flex justify-between p-1 border-b">
                           <h1>Wind</h1> 
                           <h1>{Math.ceil(data.wind.speed*1.60934)} Km/h</h1>
                        </div>
                        :("")}
                      {data.wind.gust ?
                        <div className="flex justify-between p-1 border-b ">
                           <h1>Wind gusts</h1> 
                           <h1>{Math.ceil(data.wind.gust*1.60934)} Km/h</h1>
                        </div>
                        :("")}
                      {data.visibility ?
                        <div className="flex justify-between p-1 border-b">
                           <h1>Visibility</h1> 
                           <h1>{data.visibility/1000} Km</h1>
                        </div>
                      :("")}
                    </div>
                    :("")}
                    <div className="flex flex-col gap-7 w-full font-size justify-center font-size-small betweenText">
                      {data.main.pressure ?
                        <div className="flex justify-between p-1 border-b">
                           <h1>Pressure</h1> 
                           <h1>{Math.ceil(data.main.pressure)} mb</h1>
                        </div>:("")}
                      {data.main.humidity ?
                          <div className="flex justify-between p-1 border-b">
                           <h1>Humidity</h1> 
                           <h1>{Math.ceil(data.main.humidity)} mb</h1>
                        </div>:("")}
                      {(data.clouds && data.clouds.all) ?
                        <div className="flex justify-between p-1 border-b ">
                           <h1>Cloud Cover</h1> 
                           <h1>{data.clouds.all} %</h1>
                        </div>:("")}
                    </div>
                  </div>
                 </>
                ):<></>}
            </div>
        </div>
    )
}
export default Widget;