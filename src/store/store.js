import {configureStore} from "@reduxjs/toolkit";
import cityReducer from "../features/citySlice"
import  storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";


const persistConfig={     //persist config defines save data to storage with a name
      key:'data',
      storage,
      whitelist:["arrayOfCity"]
}
const persistedReducer=persistReducer(persistConfig,cityReducer);   //persistreducer persist or save slice reducers to persist slice state in storage,it adds capability or wraps them with code that allow slice reducers to persist state inside local storage and then rehydrated back to redux store
                                                                    // 

export let store=configureStore({
      reducer:persistedReducer
})

export const persistor=persistStore(store);   // persistor works with persisted to save state when app changes or restarts,this takes city store to get access of reducer so that all changes or updates can be done also to localstorage
