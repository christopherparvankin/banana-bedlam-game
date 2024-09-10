import {ContextProps} from "../components/Context";

export type KeyCode =
  | "KeyA"
  | "KeyS"
  | "KeyW"
  | "KeyD"
  | "KeyG"
  | "Space"
  | "Escape"
  | "g";

export interface InputManager {
  keys: { [key in KeyCode]?: boolean };
  x: number;
  y: number;
  del_func: any; 
  interacted: boolean;
}

export const moveKeys: KeyCode[] = ["KeyA", "KeyS", "KeyW", "KeyD"];
export const allKeys: KeyCode[] = ["KeyA", "KeyS", "KeyW", "KeyD", "Space", "Escape", "KeyG"];


export const createInputManager = (root: HTMLElement): InputManager => {

  const inputManager: InputManager = {
    keys: {},
    x: 0,
    y: 100,
    del_func: null,
    interacted: false
  };

  for (const key of allKeys) {
    inputManager.keys[key] = false;
  }

  const keyDownHandler = (e: KeyboardEvent) => {
	inputManager.keys[e.code as KeyCode] = true;
  inputManager.interacted = true; 
  };
  
  const keyUpHandler = (e: KeyboardEvent) => {
	inputManager.keys[e.code as KeyCode] = false;
  inputManager.interacted = true;
  };

  const handleInteract = (ev: MouseEvent) => {
    inputManager.interacted = true;
    };

  
  root.addEventListener("keydown", keyDownHandler);
  root.addEventListener("keyup", keyUpHandler);
  root.addEventListener("click", handleInteract);


  root.tabIndex = -1;
  root.focus();

  const deleteListeners = () => {
    root.removeEventListener("keydown", keyDownHandler);
    root.removeEventListener("keyup", keyUpHandler);
    root.removeEventListener("click", handleInteract);
    console.log("Cleanup successful");
  };

  inputManager.del_func = deleteListeners;
  return inputManager;
};


