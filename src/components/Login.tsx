import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import btnLoader from "../assets/button_loader.svg";
import { setUserAuth } from "../features/user/authSlice";
import { setCart } from "../features/user/cartSlice";
import { setUser } from "../features/user/userSlice";
import { loginValidation } from "../validation/loginValidation";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.value);
  const currentUser = useAppSelector((state) => state.user.value);
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
        dispatch(
          setUserAuth({
            authenticated: true,
          })
        ); // Authenticated the user in the state
        dispatch(
          setUser({
            _id: data.user._id,
            name: data.user.full_name,
            email: data.user.email,
          }) // user set on the state
        ); // saving the user in the state
        handleAddToCart(data.message, data.user._id); // add the item to cart after successful login
        return; // and the no need to do any thing just return;
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
  });

  async function handleAddToCart(successMessage: string, customer_id: string) {
    toast.success(successMessage);
    navigate("/");
    if (cart.selectedIngredients.length > 0) {
      let response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_SERVER_URL}/api/v1/cart/push_to_cart`,
        withCredentials: true,
        data: {
          pizza_name: cart.pizza_name,
          customer_id: customer_id,
          ingredients: cart.selectedIngredients,
        },
      });
      let { data } = response;
      if (data.status === "error") {
        toast.error("Failed to add item to cart!");
        return;
      }
      toast.success("Pizza Added to Cart Successfully!");
      dispatch(setCart({ pizza_name: "", selectedIngredients: [] })); // clean the state if everything goes well
    }
  }

  return (
    <form className="bg-white rounded mb-4" onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 font-primary"
          htmlFor="username"
        >
          Your email
        </label>
        <input
          className={`shadow font-primary appearance-none border ${
            formik.touched.email && formik.errors.email ? "border-red-500" : ""
          } rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
          className="block text-gray-700 text-sm font-bold mb-2 font-primary"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={`shadow font-primary appearance-none border ${
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
      <div className="flex items-center justify-between">
        <button
          className={`bg-[#FC5D3D] font-primary hover:bg-[#FC823D] text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline ${
            formik.isSubmitting ? "cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <div className="flex items-center gap-2 font-primary justify-center">
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
