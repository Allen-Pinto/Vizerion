import { motion, useScroll, useSpring, useTransform } from "motion/react";

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });
      
  // Transform values for cyberpunk effect
  const gridY = useTransform(x, [0, 1], ["0%", "50%"]);
  const neonBuildingsY = useTransform(x, [0, 1], ["0%", "30%"]);
  const hologramsX = useTransform(x, [0, 1], ["0%", "-15%"]);
  const foregroundY = useTransform(x, [0, 1], ["0%", "10%"]);
  const gridOpacity = useTransform(x, [0, 0.2, 0.8, 1], [0.3, 0.7, 0.7, 0.3]);

  return (
    <section className="absolute inset-0 bg-black/70">
      <div className="relative h-screen overflow-hidden">
        {/* Base Cyberpunk Sky */}
        <div
          className="absolute inset-0 w-full h-screen -z-50"
          style={{
            background: "linear-gradient(to bottom, #0a0a1f 0%, #1a0040 70%, #300060 100%)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            willChange: "transform",
          }}
        />
        
        {/* Animated Grid Layer */}
        <motion.div
          className="absolute inset-0 -z-40 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.1) 0%, transparent 50%),
                              linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "100% 100%, 40px 40px, 40px 40px",
            y: gridY,
            opacity: gridOpacity,
            willChange: "transform",
          }}
        />
        
        {/* Distant Neon Buildings */}
        <motion.div
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: "url(/assets/cyberpunk-buildings-far.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            y: neonBuildingsY,
            backgroundColor: "rgba(10, 10, 31, 0.5)",
            willChange: "transform",
          }}
        />
        
        {/* Holograms and Floating Ads */}
        <motion.div
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: "url(/assets/holograms.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: hologramsX,
            backgroundColor: "rgba(255, 0, 255, 0.1)",
            willChange: "transform",
          }}
        />
        
        {/* Foreground Neon Elements */}
        {/* <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "url(/assets/cyberpunk-foreground.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: foregroundY,
            backgroundColor: "rgba(0, 243, 255, 0.1)",
            willChange: "transform",
          }}
        /> */}
        
        {/* Animated Neon Particles */}
        <motion.div 
          className="absolute inset-0 -z-15"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 20% 30%, rgba(0, 255, 200, 0.6), transparent 50%),
                              radial-gradient(2px 2px at 80% 70%, rgba(255, 0, 200, 0.6), transparent 50%),
                              radial-gradient(2px 2px at 40% 90%, rgba(0, 150, 255, 0.6), transparent 50%),
                              radial-gradient(2px 2px at 60% 10%, rgba(200, 0, 255, 0.6), transparent 50%)`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            willChange: "transform",
          }}
          animate={{
            backgroundPosition: [
              "0% 0%", 
              "100% 100%", 
              "100% 0%", 
              "0% 100%", 
              "0% 0%"
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </section>
  );
};

export default ParallaxBackground;