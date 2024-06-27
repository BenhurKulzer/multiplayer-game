import { useRef } from "react";
import { Soldier } from "./Soldier";
import { RigidBody } from "@react-three/rapier";

export function SoldierController ({
  state,
  joystick,
  userPlayer,
  ...props
}) {
  const group = useRef();
  const character = useRef();

  const [animation, setAnimation] = useState("Idle");

  return (
    <group ref={group} {...props}>
      <RigidBody>
        <group ref={character}>
          <Soldier
            color={state.state.profile.color}
            animation={animation}
          />
        </group>
      </RigidBody>
    </group>
  );
}
