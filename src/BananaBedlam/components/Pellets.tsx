import { InputManager, KeyCode, moveKeys } from "./InputManager";
import React, { useRef, useState } from "react";
import { useTick, Container, Graphics } from '@pixi/react';
import { Graphics as PIXIGraphics } from 'pixi.js'; // Import the Graphics type from pixi.js
import { ContextProps } from "./Context";
import fart from "../sounds/fart.mp3";

interface PelletProps {
    inputManager: React.MutableRefObject<InputManager>;
    context:ContextProps
}

const handlePellet = (pellet: React.JSX.Element, d: number, context: ContextProps) => {
    if (context.pellet_key_list){
    for (const pellet_key of context.pellet_key_list.current) {
        
        if (pellet_key == pellet.props.ckey) {
            context.pellet_key_list.current = context.pellet_key_list.current.filter((pellet_key:number) => {
                if (pellet_key === pellet.props.ckey) {
                    return false;
                }
                return true;
            });
            return null;
      
            
        }
    }
    if (pellet.props.x <= context.screenWidth) {
        return React.cloneElement(pellet, { x: pellet.props.x + d });
    } else {
        return null;
    }
}
};

interface CustomGraphicsProps {
    ckey: number;
    x: number;
    y: number;
    draw: (g: PIXIGraphics) => void;
}

const CustomGraphics: React.FC<CustomGraphicsProps> = ({ ckey, x, y, draw }) => {
  
    return (
        <Graphics
            x={x}
            y={y}
            draw={draw}
        />
    );
};


const Pellets: React.FC<PelletProps> = ({ inputManager, context}) => {

    // const pellet_delta = 20;
    const [plist, set_plist] = useState<React.JSX.Element[]>([]);
    const k = useRef(0);
    const MAX_SHOTS = 2;
    const FRAMES_BETWEEN_SHOTS = 10;
    const time_logistics = useRef({
        cur_time: 0,
        time_since_last_shot: FRAMES_BETWEEN_SHOTS,
        shots: 0,
        time_between_spurts: 50
    });

    useTick((delta) => {
        let { cur_time, time_since_last_shot, shots, time_between_spurts } = time_logistics.current;
        if (inputManager.current.keys["Space"] && time_since_last_shot >= FRAMES_BETWEEN_SHOTS && shots < MAX_SHOTS) {
            var f: HTMLAudioElement = new Audio(String(fart));
            f.volume = .5;
            f.play();
            const np = (
           
                <CustomGraphics
                x={inputManager.current.x + 50}
                ckey={k.current} 
                key = {k.current}
                y={inputManager.current.y + 20}
                draw={(g: PIXIGraphics) => {
                    g.clear();
                    g.beginFill(0xFF0000); // Red color
                    g.drawCircle(0, 0, 10); // Adjust radius as needed
                    g.endFill();
                }}
            />
          
            );
        
            set_plist((prevPlist) => [...prevPlist, np]);
            k.current += 1;

            time_since_last_shot = 0;
            shots += 1;
            // const sound = new Audio(FARTSOUND);
            // sound.play();
        } else {
            time_since_last_shot += delta;
        }

        cur_time += delta;
        if (cur_time >= time_between_spurts) {
            cur_time = 0;
            shots = 0;
        }

        time_logistics.current = { cur_time, time_since_last_shot, shots, time_between_spurts };
   
        set_plist((prevPlist) =>
            prevPlist
                .map((nanner) => handlePellet(nanner, (delta * 10), context))
                .filter((nanner): nanner is React.JSX.Element => nanner !== null)
        );
        if (context.pellets_list){
            context.pellets_list.current = plist;
        }
        
    });

    return <Container>{plist}</Container>;
};

export default Pellets;
