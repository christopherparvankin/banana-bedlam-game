import { InputManager, KeyCode, moveKeys } from "./InputManager";
import React, { useState, useRef} from "react";
import { Sprite, useTick } from "@pixi/react";
import b from "../images/le_monke.png";
import {ContextProps} from "./Context";

interface ArchibaldProps {
  inputManager: React.MutableRefObject<InputManager>;
  context: ContextProps
}

const Archibald: React.FC<ArchibaldProps> = ({ inputManager, context}) => {
  const [position, setPosition] = useState({ x: context.x, y: context.y });
  
  const d = useRef(12);
  var archWidth = 120; 
  var archHeight = 120; 

  const key_to_movement = (key: KeyCode): { dx: number; dy: number } => {
    switch (key) {
      case "KeyA":
        return { dx: -d.current, dy: 0 };
      case "KeyD":
        return { dx: d.current, dy: 0 };
      case "KeyW":
        return { dx: 0, dy: -d.current };
      case "KeyS":
        return { dx: 0, dy: d.current };
      default:
        return { dx: 0, dy: 0 };
    }
  };

  useTick((delta) => {

 
    for (const key of moveKeys) {
    
      if (inputManager.current.keys[key]) {
        const { dx, dy } = key_to_movement(key);
        var xcord = inputManager.current.x + dx * delta 
        var ycord = inputManager.current.y + dy * delta;
       
        if (!((xcord <= window.innerWidth*.23 && ycord <= window.innerHeight*.05))){
          
        if (!(xcord <= 0 || (xcord + archWidth) >= context.screenWidth)){
          inputManager.current.x += dx * delta;
        }
        if (!(ycord <= 0 || (ycord + archHeight)>= window.innerHeight * 0.91)){
          inputManager.current.y += dy * delta;
        }
      }
      }
    }

    setPosition({ x: inputManager.current.x, y: inputManager.current.y });
  });
  
  return (
    <Sprite
      image={b}
      x={position.x}
      y={position.y}
      height={archHeight}
      width={archWidth}
      roundPixels={true}
    />
  );
};

export default Archibald;
