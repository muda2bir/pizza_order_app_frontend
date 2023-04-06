import { useFormik } from "formik";
import { registerValidation } from "../validation/registerValidation";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import btnLoader from "../assets/button_loader.svg";

export default function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: registerValidation,
    onSubmit: async (values) => {
      try {
        const response = await axios({
          method: "post",
          url: `${import.meta.env.VITE_SERVER_URL}/api/v1/users/register`,
          withCredentials: true,
          data: {
            full_name: values.name,
            email: values.email,
            password: values.password,
          },
        });
        const { data } = response;
        if (data.status === "error") {
          toast.error(data.message);
          return;
        }
        navigate("/login");
        toast.success(data.message);
      } catch (err) {
        toast.error("Something went wrong!");
      }
    },
  });

  return (
    <form className="bg-white rounded  mb-4" onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Your name
        </label>
        <input
          className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Rakesh Kumar"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Your email
        </label>
        <input
          className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="name@mail.com"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
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
          } rounded-xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
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
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="cpassword"
        >
          Confirm Password
        </label>
        <input
          className={`shadow appearance-none border ${
            formik.touched.cpassword && formik.errors.cpassword
              ? "border-red-500"
              : ""
          } rounded-xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
          id="cpassword"
          type="password"
          placeholder="******************"
          onChange={formik.handleChange}
          value={formik.values.cpassword}
        />
        {formik.touched.cpassword && formik.errors.cpassword ? (
          <p className="text-red-500 text-xs italic">
            {formik.errors.cpassword}
          </p>
        ) : null}
      </div>
      <div className="flex items-center justify-between">
        <button
          className={`bg-[#FC5D3D] hover:bg-[#FC823D] text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline ${
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
            "Create Account"
          )}
        </button>
      </div>
    </form>
  );
}
