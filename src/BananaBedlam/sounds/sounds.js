import gaga from "./Lady Gaga - Bad Romance (Lyrics).mp3";
import ken from "./im_just_ken.mp3";
import ouch from "./ouch.mp3";
import spinning from "./spinning_away.mp3";
import cbat from "./cbat.mp3";
import oogway from "./oogway.mp3";
import creep from "./creep.mp3";
import imperfect from "./imperfect_murder.mp3";
import park from "../sounds/park_sounds.mp3";
import end from "../sounds/end_music.mp3";
import road from "./road.mp3";
import king from "./king.mp3";
import fart from "./fart.mp3";

var song = [king, spinning, cbat, oogway, road];
var songs= [creep];

song = song.sort(() => Math.random() - 0.5); 
songs = songs.concat(song); 

export {songs, gaga, ken, ouch, park, end, fart};

