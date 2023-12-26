import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sendRequest } from "../../utils/FetchAPI";
// const baseURL = import.meta.env.VITE_BASE_API_URL;

export default function PhotoDetail() {
  const [photo, setPhoto] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  // API TO GET THE A SINGLE PHOTO
  async function getSinglePhoto() {
    try {
      const response = await sendRequest(`/photos/${id}`, "GET");
      const photo = await response;
      setPhoto(photo);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getSinglePhoto();
  }, []);

  return (
    <>
      <div className="w-3/5 max-h-[1000px] m-auto flex flex-col items-center">
        {/* img */}
        <div className="max-h-[800px]">
          <img
            // src={`${baseURL}/${photo.src}`}
            src={photo.src}
            alt=""
            className="max-h-[800px]"
          />
        </div>

        {/* content */}
        <div className="rounded p-3 w-80r flex flex-col gap-2">
          {/* title */}
          <div className="flex gap-4 items-center justify-between">
            <span>
              <img
                src="/public/camera-svgrepo-com.svg"
                alt=""
                className="w-5"
              />
            </span>
            <h2 className="text-2xl">{photo.title}</h2>
          </div>
          {/* username */}
          <div className="flex gap-4 items-center justify-between">
            <span>
              <img src="/public/user-svgrepo-com.svg" alt="" className="w-5" />
            </span>
            <p className="text-teal-600">
              {photo.user ? photo.user.username : "unknown photographer"}
            </p>
          </div>
          {/* description */}
          <div className="flex gap-4 items-center justify-between">
            <span>
              <img
                src="/public/picture-svgrepo-com.svg"
                alt=""
                className="w-5"
              />
            </span>
            <p>{photo.description}</p>
          </div>
          {/* categories */}
          <div className="flex gap-4 items-center justify-between">
            <span>
              <img
                src="/public/table-of-contents-svgrepo-com.svg"
                alt=""
                className="w-5"
              />
            </span>
            <ul>
              {photo.categories ? (
                photo.categories.map((el, index) => (
                  <li key={el.id} className="text-left">
                    <p>{el.name}</p>
                  </li>
                ))
              ) : (
                <p>No category</p>
              )}
            </ul>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute bg-teal-700/50 top-20 left-4 rounded-full text-white w-20 h-20"
        >
          Go back
        </button>
      </div>
    </>
  );
}
