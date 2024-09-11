import React, {useEffect, useRef, useState} from "react";
import MidGame from './Midgame'; 
import StartGame from "./StartGame";
import EndGame from "./EndGame";
import "../styles/Game.css";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { GameContext, useGameContext, resetContext, ContextProps} from "./Context";
import {InputManager, createInputManager} from "./InputManager";
import {songs, park, end} from "../sounds/sounds"

interface WhipProps{
  inputManager: React.MutableRefObject<InputManager>
}

const WhichGame = ({inputManager}: WhipProps) => {

  var context = useGameContext();
  
  const audio1Ref = useRef(new Audio(park));
  const audio2Ref = useRef(new Audio(end));
  const audio3Ref = useRef(new Audio (songs[0]));

   useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audio3Ref.current.pause();
       // eslint-disable-next-line react-hooks/exhaustive-deps
      audio1Ref.current.pause();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audio2Ref.current.pause();
    };
  }, []);

  switch(context.gameState){
    case 0: 
      return <StartGame inputManager={inputManager} />
      
    case 1: 
    
      if (inputManager.current.interacted){
        audio3Ref.current.currentTime = 1; 
        audio3Ref.current.play();
      }
      
      return <MidGame inputManager={inputManager}/>
      
      
    case 2: 
    console.log()
    if (inputManager.current.interacted){audio3Ref.current.pause();
        
      audio1Ref.current.currentTime= 0; 
      audio2Ref.current.currentTime = 0; 
      audio1Ref.current.play();
      audio2Ref.current.play();}
      return <EndGame inputManager = {inputManager} />


    default: 
    return <StartGame inputManager={inputManager} />
    
  }
}

const Game = () => {
  const rootElement = document.getElementById('root');
  const [e, switchE] = useState(true);
  if (!rootElement) {
      throw new Error('Root element not found');
  }
  rootElement.focus();

  const inputManager: InputManager = createInputManager(rootElement);
  const inputRef = useRef(inputManager);
  var c: ContextProps = useGameContext(); 
  
  useEffect(()=>{
    return () => {

      inputManager.del_func();
      resetContext(c);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }}, []
  )
  return (
    <div className="main"> 
   <GameContext> 
    {e ? <PlayCircleOutlineIcon className="play-icon" onClick={()=>{switchE(false)}}/> : <WhichGame inputManager={inputRef} />}
    
  </GameContext> 
  </div> 
  )
};

export default Game;


