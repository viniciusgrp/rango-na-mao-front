import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProps {
  nome?: string;
  email?: string;
}

interface UserState {
  user: UserProps | null;
  token: string;
  type: string;
}

const initialState: UserState = {
  user: null,
  token: "",
  type: "user",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserAndToken: (
      state,
      action: PayloadAction<{ user: UserProps; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { setUser, setToken, setUserAndToken } = userSlice.actions;