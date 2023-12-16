import { useState } from "react";
import { usePhotos } from "../contexts/PhotosContext";

export default function Filters() {
  const { searchPhoto } = usePhotos();
  const [photoText, setPhotoText] = useState("");
  const { categoriesList, filterPhotos } = usePhotos();

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
        <div id="search-container" className="h-full grow flex my-6">
          <input
            type="search"
            placeholder="Search"
            className="border p-1 h-full w-full"
            value={photoText}
            onChange={(e) => handleInput(e.target.value)}
          />
          <button
            onClick={handleClick}
            className="border h-full w-12 p-1 bg-black bg-opacity-80 rounded text-white "
          >
            Go
          </button>
        </div>
        <ul className="flex justify-around items-center gap-7">
          <button onClick={() => filterPhotos("Tutte")}>Tutte</button>
          {categoriesList.map((el, index) => (
            <li key={el.id}>
              <button onClick={() => filterPhotos(el.id)}>{el.name}</button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
