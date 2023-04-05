import pizzaHeroImage from "../assets/pizza_hero_image.png";
import AppLayout from "../components/AppLayout";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function HomePage() {
  const [ingredients, setIngredients] = useState<string[]>([]);

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
                <span className="text-[#422C1D] font-bold">Ingredients</span>
              </h1>

              <div id="inputs_container" className="flex flex-wrap">
                <div
                  id="input_box_container"
                  //   border-orange-500 border-4 font-bold
                  className="border-4 rounded-full flex items-center justify-center"
                >
                  <input
                    type="checkbox"
                    name="ingredient"
                    value="carrot"
                    id="carrot"
                    className="hidden"
                  />
                  <label
                    htmlFor="carrot"
                    className="text-lg font-primary w-full h-full block cursor-pointer px-6 py-2"
                  >
                    Carrot
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
