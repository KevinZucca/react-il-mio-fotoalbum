const sendRequest = async (url, method = "GET", body = null) => {
  const baseURL = import.meta.env.VITE_BASE_API_URL;
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
  if (!response.ok) {
    throw new Error(responseData.error || "Si è verificato un errore");
  }

  return responseData;
};

export { sendRequest };
