/**
 * 
 * This is a script to change the volume, low filter, mid filter and high filter of the played audio, for the first audio player (on the left)
 * 
 * @param {}
 * 
 */
 class AudioPlayer {
    /**
     * Creates different Nodes to adjust volume and filters.
     * Creates AudioContext.
     * @param url
     */
    constructor(url) {
        this.isReady = false;
        this.isPlaying = false;
        this.isFirsttime = true;

        if(!window.AudioContext) {
            alert("Web Audio API not supported!");
            return;
        }
        console.log(url);
        this.audioCtx = new window.AudioContext();

        //Prepare gain node.
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.connect(this.audioCtx.destination);
        this.gainNode.gain.value = 3.0;

        //Prepare low filter.
        this.lowFilter = this.audioCtx.createBiquadFilter();
        this.lowFilter.type = "lowpass";
        this.lowFilter.frequency.value = 880;
        this.lowFilter.Q.value = 2;

        //Prepare mid filter.
        this.midFilter = this.audioCtx.createBiquadFilter();
        this.midFilter.type = "bandpass";
        this.midFilter.frequency.value = 880;
        this.midFilter.Q.value = 2;

        //Prepare high filter.
        this.highFilter = this.audioCtx.createBiquadFilter();
        this.highFilter.type = "highpass";
        this.highFilter.frequency.value = 880;
        this.highFilter.Q.value = 2;

        //Opens song in a xmlhttprequest object.
        this.request = new XMLHttpRequest();
        this.request.open('GET', url, true);
        this.request.responseType = 'arraybuffer';

        this.request.onload = () => {
            this.receiveAudio();
        };
        this.request.send();
    }

    /**
     * Called when the Audio File is loaded.
     * Decodes AudioData passed from an ArrayBuffer.
     */
    receiveAudio() {
        this.buffer = this.request.response;
        this.audioCtx.decodeAudioData(this.buffer).then(
            this.setBuffer.bind(this)
        );
    }

    /**
     * Sets buffer to decodedBuffer.
     * Sets isReady to true.
     * @param decodedBuffer
     */
    setBuffer(decodedBuffer) {
        this.buffer = decodedBuffer;
        this.isReady = true;
    }

    /**
     * Changes the state of the song based on the controller that is calling the function.
     * Song stops playing if isReady was true and sets it to false.
     * Song starts playing if isReady was false and sets it to true.
     * @param controller
     */
    changeState(controller) {
        if(!this.isReady) return;

        this.isPlaying = !this.isPlaying;

        if(this.isPlaying) {
            this.isFirsttime = false;
            document.getElementById(controller).textContent="Pause";
            this.bufferSource = this.audioCtx.createBufferSource();
            this.bufferSource.buffer = this.buffer;

            this.bufferSource.disconnect();
            this.lowFilter.connect(this.gainNode);
            this.midFilter.connect(this.lowFilter);
            this.highFilter.connect(this.midFilter);
            this.bufferSource.connect(this.highFilter);
            this.bufferSource.start();

        } else if(!this.isFirsttime && this.isPlaying) {
            this.bufferSource.connect(this.gainNode)
            document.getElementById(controller).textContent="Pause";
            this.bufferSource.resume();
        } else {
            document.getElementById(controller).textContent="Play"
            this.bufferSource.stop();
        }
        
    }

    /**
     * Changes the volume of the song.
     * @param event
     */
    changeVolume(event) {
        if (!this.isReady) return;
        this.gainNode.gain.value = event.target.value;
    }

    /**
     * Changes bass/low value of the song.
     * @param event
     */
    changeLow(event) {
        if (!this.isReady) return;
        this.lowFilter.frequency.value = event.target.value;
    }

    /**
     * Changes mid value of the song.
     * @param event
     */
    changeMid(event) {
        if (!this.isReady) return;
        this.midFilter.frequency.value = event.target.value;
    }

    /**
     * Changes treble/high value of the song.
     * @param event
     */
    changeHigh(event) {
        if (!this.isReady) return;
        this.highFilter.frequency.value = event.target.value;
    }

}

export default AudioPlayer;