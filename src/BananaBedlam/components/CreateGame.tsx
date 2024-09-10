import Game from "./Game";
import { createInputManager, InputManager } from "./InputManager";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import "../styles/Game.css";

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element not found');
}
rootElement.focus();
// return (<Game />);
export default function CreateGame() {
    <div className="main">
        <PlayCircleOutlineIcon/>
    </div>
    
}
