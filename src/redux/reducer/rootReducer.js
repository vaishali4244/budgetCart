import { combineReducers } from "redux";
import  userDetail  from "./userReducer";

const rootReducer = combineReducers({
    user:userDetail,
})


export default rootReducer;