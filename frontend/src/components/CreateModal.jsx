// components/CreatePhotoModal.jsx
import { useEffect, useState } from "react";
import { sendRequest } from "../utils/FetchAPI";
import { useNavigate } from "react-router-dom";

export default function CreatePhotoModal({ isOpen, onClose, onCreate }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    src: "",
    visible: false,
    categories: [],
  });

  // api to get all the categories
  async function getAllCategories() {
    try {
      const response = await sendRequest(`/admin/categories`, "GET");
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

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

  async function handleCreateSubmit(e) {
    e.preventDefault();
    onCreate(formData);
  }

  return (
    <>
      {/* Background overlay */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-20">
          {/* Modal */}
          <div className="bg-white p-6 rounded-md w-96 h-full justify-center flex flex-col transform translate-x-0">
            <h2 className="text-2xl font-bold mb-4">Create New Photo</h2>
            {/* Form */}
            <form onSubmit={handleCreateSubmit}>
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

              {/* src file */}
              {/* <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="src">
                  File
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="src"
                  name="src"
                  type="file"
                  placeholder="URL of image"
                  // value={formData.src}
                  onChange={(e) => handleInput(e.target.files[0], "src")}
                />
              </div> */}
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
                  <div key={el.id} className="mb-4 flex gap-5 border p-1">
                    <label className="w-full text-left" htmlFor="category">
                      {" "}
                      {el.name}
                    </label>
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

              {/* buttons */}
              <div className="flex justify-center my-4">
                <button
                  type="submit"
                  className="mr-2 px-4 py-2 bg-teal-500/75 text-white rounded-md"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-red-400 text-white rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
