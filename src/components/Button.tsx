import { MouseEventHandler } from "react";
import btnLoader from "../assets/button_loader.svg";

export default function Button({
  loadingState,
  clickFunction,
  btnText,
}: {
  loadingState: boolean;
  clickFunction: MouseEventHandler<HTMLButtonElement>;
  btnText: string;
}) {
  return (
    <button
      className={`bg-[#FC5D3D] hover:bg-[#FC823D] md:text-lg lg:text-xl text-white font-bold py-2 px-4 lg:py-3 lg:px-5 rounded w-full focus:outline-none focus:shadow-outline font-primary ${
        loadingState ? "cursor-not-allowed" : ""
      } `}
      disabled={loadingState}
      onClick={clickFunction}
    >
      {loadingState ? (
        <div className="flex items-center gap-2 justify-center">
          <img src={btnLoader} alt="loading.." className="h-6 lg:h-8" />{" "}
          Loading...
        </div>
      ) : (
        `${btnText}`
      )}
    </button>
  );
}
