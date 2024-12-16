import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeSlice from "./theme/themeSlice";

const rootReducer = combineReducers({
  user: userSlice,
  theme: themeSlice,
  // Add other reducers here as needed
});

const presistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(presistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
