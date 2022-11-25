import { combineReducers,compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Users";

const reducer = combineReducers({
  user: userReducer
});

const store = configureStore(
    { reducer },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;