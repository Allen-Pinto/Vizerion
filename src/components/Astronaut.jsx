import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useMotionValue, useSpring } from "motion/react";
import { useFrame } from "@react-three/fiber";

export function Astronaut(props) {
  const group = useRef();
  const { scene, animations } = useGLTF(
    "/models/xbox_elite_controller.glb"  
  );
  const { actions } = useAnimations(animations, group);
  
  useEffect(() => {
    if (animations && animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

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
    <group
      ref={group}
      {...props}
      dispose={null}
      rotation={[270 + Math.PI, Math.PI, 10]}
      scale={props.scale || 0.4}        
      position={props.position || [2.5, -0.6, -3]} // Move right and up a bit
    >
      <primitive object={scene} />
    </group>
  );

}

useGLTF.preload("/models/xbox_elite_controller.glb");