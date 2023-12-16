import { useEffect, useState } from "react";
import { sendRequest } from "../../utils/FetchAPI";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function EditPhoto() {
  const { user } = useAuth();
  const [photo, setPhoto] = useState("");
  const [categories, setCategories] = useState([]);

  const { id } = useParams();

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
        `/admin/photos/${id}`,
        "POST",
        formData
      );
      setPhoto(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getSinglePhoto();
      await getAllCategories();
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        userId: user.id || "",
      }));
    }

    if (photo) {
      setFormData((prevData) => ({
        ...prevData,
        title: photo.title || "",
        description: photo.description || "",
        src: photo.src || "",
        visible: photo.visible,
        categories: photo.categories || [],
      }));
    }
  }, [user, photo]);

  return (
    <>
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
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full"
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

            <div className="flex items-center justify-between mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save editings
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
