class AudioPlayer1 {
    constructor(url) {
        this.isReady = false;
        this.isPlaying = false;
        this.isFirsttime = true;

        if(!window.AudioContext) {
            alert("Web Audio API not supported!");
            return;
        }

        this.audioCtx = new window.AudioContext();

        //Prepare Gain Node
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.connect(this.audioCtx.destination);
        this.gainNode.gain.value = 1.0;

        this.lowFilter = this.audioCtx.createBiquadFilter();
        this.lowFilter.type = "lowpass";
        this.lowFilter.frequency.value = 880;
        this.lowFilter.Q.value = 0;

        this.midFilter = this.audioCtx.createBiquadFilter();
        this.midFilter.type = "bandpass";
        this.midFilter.frequency.value = 1500;
        this.midFilter.Q.value = 2;

        this.highFilter = this.audioCtx.createBiquadFilter();
        this.highFilter.type = "highpass";
        this.highFilter.frequency.value = 880;
        this.highFilter.Q.value = 1;

        this.request = new XMLHttpRequest();
        this.request.open('GET', url, true);
        this.request.responseType = 'arraybuffer';

        this.request.onload = () => {
            this.receiveAudio();
        };
        this.request.send();
    }

    receiveAudio() {
        this.buffer = this.request.response;
        this.audioCtx.decodeAudioData(this.buffer).then(
            this.setBuffer.bind(this)
        );
    }

    setBuffer(decodedBuffer) {
        this.buffer = decodedBuffer;
        this.isReady = true;
    }

    changeState() {
        if(!this.isReady) return;

        this.isPlaying = !this.isPlaying;

        if(this.isPlaying) {
            this.isFirsttime = false;
            document.getElementById("playController1").textContent="Pause";
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
            document.getElementById("playController1").textContent="Pause";
            this.bufferSource.resume();
        } else {
            document.getElementById("playController1").textContent="Play"
            this.bufferSource.stop();
        }
        
    }

    changeVolume(event) {
        if (!this.isReady) return;
        this.gainNode.gain.value = event.target.value;
    }
    
    changeLow(event) {
        if (!this.isReady) return;
        this.lowFilter.frequency.value = event.target.value;
    }

    changeMid(event) {
        if (!this.isReady) return;
        this.midFilter.frequency.value = event.target.value;
    }

    changeHigh(event) {
        if (!this.isReady) return;
        this.highFilter.frequency.value = event.target.value;
    }
}

export default AudioPlayer1;