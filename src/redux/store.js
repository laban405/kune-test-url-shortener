import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slices/message";
const reducer = {
   message: messageReducer,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["shorten/url/fulfilled"],
      },
    }),
});
export default store;
