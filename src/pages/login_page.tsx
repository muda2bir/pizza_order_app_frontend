import { Link } from "react-router-dom";
import LoginRegisterLayout from "../components/LoginRegisterLayout";
import Login from "../components/login";

export default function LoginPage() {
  return (
    <LoginRegisterLayout>
      <h1 className="font-primary font-[600] text-3xl mb-6">
        PizzaStore Login
      </h1>
      <Login />
      <p className="text-center font-primary text-[#828282] mb-6 2xl:text-sm">
        Don&apos;t have an account yet?{" "}
        <Link to="/register" className="text-[#2F80ED]">
          Register
        </Link>
      </p>
    </LoginRegisterLayout>
  );
}
