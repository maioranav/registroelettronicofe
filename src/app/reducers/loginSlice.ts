import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = process.env.REACT_APP_APIURL;

export const cleanToken = createAction("CLEAN_TOKEN");

export interface IToken {
  username: string;
  accessToken: string;
  tokenType: string;
  role: IRole[];
  userType: string;
}

export interface IRole {
  id: number;
  roleName: string;
}

export interface loginDTO {
  username: string;
  password: string;
}

const initialState = {
  token: {
    accessToken: "",
    username: "",
    tokenType: "",
    role: [],
    userType: "",
  } as IToken,
  status: "idle",
};

export const myTokenFetch = createAsyncThunk("fetch-token", async ({ username, password }: loginDTO) => {
  try {
    const response = await fetch(url + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.ok) {
      const data: IToken = await response.json();
      return data;
    } else {
      let res = await response.json();
      console.log(res.message);
      return Promise.reject(res.message);
    }
  } catch (error) {
    console.log(error);
    return Promise.reject();
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
