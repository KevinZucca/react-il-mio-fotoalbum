import { useState } from "react";
import { useSpring, animated } from "react-spring";

export default function Hero() {
  const carouselImages = [
    "https://images.pexels.com/photos/19440410/pexels-photo-19440410/free-photo-of-calm.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/18642972/pexels-photo-18642972/free-photo-of-straight-next-to-the-shack.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/12756665/pexels-photo-12756665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);

  // ANIMATIONS
  const fadeIn = useSpring({
    opacity: opacity,
    config: { duration: 200 },
  });

  //

  function changePic(direction) {
    setOpacity(0);
    setTimeout(() => {
      if (direction === "left") {
        setActiveIndex(
          (prevIndex) =>
            (prevIndex - 1 + carouselImages.length) % carouselImages.length
        );
      } else if (direction === "right") {
        setActiveIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
      }
      setOpacity(1);
    }, 300);
  }

  function handleSlideDown() {
    window.scrollTo(0, 770);
  }

  return (
    <animated.div
      style={{
        backgroundImage: `url('${carouselImages[activeIndex]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        ...fadeIn,
      }}
      className="relative w-full h-[700px] mb-18 flex flex-col"
    >
      {/* CAROUSEL BUTTONS */}
      <button
        className="absolute top-1/2 left-3 rounded-full bg-gray-100/10 p-5 w-24 h-24 z-20 "
        onClick={() => changePic("left")}
      >
        <svg
          width="50px"
          height="50px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#b8b5b0"
            d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"
          />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-3 rounded-full bg-gray-100/10 p-5 w-24 h-24 z-20"
        onClick={() => changePic("right")}
      >
        <svg
          width="50px"
          height="50px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#b8b5b0"
            d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"
          />
        </svg>
      </button>

      {/* HERO CONTENT */}
      <section className="mt-4 absolute w-full">
        <div className=" text-white py-20">
          <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24 z-20">
            <animated.div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                opacity: fadeIn.opacity,
              }}
              className="w-full lg:w-1/3 justify-center items-start"
            >
              <h1 className="text-3xl md:text-5xl p-2 text-yellow-300 tracking-loose">
                Seized Instants
              </h1>
              <h2 className="text-3xl text-left md:text-5xl leading-relaxed md:leading-snug mb-2">
                Through the Lens of Timelessness
              </h2>
              <p className="text-sm text-left md:text-base text-gray-50 mb-4 max-w-[50%]">
                "Capturing moments is an art form that unveils the profound
                essence of life, freezing fragments of time to reveal the
                timeless beauty woven into every fleeting instance."
              </p>
              <button
                onClick={handleSlideDown}
                className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent"
              >
                Explore Now
              </button>
            </animated.div>
          </div>
        </div>
      </section>
    </animated.div>
  );
}
