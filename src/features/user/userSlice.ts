import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserObj {
  _id: string;
  name: string;
  email: string;
}

export interface UserType {
  value: UserObj;
}

const initialState: UserType = {
  value: {
    _id: "",
    name: "",
    email: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserObj>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
