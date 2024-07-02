import { useEffect, useState } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { Joystick, insertCoin, myPlayer, onPlayerJoin } from "playroomkit";

import { Map } from "./Map";
import { SoldierController } from "./SoldierController";

export const Experience = () => {
  const [players, setPlayers] = useState([]);

  const start = async () => {
    await insertCoin();
  }

  useEffect(() => {
    start();

    onPlayerJoin((player) => {
      const joystick = new Joystick(player, {
        type: "angular",
        buttons: [{ id: "fire", label: "Fire" }]
      });

      const newPlayer = { player, joystick };
      player.setState("health", 100);
      player.setState("deaths", 0);
      player.setState("kills", 0);

      setPlayers((players) => [...players, newPlayer]);

      player.onQuit(() => {
        setPlayers((players) => players.filter((person) => person.state.id !== person.id));
      })
    })
  }, []);

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
      
      <Map />

      {
        players.map(({ state, joystick }, index) => {
          <SoldierController
            key={state.id}
            state={state}
            joystick={joystick}
            userPlayer={state.id === myPlayer()?.id}
          />
        })
      }

      <Environment preset="sunset" />
    </>
  );
};
