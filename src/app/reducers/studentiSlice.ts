import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Studente, PageableFetch } from "../custominterfaces";

const url = process.env.REACT_APP_APIURL;

const initialState = {
  studenti: {
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
  } as PageableFetch<Studente[]>,
  status: "idle",
};

interface IStudenteFetch {
  accessToken: string;
  elNo?: number;
  page?: number;
  sort?: string;
}

export const studentiFetch = createAsyncThunk("fetch-studenti", async ({ accessToken, elNo = 4, page = 0, sort }: IStudenteFetch) => {
  let pageable = `?page=${page}&size=${elNo}`;
  if (sort !== null && sort !== undefined) {
    pageable += `&sort=${sort}`;
  }
  try {
    const response = await fetch(url + "/studenti" + pageable, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    });
    if (response.ok) {
      const data: PageableFetch<Studente[]> = await response.json();
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

const studentiSlice = createSlice({
  name: "studenti",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(studentiFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(studentiFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.studenti = action.payload as PageableFetch<Studente[]>;
      })
      .addCase(studentiFetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default studentiSlice.reducer;
