

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/userSlice.js";
import snackbarReducer from "./reducers/snackbarSlice.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  snackbar: snackbarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userReducer from "./reducers/userSlice";

// import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import snackbarReducer  from "./reducers/snackBarSlice";


// const persistConfig  = {
//     key:"root",
//     version:1,
//     storage,
// }

// const rootReducer = combineReducers (
//     {
//         user:userReducer,
//         snackbar:snackbarReducer 
//     }
// );

// const presistedReducer = persistReducer(persistConfig,rootReducer);

// export const store =configureStore({
//     reducer:presistedReducer,
//     middleware:(getDefaultMiddleware) => 
//         getDefaultMiddleware({
//             serializableCheck:{
//                 ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
//             }
//         })
// })

// export const persistor = persistStore(store)