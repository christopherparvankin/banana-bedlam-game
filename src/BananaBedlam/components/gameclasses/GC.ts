
export default class GC {
    PROJECTILE_DELTA: number;
    BANANA_VELOCITY: number;
    APE_VELOCITY: number;
    MAX_APE_VELOCITY: number;
    BULLET_VELOCITY: number;
    TIME_COUNT: number;
    TIME_DELTA: number;
    bananas: any[]; 
    NUM_OF_HEARTS: number;
    HEART_LIST: any[]; 
    SOUND_ON: boolean;
    BULLET_COUNT_NUM: string;
    running: boolean;
    START: boolean;
    ALT_SCREEN: boolean;
    prev_time: number;
    bullets: any[]; 
    is_audio_playing: boolean;
    cur_audio: any; 
    key_pressed: boolean;
    CUR_BULLETS: number;
    MAX_BULLETS: number;
    GAME_RUNNING: boolean;
    PROJECTILE_DELTA_INCREMENT: number;
    CYCLES_TILL_INCREMENT: number;
    MAX_VELOCITY: number;
    GAGA_BOOL: boolean;
    KEN_BOOL: boolean;
    SCREEN_HEIGHT: number | null;
    SCREEN_WIDTH: number | null;
    a: boolean;
    s: boolean;
    d: boolean;
    w: boolean;
    space: boolean;
    escape: boolean;
    g: boolean;
    k: boolean;

    constructor(){
        this.PROJECTILE_DELTA = 60
        this.BANANA_VELOCITY = 5
        this.APE_VELOCITY = 5
        this.MAX_APE_VELOCITY = 20
        this.BULLET_VELOCITY = 10

        // Logistic variables
        this.TIME_COUNT = 0
        this.TIME_DELTA = 5
        this.bananas = []
        this.NUM_OF_HEARTS = 3
        this.HEART_LIST = []
        this.SOUND_ON = true
        this.BULLET_COUNT_NUM = "000"
        this.running = true
        this.START = true
        this.ALT_SCREEN = true
        this.prev_time = 0.0
        
        this.bullets = []
        this.is_audio_playing = false
        this.cur_audio = null
        this.key_pressed = false
        this.CUR_BULLETS = 0
        this.MAX_BULLETS = 2
        this.TIME_COUNT = 0
        this.GAME_RUNNING = true
        this.PROJECTILE_DELTA_INCREMENT = 0
        this.CYCLES_TILL_INCREMENT = 5
   
        this.MAX_VELOCITY = 80
        this.GAGA_BOOL = false
        this.KEN_BOOL = false


        this.SCREEN_HEIGHT = null;
        this.SCREEN_WIDTH = null;



        //fields to check if a key is pressed 
        this.a = false; 
        this.s = false; 
        this.d = false; 
        this.w = false; 

        this.space = false; 
        this.escape = false; 
        this.g = false; 
        this.k = false; 
    }
}