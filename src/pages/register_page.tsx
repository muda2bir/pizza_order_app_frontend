import { Link } from "react-router-dom";
import LoginRegisterLayout from "../components/LoginRegisterLayout";
import Register from "../components/register";

export default function RegisterPage() {
  return (
    <LoginRegisterLayout>
      <h1 className="font-primary font-[600] text-3xl mb-6">Create Account</h1>
      <Register />
      <p className="text-center font-primary text-[#828282] mb-6 2xl:text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-[#2F80ED]">
          Login
        </Link>
      </p>
    </LoginRegisterLayout>
  );
}
