async function helloWorld(){
  await new Promise(r => setTimeout(r, 500));
var gui, analyser, audio, audioCtx, bufferLength,
    canvas, cavnvasCtx, compressor, frequencyData, gui, source, visual;

var Visualizer = function() {
    this.radius = 65;
    this.barWidth = 360 / bufferLength;
    this.freqScale = 2.1;
    this.barScale = 9.8;
    this.rotation = 0.5;
    this.color0 = [200, 100, 0, 1];
    this.color1 = [255, 50, 0, 1];
}

Visualizer.prototype.draw = function() {

    var r = this.radius,
        t = this.barWidth * this.barScale * Math.PI / 180,
        s = 0;

    analyser.getByteFrequencyData(frequencyData);

    for (var i = 0; i < 15; i++) {
        s += frequencyData[i] / 255;
    }
    s /= 15;
    r += s * r * 2;
    s = (s > 1 / 3) ? ((s < 2 / 5) ? s : 2 / 5) : 1 / 3;

    canvasCtx.clearRect(-500 - r, -500 - r, 300 + r * 20, 300 + r * 20);
    canvasCtx.save();
    for (var i = 0; i < bufferLength; i++) {

        var h = frequencyData[i];

        var red = 0
        var green = parseInt(h);
        var blue = parseInt(h + 100 + i / 15);
        var grad = canvasCtx.createLinearGradient(0, r, 0, r + h * s * this.freqScale);
        grad.addColorStop(0.00, 'rgba(' + red + ',' + green + ',' + blue + ',0)');
        grad.addColorStop(0.15, 'rgba(' + red + ',' + green + ',' + blue + ',1)');
        grad.addColorStop(0.75, 'rgba(' + red + ',' + green + ',' + blue + ',1)');
        grad.addColorStop(1.00, 'rgba(0,0,0,0)');
        canvasCtx.fillStyle = grad;

        canvasCtx.fillRect(0, r, this.barWidth * 5, h * s * this.freqScale + r);

        canvasCtx.transform(-Math.cos(t), -Math.sin(t), Math.sin(t), -Math.cos(t), 0, 0);
    }
    canvasCtx.restore();
    canvasCtx.rotate(s * this.rotation * Math.PI / 180);
}

function createAudio() {
    audio = document.querySelector('audio');
    audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    source = audioCtx.createMediaElementSource(audio);
    compressor = audioCtx.createDynamicsCompressor();
    analyser = audioCtx.createAnalyser();
    bufferLength = analyser.frequencyBinCount;
    frequencyData = new Uint8Array(bufferLength);

    source.connect(analyser);

    analyser.getByteTimeDomainData(frequencyData);
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.83;
    analyser.minDecibels = -90;
    analyser.maxDecibels = 0;
    audio.volume = 0.3;
    analyser.connect(audioCtx.destination);
}

/*function createGui() {
    gui = new dat.GUI();
    gui.remember(visual);
    var gen = gui.addFolder('General');
    var freq = gui.addFolder('Frequency scaling');
    gen.add(visual, 'radius').min(10).max(200).step(5);
    gen.add(visual, 'barWidth').min(0.1).max(5).step(0.1);
    gen.add(visual, 'barScale').min(0.1).max(10).step(0.1);
    gen.add(visual, 'rotation').min(-10).max(10).step(0.1);
    freq.add(visual, 'freqScale').min(1).max(10).step(0.1);
    gen.open();
    freq.open();
}*/

function createCanvas() {
    canvas = document.getElementById('canvas');
    canvas.style = "pointer-events: none;z-index: "+Number.MAX_SAFE_INTEGER+";"
    canvasCtx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasCtx.translate((canvas.width / 2), (canvas.height / 2));
    visual = new Visualizer();
}

function createStats() {
    stats = new Stats();
    stats.setMode(0);
    document.body.appendChild(stats.domElement);
}


var slidebar = document.getElementById("sliderBarTime")

function formatTime(seconds) {
  minutes = Math.floor(seconds / 60);
  minutes = (minutes >= 10) ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}

function createFile() {
    document.getElementById('fileInput').onchange = function(e) {
        var file = e.target.files[0];
        var url = URL.createObjectURL(file);

        var sN = document.getElementById("SongName")
        var fullPath = document.getElementById('fileInput').value;
        if (fullPath) {
          var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
          var filename = fullPath.substring(startIndex);
          if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
          }
          sN.innerText = filename
        }

        audio.src = url;
        audio.play();





        audio.addEventListener("ended", function(){
          audio.currentTime = 0;
          console.log("ended");
          if (document.getElementById('RepeatSong').checked)
          {
            audio.play();
            console.log("restarted song");
          } else
          {
            console.log("ended song");
          }
        });
    }
}

function update() {
    requestAnimationFrame(update);
    visual.draw();
    stats.update();
};

function init() {
    createAudio();
    createCanvas();
    createStats();
    //createGui();
    createFile();
    update();
}


window.onload = init();}helloWorld()
