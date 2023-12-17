import { useState } from "react";
import { usePhotos } from "../contexts/PhotosContext";

export default function Filters() {
  const { searchPhoto, notFound } = usePhotos();
  const [photoText, setPhotoText] = useState("");
  const { categoriesList, filterPhotos } = usePhotos();
  const [selectedCategory, setSelectedCategory] = useState("Tutte");

  function handleInput(e) {
    setPhotoText(e);
  }

  // functino to handle the searchbar
  function handleClick() {
    searchPhoto(photoText);
  }

  return (
    <>
      <nav>
        <p className="my-3 mt-10 text-center text-2xl">
          Search from an expansive collection from title or description of the
          picture
        </p>
        <div
          id="search-container"
          className="h-full grow flex my-6 w-[50%] m-auto"
        >
          <input
            type="search"
            placeholder="Search"
            className="border p-1 h-full w-full"
            value={photoText}
            onChange={(e) => handleInput(e.target.value)}
          />
          <button
            onClick={handleClick}
            className="border h-full w-12 p-1  bg-teal-500/75 bg-opacity-80 rounded text-white "
          >
            Go
          </button>
        </div>
        <div>
          <ul className="flex justify-around items-center gap-7">
            <button
              className={`bg-teal-500/75 p-1 rounded-xl px-2 text-white ${
                selectedCategory === "Tutte" ? "bg-teal-800/75" : ""
              }`}
              onClick={() => {
                filterPhotos("Tutte");
                setSelectedCategory("Tutte");
              }}
            >
              Tutte
            </button>
            {categoriesList.map((el, index) => (
              <li
                key={el.id}
                className={`bg-teal-500/75 p-1 rounded-xl px-2 text-white ${
                  selectedCategory === el.name ? "bg-teal-800/75" : ""
                } `}
              >
                <button
                  onClick={() => {
                    filterPhotos(el.id);
                    setSelectedCategory(el.name);
                  }}
                >
                  {el.name}
                </button>
              </li>
            ))}
          </ul>

          {/* NO RESULTS MESSAGE */}
          <div
            className={`mt-10 min-h-[25vh] flex flex-col gap-6 ${
              notFound == true ? "block" : "hidden"
            }`}
          >
            <p className="text-4xl ">Not found</p>
            <p className="text-2xl">There are no photos for this category</p>
          </div>
        </div>
      </nav>
    </>
  );
}
