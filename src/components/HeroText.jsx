import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import GamingUIOverlays from "../components/GamingUIOverlays";

const HeroText = () => {
  const words = ["Train", "Battle", "Conquer"];
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  // Intersection Observer to detect when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: 0.3,
        rootMargin: "-10% 0px -10% 0px" // Only trigger when well within viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div 
      ref={ref}
      className="z-10 mt-20 text-center md:mt-45 md:text-left rounded-3xl bg-clip-text"
    >
      {/* Desktop View */}
      <div className="flex-col hidden md:flex c-space">
        <motion.h1
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: isInView ? 1 : 0, duration: 0.8 }}
        >
          Welcome to VIZERION
        </motion.h1>

        <div className="flex flex-col items-start">
          <motion.p
            className="text-5xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: isInView ? 1.2 : 0, duration: 0.8 }}
          >
            Elite Gaming Club <br /> Where Gamers
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: isInView ? 1.5 : 0, duration: 0.8 }}
          >
            {isInView && (
              <FlipWords
                words={words}
                className="font-black text-white text-8xl"
              />
            )}
          </motion.div>
          <motion.p
            className="text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: isInView ? 1.8 : 0, duration: 0.8 }}
          >
            On the Virtual Battlefield
          </motion.p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex- flex-col space-y-6 md:hidden">
        <motion.p
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: isInView ? 1 : 0, duration: 0.8 }}
        >
          Welcome to VIZERION
        </motion.p>
        <div>
          <motion.p
            className="text-5xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: isInView ? 1.2 : 0, duration: 0.8 }}
          >
            Where Gamers
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: isInView ? 1.5 : 0, duration: 0.8 }}
          >
            {isInView && (
              <FlipWords
                words={words}
                className="font-bold text-white text-7xl"
              />
            )}
          </motion.div>
          <motion.p
            className="text-4xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: isInView ? 1.8 : 0, duration: 0.8 }}
          >
            On the Virtual Battlefield
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default HeroText;