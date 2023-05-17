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

interface ILezioneFetch {
  accessToken: string;
  corsi?: Corso[] | undefined;
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
      let res = await response.json();
      console.log(res.message);
      return Promise.reject(res.message);
    }
  } catch (error) {
    return Promise.reject(error);
  }
});

export const lezioniFetchData = createAsyncThunk("fetch-lezioni-data", async ({ accessToken, data }: ILezioneFetch) => {
  try {
    const response = await fetch(url + "/lezioni/after/" + data, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken, "Content-Type": "Application/Json" },
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

export const lezioniFetchDataEsatta = createAsyncThunk("fetch-lezioni-dataesatta", async ({ accessToken, data }: ILezioneFetch) => {
  try {
    const response = await fetch(url + "/lezioni/data/" + data, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken, "Content-Type": "Application/Json" },
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

const lezioniSlice = createSlice({
  name: "lezioni",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(lezioniFetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(lezioniFetchData.fulfilled, (state, action) => {
        state.status = "idle";
        state.lezioni = action.payload as ILezione[];
      })
      .addCase(lezioniFetchData.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(lezioniFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(lezioniFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.lezioni = action.payload as ILezione[];
      })
      .addCase(lezioniFetch.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(lezioniFetchDataEsatta.pending, (state) => {
        state.status = "loading";
      })
      .addCase(lezioniFetchDataEsatta.fulfilled, (state, action) => {
        state.status = "idle";
        state.lezioni = action.payload as ILezione[];
      })
      .addCase(lezioniFetchDataEsatta.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default lezioniSlice.reducer;
