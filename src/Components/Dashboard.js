import { useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux"
import useWeatherInfo from "../CustomHooks/useWeatherInfo";
import {addCity,removeAll} from "../features/citySlice";
import SmallCard from "./SmallCard";
import Svg from "../four-squares-button-of-view-options-svgrepo-com.svg";
import Form from "./Form";

//Dashboard is to maintain different cities by the user
function Dashboard(){
    let [input,setInput]=useState(null);
    let arrayOfCity=useSelector((state)=>state.arrayOfCity)
    let [debounceInput,setDebounceInput]=useState("")
    let {data,fetchError}=useWeatherInfo({city:debounceInput,component:"City"});
    let dispatch=useDispatch();
   
    useEffect(()=>{
         const timeOutId=setTimeout(()=>{
            setDebounceInput(input);
         },400)
         return(()=>{
            clearTimeout(timeOutId);
         })
    },[input])

    function handleSubmit(event){
         event.preventDefault();
           if(data && debounceInput){
             dispatch(addCity({data,debounceInput}));
             setInput("");
           }
    }
    function handleRemove(){
           dispatch(removeAll());
    }
    return(
        <div className="flex flex-col h-full items-center w-full max-w-xl smaller">
        <div className="flex tored justify-center bg-blue-400/80 gap-5 mt-2 shadow-md border rounded-lg p-2 cursor-context-menu">
            <img 
            className="h-7 w-7" 
            src={Svg} 
            alt="dashboard icon"></img>
            <h1 className="text-xl">Dashboard</h1>
        </div>
        <Form handleSubmit={handleSubmit} setInput={setInput} input={input}></Form>
        <div className="flex justify-center max-w-lg h-fit w-full m-4 mt-2 flex-wrap max-h-[375px] overflow-y-auto rounded-lg">
            {arrayOfCity.map((currentValue)=>(
                (<SmallCard res={currentValue.location} id={currentValue.id}></SmallCard>)           //rendering 
            ))}
        </div>
        <div className>
        {arrayOfCity.length ?
          (<button onClick={handleRemove} className="p-2 absolute change mr-5 mb-2 bottom-0 shadow-md rounded-lg bg-blue-200 hover:bg-blue-400">Clear all</button>
          ):(<></>)}
        </div>
        </div>
    )
}
export default Dashboard;