import pizzaHeroImage from "../assets/pizza_hero_image.png";
import AppLayout from "../components/AppLayout";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type IngredientType = {
  _id: number;
  name: string;
};

export default function HomePage() {
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);

  async function getAllIngredients() {
    let response = await axios({
      method: "get",
      withCredentials: true,
      url: `${import.meta.env.VITE_SERVER_URL}/api/v1/ingredients`,
    });
    let { data } = response;
    if (data.status === "ok") {
      setIngredients(data.ingredients);
    } else {
      toast.error("Something went wrong!");
      return;
    }
  }

  useEffect(() => {
    getAllIngredients();
  }, []);

  return (
    <>
      <AppLayout>
        <h1 className="mb-12 text-4xl font-primary text-center">
          Get some delicious{" "}
          <span className="text-[#422C1D] font-bold">pizza!</span>
        </h1>
        <div id="hero_container" className="flex flex-col items-start gap-12">
          <img src={pizzaHeroImage} alt="Pizza" />
          <div id="ingredient_toppings_container" className="flex-col w-full">
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

              <div id="inputs_container" className="flex flex-wrap gap-4">
                {ingredients.length > 0 &&
                  ingredients.map(
                    (ingredient: { _id: number; name: string }) => {
                      return (
                        <div
                          id="input_box_container"
                          //   border-orange-500 border-4 font-bold
                          className="border-4 rounded-full flex items-center justify-center"
                          key={ingredient._id}
                        >
                          <input
                            type="checkbox"
                            name="ingredient"
                            value={ingredient.name}
                            id={ingredient.name}
                            className="hidden"
                          />
                          <label
                            htmlFor={ingredient.name}
                            className="text-md font-primary w-full h-full block cursor-pointer px-4 py-2"
                          >
                            {ingredient.name}
                          </label>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
