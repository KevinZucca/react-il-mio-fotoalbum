import { Link } from "react-router-dom";
import { usePhotos } from "../contexts/PhotosContext";

export default function NavBar() {
  const { categoriesList, filterPhotos } = usePhotos();
  const pages = [
    {
      link: "/about",
      pageName: "About",
    },
  ];

  return (
    <>
      <nav>
        <ul className="flex justify-between items-center p-3 gap-7">
          <img
            className="w-10"
            src="https://www.svgrepo.com/show/513335/photo-camera.svg"
            alt=""
          />
          <div id="search-container" className="h-full grow flex">
            <input
              type="search"
              placeholder="Search"
              className="border p-1 h-full w-full"
            />
            <button className="border h-full w-12 p-1 bg-black bg-opacity-80 rounded text-white ">
              Go
            </button>
          </div>
          {pages.map((el, index) => (
            <li key={index}>
              <Link to={el.link}>{el.pageName}</Link>
            </li>
          ))}
        </ul>
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
