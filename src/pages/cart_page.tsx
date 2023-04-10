import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppLayout from "../components/AppLayout";
import pizzaImage from "../assets/pizza_hero_image.png";
import btnLoader from "../assets/button_loader.svg";
import { useAppSelector } from "../app/hooks";

export interface CartObj {
  pizza_name: string;
  cart_id: string;
  customer_id: string;
  ingredients: number[];
}

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartObj[]>([]);
  const [placingOrder, setPlacingOrder] = useState<boolean>(false);
  const { _id: customer_id } = useAppSelector((state) => state.user.value);
  async function getUserCart() {
    try {
      let response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_SERVER_URL}/api/v1/cart/get_user_cart`,
        withCredentials: true,
      });
      let { data } = response;
      if (data.status === "error") {
        if (data.message.includes("Login")) {
          navigate("/login");
          return;
        }
        navigate("/");
        return;
      }
      setCart(data.cart); // setting the cart to make that use in the loop
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      navigate("/");
    }
  }

  async function placeOrder() {
    try {
      let response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_SERVER_URL}/api/v1/order/make_order`,
        data: {
          customer_id: customer_id,
        },
        withCredentials: true,
      });
      let { data } = response;
      if (data.status === "error") {
        toast.error("Please try again later!");
        return;
      }
      toast.success(data.message);
      navigate("/orders");
    } catch (err) {
      toast.error("Please try again later!");
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  async function removeItemFromTheCart(cart_id: string) {
    try {
      let response = await axios({
        method: "delete",
        url: `${import.meta.env.VITE_SERVER_URL}/api/v1/cart/remove_from_cart`,
        data: {
          cart_id: cart_id,
        },
        withCredentials: true,
      });

      let { data } = response;
      if (data.status === "error") {
        toast.error("Something went wrong!");
        return;
      }
      setCart(
        cart.filter((item: CartObj) => {
          return item.cart_id !== cart_id;
        })
      );
    } catch (err) {
      toast.error("Please try again later!");
    }
  }

  return (
    <AppLayout>
      <>
        <h1 className="mb-12 text-4xl font-primary text-center">Your Cart</h1>
        <ul>
          {cart.length > 0 ? (
            cart.map((item: CartObj) => {
              return (
                <li className="flex py-6 font-primary" key={item.cart_id}>
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={pizzaImage}
                      alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href="#">{item.pizza_name}</a>
                        </h3>
                        <p className="ml-4">₹45.66</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.ingredients.join(", ").slice(0, 47)}....
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty 1</p>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-[#FC5D3D] hover:text-[#FC823D]"
                          onClick={() => removeItemFromTheCart(item.cart_id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <p className="text-center font-primary text-lg">Cart is Empty!</p>
          )}
        </ul>
        {cart.length > 0 ? (
          <button
            className={`bg-[#FC5D3D] hover:bg-[#FC823D] text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-6 font-primary ${
              placingOrder ? "cursor-not-allowed" : ""
            } `}
            disabled={placingOrder}
            onClick={placeOrder}
          >
            {placingOrder ? (
              <div className="flex items-center gap-2 justify-center">
                <img src={btnLoader} alt="loading.." className="h-6" />{" "}
                Loading...
              </div>
            ) : (
              "Place Order"
            )}
          </button>
        ) : null}
      </>
    </AppLayout>
  );
}
