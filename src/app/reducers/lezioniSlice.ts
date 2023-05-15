import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Corso, Studente } from "../custominterfaces";

const url = process.env.REACT_APP_APIURL;

export const cleanProfile = createAction("CLEAN_PROFILE");

export interface ILezione {
  id: number;
  data: Date;
  presenze: Studente[];
  corso: Corso;
}

interface ILezioneFetch {
  accessToken: string;
  corsi: Corso[] | undefined;
  data: Date | string;
}

const initialState = {
  lezioni: [] as ILezione[],
  status: "idle",
};

export const lezioniFetch = createAsyncThunk("fetch-lezioni", async ({ accessToken, corsi, data }: ILezioneFetch) => {
  try {
    const response = await fetch(url + "/lezioni/calendario/" + data, {
      method: "POST",
      headers: { Authorization: "Bearer " + accessToken, "Content-Type": "Application/Json" },
      body: JSON.stringify(corsi),
    });
    if (response.ok) {
      const data: ILezione[] = await response.json();
      return data;
    } else {
      console.log("errore");
    }
  } catch (error) {
    console.log(error);
  }
});

const lezioniSlice = createSlice({
  name: "lezioni",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(lezioniFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(lezioniFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.lezioni = action.payload as ILezione[];
      })
      .addCase(lezioniFetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default lezioniSlice.reducer;
