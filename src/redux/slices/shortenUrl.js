import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import HttpService from "../../services/http.service";


export const shortenLink = createAsyncThunk(
  "shorten/url",
  async ({ url, data }, thunkAPI) => {
    try {
      console.log("<<<data>>", JSON.parse(data));
      const response = await HttpService.postData(url, JSON.parse(data));
      console.log('response 1',response);
      thunkAPI.dispatch(setMessage(response.data.shortUrl));
      return response;
    } catch (error) {
      console.log("error", error);
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      thunkAPI.dispatch(setMessage('Oops! An error occurred'));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {};

const shortenUrlSlice = createSlice({
  name: "shorten-url",
  initialState,
  extraReducers: {
    [shortenLink.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [shortenLink.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

const { reducer } = shortenUrlSlice;
export default reducer;
