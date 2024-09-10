import { InputManager, KeyCode, moveKeys } from "./InputManager";
import React, { useRef, useState } from "react";
import { Sprite, useTick, Container, _ReactPixi } from '@pixi/react';
import b from "src/BananaBedlam/images/le_monke.png";
import { ContextProps, heartList} from "./Context";
import bp from "../images/banana.png";
import ouch from "../sounds/ouch.mp3";




interface NannerProps {
    context: ContextProps;
}

const Nanners:React.FC<NannerProps> = ({context}) => {
    const time_count = useRef(0);
    const time_delta = useRef(80);
    const time_count_nanner = useRef(0);
    const [blist, set_blist] = useState<React.JSX.Element[]>([]);
    const k = useRef(0);
    const nanner_delta = useRef(10);
    const heartCount = useRef(3);
    var banana_width = 100; 
    var banana_height = 100; 
    const handleNanner = (nanner: React.JSX.Element, d: number) => {
        if (context.pellets_list){
        for (const pellet of context.pellets_list.current){

            
            // this case handles if it hits pellet
            if ((pellet.props.x >= nanner.props.x) && (pellet.props.x <= nanner.props.x + banana_width) && (pellet.props.y >= nanner.props.y) && (pellet.props.y <= nanner.props.y + banana_height)){
                if (context.pellet_key_list){
                    context.pellet_key_list.current.push(pellet.props.ckey);
                }
                
                // context.pellet_key_list = a; 

               
                if (context.score){
                    var context_num = Number(context.score.current);
                context_num +=1; 
                var context_string = context_num.toString(); 
                while (context_string.length != 3){
                    context_string = "0" + context_string
                }
                
                context.score.current = context_string;
                return null;
                }
                
            }
        }
        // this handles case where it's at the end 
        if (nanner.props.x > 0) {
            return React.cloneElement(nanner, { x: nanner.props.x - d });
        } else {

            var o = new Audio(ouch);
            o.play();

            heartCount.current -= 1;
            context.heart_list = heartList(heartCount.current);
            if (heartCount.current == 0){
                context.gameState = 2;
        
             
                context.switchState(2);
            }
            return null;
        }
    }
    };

    const moveNanners = (delta:number) => {

        if (time_count.current >= time_delta.current) {
            
            const rand_y = Math.random() * (context.screenHeight - context.screenHeight * 0.3);
            // rand_y
            const newBanana = (
                <Sprite
                    image={bp}
                    key={k.current}
                    x={context.screenWidth}
                    y={rand_y}
                    height={banana_height}
                    width={banana_width}
                    roundPixels={true}
                />
            );
            blist.push(newBanana)
            time_count.current = 0;
            k.current += 1;

            if (time_count_nanner.current >= 5){
                if (nanner_delta.current < 20){
                    nanner_delta.current += .1; 
                    time_count_nanner.current = 0; 
                     }
            }
            else{
                time_count_nanner.current +=delta;
            }

            if (time_delta.current > 40){
                time_delta.current -= (delta); 
            }
            
        } else {
            time_count.current += delta;
            
        }

        const shiftedBananas = blist.map(nanner => handleNanner(nanner, (nanner_delta.current * delta)))
        const parsedNanners = shiftedBananas.filter((nanner): nanner is React.JSX.Element => nanner !== null);

        set_blist(parsedNanners);
    };

    useTick(delta => {
        moveNanners(delta);
    });
    return (
        <Container>
            {blist}
        </Container>
    );
};

export default Nanners;