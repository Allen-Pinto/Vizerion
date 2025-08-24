import React, { useState, useRef, useEffect } from "react";
import { ErrorBoundary } from 'react-error-boundary';
import * as THREE from 'three';
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import { useInView } from "react-intersection-observer";

// VIZERION Full Website Loader Component
const VIZERIONLoader = ({ onLoadingComplete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState('Initializing VIZERION...');
  const mountRef = useRef(null);
  const animationRef = useRef(null);

  // Your loader images - UPDATE THESE PATHS
  const loaderImages = [
    '/assets/games/esport.jpeg',
    '/assets/games/coc.png',
    '/assets/games/cod.jpg',
    '/assets/games/cr.jpg',
    '/assets/games/bgmi.jpg',
    '/assets/games/fifa.jpg',
    '/assets/games/freefire.jpg',
    '/assets/games/minecraft.png',
    '/assets/games/roblox.jpg',
    '/assets/games/valorant.jpg'
  ];  

  const loadingStages = [
    'Initializing VIZERION...',
    'Loading Game Assets...',
    'Rendering 3D Environment...',
    'Loading Game Scripts...',
    'Preparing Gaming Interface...',
    'Calibrating Systems...',
    'Final Preparations...',
    'Welcome to VIZERION!'
  ];

  // Full website loading logic
  useEffect(() => {
    let progress = 0;
    const progressIncrement = 100 / 8;
    
    const updateProgress = (newProgress, stage) => {
      setLoadingProgress(newProgress);
      setLoadingStage(stage);
      const imageIndex = Math.floor((newProgress / 100) * (loaderImages.length - 1));
      setCurrentImageIndex(imageIndex);
    };

    const checkLoadingComplete = async () => {
      try {
        // Stage 1: DOM Content Loaded
        if (document.readyState === 'loading') {
          await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve);
          });
        }
        progress += progressIncrement;
        updateProgress(progress, loadingStages[1]);
        await new Promise(resolve => setTimeout(resolve, 300));

        // Stage 2: Load all images with timeout
        const images = document.querySelectorAll('img');
        const imagePromises = Array.from(images).map(img => {
          return Promise.race([
            new Promise((resolve) => {
              if (img.complete) {
                resolve();
              } else {
                img.onload = resolve;
                img.onerror = resolve;
              }
            }),
            new Promise(resolve => setTimeout(resolve, 2000)) // 2s timeout per image
          ]);
        });
        
        await Promise.race([
          Promise.all(imagePromises),
          new Promise(resolve => setTimeout(resolve, 3000)) // Max 3s for all images
        ]);
        
        progress += progressIncrement;
        updateProgress(progress, loadingStages[2]);
        await new Promise(resolve => setTimeout(resolve, 400));

        // Stage 3: 3D Models and WebGL (simulated with timeout)
        await new Promise(resolve => setTimeout(resolve, 800));
        progress += progressIncrement;
        updateProgress(progress, loadingStages[3]);
        await new Promise(resolve => setTimeout(resolve, 300));

        // Stage 4: Scripts (with timeout to prevent hanging)
        await Promise.race([
          new Promise(resolve => {
            const scripts = document.querySelectorAll('script[src]');
            if (scripts.length === 0) {
              resolve();
              return;
            }
            
            const scriptPromises = Array.from(scripts).map(script => {
              return new Promise((resolve) => {
                if (script.readyState === 'complete' || script.readyState === 'loaded') {
                  resolve();
                } else {
                  script.onload = resolve;
                  script.onerror = resolve;
                }
              });
            });
            Promise.all(scriptPromises).then(resolve);
          }),
          new Promise(resolve => setTimeout(resolve, 2000)) // 2s timeout for scripts
        ]);
        
        progress += progressIncrement;
        updateProgress(progress, loadingStages[4]);
        await new Promise(resolve => setTimeout(resolve, 300));

        // Stage 5: Fonts (with timeout)
        await Promise.race([
          document.fonts ? document.fonts.ready : Promise.resolve(),
          new Promise(resolve => setTimeout(resolve, 1500)) // 1.5s timeout for fonts
        ]);
        
        progress += progressIncrement;
        updateProgress(progress, loadingStages[5]);
        await new Promise(resolve => setTimeout(resolve, 400));

        // Stage 6: System calibration
        progress += progressIncrement;
        updateProgress(progress, loadingStages[6]);
        await new Promise(resolve => setTimeout(resolve, 500));

        // Stage 7: Complete
        progress = 100;
        updateProgress(progress, loadingStages[7]);
        await new Promise(resolve => setTimeout(resolve, 600));

        // Stage 8: Fade out
        setIsLoading(false);
        setTimeout(() => {
          onLoadingComplete();
        }, 1000);

      } catch (error) {
        console.warn('Loading detection error:', error);
        // If anything fails, just complete the loading after a reasonable time
        setTimeout(() => {
          progress = 100;
          updateProgress(progress, loadingStages[7]);
          setTimeout(() => {
            setIsLoading(false);
            onLoadingComplete();
          }, 1000);
        }, 2000);
      }
    };

    checkLoadingComplete();
  }, []);

  // 3D Background Animation
  useEffect(() => {
    if (!mountRef.current || !isLoading) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Gaming particles
    const particles = [];
    const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const particleMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x8B5CF6, transparent: true, opacity: 0.6 }),
      new THREE.MeshBasicMaterial({ color: 0x3B82F6, transparent: true, opacity: 0.6 }),
      new THREE.MeshBasicMaterial({ color: 0x1E1B4B, transparent: true, opacity: 0.4 }),
    ];

    for (let i = 0; i < 200; i++) {
      const particle = new THREE.Mesh(
        particleGeometry,
        particleMaterials[Math.floor(Math.random() * particleMaterials.length)]
      );
      
      particle.position.x = (Math.random() - 0.5) * 50;
      particle.position.y = (Math.random() - 0.5) * 50;
      particle.position.z = (Math.random() - 0.5) * 50;
      
      particle.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        )
      };
      
      scene.add(particle);
      particles.push(particle);
    }

    // Gaming geometry elements
    const gameElements = [];
    const geometries = [
      new THREE.OctahedronGeometry(2),
      new THREE.TetrahedronGeometry(2.5),
      new THREE.IcosahedronGeometry(1.8),
      new THREE.DodecahedronGeometry(2.2),
    ];

    geometries.forEach((geometry, index) => {
      const material = new THREE.MeshBasicMaterial({ 
        color: [0x8B5CF6, 0x3B82F6, 0x06B6D4, 0x8B5CF6][index],
        transparent: true,
        opacity: 0.3,
        wireframe: true
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      mesh.userData = {
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        )
      };
      scene.add(mesh);
      gameElements.push(mesh);
    });

    camera.position.z = 15;

    const animate = () => {
      if (!isLoading) return;
      animationRef.current = requestAnimationFrame(animate);

      particles.forEach(particle => {
        particle.position.add(particle.userData.velocity);
        if (Math.abs(particle.position.x) > 25) particle.userData.velocity.x *= -1;
        if (Math.abs(particle.position.y) > 25) particle.userData.velocity.y *= -1;
        if (Math.abs(particle.position.z) > 25) particle.userData.velocity.z *= -1;
      });

      gameElements.forEach(element => {
        element.rotation.x += element.userData.rotationSpeed.x;
        element.rotation.y += element.userData.rotationSpeed.y;
        element.rotation.z += element.userData.rotationSpeed.z;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="vizerion-full-loader">
      {/* 3D Background */}
      <div className="threejs-background" ref={mountRef}></div>
      
      {/* Loader Content */}
      <div className="loader-content">
        {/* Sequential Images */}
        <div className="image-container">
          <img 
            src={loaderImages[currentImageIndex]} 
            alt={`Loading frame ${currentImageIndex + 1}`}
            className="loader-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="image-overlay"></div>
        </div>

        {/* Branding */}
        <div className="brand-container">
          <h1 className="brand-title">VIZERION</h1>
          <div className="brand-subtitle">Gaming Universe</div>
        </div>

        {/* Progress */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="progress-info">
            <span className="progress-percent">{Math.round(loadingProgress)}%</span>
            <span className="loading-stage">{loadingStage}</span>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="loading-pulse">
          <div className="pulse-ring"></div>
          <div className="pulse-ring"></div>
          <div className="pulse-ring"></div>
        </div>
      </div>

      <style jsx>{`
        .vizerion-full-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0F0F1A 0%, #1E1B4B 30%, #0F0F1A 70%, #1E1B4B 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
          animation: ${!isLoading ? 'fadeOut 1s ease-out forwards' : 'none'};
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }

        .threejs-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.4;
        }

        .loader-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 500px;
          padding: 40px;
        }

        .image-container {
          position: relative;
          width: 250px;
          height: 250px;
          margin: 0 auto 40px;
          border-radius: 25px;
          overflow: hidden;
          border: 4px solid rgba(139, 92, 246, 0.6);
          box-shadow: 
            0 0 40px rgba(139, 92, 246, 0.4),
            inset 0 0 30px rgba(0, 0, 0, 0.3);
          animation: imageGlow 2s ease-in-out infinite alternate;
        }

        @keyframes imageGlow {
          from { 
            border-color: rgba(139, 92, 246, 0.6);
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.4), inset 0 0 30px rgba(0, 0, 0, 0.3);
          }
          to { 
            border-color: rgba(59, 130, 246, 0.8);
            box-shadow: 0 0 60px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(0, 0, 0, 0.3);
          }
        }

        .loader-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s ease;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, 
            rgba(139, 92, 246, 0.3) 0%, 
            transparent 50%, 
            rgba(59, 130, 246, 0.3) 100%);
          animation: shimmer 2.5s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(-45deg); }
          100% { transform: translateX(200%) rotate(-45deg); }
        }

        .brand-container {
          margin-bottom: 40px;
        }

        .brand-title {
          font-size: 4rem;
          font-weight: 900;
          margin: 0 0 15px 0;
          background: linear-gradient(45deg, #8B5CF6, #3B82F6, #06B6D4, #8B5CF6);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 3px;
          animation: gradientShift 3s ease-in-out infinite;
          text-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .brand-subtitle {
          font-size: 1.2rem;
          color: #A3A3A3;
          text-transform: uppercase;
          letter-spacing: 4px;
          font-weight: 600;
        }

        .progress-container {
          margin-bottom: 40px;
        }

        .progress-bar {
          width: 100%;
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 20px;
          border: 1px solid rgba(139, 92, 246, 0.3);
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.3),
            0 0 10px rgba(139, 92, 246, 0.2);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4);
          border-radius: 6px;
          transition: width 0.5s ease;
          position: relative;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.4), 
            transparent);
          animation: progressShine 2s infinite;
        }

        @keyframes progressShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .progress-percent {
          font-size: 1.4rem;
          font-weight: 700;
          color: #8B5CF6;
        }

        .loading-stage {
          font-size: 1rem;
          color: #A3A3A3;
          font-style: italic;
        }

        .loading-pulse {
          position: relative;
          width: 60px;
          height: 60px;
          margin: 0 auto;
        }

        .pulse-ring {
          position: absolute;
          border: 3px solid rgba(139, 92, 246, 0.3);
          border-radius: 50%;
          width: 100%;
          height: 100%;
          animation: pulse 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }

        .pulse-ring:nth-child(2) {
          animation-delay: 0.7s;
          border-color: rgba(59, 130, 246, 0.3);
        }

        .pulse-ring:nth-child(3) {
          animation-delay: 1.4s;
          border-color: rgba(6, 182, 212, 0.3);
        }

        @keyframes pulse {
          0% {
            transform: scale(0.3);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .brand-title {
            font-size: 2.5rem;
          }
          
          .image-container {
            width: 200px;
            height: 200px;
          }
          
          .loader-content {
            padding: 20px;
            max-width: 350px;
          }
        }
      `}</style>
    </div>
  );
};

// Error Fallback Component (same as your original)
function ErrorFallback({error}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl mb-4">Something went wrong!</h2>
        <p className="text-gray-400 mb-6 max-w-md">
          The gaming matrix encountered an error. Don't worry, we can fix this!
        </p>
        <div className="space-x-4">
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
          >
            Respawn
          </button>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
          >
            Go Back
          </button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left bg-gray-900 p-4 rounded max-w-2xl">
            <summary className="cursor-pointer text-yellow-400 mb-2">
              Error Details (Dev Mode)
            </summary>
            <pre className="text-xs text-red-300 overflow-auto whitespace-pre-wrap">
              {error?.toString()}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}

const SectionWrapper = ({ children, id, onInViewChange }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      onInViewChange(id);
    }
  }, [inView, id, onInViewChange]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <section id={id} ref={ref} className="snap-start w-full">
        {children}
      </section>
    </ErrorBoundary>
  );
};

const App = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [websiteLoaded, setWebsiteLoaded] = useState(false);

  const handleInViewChange = (sectionId) => {
    setCurrentSection(sectionId);
  };

  const handleLoadingComplete = () => {
    setWebsiteLoaded(true);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {/* Show loader until website is fully loaded */}
      {!websiteLoaded && <VIZERIONLoader onLoadingComplete={handleLoadingComplete} />}
      
      {/* Main website content */}
      <div className={`h-screen w-full overflow-y-scroll snap-y snap-mandatory ${!websiteLoaded ? 'hidden' : ''}`}>
        <SectionWrapper id="home" onInViewChange={handleInViewChange}>
          <Navbar />
          <Hero showGamingUI={currentSection === "home"} />
        </SectionWrapper>
        
        <SectionWrapper id="about" onInViewChange={handleInViewChange}>
          <About />
        </SectionWrapper>
        
        <SectionWrapper id="games" onInViewChange={handleInViewChange}>
          <Projects />
        </SectionWrapper>
        
        <SectionWrapper id="contact" onInViewChange={handleInViewChange}>
          <Contact />
          <Footer />
        </SectionWrapper>
      </div>
    </ErrorBoundary>
  );
};

export default App;