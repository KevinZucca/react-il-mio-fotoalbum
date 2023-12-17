import { useSpring, animated } from "react-spring";

export default function About() {
  //   animations
  const about = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const aboutDescription = useSpring({
    from: { x: -50 },
    to: { x: 0 },
    config: { duration: 800 },
  });

  const aboutImg = useSpring({
    from: { x: 50 },
    to: { x: 0 },
    config: { duration: 800 },
  });
  return (
    <>
      <animated.div style={about} className="grid grid-cols-2 relative">
        <div className="border-t pt-5 text-left p-3 flex flex-col">
          <h2 className="text-8xl text-center">Me.</h2>
          <div className="h-full flex place-items-center justify-center">
            <animated.div
              style={aboutDescription}
              className="flex flex-col gap-8 max-w-[80%]"
            >
              <p className="text-4xl">Professional Photographer</p>
              <p>
                Crafting Visual Tales: As a passionate photographer, I weave
                intricate visual tales that transcend the ordinary. Through the
                lens, I explore the art of capturing moments that speak volumes,
                blending technical expertise with a distinct artistic touch.
              </p>
              <p>
                A Life Behind the Camera: Join me on a journey that spans a
                lifetime devoted to the craft. Each photograph is a testament to
                the dedication and artistry that defines my work, transforming
                fleeting moments into timeless expressions.
              </p>

              <em className="text-sm mt-3 text-center text-gray-500">
                "Photography, for me, is the art of freezing time, encapsulating
                emotions in a frame. Each image holds a piece of life, waiting
                to be rediscovered and cherished anew."
              </em>
            </animated.div>
          </div>
        </div>
        <animated.div style={aboutImg}>
          <img
            className="w-full max-h-[1000px] object-cover"
            src="https://images.unsplash.com/photo-1489340469066-8c79cdd36ecc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </animated.div>
      </animated.div>
    </>
  );
}
