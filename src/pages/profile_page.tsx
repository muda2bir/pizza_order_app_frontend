import AppLayout from "../components/AppLayout";
import { useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const userAuthenticated = useAppSelector(
    (state) => state.auth.value.authenticated
  );
  useEffect(() => {
    if (!userAuthenticated) navigate("/");
  }, []);

  return (
    <AppLayout>
      <h1 className="mb-12 text-4xl font-primary text-center">Profile</h1>
      <></>
    </AppLayout>
  );
}
