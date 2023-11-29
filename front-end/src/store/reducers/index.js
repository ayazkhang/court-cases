import { combineReducers } from "redux";
import casesReducer from "./cases";

const rootReducer = combineReducers({
  cases: casesReducer,
});

export default rootReducer;
