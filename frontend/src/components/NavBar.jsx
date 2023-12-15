import { Link } from "react-router-dom";
import { usePhotos } from "../contexts/PhotosContext";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { categoriesList, filterPhotos, searchPhoto } = usePhotos();
  const [dropDown, setDropDown] = useState(false);
  const { isLoggedIn, handleLogout, user, token } = useAuth();
  const [photoText, setPhotoText] = useState("");

  const pages = [
    {
      link: "/about",
      pageName: "About",
    },
  ];

  function handleInput(e) {
    setPhotoText(e);
  }

  // functino to handle the searchbar
  function handleClick() {
    searchPhoto(photoText);
  }

  // function to handle the account dropdown in navbar
  function handleDropDown() {
    setDropDown(!dropDown);
  }
  return (
    <>
      <nav>
        <ul className="flex justify-between items-center p-3 gap-7">
          <a href="/">
            <img
              className="w-10"
              src="https://www.svgrepo.com/show/513335/photo-camera.svg"
              alt=""
            />
          </a>
          <div id="search-container" className="h-full grow flex">
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
          {pages.map((el, index) => (
            <li key={index}>
              <Link to={el.link}>{el.pageName}</Link>
            </li>
          ))}
          <li className="relative">
            {token ? (
              <button onClick={handleDropDown}>Account</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <div
              className={`absolute ${
                dropDown == true ? "block" : "hidden"
              }  top-8 right-0 bg-white p-3 w-36 z-10 shadow-md`}
            >
              <ul className="flex flex-col gap-3">
                <li>
                  <Link onClick={() => handleDropDown()} to="/admin/photos">
                    My collection
                  </Link>
                </li>
                <li>
                  <Link onClick={() => handleDropDown()} to="/admin/categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleDropDown();
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </li>
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
