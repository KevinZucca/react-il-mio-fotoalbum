import Hero from "../../components/Hero";
import { usePhotos } from "../../contexts/PhotosContext";

export default function HomePage() {
  const { photosList } = usePhotos();
  return (
    <>
      <Hero />
      <div className="p-4 grid grid-cols-3 gap-4 justify-center w-full ">
        {photosList.map((el, index) => (
          <div
            key={index}
            className={`border p-4 h-[400px] bg-cover bg-center relative ${
              index == 3 || index == 6 ? "col-span-2" : ""
            }`}
            style={{
              backgroundImage: `url('${el.src}')`,
            }}
          >
            <h3 className="text-3xl text-gray-200 absolute bottom-5 left-1/2">
              {el.title}
            </h3>
            <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
          </div>
        ))}
      </div>
    </>
  );
}
