import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = process.env.REACT_APP_APIURL;

export const cleanToken = createAction("CLEAN_TOKEN");

interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface loginDTO {
  email: string;
  password: string;
}

const initialState = {
  token: {
    accessToken: "",
    refreshToken: "",
  } as IToken,
  status: "idle",
};

export const myTokenFetch = createAsyncThunk("fetch-token", async ({ email, password }: loginDTO) => {
  try {
    const response = await fetch(url + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.ok) {
      const data: IToken = await response.json();
      return data;
    } else {
      console.log("errore");
    }
  } catch (error) {
    console.log(error);
  }
});

const loginSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(myTokenFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(myTokenFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload as IToken;
      })
      .addCase(myTokenFetch.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(cleanToken, (state) => (state = initialState));
  },
});

export default loginSlice.reducer;
