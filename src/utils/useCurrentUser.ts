import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { UserAuthType, setUserAuth } from "../features/user/authSlice";
import { UserType, setUser } from "../features/user/userSlice";

export async function useCurrentUser(
  dispatch: ThunkDispatch<
    {
      user: UserType;
      auth: UserAuthType;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  navigate: NavigateFunction
) {
  try {
    let response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_SERVER_URL}/api/v1/users/get_user`,
      withCredentials: true,
    });

    let { data } = response;
    dispatch(
      setUserAuth({
        authenticated: true,
      })
    ); // Authenticated the user in the state
    dispatch(
      setUser({
        _id: data.user._id,
        name: data.user.full_name,
        email: data.user.email,
      })
    );
  } catch (err) {
    navigate("/login");
  }
}
