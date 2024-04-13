import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import { persistor,store } from '../src/store/store';
import { PersistGate } from "redux-persist/integration/react";
import Loading from './Components/Loading';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store} >
       <PersistGate loading={<Loading></Loading>} persistor={persistor}> {/* //persistancegate is used to prevent application from rendering before the persisted state is retrieved and set in redux store */}
        <App />                                        { /*   // persistor makes data available to slice state using persistReducer */}
      </PersistGate>                                     {/* //persistgate is used to make data available thrugh persistor which uses persist reducer*/}
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
