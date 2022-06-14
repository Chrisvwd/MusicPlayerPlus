import AudioPlayer from "./audioPlayer.js";
import AudioPlayer2 from "./audioPlayer2.js";

// Thresholds of the 3-band-equalizer
//
// Please use these variables for an 
// easier review on my part
const lowerBandThreshold = 0;
const higherBandThreshold = 0;

let aP = new AudioPlayer("public/Land_of_8_Bits.wav");
let aP2 = new AudioPlayer2("public/Land_of_8_Bits.wav");
document.getElementById("playController").onclick = aP.changeState.bind(aP);
document.getElementById("volumeController").onchange = aP.changeVolume.bind(aP);
document.getElementById("playController2").onclick = aP2.changeState.bind(aP2);
document.getElementById("volumeController2").onchange = aP2.changeVolume.bind(aP2);