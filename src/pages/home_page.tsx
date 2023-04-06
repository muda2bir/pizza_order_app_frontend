import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hooks";
import pizzaHeroImage from "../assets/pizza_hero_image.png";
import AppLayout from "../components/AppLayout";
import { setUserAuth } from "../features/user/authSlice";
import { setUser } from "../features/user/userSlice";
import btnLoader from "../assets/button_loader.svg";

type IngredientType = {
  _id: number;
  name: string;
  price: number;
};

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [addingToCart, setAddingToCart] = useState<boolean>(false);

  async function getAllIngredients() {
    try {
      let response = await axios({
        method: "get",
        withCredentials: true,
        url: `${import.meta.env.VITE_SERVER_URL}/api/v1/ingredients`,
      });
      let { data } = response;
      if (data.status === "ok") {
        setIngredients(data.ingredients);
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
          })
        );
      } else {
        navigate("/login"); // Navigating the user to the login page if not authenticated;
        toast.error("Please Login!");
        return;
      }
    } catch (err) {
      navigate("/login");
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    getAllIngredients();
  }, []);

  function goToSelectedIngredients(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;
    if (checked)
      setSelectedIngredients([...selectedIngredients, Number(value)]);
    else
      setSelectedIngredients(
        selectedIngredients.filter((e) => e !== Number(value))
      );
  }

  const inputStyle =
    "relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary";

  return (
    <>
      <AppLayout>
        <h1 className="mb-12 text-4xl font-primary text-center">
          Get some delicious{" "}
          <span className="text-[#422C1D] font-bold">pizza!</span>
        </h1>
        <div id="hero_container" className="flex flex-col items-start gap-12">
          <img src={pizzaHeroImage} alt="Pizza" />
          <div
            id="ingredient_toppings_container"
            className="flex-col w-full mb-12"
          >
            <input
              className="appearance-none border-b-2 border-[#422C1D] w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-primary text-xl font-bold"
              type="text"
              placeholder="Enter Pizza Name....."
            />

            <div id="ingredients_container" className="mb-10">
              <h1 className="my-8 text-3xl font-primary">
                Choose{" "}
                <span className="text-[#422C1D] font-bold">
                  Ingredients & Toppings
                </span>
              </h1>

              <div id="inputs_container" className="flex flex-col gap-4">
                {ingredients.length > 0 &&
                  ingredients.map(
                    (ingredient: {
                      _id: number;
                      name: string;
                      price: number;
                    }) => {
                      return (
                        <div
                          className="mb-[0.125rem] min-h-[1.5rem] pl-[1.5rem] flex justify-between"
                          id="input_box_container"
                          key={ingredient._id}
                        >
                          <div id="input_label_container" className="flex-1">
                            <input
                              className={inputStyle}
                              type="checkbox"
                              value={ingredient._id}
                              id={`$${ingredient._id}`}
                              onChange={(e) => goToSelectedIngredients(e)}
                            />
                            <label
                              className="inline-block text-lg pl-[0.15rem] hover:cursor-pointer font-primary"
                              htmlFor={`$${ingredient._id}`}
                            >
                              {ingredient.name}
                            </label>
                          </div>

                          <div id="price_container">
                            <span className="font-primary font-bold">{`₹${ingredient.price}`}</span>
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
            <button
              className={`bg-[#FC5D3D] hover:bg-[#FC823D] text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline font-primary ${
                addingToCart ? "cursor-not-allowed" : ""
              } `}
              disabled={addingToCart}
            >
              {addingToCart ? (
                <div className="flex items-center gap-2 justify-center">
                  <img src={btnLoader} alt="loading.." className="h-6" />{" "}
                  Loading...
                </div>
              ) : (
                "Add Pizza to Cart"
              )}
            </button>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
