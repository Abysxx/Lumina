async function onLoadRun()
{

  await new Promise(r => setTimeout(r, 500));
  var luminaText = document.getElementById("LuminaText")
  luminaText.style = "color:rgb(0,0,158); position:absolute; left:50%; top:50%;z-index: "+Number.MAX_SAFE_INTEGER+";-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);transition:color 250ms ease;user-select: none;"

  var leftMenu = document.getElementById("Left-Menu")
  leftMenu.style = "top:0;position:absolute; height:100%; width:250px; background:#111; z-index: "+Number.MAX_SAFE_INTEGER+";overflow:auto;" //text-align:center;display:flex;flexWrap:wrap;align-items:left;justify-content:top;flex-direction:column


  var timestats = document.getElementById("timeStats")
  var audioDebug = document.getElementById("AudioStorage")

  function formatTime(seconds) {
    minutes = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }


var slidebarVol = document.getElementById("slidebarVolume")

slidebarVol.addEventListener("mousedown",function(e){
  slidebarVol.addEventListener("input",function(e){
    audioDebug.volume = slidebarVol.value/10;
  })
})
slidebarVol.addEventListener("mouseup",function(e){
  slidebarVol.removeEventListener("input")
})


var slidebar = document.getElementById("sliderBarTime")

slidebar.addEventListener("mousedown",function(e){
  slidebar.addEventListener("input",function(e){
    audioDebug.currentTime = slidebar.value;
  })
})



slidebar.addEventListener("mouseup",function(e){
  slidebar.removeEventListener("input")
})

var playButton = document.getElementById("playPauseBtn")

playButton.addEventListener("click", function() {
  if (audioDebug.paused == true) {
    audioDebug.play();
  } else {
    audioDebug.pause();
  }
});

  while(true)
  {

    // time

    await new Promise(r => setTimeout(r, 5));
      var audioDur = audioDebug.duration
      var audCT = audioDebug.currentTime
      if (formatTime(audioDur) == "0NaN:0NaN"){
        //var audioDurF = formatTime(audioDur)
        var audCTF = formatTime(audCT)
        timestats.innerText = "00:00 - "+audCTF
      }else{
        var audioDurF = formatTime(audioDur)
        var audCTF = formatTime(audCT)
        timestats.innerText = audioDurF+" - "+audCTF

        if (audioDebug.duration > 0 && !audioDebug.paused) {

        var audCTFF = audCTF.split(":")
        var audioDurFF = audioDurF.split(":")

        var audCTFF1 = audCTFF[0]*60
        var audCTFF2 = audCTFF[1]



        var audioDurFF1 = audioDurFF[0]*60
        var audioDurFF2 = audioDurFF[1]


        //slidebar.disabled = false;
        slidebar.setAttribute("min",0);
        slidebar.setAttribute("max",Number(audioDurFF1)+Number(audioDurFF2));
        slidebar.value = Number(audCTFF1)+Number(audCTFF2)


    } else {

        //

    }

      }
    // slider






}


}
window.onload = onLoadRun();
