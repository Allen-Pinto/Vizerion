import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useMotionValue, useSpring } from "motion/react";
import { useFrame } from "@react-three/fiber";

export function Astronaut(props) {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/xbox_elite_controller.glb");
  const { actions } = useAnimations(animations, group);

  // Play first animation if available
  useEffect(() => {
    if (animations && animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  // Floating spring animation
  const yPosition = useMotionValue(5);
  const ySpring = useSpring(yPosition, { damping: 30 });
  useEffect(() => {
    ySpring.set(-1);
  }, [ySpring]);

  useFrame(() => {
    if (group.current) {
      group.current.position.y = ySpring.get();
    }
  });

  return (
    <>
      {/* ✅ Lights so model is visible */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, -5]} intensity={0.6} />

      {/* ✅ Model */}
      <group
        ref={group}
        {...props}
        dispose={null}
        rotation={props.rotation || [270 + Math.PI, Math.PI, 10]}
        scale={props.scale || 0.4}
        position={props.position || [2.5, -0.6, -3]} // centered
      >
        <primitive object={scene} />
      </group>
    </>
  );
}

useGLTF.preload("/models/xbox_elite_controller.glb");
