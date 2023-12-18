import Hero from "../../components/Hero";
import { usePhotos } from "../../contexts/PhotosContext";
import Filters from "../../components/Filters";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function HomePage() {
  const { photosList } = usePhotos();
  const [hoverEl, setHoverEl] = useState(null);

  return (
    <>
      <Hero />
      <Filters />
      <div
        id="photo-card"
        className="p-4 grid grid-cols-3 gap-4 justify-center w-full"
      >
        {photosList?.map((el, index) => (
          <div
            id="photo"
            key={index}
            className={`border p-4 h-[400px] bg-cover bg-center relative ${
              index == 3 || index == 6 ? "col-span-2" : ""
            } `}
            style={{
              backgroundImage: `url('${el.src}')`,
            }}
            onMouseEnter={() => setHoverEl(index)}
            onMouseLeave={() => setHoverEl(null)}
          >
            {hoverEl == index && (
              <Link
                className={`hover:cursor-pointer z-30 absolute top-1/2 left-1/2 w-full h-full text-3xl text-gray-100 bg-gray-100/25 p-5 transform -translate-x-1/2 -translate-y-1/2`}
                to={`/photos/${el.id}`}
              ></Link>
            )}
            <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
            <div className=" text-gray-200 absolute bottom-5 right-2 p-2 w-full">
              <h3 className="text-3xl">{el.title}</h3>
              <p>{el.description}</p>
              <em>by - {el.user?.username ?? "No username"} - </em>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
