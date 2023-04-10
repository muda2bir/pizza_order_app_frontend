import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { toast } from "react-toastify";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import pizzaImage from "../assets/pizza_hero_image.png";

export interface OrderObj {
  pizza_name: string;
  order_id: string;
  customer_id: string;
  ingredients: number[];
  total_price: number;
  orderedAt: Date;
  updatedAt: Date;
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderObj[]>([]);
  async function getUserOrders() {
    try {
      let response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_SERVER_URL}/api/v1/order/get_user_orders`,
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
      setOrders(data.orders);
    } catch (err) {
      toast.error("Something went wrong!");
      navigate("/");
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  async function cancelOrder(order_id: string) {
    try {
      let response = await axios({
        method: "delete",
        url: `${import.meta.env.VITE_SERVER_URL}/api/v1/order/cancel_order`,
        data: {
          order_id: order_id,
        },
        withCredentials: true,
      });

      let { data } = response;
      if (data.status === "error") {
        toast.error("Something went wrong!");
        return;
      }
      setOrders(
        orders.filter((item: OrderObj) => {
          return item.order_id !== order_id;
        })
      );
      toast.success(data.message);
    } catch (err) {
      toast.error("Please try again later!");
    }
  }

  return (
    <AppLayout>
      <>
        <h1 className="mb-12 text-4xl font-primary text-center">Your Orders</h1>
        <ul>
          {orders.length > 0 ? (
            orders.map((item: OrderObj) => {
              return (
                <li className="flex py-6 font-primary" key={item.order_id}>
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={pizzaImage}
                      alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-sm font-medium text-gray-900">
                        <h3>
                          <a href="#">{item.pizza_name}</a>
                        </h3>
                        <p className="ml-4">₹{item.total_price}</p>
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
                          onClick={() => cancelOrder(item.order_id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <p className="text-center font-primary text-lg">
              You've not Ordered anything yet!
            </p>
          )}
        </ul>
      </>
    </AppLayout>
  );
}
