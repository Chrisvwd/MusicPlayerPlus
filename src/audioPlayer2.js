class AudioPlayer2 {
    constructor(url) {
        this.isReady = false;
        this.isPlaying = false;

        if(!window.AudioContext) {
            alert("Web Audio API not supported!");
            return;
        }

        this.audioCtx = new window.AudioContext();

        //Prepare Gain Node
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.connect(this.audioCtx.destination);
        this.gainNode.gain.value = 1.0;

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
            document.getElementById("playController2").textContent="Pause";
            this.bufferSource = this.audioCtx.createBufferSource();
            this.bufferSource.buffer = this.buffer;

            this.bufferSource.disconnect();
            this.bufferSource.connect(this.gainNode);
            this.bufferSource.start();
        }
        else {
            document.getElementById("playController2").textContent="Play"
            this.bufferSource.stop();
        }
    }

    changeVolume(event) {
        if (!this.isReady) return;
        this.gainNode.gain.value = event.target.value;
    }
}

export default AudioPlayer2;