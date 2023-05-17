import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Corso, Studente } from "../custominterfaces";

const url = process.env.REACT_APP_APIURL;

export const cleanProfile = createAction("CLEAN_PROFILE");

export interface ILezione {
  id: number;
  data: Date;
  presenze: Studente[];
  corso: Corso;
  orario: number;
}

interface IPresenzeFetch {
  accessToken: string;
}

const initialState = {
  lezioni: [] as ILezione[],
  status: "idle",
};

export const presenzeFetch = createAsyncThunk("fetch-presenze", async ({ accessToken }: IPresenzeFetch) => {
  try {
    const response = await fetch(url + "/lezioni/last7", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "Application/Json",
      },
    });
    if (response.ok) {
      const data: ILezione[] = await response.json();
      return data;
    } else {
      let res = await response.json();
      console.log(res.message);
      return Promise.reject(res.message);
    }
  } catch (error) {
    return Promise.reject(error);
  }
});

const presenzeSlice = createSlice({
  name: "presenze",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(presenzeFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(presenzeFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.lezioni = action.payload as ILezione[];
      })
      .addCase(presenzeFetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default presenzeSlice.reducer;
