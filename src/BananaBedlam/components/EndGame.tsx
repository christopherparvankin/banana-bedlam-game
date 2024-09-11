import { useGameContext, resetContext} from "./Context";
import {InputManager} from "./InputManager"
import  {useState, useEffect, useRef} from 'react';
import "../styles/StartGame.css";

interface EndgameProps{
    inputManager:React.MutableRefObject<InputManager>
}

interface DataProps{
    userName:String, 
    score: Number
}


const SecondaryPrompt:React.FC<{ inputManager:React.MutableRefObject<InputManager>, changePrompt:React.Dispatch<React.SetStateAction<number>>}> = ({ inputManager, changePrompt})  => {
    var context = useGameContext();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    var p = "placeholder";
    if (context.score){
        p = String(context.score.current);
        
    }
    const p1 = `Score: ${p}`;

    const handleKeyInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (context.userName)
        {if (e.key === "Enter" ){
            resetContext(context);
            inputManager.current.x = 0; 
            inputManager.current.y = 100; 
            context.switchState(1);
        }
        else if (e.key === " "){
            changePrompt(2);
        }}
    }

    return (
        <div className="backdrop">
        <div className="text"> 
    <input placeholder={`${p1}`} tabIndex={0} ref={inputRef} onKeyDown={handleKeyInput} >
    </input>
        <div className="prompt">  <div style={{textAlign:'center', marginBottom:'2vh', color: "#8ACE00"}}>PRESS SPACE TO SEE LEADERBOARD — PRESS ENTER TO PLAY AGAIN. </div> </div>
    </div>
    </div> 
 
    )



}

const InitialPrompt:React.FC<{inputManager:React.MutableRefObject<InputManager>, changePrompt:React.Dispatch<React.SetStateAction<number>>}> = ({inputManager, changePrompt})  => {
    const [inputBool, setBool] = useState(false);
    var context = useGameContext();
    var p = "placeholder";
    if (context.score){
        p = String(context.score.current);
    }

    const inputRef = useRef<HTMLInputElement>(null);
    const p1 = `Score: ${p}`;

    useEffect(() => {
      if (inputRef.current) {
          inputRef.current.focus();
      }
  }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if  (e.target.value !== ""){
            setBool(true);
            if (context.userName){
                context.userName.current = e.target.value;
            }
             
        }
    };

    const handleKeyInput = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (context.userName)
        {if (e.key === "Enter" && context.userName.current === ""){
            resetContext(context);
            inputManager.current.x = 0; 
            inputManager.current.y = 100; 
            context.switchState(1);
        }
        else if (e.key === "Enter"){
            changePrompt(2);
        }}
    }

    return (
        <div className="backdrop">
        <div className="text"> 
    <input placeholder={`${p1}`}  onChange={handleInputChange} tabIndex={0} ref={inputRef} onKeyDown={handleKeyInput} >
    </input>
        <div className="prompt"> {!(inputBool) ? <div style={{fontFamily:'Roboto'}}> <div style={{textAlign:'center', marginBottom:'2vh'}} >PRESS ENTER TO PLAY. </div> <div style = {{textAlign:'center', color: "#8ACE00"}} className="prompt2"> TYPE IN NAME TO SUBMIT TO LEADERBOARD!</div> </div> : (<div style = {{textAlign:'center', color: "#8ACE00"}} className="prompt2"> PRESS ENTER TO SUBMIT TO LEADERBOARD</div>)}</div>
    </div>
    </div>

    )
   
}

const Scoreboard: React.FC<{ inputManager: React.MutableRefObject<InputManager>}> = ({ inputManager })  => {
    var scoreID:any = null; 
    
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<any>([]);
    var context = useGameContext(); 

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
            async function getRecords() {
            setLoading(true);
              try {
                const response = await fetch(`http://18.117.163.219:5050/record/`);
                
                if (!response.ok) {
                  const message = `An error occurred: ${response.statusText}`;
                  console.error(message);
                  return;
                }
          
                const data = await response.json();
              
                return data;
                
              } catch (error) {
         
                console.error('An error occurred while fetching records:', error);
                return null;  
              }
            }
            
            

            getRecords()
            .then(resolved => {
                if (resolved && context.userName){
                
                var scoreboard:Array<DataProps>;

                scoreboard = resolved[0].database;
                
                
                // scoreID = resolved[0]._id;
                if (context.score){
                var newPlayer:DataProps = { userName: context.userName.current, score: Number(context.score.current)};
                // newPlayer.score = newPlayer.score;
              
                scoreboard.push(newPlayer); 
               
              
                var s = scoreboard.slice().sort((a:DataProps, b:DataProps) => (Number(b.score)) - (Number(a.score)))
              
              
                s = s.slice(0,10);
      
                
                setItems(s);
         

                fetch(`http://18.117.163.219:5050/record/${scoreID}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({scores: s}),
                            })
                            .then(response => response)
                            .catch(error => console.error('Error:', error));
                }
                

            }
        }
            )
            .catch(()=>{console.log("error in retrieving scoreboard")}).finally(()=>{setLoading(false)});
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);
          
    const handleKeyDown = (inputManager:React.MutableRefObject<InputManager>, e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter"){
        inputManager.current.x = 0; 
        inputManager.current.y = 100; 
        resetContext(context);
        context.switchState(1);
    }
    }

    const List = () => {
        return (
            <div className="text3">
                <div style={{fontFamily:'fantasy'}}>SCOREBOARD</div>
                {items.map((item:DataProps, index:any) => (
                    <div className="scoreboard" key={index}>{`${index + 1}: ${item.userName} —  ${item.score}`}</div>
                ))}
                <div style={{'fontSize':'3vw', 'fontStyle':'italic', fontFamily:'cursive'}}>PRESS ENTER TO TRY AGAIN</div>
            </div>
            
        );
    };

    return (<div className="backdrop" tabIndex={0} ref={inputRef} onKeyDown={e =>  handleKeyDown(inputManager, e)} > 
      {loading ? <div style={{fontSize:'10vw', color:'whitesmoke'}}> Loading... </div> : <List />}
    
    </div>) 
}

const EndGame:React.FC<EndgameProps> = ({inputManager}) => {
    var context = useGameContext(); 
    const [promptValue, switchPromptValue] = useState(0);
    useEffect(()=>
    {if (context.userName && context.userName.current !== ""){

        switchPromptValue(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }}, []);


    switch (promptValue){
        case 0: 
        return <InitialPrompt inputManager={inputManager} changePrompt={switchPromptValue}/>
       
        case 1: 
        return <SecondaryPrompt inputManager={inputManager} changePrompt={switchPromptValue}/> 
      
        case 2: 
        return <Scoreboard inputManager={inputManager} /> 
     
        default:
        return <Scoreboard inputManager={inputManager} /> 
    }
    
}

export default EndGame;