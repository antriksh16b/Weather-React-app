import { useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux"
import useWeatherInfo from "../CustomHooks/useWeatherInfo";
import {addCity,removeAll} from "../features/citySlice";
import SmallCard from "./SmallCard";
import Svg from "../four-squares-button-of-view-options-svgrepo-com.svg"

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
         },500)
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
        <div className="flex justify-center bg-blue-400/80 gap-5 mt-2 shadow-md border rounded-lg p-2 cursor-context-menu">
            <img 
            className="h-7 w-7" 
            src={Svg} 
            alt="dashboard icon"></img>
            <h1 className="text-xl">Dashboard</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex cursor-pointer rounded-lg w-full max-w-72 shadow overflow-hidden h-10 mt-5 mb-1">
            <input 
            className="p-2 w-full px-5 cursor-pointer" 
            type="text" 
            placeholder="Add cities "
            value={input} 
            onChange={(event)=>{
                setInput(event.target.value)
            }} 
            ></input>
            <button className="p-2 bg-blue-200 hover:bg-blue-400">Add</button>
        </form>
        <div className="flex justify-center max-w-lg w-full h-fit m-4 mt-2 max-h-96 flex-wrap m overflow-y-auto rounded-lg">
            {arrayOfCity.map((currentValue)=>(
                (<SmallCard res={currentValue}></SmallCard>)           //rendering 
            ))}
        </div>
        {arrayOfCity.length ?
          (<button onClick={handleRemove} className="p-2 shadow-md absolute bottom-4 rounded-lg bg-blue-200 hover:bg-blue-400">Clear all</button>
          ):(<></>)}
        </div>
    )
}
export default Dashboard;