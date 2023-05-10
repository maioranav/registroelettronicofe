import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = process.env.REACT_APP_APIURL;

export const cleanProfile = createAction("CLEAN_PROFILE");

export interface IProfile {
  id?: number;
  email: string;
  password?: string;
  username: string;
  name: string;
  surname: string;
}

const initialState = {
  myProfile: {} as IProfile,
  status: "idle",
};

export const myProfileFetch = createAsyncThunk("fetch-profile", async (accessToken: string) => {
  try {
    const response = await fetch(url + "/auth/profile", {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    });
    if (response.ok) {
      const data: IProfile = await response.json();
      return data;
    } else {
      console.log("errore");
    }
  } catch (error) {
    console.log(error);
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(myProfileFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(myProfileFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.myProfile = action.payload as IProfile;
      })
      .addCase(myProfileFetch.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(cleanProfile, (state) => (state = initialState));
  },
});

export default profileSlice.reducer;
