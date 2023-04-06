import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserAuth {
  authenticated: boolean;
}

export interface UserAuthType {
  value: UserAuth;
}

const initialState: UserAuthType = {
  value: {
    authenticated: false,
  },
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAuth: (state, action: PayloadAction<UserAuth>) => {
      state.value = action.payload;
    },
  },
});

export const { setUserAuth } = authSlice.actions;
export default authSlice.reducer;
