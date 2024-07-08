import { Suspense, useEffect, useState } from "react";

import { Loader, PerformanceMonitor, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";

import { Experience } from "./components/Experience";
import { Leaderboard } from "./components/Leaderboard";

function App() {
  const [downgradedPerformance, setDowngradedPerformance] = useState(false);
  const [fovSize, setFovSize] = useState(35);

  useEffect(() => {
    const updateFovBasedOnOrientationAndDeviceType = () => {
      const isMobile = window.innerWidth < 768;
      const isPortrait = window.innerHeight > window.innerWidth;

      if (isMobile) {
        if (isPortrait) {
          setFovSize(70);
        } else {
          setFovSize(35);
        }
      } else {
        setFovSize(35);
      }
    };

    updateFovBasedOnOrientationAndDeviceType();
    window.addEventListener('resize', updateFovBasedOnOrientationAndDeviceType);

    return () => {
      window.removeEventListener('resize', updateFovBasedOnOrientationAndDeviceType);
    };
  }, []);

  return (
    <>
      <Loader />

      <Leaderboard />

      <Canvas
        shadows
        camera={{ position: [0, 30, 0], fov: fovSize, near: 2 }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#242424"]} />
        <SoftShadows size={42} />

        <PerformanceMonitor onDecline={(fps) => setDowngradedPerformance(true)} />

        <Suspense>
          <Physics>
            <Experience downgradedPerformance={downgradedPerformance} />
          </Physics>
        </Suspense>

        {!downgradedPerformance && (
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={1} intensity={1.5} mipmapBlur />
          </EffectComposer>
        )}
      </Canvas>
    </>
  );
}

export default App;