import AudioPlayer1 from "./audioPlayer1.js";
import AudioPlayer2 from "./audioPlayer2.js";

const aP1 = new AudioPlayer1("public/Land_of_8_Bits.wav");
const aP2 = new AudioPlayer2("public/Land_of_8_Bits.wav");

//function showHelp(){
//    document.getElementById('helpImg').style.display = "block";
//    document.getElementById('helpBtn').style.display = 'none';
//}
document.getElementById("playController1").onclick = aP1.changeState.bind(aP1);
document.getElementById("volumeController1").onchange = aP1.changeVolume.bind(aP1);
document.getElementById("bassController1").onchange = aP1.changeLow.bind(aP1);
document.getElementById("midController1").onchange = aP1.changeMid.bind(aP1);
document.getElementById("trebleController1").onchange = aP1.changeHigh.bind(aP1);
document.getElementById("playController2").onclick = aP2.changeState.bind(aP2);
document.getElementById("volumeController2").onchange = aP2.changeVolume.bind(aP2);
document.getElementById("bassController2").onchange = aP2.changeLow.bind(aP2);
document.getElementById("midController2").onchange = aP2.changeMid.bind(aP2);
document.getElementById("trebleController2").onchange = aP2.changeHigh.bind(aP2);