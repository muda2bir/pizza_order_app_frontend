import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login_page";
import RegisterPage from "./pages/register_page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // CSS for the toasts
import HomePage from "./pages/home_page";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
