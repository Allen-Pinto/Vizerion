import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const FullWebsiteLoader = ({ onLoadingComplete, children }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState('Initializing...');
  const mountRef = useRef(null);
  const animationRef = useRef(null);

  // Your loader images
  const loaderImages = [
    '/images/loader/frame1.jpg',
    '/images/loader/frame2.jpg', 
    '/images/loader/frame3.jpg',
    '/images/loader/frame4.jpg',
    '/images/loader/frame5.jpg',
    '/images/loader/frame6.jpg',
    '/images/loader/frame7.jpg',
    '/images/loader/frame8.jpg',
    '/images/loader/frame9.jpg',
    '/images/loader/frame10.jpg'
  ];

  const loadingStages = [
    'Initializing...',
    'Loading Images...',
    'Loading 3D Models...',
    'Loading Scripts...',
    'Loading Fonts...',
    'Preparing Interface...',
    'Almost Ready...',
    'Welcome to VIZERION!'
  ];

  // Full website loading logic
  useEffect(() => {
    let progress = 0;
    const progressIncrement = 100 / 8; // 8 stages
    const updateProgress = (newProgress, stage) => {
      setLoadingProgress(newProgress);
      setLoadingStage(stage);
      const imageIndex = Math.floor((newProgress / 100) * (loaderImages.length - 1));
      setCurrentImageIndex(imageIndex);
    };

    const checkLoadingComplete = async () => {
      // Stage 1: DOM Content Loaded
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }
      progress += progressIncrement;
      updateProgress(progress, loadingStages[1]);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Stage 2: Load all images
      const images = document.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = resolve;
            img.onerror = resolve; // Continue even if image fails
          }
        });
      });
      await Promise.all(imagePromises);
      progress += progressIncrement;
      updateProgress(progress, loadingStages[2]);
      await new Promise(resolve => setTimeout(resolve, 400));

      // Stage 3: Wait for Three.js and 3D models
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate 3D loading
      progress += progressIncrement;
      updateProgress(progress, loadingStages[3]);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Stage 4: Load scripts and external resources
      const scripts = document.querySelectorAll('script[src]');
      const scriptPromises = Array.from(scripts).map(script => {
        return new Promise((resolve) => {
          if (script.loaded) {
            resolve();
          } else {
            script.onload = resolve;
            script.onerror = resolve;
          }
        });
      });
      await Promise.all(scriptPromises);
      progress += progressIncrement;
      updateProgress(progress, loadingStages[4]);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Stage 5: Check fonts
      if (document.fonts) {
        await document.fonts.ready;
      }
      progress += progressIncrement;
      updateProgress(progress, loadingStages[5]);
      await new Promise(resolve => setTimeout(resolve, 400));

      // Stage 6: Final preparations
      progress += progressIncrement;
      updateProgress(progress, loadingStages[6]);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Stage 7: Complete
      progress = 100;
      updateProgress(progress, loadingStages[7]);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Stage 8: Fade out
      setIsLoading(false);
      setTimeout(() => {
        if (onLoadingComplete) onLoadingComplete();
      }, 1000);
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

    // Create particles
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

    // Create gaming elements
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

  if (!isLoading) {
    return children;
  }

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

export default FullWebsiteLoader;