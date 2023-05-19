import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Corso, PageableFetch } from "../custominterfaces";

const url = process.env.REACT_APP_APIURL;

const initialState = {
  corsi: {
    content: [],
    pageable: {
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      offset: 0,
      pageSize: 20,
      pageNumber: 0,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalElements: 0,
    totalPages: 1,
    size: 20,
    number: 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    first: true,
    numberOfElements: 0,
    empty: true,
  } as PageableFetch<Corso[]>,
  status: "idle",
};

interface ICorsoFetch {
  accessToken: string;
  elNo?: number;
  page?: number;
  sort?: string;
}

interface ICorsoDelete {
  accessToken: string;
  id: number;
}

export const corsiFetch = createAsyncThunk("fetch-corsi", async ({ accessToken, elNo = 4, page = 0, sort }: ICorsoFetch) => {
  let pageable = `?page=${page}&size=${elNo}`;
  if (sort !== null && sort !== undefined) {
    pageable += `&sort=${sort}`;
  }
  try {
    const response = await fetch(url + "/corsi" + pageable, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    });
    if (response.ok) {
      const data: PageableFetch<Corso[]> = await response.json();
      return data;
    } else {
      const res = await response.json();
      console.log(res.message);
      return Promise.reject(res.message);
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
});

export const deleteCorso = createAsyncThunk("fetch-corsi", async ({ accessToken, id }: ICorsoDelete) => {
  try {
    const response = await fetch(url + "/corsi/id/" + id, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + accessToken },
    });
    if (response.ok) {
      const data: PageableFetch<Corso[]> = await response.json();
      return data;
    } else {
      const res = await response.json();
      console.log(res.message);
      return Promise.reject(res.message);
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
});

const corsiSlice = createSlice({
  name: "corsi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(corsiFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(corsiFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.corsi = action.payload as PageableFetch<Corso[]>;
      })
      .addCase(corsiFetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default corsiSlice.reducer;
