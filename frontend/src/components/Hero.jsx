import { useState } from "react";
import { useSpring, animated } from "react-spring";

export default function Hero() {
  const carouselImages = [
    "https://images.pexels.com/photos/19440410/pexels-photo-19440410/free-photo-of-calm.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/18642972/pexels-photo-18642972/free-photo-of-straight-next-to-the-shack.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/12756665/pexels-photo-12756665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImg, setActiveImg] = useState(carouselImages[activeIndex]);

  //   animations
  const hero = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const heroTitle = useSpring({
    from: { x: -50 },
    to: { x: 0 },
    config: { duration: 1000 },
  });

  const heroPics = useSpring({
    from: { x: 50 },
    to: { x: 0 },
    config: { duration: 1000 },
  });
  //

  // function to handle carousel pictures change
  function changePic(direction) {
    if (direction == "left") {
      const newIndex = activeIndex - 1;
      if (newIndex < 0) {
        setActiveIndex(carouselImages.length - 1);
      } else {
        setActiveIndex(newIndex);
        setActiveImg(carouselImages[newIndex]);
      }
      console.log("lunghezza del carosello: " + carouselImages.length);
      console.log(activeIndex);
    } else if (direction == "right") {
      const newIndex =
        (activeIndex + 1 + carouselImages.length) % carouselImages.length;
      setActiveIndex(newIndex);
      setActiveImg(carouselImages[newIndex]);
      console.log(activeIndex);
    }
  }
  //
  return (
    <>
      <animated.div
        style={{
          backgroundImage: `url('${activeImg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          ...hero,
        }}
        className="relative w-full h-[700px] mb-18 flex flex-col"
      >
        {/* CAROUSEL BUTTONS */}
        <button
          className="absolute top-1/2 left-3 rounded-full bg-gray-100 text-gray-600 p-5 w-24 h-24"
          onClick={() => changePic("left")}
        >
          LEFT
        </button>
        <button
          className="absolute top-1/2 right-3 rounded-full bg-gray-100 text-gray-600 p-5 w-24 h-24"
          onClick={() => changePic("right")}
        >
          RIGHT
        </button>

        {/* HERO CONTENT */}
        <section className="mt-4 absolute w-full">
          <div className=" text-white py-20" onClick={() => changePic("left")}>
            <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
              <animated.div
                style={heroTitle}
                className="flex flex-col w-full lg:w-1/3 justify-center items-start"
              >
                <h1 className="text-3xl md:text-5xl p-2 text-yellow-300 tracking-loose">
                  TechFest
                </h1>
                <h2 className="text-3xl text-left md:text-5xl leading-relaxed md:leading-snug mb-2">
                  Space : The Timeless Infinity
                </h2>
                <p className="text-sm text-left md:text-base text-gray-50 mb-4">
                  Explore your favourite events and register now to showcase
                  your talent and win exciting prizes.
                </p>
                <a
                  href="#"
                  className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent"
                >
                  Explore Now
                </a>
              </animated.div>
              <animated.div
                style={heroPics}
                className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center"
              >
                {/* HERO IMAGES CONTAINER */}
                <div className="h-48 flex content-center items-center gap-10">
                  <div>
                    <img
                      className="inline-block hidden xl:block rounded-full h-48 w-48"
                      src="https://images.unsplash.com/photo-1682687221323-6ce2dbc803ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8"
                    />
                  </div>
                  <div>
                    <img
                      className="inline-block md:mt-0 p-8 md:p-0 rounded-full h-80"
                      src="https://images.unsplash.com/photo-1701686312644-88a37456e07e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D"
                    />
                  </div>
                  <div>
                    <img
                      className="inline-block hidden lg:block rounded-full h-96 w-96"
                      src="https://images.unsplash.com/photo-1590421959604-741d0eec0a2e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                  </div>
                </div>
              </animated.div>
            </div>
          </div>
        </section>
      </animated.div>
    </>
  );
}
