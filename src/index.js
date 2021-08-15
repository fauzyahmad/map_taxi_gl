import React from "react";
import ReactDOM from "react-dom";
import {DataLayer} from './context/DataLayer';
import reducer from './context/reducer';
import {initialState} from './context/reducer';
import App from "./App";
// import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <App />
    </DataLayer>
  </React.StrictMode>,
  document.getElementById('app')
);