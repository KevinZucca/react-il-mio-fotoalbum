import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { sendRequest } from "../utils/FetchAPI";

export default function Register() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  function handleInput(value, field) {
    setFormData({
      ...formData,
      [field]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    async function sendData() {
      try {
        const user = { ...formData };
        const response = await sendRequest("/register", "POST", user);
        handleLogin(response);
        console.log(response);

        navigate("/admin/photos");
      } catch (err) {
        if (err instanceof Error) {
          //if err is an instance of Error, setErrors with this
          setErrors([err.message]);
        } else if (err.errors && Array.isArray(err.errors)) {
          // If err has an error propriety and is an array, set that
          setErrors(err.errors.map((error) => error.msg));
        } else {
          // otherwhise
          setErrors(["An unexpected error occurred"]);
        }
      }
    }

    sendData();
  }

  return (
    <>
      {/* // ERROR MESSAGE */}
      <div className="flex flex-col w-full justify-center items-center gap-4 py-5">
        <h2 className="text-4xl pt-5">Register page</h2>

        {errors.length > 0 && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* REGISTER CONTENT */}
      <div className="flex flex-col w-full justify-center items-center gap-4 py-5">
        <div className="w-full max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none"
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInput(e.target.value, "email")}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none"
                id="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => handleInput(e.target.value, "username")}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none"
                id="password"
                type="password"
                placeholder="******************"
                value={formData.password}
                onChange={(e) => handleInput(e.target.value, "password")}
              />
              <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                type="submit"
              >
                Register
              </button>
              <Link
                className="inline-block align-baseline font-bold text-sm ml-4 text-blue-500 hover:text-blue-800"
                to="/login"
              >
                I already have an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
