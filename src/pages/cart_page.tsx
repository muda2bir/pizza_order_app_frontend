import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppLayout from "../components/AppLayout";
import pizzaImage from "../assets/pizza_hero_image.png";

export interface CartObj {
  pizza_name: string;
  cart_id: string;
  customer_id: string;
  ingredients: number[];
}

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartObj[]>([]);
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

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <AppLayout>
      <>
        <h1 className="mb-12 text-4xl font-primary text-center">Your Cart</h1>
        <ul>
          {cart.map((item: CartObj) => {
            return (
              <li className="flex py-6 font-primary" key={item.cart_id}>
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                      Tomatoes, Sauce, Pineapple, Soya Sauce
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty 1</p>

                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    </AppLayout>
  );
}
