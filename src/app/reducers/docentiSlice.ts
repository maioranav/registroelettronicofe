import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Docente, PageableFetch } from "../custominterfaces";

const url = process.env.REACT_APP_APIURL;

const initialState = {
  docenti: {
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
  } as PageableFetch<Docente[]>,
  status: "idle",
};

interface IDocenteFetch {
  accessToken: string;
  elNo?: number;
  page?: number;
  sort?: string;
}

interface IDocenteDelete {
  accessToken: string;
  id: number;
}

export const docentiFetch = createAsyncThunk("fetch-docenti", async ({ accessToken, elNo = 4, page = 0, sort }: IDocenteFetch) => {
  let pageable = `?page=${page}&size=${elNo}`;
  if (sort !== null && sort !== undefined) {
    pageable += `&sort=${sort}`;
  }
  try {
    const response = await fetch(url + "/docenti" + pageable, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    });
    if (response.ok) {
      const data: PageableFetch<Docente[]> = await response.json();
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

export const deleteDocente = createAsyncThunk("delete-docenti", async ({ accessToken, id }: IDocenteDelete) => {
  try {
    const response = await fetch(url + "/docenti/id/" + id, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + accessToken },
    });
    if (response.ok) {
      const data: Docente = await response.json();
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

const docentiSlice = createSlice({
  name: "docenti",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(docentiFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(docentiFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.docenti = action.payload as PageableFetch<Docente[]>;
      })
      .addCase(docentiFetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default docentiSlice.reducer;
