import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import pizzaHeroImage from "../assets/pizza_hero_image.png";
import AppLayout from "../components/AppLayout";
import Button from "../components/Button";
import { setUserAuth } from "../features/user/authSlice";
import { setCart } from "../features/user/cartSlice";
import { setUser } from "../features/user/userSlice";

type IngredientType = {
  _id: number;
  name: string;
  price: number;
};

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userAuthenticated = useAppSelector(
    (state) => state.auth.value.authenticated
  );
  const cart = useAppSelector((state) => state.cart.value);
  const { _id: customer_id } = useAppSelector((state) => state.user.value);
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);
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
      }
      setIngredients(data.ingredients);
    } catch (err) {
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    getAllIngredients();
  }, []);

  async function addPizzaToCart() {
    if (cart.pizza_name === "") {
      toast.error("Please Enter the Pizza Name");
      return;
    }
    if (cart.selectedIngredients.length < 3) {
      toast.error("Please select at least 3 ingredients!");
      return;
    }
    // * : reset the pizza name field.
    if (!userAuthenticated) {
      navigate("/login");
      return;
    } // if the user is not authenticated then navigate to the login page
    // *: Add the cart item to the database here

    function getSelectedIngredientsArray() {
      let ingredientsArr = [];
      for (let i = 0; i < cart.selectedIngredients.length; i++) {
        ingredientsArr.push(cart.selectedIngredients[i].name);
      }
      return ingredientsArr;
    }

    let sum = 0;
    function getTotalPriceOfSelectedArr() {
      for (let i = 0; i < cart.selectedIngredients.length; i++) {
        sum += cart.selectedIngredients[i].price;
      }
      return sum;
    }

    try {
      let response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_SERVER_URL}/api/v1/cart/push_to_cart`,
        withCredentials: true,
        data: {
          pizza_name: cart.pizza_name,
          customer_id: customer_id,
          ingredients: getSelectedIngredientsArray(),
          total_price: getTotalPriceOfSelectedArr(),
        },
      });
      let { data } = response;
      if (data.status === "error") {
        toast.error("Failed to add item to cart!");
        return;
      }
      toast.success("Pizza Added to Cart Successfully!");
      dispatch(setCart({ pizza_name: "", selectedIngredients: [] }));
    } catch (err) {
      toast.error("Failed to add item to cart!");
      return;
    }
  }

  function capitalizeFirstLetter(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  } // this function will capitalize the first letter of all the ingredients

  function goToSelectedIngredients(
    event: React.ChangeEvent<HTMLInputElement>,
    price: number
  ) {
    const { value, checked } = event.target;
    if (checked) {
      dispatch(
        setCart({
          ...cart,
          selectedIngredients: [
            ...cart.selectedIngredients,
            {
              name: value,
              price: price,
            },
          ],
        })
      );
    } else
      dispatch(
        setCart({
          ...cart,
          selectedIngredients: cart.selectedIngredients.filter(
            (e) => e.name != value
          ),
        })
      );
  }

  const inputStyle =
    "relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] md:h-[1.5rem] md:w-[1.5rem] lg:w-[2rem] xl:w-6 xl:h-6 lg:h-[2rem] md:mr-[20px] appearance-none lg:mr-[30px] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary";

  return (
    <>
      <AppLayout>
        <>
          <h1 className="mb-12 text-4xl font-primary text-center md:text-6xl md:leading-tight md:mb-16 lg:text-7xl lg:mb-20">
            Get some delicious{" "}
            <span className="text-[#422C1D] font-bold">pizza!</span>
          </h1>
          <div
            id="hero_container"
            className="flex flex-col xl:flex-row items-center gap-12 md:gap-16 lg:gap-20"
          >
            <img src={pizzaHeroImage} alt="Pizza" />
            <div
              id="ingredient_toppings_container"
              className="flex-col w-full mb-12"
            >
              <input
                className="appearance-none border-b-2 border-[#422C1D] w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-primary text-xl font-bold md:text-4xl xl:text-2xl"
                type="text"
                placeholder="Enter Pizza Name....."
                value={cart.pizza_name}
                onChange={(e) =>
                  dispatch(setCart({ ...cart, pizza_name: e.target.value }))
                }
              />

              <div id="ingredients_container" className="mb-10">
                <h1 className="my-8 md:my-12 text-3xl md:text-4xl font-primary lg:text-5xl lg:my-16 xl:text-2xl xl:my-8">
                  Choose{" "}
                  <span className="text-[#422C1D] font-bold">
                    Ingredients & Toppings
                  </span>
                </h1>

                <div
                  id="inputs_container"
                  className="flex flex-col gap-4 lg:gap-8 xl:gap-4"
                >
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
                            id={`${ingredient._id}`}
                            key={ingredient._id}
                          >
                            <div id="input_label_container" className="flex-1">
                              <input
                                className={inputStyle}
                                type="checkbox"
                                value={ingredient.name}
                                id={`$${ingredient._id}`}
                                onChange={(e) =>
                                  goToSelectedIngredients(e, ingredient.price)
                                }
                              />
                              <label
                                className="inline-block text-lg md:text-2xl lg:text-3xl pl-[0.15rem] hover:cursor-pointer font-primary xl:text-xl"
                                htmlFor={`$${ingredient._id}`}
                              >
                                {`${capitalizeFirstLetter(ingredient.name)}`}
                              </label>
                            </div>

                            <div id="price_container">
                              <span className="font-primary md:text-xl font-bold lg:text-2xl xl:text-xl">{`₹${ingredient.price}`}</span>
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
              <Button
                loadingState={addingToCart}
                clickFunction={addPizzaToCart}
                btnText="Add Pizza to Cart"
              />
            </div>
          </div>
        </>
      </AppLayout>
    </>
  );
}
