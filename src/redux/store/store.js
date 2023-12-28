import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/rootReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key:"root",
    storage: storage,
  
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer : persistedReducer,

})

export const persistedStore = persistStore(store)