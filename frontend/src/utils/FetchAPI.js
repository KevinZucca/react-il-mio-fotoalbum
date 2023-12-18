const sendRequest = async (url, method = "GET", body = null) => {
  const baseURL = import.meta.env.VITE_BASE_API_URL;

  // function to get the jwt
  const getExpirationDate = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return new Date(decoded.exp * 1000);
    } catch (error) {
      return null;
    }
  };

  const token = localStorage.getItem("token");
  const expirationDate = token ? getExpirationDate(token) : null;

  // control to check if the token is expired
  if (expirationDate && expirationDate < new Date()) {
    window.location.href = `/jwt-expired`;
    return;
  }

  const options = {
    method,
    headers: {
      "Content-Type": body instanceof FormData ? null : "application/json",
      Authorization: localStorage.getItem("token")
        ? `Bearer ${localStorage.getItem("token")}`
        : null,
    },
    body: body ? JSON.stringify(body) : null,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${baseURL}${url}`, options);
  const responseData = await response.json();
  const errorsArray = responseData.errors;

  if (errorsArray && errorsArray.length > 0) {
    const errorMessage = errorsArray.map((error) => error.msg).join(", ");
    throw new Error(errorMessage);
  }
  if (!response.ok) {
    throw new Error("There is an error");
  }

  return responseData;
};

export { sendRequest };
