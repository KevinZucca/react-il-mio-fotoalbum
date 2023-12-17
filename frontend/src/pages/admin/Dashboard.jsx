import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { sendRequest } from "../../utils/FetchAPI";
import { Link } from "react-router-dom";
import CreatePhotoModal from "../../components/CreateModal";

export default function Dashboard() {
  const { adminPhotos, setAdminPhotos, user } = useAuth();
  const [editPhoto, setEditPhoto] = useState(null);

  const [createMode, setCreateMode] = useState(false);
  const [newPhotoData, setNewPhotoData] = useState({
    title: "",
    description: "",
    src: "",
    visible: false,
    categories: [],
  });

  async function getPhotos() {
    try {
      const response = await sendRequest("/admin/photos", "GET");
      setAdminPhotos(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCreatePhoto = async (newPhotoData) => {
    try {
      await sendRequest("/admin/photos", "POST", newPhotoData);
      setNewPhotoData({
        title: "",
        description: "",
        src: "",
        visible: false,
        categories: [],
      });
      getPhotos();
      setCreateMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);
  return (
    <>
      <h2 className="text-5xl my-4">Your Photos Collection</h2>
      <div className="p-4 grid grid-cols-5 gap-4 justify-center w-full min-h-[100vh]">
        {adminPhotos.map((el, index) => (
          <div
            onMouseOver={() => setEditPhoto(index)}
            onMouseLeave={() => setEditPhoto(null)}
            key={index}
            className={`flex flex-col border p-4 h-[400px] bg-cover bg-center relative
            } `}
            style={{
              backgroundImage: `url('${el.src}')`,
            }}
          >
            <Link
              className={`${
                editPhoto == index ? "block" : "hidden"
              } z-10 text-black/50 text-2xl bg-white/70`}
              to={`/admin/photos/${el.id}`}
            >
              Edit picture
            </Link>
            <div
              className={`overlay absolute top-0 left-0 w-full h-full bg-black ${
                editPhoto == index ? "opacity-50" : " opacity-10"
              }`}
            ></div>
            <div className=" text-gray-200 absolute bottom-5 right-2 p-2 w-full">
              <h3 className="text-3xl">{el.title}</h3>
              <p>{el.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ADD NEW PHOTO BUTTON */}
      <div className="m-auto my-4 fixed right-4 bottom-4">
        <button
          onClick={() => {
            setCreateMode(true);
            setNewPhotoData({
              title: "",
              description: "",
              src: "",
              visible: false,
              categories: [],
            });
          }}
          className="rounded-full z-20 bg-cyan-700 text-white text-3xl w-24 h-24 hover:scale-125 hover:shadow-md transition-all"
          disabled={createMode}
        >
          +
        </button>
      </div>

      <CreatePhotoModal
        isOpen={createMode}
        onClose={() => setCreateMode(false)}
        onCreate={handleCreatePhoto}
      />
    </>
  );
}
