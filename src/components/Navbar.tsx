import { Link } from "react-router-dom";
import SiteLogo from "../assets/logo.png";
import cartIcon from "../assets/cart.svg";
import profileIcon from "../assets/profile.svg";

export default function Navbar() {
  return (
    <nav className="flex mb-3 items-center justify-between overflow-hidden py-5 font-primary relative md:mb-4 lg:mb-0 lg:py-10">
      <Link to="/">
        <img
          src={SiteLogo}
          alt="PizzaStore"
          className="h-20 md:h-32 lg:h-36 xl:h-28"
        />
      </Link>

      <ul className="flex items-center gap-4 md:gap-8 xl:gap-10 md:text-xl lg:text-2xl xl:text-lg">
        <li>
          <Link to="/cart" className="hover:underline underline-offset-8">
            Cart
          </Link>
        </li>
        <li>
          <Link to="/orders" className="hover:underline underline-offset-8">
            Orders
          </Link>
        </li>
      </ul>

      <div id="profile_cart_block" className="flex items-center gap-4">
        <Link to="/profile">
          <img
            src={profileIcon}
            alt="Profile"
            className="h-10 cursor-pointer md:h-12 lg:h-14 xl:h-9"
          />
        </Link>
      </div>
      <div
        id="main_profile_container"
        className="absolute right-0 top-full bg-red-200"
      >
        <div id="logout_state">
          <button>Login</button>
          <p>
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </nav>
  );
}
