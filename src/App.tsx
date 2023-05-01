import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // CSS for the toasts
import CartPage from "./pages/cart_page";
import HomePage from "./pages/home_page";
import LoginPage from "./pages/login_page";
import OrdersPage from "./pages/orders_page";
import ProfilePage from "./pages/profile_page";
import RegisterPage from "./pages/register_page";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
