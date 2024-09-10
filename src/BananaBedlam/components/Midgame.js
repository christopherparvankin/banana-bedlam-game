import { Stage } from "@pixi/react";
import { InputManager } from "./InputManager";
import React, { useRef, useEffect, useState} from "react";
import "../styles/Midgame.css";
import Archibald from "./Archibald";
import Nanners from "./Nanners";
import Scoreboard from "./Scoreboard";
import { useGameContext, ContextProps, GameContext } from "./Context";
import Pellets from "./Pellets";


const MidGame = ({ inputManager}) => {
  const inputRef = useRef(null);
  var context = useGameContext();
  const [stageProps, setStageProps] = useState({
    height: window.innerHeight * 0.9,
    width: window.innerWidth,
    
    options: {
      antialias: true,
      backgroundColor: '202125'
    },
  });
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setStageProps((prev) => ({
        ...prev,
        height: window.innerHeight * 0.9,
        width: window.innerWidth,
      }));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  


  return (
    <div ref={inputRef} tabIndex={0} style={{ outline: "none" }}>
        <Stage {...stageProps}>
          <Archibald inputManager={inputManager} context={context}/>
          <Nanners context={context}/>
          <Pellets inputManager={inputManager} context={context}/>
          <Scoreboard context={context}/> 
        </Stage>
    </div>
  );
};

export default MidGame;
