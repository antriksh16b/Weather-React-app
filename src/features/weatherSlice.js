import {createSlice} from "@reduxjs/toolkit";

const initialState={                            //initial values of global variable 
    data:{id:1,location:"agra",data:{}}
}

export const weatherSlice=createSlice({               //slice is the grouping of different contexts
    name:"weather",
    initialState,
    reducers: {                               //reducers are functionalities given to a slice
         setWeatherData:(state,action)=>{
            state.data=action.payload
        }
    }
})

export const {setWeatherData}=weatherSlice.actions;

export default weatherSlice.reducer;