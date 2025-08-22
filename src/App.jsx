import React, { useState, useRef, useEffect } from "react";
import { ErrorBoundary } from 'react-error-boundary';
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import { useInView } from "react-intersection-observer";

// Error Fallback Component
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
        {/* Show error details in development */}
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

  const handleInViewChange = (sectionId) => {
    setCurrentSection(sectionId);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
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