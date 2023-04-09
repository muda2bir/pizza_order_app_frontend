import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AppLayout from "../components/AppLayout";
import { useCurrentUser } from "../utils/useCurrentUser";

export default function ProfilePage() {
  const currentUser = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    useCurrentUser(dispatch, navigate);
  }, []);

  return (
    <AppLayout>
      <>
        <h1 className="mb-12 text-4xl font-primary text-center">Profile</h1>
        <h1>{currentUser.name}</h1>
      </>
    </AppLayout>
  );
}
