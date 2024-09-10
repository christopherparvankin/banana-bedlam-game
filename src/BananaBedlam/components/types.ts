export default interface GCI {
    PROJECTILE_DELTA: number;
    BANANA_VELOCITY: number;
    APE_VELOCITY: number;
    MAX_APE_VELOCITY: number;
    BULLET_VELOCITY: number;
    TIME_COUNT: number;
    TIME_DELTA: number;
    bananas: any[]; // Adjust the type as necessary
    NUM_OF_HEARTS: number;
    HEART_LIST: any[]; // Adjust the type as necessary
    SOUND_ON: boolean;
    BULLET_COUNT_NUM: string;
    running: boolean;
    START: boolean;
    ALT_SCREEN: boolean;
    prev_time: number;
    bullets: any[]; // Adjust the type as necessary
    is_audio_playing: boolean;
    cur_audio: any; // Adjust the type as necessary
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
}