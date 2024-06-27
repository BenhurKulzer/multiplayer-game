import { Environment, OrbitControls } from "@react-three/drei";
import { Map } from "./Map";

export const Experience = () => {
  return (
    <>
      <directionalLight
       castShadow
       intensity={0.3}
       position={[25, 18, -25]}
       shadow-bias={-0.0001}
       shadow-camera-far={80}
       shadow-camera-near={0}
       shadow-camera-left={-30}
       shadow-camera-right={30}
       shadow-camera-top={25}
       shadow-camera-bottom={-25}
       shadow-mapSize-width={4096}
       shadow-mapSize-height={4096}
      />

      <OrbitControls />
      
      <Map />

      <Environment preset="sunset" />
    </>
  );
};
