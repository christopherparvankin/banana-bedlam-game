import React, { useState, useContext, ReactNode, useRef} from "react";
import { Sprite} from "@pixi/react";
import HEART from "../images/heart.png";

export interface ContextProps {
  userName: React.MutableRefObject<string> | null;
  gameState: number;
  switchState: any;
  screenWidth: number;
  screenHeight: number;
  endPrompt: number;
  switchPrompt: any;
  pellets_list: React.MutableRefObject<React.JSX.Element[]> | null;
  pellet_key_list: React.MutableRefObject<any[]> | null; 
  score: React.MutableRefObject<string> | null;  
  heart_list: React.JSX.Element[];
  scoreList: [];
  x: number; 
  y: number; 
}

interface GameNode {
  children: ReactNode;
}

export const heartList = (number:number) => {
  
  const hearts: JSX.Element[] = [];
    let x = 210;
    for (let c = 0; c < number; c++) {
      hearts.push(
        <Sprite
          key={c}
          image={HEART}
          x={x}
          y={2}
          height={50}
          width={50}
          roundPixels={true}
        />
      );
      x += 50;
    }
    return hearts; 
}
const h = () => {
  return heartList(3);
}

const props: ContextProps = {
  userName: null,
  gameState: 0,
  endPrompt: 0, switchPrompt:null,
  switchState: null,
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  pellets_list: null, 
  pellet_key_list: null, 
  score: null, 
  heart_list: h(),
  scoreList: [], 
  x: 0, 
  y: 500, 
};



var Context = React.createContext<ContextProps>(props);

export const resetContext = (context : ContextProps) => {
 
    if (context.score){
      context.score.current = "000";
    }
    
    const newContextProps: ContextProps = {
      userName: context.userName,
      switchPrompt:context.switchPrompt,
      endPrompt:context.endPrompt,
      gameState: context.gameState,
      switchState: context.switchState,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      pellets_list: context.pellets_list,
      pellet_key_list: context.pellet_key_list,
      score: context.score,
      heart_list: h(),
      scoreList: [],
      x: 0,
      y: 100,
    };

    Context = React.createContext<ContextProps>(newContextProps);

}

export function useGameContext(): ContextProps {
  return useContext(Context);
}

export function GameContext({ children }: GameNode) {
  const [gameState, switchState] = useState(0);
  const [endPrompt, switchPrompt] = useState(0);
  const cur_context = useGameContext();
  const score = useRef("000");
  const userName = useRef("");
  const pellets_list = useRef([]);
  const pellets_key_list = useRef([]);
  cur_context.pellets_list = pellets_list;
  cur_context.pellet_key_list = pellets_key_list;
  cur_context.gameState = gameState;
  cur_context.endPrompt = endPrompt; 
  cur_context.switchPrompt = switchPrompt;
  cur_context.switchState = switchState;
  cur_context.score = score;
  cur_context.userName = userName;
  cur_context.endPrompt = endPrompt;

  const contextValue = {
    ...props,
    gameState,
    switchState,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}
