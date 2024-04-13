import {createSlice,nanoid} from "@reduxjs/toolkit";

let initialState={
    arrayOfCity:[],
    currentData:""
}

export let citySlice=createSlice({
    name:"arrayOfCity",
    initialState,
    reducers:{
        addCity:(state,action)=>{
            let check=state.arrayOfCity.some((currentValue)=>{
                return(currentValue.location.toLowerCase() === action.payload.debounceInput.toLowerCase())
            })
            if(!check && action.payload!=null){
            let city={
                id:nanoid(),
                location:action.payload.debounceInput,
                data:action.payload.data
            }
            state.arrayOfCity.push(city);
          }
        },
        removeCity:(state,action)=>{
            state.arrayOfCity=state.arrayOfCity.filter((currentValue)=>{
                return (currentValue.id !== action.payload)
            })
        },
        removeAll:(state,action)=>{
            state.arrayOfCity=[];
        },
        setWeatherData:(state,action)=>{
            console.log(action.payload)
            state.currentData=action.payload;
        }
    }
});

export let {addCity,removeCity,removeAll,setWeatherData}=citySlice.actions;

export default citySlice.reducer;

