import Hero from "../../components/Hero";
import { usePhotos } from "../../contexts/PhotosContext";
import Filters from "../../components/Filters";

export default function HomePage() {
  const { photosList } = usePhotos();

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
          >
            {/* {el.categories.length > 0 && (
              <ul className="absolute top-3 left-3  text-gray-700 font-bold bg-white/70 p-2">
                {el.categories.map((category, index) => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            )} */}
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
