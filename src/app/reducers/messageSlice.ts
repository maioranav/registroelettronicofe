import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Corso, Docente, PageableFetch } from "../custominterfaces";

const url = process.env.REACT_APP_APIURL;

export const cleanProfile = createAction("CLEAN_PROFILE");

export interface IMessage {
  id?: number;
  data: Date;
  msg: string;
  corso: Corso;
  docente: Docente;
}

const initialState = {
  messages: {
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
  } as PageableFetch<IMessage[]>,
  status: "idle",
};

interface IMessageFetch {
  accessToken: string;
  elNo?: number;
  page?: number;
  sort?: string;
  corsi?: Corso[];
}

interface IMessageDelete {
  accessToken: string;
  id: number;
}

export const messagesFetch = createAsyncThunk("fetch-messages", async ({ accessToken, elNo = 4, page = 0, sort }: IMessageFetch) => {
  let pageable = `?page=${page}&size=${elNo}`;
  if (sort !== null && sort !== undefined) {
    pageable += `&sort=${sort}`;
  }
  try {
    const response = await fetch(url + "/msgs" + pageable, {
      method: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    });
    if (response.ok) {
      const data: PageableFetch<IMessage[]> = await response.json();
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

export const deleteMessaggio = createAsyncThunk("fetch-messaggio-delete", async ({ accessToken, id }: IMessageDelete) => {
  try {
    const response = await fetch(url + "/msgs/id/" + id, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + accessToken },
    });
    if (response.ok) {
      const data: IMessage = await response.json();
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

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(messagesFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(messagesFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.messages = action.payload as PageableFetch<IMessage[]>;
      })
      .addCase(messagesFetch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default messagesSlice.reducer;
