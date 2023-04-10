import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AppLayout from "../components/AppLayout";
import { useCurrentUser } from "../utils/useCurrentUser";
import { useState } from "react";
import btnLoader from "../assets/button_loader.svg";
import { toast } from "react-toastify";
import axios from "axios";

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
        <h1 className="mb-12 text-4xl font-primary text-center">
          Your Profile
        </h1>
        <div id="name_container" className="grid grid-cols-2 py-8 md:py-6">
          <span className="font-primary text-[#828282] text-sm">USER ID</span>
          <span className="font-primary text-[#333] text-base justify-self-start">
            #{currentUser._id.slice(0, 8)}
          </span>
        </div>
        <hr />
        <div id="name_container" className="grid grid-cols-2 py-8 md:py-6">
          <span className="font-primary text-[#828282] text-sm">NAME</span>
          <span className="font-primary text-[#333] text-base justify-self-start">
            {currentUser.name}
          </span>
        </div>
        <hr />
        <div id="name_container" className="grid grid-cols-2 py-8 md:py-6">
          <span className="font-primary text-[#828282] text-sm">EMAIL</span>
          <span className="font-primary text-[#333] text-base justify-self-start">
            {currentUser.email.slice(0, 12)}...
          </span>
        </div>
        <hr />
        <button
          className={`bg-[#FC5D3D] hover:bg-[#FC823D] text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-6 font-primary ${
            signOut ? "cursor-not-allowed" : ""
          } `}
          disabled={signOut}
          onClick={logoutUser}
        >
          {signOut ? (
            <div className="flex items-center gap-2 justify-center">
              <img src={btnLoader} alt="loading.." className="h-6" /> Loading...
            </div>
          ) : (
            "Logout"
          )}
        </button>
      </>
    </AppLayout>
  );
}
