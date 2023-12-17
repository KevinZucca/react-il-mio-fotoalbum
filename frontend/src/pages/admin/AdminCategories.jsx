import { useEffect, useState } from "react";
import { sendRequest } from "../../utils/FetchAPI";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [categoryDeleted, setCategoryDeleted] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categoryEdited, setCategoryEdited] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [createMode, setCreateMode] = useState(false);

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

  // function to delete a category
  async function handleDelete(id) {
    try {
      await sendRequest(`/admin/categories/${id}`, "DELETE");
      setDeleteMode(false);
      setTimeout(() => {
        getAllCategories();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  // function to edit a category name
  async function handleEdit() {
    try {
      if (categoryEdited !== null) {
        await sendRequest(`/admin/categories/${categoryEdited}`, "PUT", {
          name: newCategoryName,
        });
        setEditMode(false);
        setTimeout(() => {
          getAllCategories();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // function to create a new category
  async function handleCreate() {
    try {
      await sendRequest(`/admin/categories`, "POST", {
        name: newCategoryName,
      });
      setCreateMode(false);
      setNewCategoryName("");
      setTimeout(() => {
        getAllCategories();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (categoryEdited != null) {
      const categoryToEdit = categories.find((el) => el.id == categoryEdited);
      setNewCategoryName(categoryToEdit.name);
    }
  }, [categoryEdited, categories]);

  return (
    <div className="my-4 min-h-[75vh]">
      <h2 className="text-4xl my-5">Categories List</h2>
      <hr className="my-4" />

      {/* DELETE MODAL */}
      {deleteMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <p className="mb-4">Do you really want to delete the element?</p>
            <div className="flex justify-end">
              <button
                onClick={() => handleDelete(categoryDeleted)}
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

      {/* EDIT MODAL */}
      {editMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <p className="mb-4">Edit Category Name:</p>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() => handleEdit()}
                className="mr-2 px-4 py-2 bg-green-400 text-white rounded-md"
              >
                Modify
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setNewCategoryName("");
                }}
                className="px-4 py-2 bg-red-400 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE MODAL */}
      {createMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-md">
            <p className="mb-4">Create a new category:</p>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() => handleCreate()}
                className="mr-2 px-4 py-2 bg-green-400 text-white rounded-md"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setNewCategoryName("");
                  setCreateMode(false);
                }}
                className="px-4 py-2 bg-red-400 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORIES LIST */}
      <div className="grid grid-rows-3 gap-3">
        {categories.map((el, index) => (
          <div key={el.id} className="flex justify-between gap-4">
            <p className="w-full text-left">{el.name}</p>
            <button
              onClick={() => {
                setEditMode(true);
                setCategoryEdited(el.id);
              }}
              className="border w-[100px] hover:shadow-md text-white bg-green-400"
            >
              Edit Name
            </button>
            <button
              onClick={() => {
                setDeleteMode(true);
                setCategoryDeleted(el.id);
              }}
              className="border w-[100px] hover:shadow-md text-white bg-red-400"
            >
              Delete
            </button>
          </div>
        ))}

        {/* ADD NEW CATEGORY BUTTON */}
        <div className="m-auto my-4">
          <button
            onClick={() => setCreateMode(true)}
            className="rounded-full bg-cyan-700 text-white text-3xl w-14 h-14 hover:scale-125 hover:shadow-md transition-all"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
