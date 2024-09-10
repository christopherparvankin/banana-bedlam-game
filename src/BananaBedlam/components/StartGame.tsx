import { GameContext, useGameContext, ContextProps } from "./Context";
import { InputManager } from "./InputManager";
import React, { useState, useEffect, useRef } from "react";
import "../styles/StartGame.css";
import batman from "../sounds/batman_intro.mp3";
import { BrandingWatermarkRounded } from "@mui/icons-material";
const p1 = "Enter Name to Begin: ";
const p2 = "A long time ago the fire nation attacked";
const p3 = "Blah blah blah";

const playSound = () => {
    const audio = new Audio(batman);
    audio.play();
};

const LoadPrompts: React.FC<{ inputManager: React.MutableRefObject<InputManager> }> = ({ inputManager }) => {
    const [prompt, switchPrompt] = useState(1); 
    const [audio] = useState(new Audio(batman)); 

    useEffect(() => {
        if (prompt >= 1) {
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        }

        return () => {
            audio.pause();
        };
    }, [prompt, audio]);
    
    return (
        <div className="text"> 
            {(prompt == 1) && <MidPrompt switchPrompt={switchPrompt} />}
            {(prompt == 2) && <FinalPromptTwo switchPrompt={switchPrompt} inputManager={inputManager}/>}
            {(prompt == 3) && <Final2 switchPrompt={switchPrompt} />}
        </div>
    );
}

const MidPrompt: React.FC<{ switchPrompt: (value: React.SetStateAction<number>) => void }> = ({ switchPrompt }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const p1 = "They came from above.";
    const p2 = "It was bananas.";
    const p3 = "It was bedlam.";
    const p4 = "Banana Bedlam";

    const texts = [p1, p2, p3, p4];

    const [currentText, setCurrentText] = useState<string>(p1);  

    const timedPrompt = async (text: string) => {
        setCurrentText(text);
        if (text == p4) {
            switchPrompt(2);
        }
        await new Promise((resolve) => setTimeout(resolve, 4000));
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        const runSequence = async () => {
            for (let text of texts) {
                await timedPrompt(text);
            }
        };
        runSequence();
    }, []);
  
    return (
        <div
            className="text2"
            tabIndex={0}
            ref={inputRef}
            onKeyDown={e => {
                if (e.key === "Enter") {
                    switchPrompt(2);
                }
            }}
        >
            {currentText}
        </div>    
    );
};

const Final2: React.FC<{ switchPrompt: (value: React.SetStateAction<number>) => void }> = ({ switchPrompt }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const p1 = "Press A,W,S,D to move. Space to shoot nanners.";

    const [currentText, setCurrentText] = useState<string>(p1);  
    const context = useGameContext();

    const timedPrompt = async (text: string) => {
        setCurrentText(text);
        
        await new Promise((resolve) => setTimeout(resolve, 4000));
       
        context.switchState(1);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        const runSequence = async () => {
            await timedPrompt(p1);
        };
        runSequence();
    }, []);
  
    return (
        <div
            className="text2"
            tabIndex={0}
            ref={inputRef}
            onKeyDown={e => {
                if (e.key === "Enter") {
                    context.switchState(1);
                }
            }}
        >
            {currentText}
        </div>    
    );
};

const FinalPromptTwo: React.FC<{ switchPrompt: (value: React.SetStateAction<number>) => void, inputManager: React.MutableRefObject<InputManager> }> = ({ switchPrompt, inputManager }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const context = useGameContext();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key == "Enter") {
            inputManager.current.interacted = true;
            switchPrompt(3);
        }
    };

    return (
        <div className="text2-2" tabIndex={0} ref={inputRef} onKeyDown={handleKeyDown}>
            Banana Bedlam
            <div className="prompt">Press Enter to Begin</div>
        </div>
    );
};

const StartGame: React.FC<{ inputManager: React.MutableRefObject<InputManager> }> = ({ inputManager }) => { 
    return (
        <div className="backdrop">
            <LoadPrompts inputManager={inputManager}/> 
        </div>
    );
};

export default StartGame;
