import { useEffect, useState } from "react";
import { sendRequest } from "../../utils/FetchAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function EditPhoto() {
  const { userId } = useAuth();
  const [photo, setPhoto] = useState("");
  const [categories, setCategories] = useState([]);

  const [deleteMode, setDeleteMode] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    src: "",
    visible: "",
    userId: "",
    categories: [],
  });

  // api to get the single photo
  async function getSinglePhoto() {
    if (id) {
      try {
        const response = await sendRequest(`/admin/photos/${id}`, "GET");
        setPhoto(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  // api to get all the categories
  async function getAllCategories() {
    try {
      const response = await sendRequest(`/admin/categories`, "GET");
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  }

  function handleInput(value, field, type) {
    setFormData((currData) => {
      if (type == "checkbox") {
        if (field == "categories") {
          const updatedCategories = currData.categories.includes(value)
            ? currData.categories.filter((id) => id != value)
            : [...currData.categories, value];

          return {
            ...currData,
            categories: updatedCategories,
          };
        } else {
          return {
            ...currData,
            [field]: !currData[field],
          };
        }
      } else {
        return {
          ...currData,
          [field]: value,
        };
      }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await sendRequest(
        `/admin/photos/${Number(id)}`,
        "PUT",
        formData
      );
      setPhoto(response);
    } catch (error) {
      console.log(error);
    }
  }

  // function to delete a photo
  async function handleDelete(id) {
    console.log(id);
    try {
      await sendRequest(`/admin/photos/${Number(id)}`, "DELETE");
      setDeleteMode(false);
      setTimeout(() => {
        navigate("/admin/photos");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    console.log("UserId in fetchData:", userId);

    try {
      await getSinglePhoto();
      await getAllCategories();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id, userId]);

  useEffect(() => {
    if (photo) {
      setFormData((prevData) => ({
        ...prevData,
        title: photo.title || "",
        description: photo.description || "",
        src: photo.src || "",
        visible: photo.visible,
        userId: userId,
        categories: photo.categories || [],
      }));
    }
  }, [photo]);

  return (
    <>
      {/* DELETE MODAL */}
      {deleteMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-md">
            <p className="mb-4">Do you really want to delete the element?</p>
            <div className="flex justify-end">
              <button
                onClick={() => handleDelete(id)}
                className="mr-2 px-4 py-2 bg-green-400 text-white rounded-md"
              >
                Continue
              </button>
              <button
                onClick={() => setDeleteMode(false)}
                className="px-4 py-2 bg-red-400 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-4xl">{photo.title}</h2>
      <div className="grid grid-cols-2 mt-8 min-h-[50vh]">
        <div
          className="border p-4 h-full bg-cover bg-center relative"
          style={{
            backgroundImage: `url('${photo.src}')`,
          }}
        >
          <div className="overlay absolute top-0 left-0 w-full h-full "></div>
          <div className=" text-gray-200 absolute bottom-5 right-2 p-2 w-full">
            <h3 className="text-3xl">{photo.title}</h3>
            <p>{photo.description}</p>
          </div>
        </div>

        {/* edit form */}
        <div className="w-full h-full">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            {/* TITLE */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => handleInput(e.target.value, "title")}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => handleInput(e.target.value, "description")}
              />
            </div>

            {/* SRC */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="src">
                Src
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="src"
                type="text"
                placeholder="URL of image"
                value={formData.src}
                onChange={(e) => handleInput(e.target.value, "src")}
              />
            </div>

            {/* PUBLISHED */}
            <div className="flex justify-center gap-3 items-center my-5">
              <span>Do you wanto to make it public?</span>
              <div>
                <input
                  type="checkbox"
                  id="visible"
                  name="visible"
                  onChange={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      visible: !prevData.visible,
                    }))
                  }
                  checked={formData.visible}
                />
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="border p-1">
              <span className="text-xl">Categories</span>
              {categories.map((el, index) => (
                <div
                  key={el.id}
                  className="mb-4 grid grid-cols-2 gap-5 border p-1"
                >
                  <label htmlFor="category"> {el.name}</label>
                  <input
                    type="checkbox"
                    id="true"
                    name="categories"
                    onChange={(e) =>
                      handleInput(el.id, "categories", "checkbox")
                    }
                    checked={formData.categories.includes(el.id)}
                  />
                </div>
              ))}
            </div>

            {/* SAVE EDITINGS BUTTON */}
            <div className="flex items-center justify-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save editings
              </button>
            </div>
          </form>

          {/* DELETE BUTTON */}
          <div className="my-3">
            <button
              onClick={() => {
                setDeleteMode(true);
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="#f8f8f8"
                width="20px"
                height="20px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M831.24 280.772c5.657 0 10.24-4.583 10.24-10.24v-83.528c0-5.657-4.583-10.24-10.24-10.24H194.558a10.238 10.238 0 00-10.24 10.24v83.528c0 5.657 4.583 10.24 10.24 10.24H831.24zm0 40.96H194.558c-28.278 0-51.2-22.922-51.2-51.2v-83.528c0-28.278 22.922-51.2 51.2-51.2H831.24c28.278 0 51.2 22.922 51.2 51.2v83.528c0 28.278-22.922 51.2-51.2 51.2z" />
                <path d="M806.809 304.688l-58.245 666.45c-.544 6.246-6.714 11.9-12.99 11.9H290.226c-6.276 0-12.447-5.654-12.99-11.893L218.99 304.688c-.985-11.268-10.917-19.604-22.185-18.619s-19.604 10.917-18.619 22.185l58.245 666.45c2.385 27.401 26.278 49.294 53.795 49.294h445.348c27.517 0 51.41-21.893 53.796-49.301l58.244-666.443c.985-11.268-7.351-21.201-18.619-22.185s-21.201 7.351-22.185 18.619zM422.02 155.082V51.3c0-5.726 4.601-10.342 10.24-10.342h161.28c5.639 0 10.24 4.617 10.24 10.342v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V51.3c0-28.316-22.908-51.302-51.2-51.302H432.26c-28.292 0-51.2 22.987-51.2 51.302v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48z" />
                <path d="M496.004 410.821v460.964c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V410.821c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48zm-192.435 1.767l39.936 460.964c.976 11.269 10.903 19.612 22.171 18.636s19.612-10.903 18.636-22.171l-39.936-460.964c-.976-11.269-10.903-19.612-22.171-18.636s-19.612 10.903-18.636 22.171zm377.856-3.535l-39.936 460.964c-.976 11.269 7.367 21.195 18.636 22.171s21.195-7.367 22.171-18.636l39.936-460.964c.976-11.269-7.367-21.195-18.636-22.171s-21.195 7.367-22.171 18.636z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
