import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AppLayout from "../components/AppLayout";
import Button from "../components/Button";
import { useCurrentUser } from "../utils/useCurrentUser";

export default function ProfilePage() {
  const currentUser = useAppSelector((state) => state.user.value);
  const [signOut, setSignOut] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    useCurrentUser(dispatch, navigate);
  }, []);

  async function logoutUser() {
    try {
      let response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_SERVER_URL}/api/v1/users/logout`,
        withCredentials: true,
      });
      let { data } = response;
      if (data.status === "error") {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      navigate("/");
    } catch (err) {
      toast.error("Please try again later!");
    }
  }

  return (
    <AppLayout>
      <>
        <h1 className="mb-12 md:mb-14 text-4xl md:text-5xl font-primary text-center">
          Your Profile
        </h1>
        <div id="id_container" className="grid grid-cols-2 py-8 md:py-6">
          <span className="font-primary text-[#828282] text-sm md:text-lg">
            USER ID
          </span>
          <span className="font-primary text-[#333] text-base justify-self-start">
            #{currentUser._id.slice(0, 8)}
          </span>
        </div>
        <hr />
        <div id="name_container" className="grid grid-cols-2 py-8 md:py-6">
          <span className="font-primary text-[#828282] text-sm md:text-lg">
            NAME
          </span>
          <span className="font-primary text-[#333] text-base justify-self-start">
            {currentUser.name}
          </span>
        </div>
        <hr />
        <div
          id="email_container"
          className="grid grid-cols-2 py-8 md:py-6 md:mb-6"
        >
          <span className="font-primary text-[#828282] text-sm md:text-lg">
            EMAIL
          </span>
          <span className="font-primary text-[#333] text-base justify-self-start">
            {currentUser.email.slice(0, 12)}...
          </span>
        </div>
        <hr />
        <Button
          loadingState={signOut}
          clickFunction={logoutUser}
          btnText="Logout"
        />
      </>
    </AppLayout>
  );
}
