import { useFormik } from "formik";
import { loginValidation } from "../validation/loginValidation";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import btnLoader from "../assets/button_loader.svg";

export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidation,
    onSubmit: async (values) => {
      try {
        const response = await axios({
          method: "post",
          url: `${import.meta.env.VITE_SERVER_URL}/api/v1/users/login`,
          data: {
            email: values.email,
            password: values.password,
          },
          withCredentials: true,
        });
        const { data } = response;
        if (data.status === "error") {
          toast.error(data.message);
          return;
        }
        toast.success(data.message);
        navigate("/");
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
  });
  return (
    <form className="bg-white rounded mb-4" onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Your email
        </label>
        <input
          className={`shadow appearance-none border ${
            formik.touched.email && formik.errors.email ? "border-red-500" : ""
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="email"
          type="email"
          placeholder="name@mail.com"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
        ) : null}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={`shadow appearance-none border ${
            formik.touched.password && formik.errors.password
              ? "border-red-500"
              : ""
          } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
          id="password"
          type="password"
          placeholder="******************"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-500 text-xs italic">
            {formik.errors.password}
          </p>
        ) : null}
      </div>
      <div className="flex items-center justify-between">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline ${
            formik.isSubmitting ? "cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <div className="flex items-center gap-2 justify-center">
              <img src={btnLoader} alt="loading.." className="h-6" /> Loading...
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </form>
  );
}
