import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login_page";
import RegisterPage from "./pages/register_page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // CSS for the toasts

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Welcome</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
