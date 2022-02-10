import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      return { messages: action.payload };
    },
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: "" };
    },
  },
});
const { reducer, actions } = messageSlice;
export const { setMessage, clearMessage } = actions
export default reducer;