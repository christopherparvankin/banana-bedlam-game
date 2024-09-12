import React, { useState} from "react";
import {  Container, Text, useTick} from "@pixi/react";

import { TextStyle } from "pixi.js";
import { ContextProps } from "./Context";
import "../styles/Scoreboard.css"; 


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
