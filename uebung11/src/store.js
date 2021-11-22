import listReducer from "./reducers/listReducers";
import {combineReducers, createStore} from "redux";
import counterReducer from "./reducers/counterReducer";

const store = createStore(combineReducers({listReducer,counterReducer}));
store.subscribe(()=>console.log(store.getState()))
export default store;
