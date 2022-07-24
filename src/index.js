import AudioPlayer from "./audioPlayer.js";

//Variables for first player.
const aP1_1 = new AudioPlayer("public/Land_of_8_Bits.wav");
const aP1_2 = new AudioPlayer("public/Dream_atmosphere.mp3");
const aP1_3 = new AudioPlayer("public/Majed_Salih.mp3");
const aP1_4 = new AudioPlayer("public/Move_In_On.mp3");

let chosenSong1 = 1;
let currentlyPlaying1 = false;

//Variables for second player.
const aP2_1 = new AudioPlayer("public/Dream_atmosphere.mp3");
const aP2_2 = new AudioPlayer("public/Land_of_8_Bits.wav");
const aP2_3 = new AudioPlayer("public/Majed_Salih.mp3");
const aP2_4 = new AudioPlayer("public/Move_In_On.mp3");

let chosenSong2 = 1;
let currentlyPlaying2 = false;

//Help Window variables.
let popup = document.getElementById("popup");
let helpBtn = document.getElementById("helpBtn");
let closeBtn = document.getElementById("closeBtn");

//executes openPopup when clicked.
helpBtn.onclick = openPopup;
//executes closePopup when clicked.
closeBtn.onclick = closePopup;

/**
 * Opens the Help Window.
 */
function openPopup() {
    popup.classList.add("open-popup");
}

/**
 * Closes the Help Window.
 */
function closePopup() {
    popup.classList.remove("open-popup");
}

//Starts or stops chosen Song when clicked on the button.
document.getElementById("playController1").onclick = function () {
    switchSong1();
};

//Sets chosenSong1 to 1 and stops any song that is playing on the second player.
document.getElementById("song1_1").onclick = function () {
    pauseSong1(1);
    document.getElementById("title1").textContent = "Land_of_8_Bits.wav";
};

//Sets chosenSong1 to 2 and stops any song that is playing on the second player.
document.getElementById("song2_1").onclick = function () {
    pauseSong1(2);
    document.getElementById("title1").textContent = "Dream_atmosphere.mp3";
};

//Sets chosenSong1 to 3 and stops any song that is playing on the second player.
document.getElementById("song3_1").onclick = function () {
    pauseSong1(3);
    document.getElementById("title1").textContent = "Majed_Salih.mp3";
};

//Sets chosenSong1 to 4 and stops any song that is playing on the second player.
document.getElementById("song4_1").onclick = function () {
    pauseSong1(4);
    document.getElementById("title1").textContent = "Move_In_On.mp3";
};

//String to set the used Controller.
let con1 = "playController1"

/**
 * Starts, stops or switches songs of the first player based on the chosen Song.
 */
function switchSong1() {
    currentlyPlaying1 = !currentlyPlaying1;
    switch (chosenSong1) {
        case 1:
            aP1_1.changeState(con1);
            break;
        case 2:
            aP1_2.changeState(con1);
            break;
        case 3:
            aP1_3.changeState(con1);
            break;
        case 4:
            aP1_4.changeState(con1);
            break;
    }
}

/**
* Checks if first player is playing a song.
* Stops song if it's playing.
* Sets chosenSong1 to newSong.
* @param newSong
*/
function pauseSong1(newSong) {
    if (currentlyPlaying1) {
        switchSong1();
    }
    chosenSong1 = newSong;
}

//Starts or stops chosen Song when clicked on the button.
document.getElementById("playController2").onclick = function () {
    switchSong2();
};

//Sets chosenSong2 to 1 and stops any song that is playing on the second player.
document.getElementById("song1_2").onclick = function () {
    pauseSong2(1);
    document.getElementById("title2").textContent = "Dream_atmosphere.mp3";
};

//Sets chosenSong2 to 2 and stops any song that is playing on the second player.
document.getElementById("song2_2").onclick = function () {
    pauseSong2(2);
    document.getElementById("title2").textContent = "Land_of_8_Bits.wav";
};

//Sets chosenSong2 to 3 and stops any song that is playing on the second player.
document.getElementById("song3_2").onclick = function () {
    pauseSong2(3);
    document.getElementById("title2").textContent = "Majed_Salih.mp3";
};

//Sets chosenSong2 to 4 and stops any song that is playing on the second player.
document.getElementById("song4_2").onclick = function () {
    pauseSong2(4);
    document.getElementById("title2").textContent = "Move_In_On.mp3";
};

//String to set the used Controller.
let con2 = "playController2";

/**
 * Starts, stops or switches songs of the second player based on the chosen Song.
 */
function switchSong2() {
    currentlyPlaying2 = !currentlyPlaying2;
    switch (chosenSong2) {
        case 1:
            aP2_1.changeState(con2);
            break;
        case 2:
            aP2_2.changeState(con2);
            break;
        case 3:
            aP2_3.changeState(con2);
            break;
        case 4:
            aP2_4.changeState(con2);
            break;
    }
}

/**
 * Checks if second player is playing a song.
 * Stops song if it's playing.
 * Sets chosenSong2 to newSong.
 * @param newSong
 */
function pauseSong2(newSong) {
    if (currentlyPlaying2) {
        switchSong2();
    }
    chosenSong2 = newSong;
}

//eval Strings for the first Player
let evalString1_base = "aP1_";
let evalString1_vol = ".changeVolume.bind(aP1_";
let evalString1_low = ".changeLow.bind(aP1_";
let evalString1_mid = ".changeMid.bind(aP1_";
let evalString1_high = ".changeHigh.bind(aP1_";

//eval Strings for the second Player
let evalString2_base = "aP2_";
let evalString2_vol = ".changeVolume.bind(aP2_";
let evalString2_low = ".changeLow.bind(aP2_";
let evalString2_mid = ".changeMid.bind(aP2_";
let evalString2_high = ".changeHigh.bind(aP2_";

//multiple use eval String
let evalString_end = ");";

// document.getElementById("playSpeed_x0_5_1").onclick = aP1.changeSpeed(0.5).bind(aP1);
document.getElementById("volumeController1").onchange = eval(evalString1_base + chosenSong1 + evalString1_vol + chosenSong1 + evalString_end);
document.getElementById("bassController1").onchange = eval(evalString1_base + chosenSong1 + evalString1_low + chosenSong1 + evalString_end);
document.getElementById("midController1").onchange = eval(evalString1_base + chosenSong1 + evalString1_mid + chosenSong1 + evalString_end);
document.getElementById("trebleController1").onchange = eval(evalString1_base + chosenSong1 + evalString1_high + chosenSong1 + evalString_end);

document.getElementById("volumeController2").onchange = eval(evalString2_base + chosenSong2 + evalString2_vol + chosenSong2 + evalString_end);
document.getElementById("bassController2").onchange = eval(evalString2_base + chosenSong2 + evalString2_low + chosenSong2 + evalString_end);
document.getElementById("midController2").onchange = eval(evalString2_base + chosenSong2 + evalString2_mid + chosenSong2 + evalString_end);
document.getElementById("trebleController2").onchange = eval(evalString2_base + chosenSong2 + evalString2_high + chosenSong2 + evalString_end);