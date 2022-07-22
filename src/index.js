import AudioPlayer from "./audioPlayer.js";
import AudioPlayer2 from "./audioPlayer2.js";

const aP = new AudioPlayer("public/Land_of_8_Bits.wav");
const aP2 = new AudioPlayer2("public/Land_of_8_Bits.wav");


document.getElementById("playController").onclick = aP.changeState.bind(aP);
document.getElementById("volumeController").onchange = aP.changeVolume.bind(aP);
document.getElementById("bassController").onchange = aP.changeLow.bind(aP);
document.getElementById("midController").onchange = aP.changeMid.bind(aP);
document.getElementById("trebleController").onchange = aP.changeHigh.bind(aP);
document.getElementById("playController2").onclick = aP2.changeState.bind(aP2);
document.getElementById("volumeController2").onchange = aP2.changeVolume.bind(aP2);
document.getElementById("bassController2").onchange = aP2.changeLow.bind(aP2);
document.getElementById("midController2").onchange = aP2.changeMid.bind(aP2);
document.getElementById("trebleController2").onchange = aP2.changeHigh.bind(aP2);