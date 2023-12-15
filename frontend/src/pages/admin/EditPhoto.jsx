import { useEffect, useState } from "react";
import { sendRequest } from "../../utils/FetchAPI";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function EditPhoto() {
  const [photo, setPhoto] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [categories, setCategories] = useState([]);

  const { id } = useParams();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    src: "",
    visible: "",
    userId: user.id,
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
        return {
          ...currData,
          [field]: !currData[field],
        };
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
    if (!dataLoaded) {
      getSinglePhoto();
      getAllCategories();
      setDataLoaded(true);
    }

    if (photo && id) {
      setFormData({
        title: photo.title || "",
        description: photo.description || "",
        src: photo.src || "",
        visible: photo.visible || false,
        userId: user.id || "",
        categories: photo.categories || "",
      });
    }
  }, [dataLoaded, photo, categories, id, user]);

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
            <span className="mb-2">Do you wanto to make it public?</span>
            <div className="mb-4 flex gap-5 justify-center">
              <input
                type="checkbox"
                id="true"
                name="visible"
                onChange={(e) =>
                  handleInput(!e.target.checked, "visible", "checkbox")
                }
              />
              <label htmlFor="vehicle1"> Yes</label>
              <input
                type="checkbox"
                id="false"
                name="visible"
                onChange={(e) =>
                  handleInput(!e.target.checked, "visible", "checkbox")
                }
              />
              <label htmlFor="vehicle1"> No</label>
            </div>

            {/* CATEGORIES */}
            <span className="mb-2">Categories</span>
            {categories.map((el, index) => (
              <div key={el.id} className="mb-4 flex gap-5 justify-center">
                <input
                  type="checkbox"
                  id="true"
                  name="visible"
                  onChange={(e) =>
                    handleInput(!e.target.checked, "visible", "checkbox")
                  }
                />
                <label htmlFor="category"> {el.name}</label>
              </div>
            ))}
            <div className="flex items-center justify-between">
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
