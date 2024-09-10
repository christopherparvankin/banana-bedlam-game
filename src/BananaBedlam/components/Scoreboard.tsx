import React, { useState, useEffect, useRef} from "react";
import { Sprite, Container, Text, useTick} from "@pixi/react";
import HEART from "../images/heart.png";
import { TextStyle } from "pixi.js";
import { ContextProps, useGameContext } from "./Context";
import "../styles/Scoreboard.css"; // Import your CSS file for styles
import ouch from "../sounds/ouch.mp3";

interface ScoreboardProps {
  context: ContextProps;
}

const Scoreboard:React.FC<ScoreboardProps> = ({context}) => {

  const [heartList, setHeartList] = useState<JSX.Element[]>([]);
  const [score, setScore] = useState("000");

 
  useTick(delta =>{
    if (context.score){
      if (score !== context.score.current){
        setScore(context.score.current);
      }
    }
    
  
    setHeartList(context.heart_list)

    
  })

  return (
    <Container >
      {heartList}
      <Text
        text={`Score: ${score}`}
        x={10} 
        y={0} 
        style={
          new TextStyle({
           
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize: 40,
            stroke: '#01d27e',
         
            fill:"white"
          }) as any
        }
      />
    </Container>
  );
};

export default Scoreboard;
