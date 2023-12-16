import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { sendRequest } from "../utils/FetchAPI";

export default function Login() {
  const { handleLogin, errorMessage, setErrorMessage, setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleInput(value, field) {
    setFormData({
      ...formData,
      [field]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const user = { ...formData };
      const response = await sendRequest("/login", "POST", user);
      handleLogin(response);
      navigate("/admin/photos");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  }

  return (
    // ERROR MESSAGE
    <div className="flex flex-col w-full justify-center items-center gap-4 py-5">
      <h2 className="text-4xl pt-5">Login page</h2>
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {errorMessage}</span>
        </div>
      )}

      {/* login content */}
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => handleInput(e.target.value, "username")}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInput(e.target.value, "email")}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/register"
            >
              register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
