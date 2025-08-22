import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import Hero from "./Hero.jsx";
import GamingUIOverlays from "../components/GamingUIOverlays.jsx";

const HeroWrapper = () => {
  const { ref, inView } = useInView({
    threshold: 0.5, // triggers when 50% of Hero is visible
  });

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen w-full snap-start"
    >
      <Hero />
      {inView && <GamingUIOverlays />}
    </section>
  );
};

export default HeroWrapper;
