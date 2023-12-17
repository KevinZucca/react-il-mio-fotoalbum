import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const [dropDown, setDropDown] = useState(false);
  const { handleLogout, token } = useAuth();

  const pages = [
    {
      link: "/about",
      pageName: "About",
    },
  ];

  // function to handle the account dropdown in navbar
  function handleDropDown() {
    setDropDown(!dropDown);
  }
  return (
    <>
      <nav className="border-b">
        <ul className="flex justify-between items-center p-3 gap-7">
          <a href="/">
            <img
              className="w-10"
              src="https://www.svgrepo.com/show/513335/photo-camera.svg"
              alt=""
            />
          </a>
          {pages.map((el, index) => (
            <li key={index}>
              <Link to={el.link}>{el.pageName}</Link>
            </li>
          ))}
          <li className="relative ">
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
      </nav>
    </>
  );
}
