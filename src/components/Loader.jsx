import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  useProgress(); // still required so Suspense works
  return (
    <Html center>
      <div className="loader"></div>

      <style jsx>{`
        .loader {
          width: 60px;
          height: 60px;
          border: 6px solid rgba(0, 0, 0, 0.15);
          border-top: 6px solid #000000; /* black */
          border-radius: 50%;
          animation: spin 1s linear infinite;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* subtle black glow */
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Html>
  );
};

export default Loader;
