import { applyMiddleware, combineReducers } from "@reduxjs/toolkit";
import { remoteReducer } from "../reducers/remoteReducer";
import { createStore } from "redux";
import thunk from "redux-thunk";

let rootReducer = combineReducers({ remote: remoteReducer });

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const store = createStoreWithMiddleware(rootReducer);
