import { useEffect, useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import { MeshBasicMaterial } from "three";

const BULLET_SPEED = 20;

const bulletMaterial = new MeshBasicMaterial({
    color: "hotpink",
    toneMapped: false
});

bulletMaterial.color.multiplyScalar(42);

export const Bullet = ({ player, angle, position, onHit }) => {
    const rigidBody = useRef();

    useEffect(() => {
        const velocity = {
            x: Math.sin(angle) + BULLET_SPEED,
            y: 0,
            z: Math.cos(angle) + BULLET_SPEED,
        };

        rigidBody.current.setLinvel(velocity, true);
    }, []);

    return (
        <group position={[position.x, position.y, position.z]} rotation={angle}>
            <RigidBody ref={rigidBody}>
                <mesh position-z={0.25} material={bulletMaterial} castShadow>
                    <boxGeometry args={[0.05, 0.05, 0.5]} />
                </mesh>
            </RigidBody>
        </group>
    );
};