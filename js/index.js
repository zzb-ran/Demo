var $volumeControl = document.querySelector(".volume-control");
var $volumeWrap = document.querySelector(".volume-wrap");
var $fastControl = document.querySelector(".fast-control");
var $fastWrap = document.querySelector(".fast-wrap");
var $forward = document.querySelector(".forward");
var $settingsControl = document.querySelector(".settings-control");
var $settingsWrap = document.querySelector(".settings-wrap");
var $videoContainer = document.querySelector(".video-container");
var $controls = document.querySelector(".controls");
var $playerBox = document.querySelector(".player-box");
var $loopBtn = document.querySelector(".button");
var $btnBall = document.querySelector(".btn-ball");
var $video = document.querySelector("video");
var $playerContainer = document.querySelector(".player-container");
var $playWrap = document.querySelector(".play-wrap");
var $proBar = document.querySelector(".pro-bar");
var $proHc = document.querySelector(".pro-hc");
var $proPlay = document.querySelector(".pro-play");
var $proLin = document.querySelector(".pro-lin");
var $proBall = document.querySelector(".pro-ball");
var $playBtn = document.querySelector(".play > i");
var $forwardBtn = document.querySelector(".forward > i");
var $time = document.querySelectorAll(".time > span");
var $hcLonding = document.querySelector(".hcLonding");
var $yuTime = document.querySelector(".yu-time");
var $yuTimeTitle = $yuTime.querySelector("span");
var $volumeI = document.querySelector(".volume > i");
var $volumeTitle = document.querySelector(".volume-title");
var $volPlay = document.querySelector(".vol-play");
var $volLin = document.querySelector(".vol-lin");
var $volBall = document.querySelector(".vol-ball");
var $volumePro = document.querySelector(".volume-pro");
var $volumeWrap = document.querySelector(".volume-wrap");
var $expandI = document.querySelector(".expand > i");
var $fast = document.querySelector(".fast");
var $fastWrapLi = document.querySelectorAll(".fast-wrap > ul > li");
var $controls = document.querySelector(".controls");
var $title = document.querySelector(".title");
var $topControls = document.querySelector(".top-controls");
var $topTitle = document.querySelector(".top-title");
var $nowTime = document.querySelector(".now-time");
var $collectWrap = document.querySelector(".collect-wrap");
var $nextHint = document.querySelector(".next-hint");
var timer = null;
function opacity() {
  $videoContainer.addEventListener("mouseover", () => {
    $controls.style.opacity = 1;
    $topControls.style.opacity = 1;
    $videoContainer.classList.add("cursor");
    timer = setTimeout(() => {
      $controls.style.opacity = 0;
      $topControls.style.opacity = 0;
      $videoContainer.classList.remove("cursor");
    }, 5000);
    $videoContainer.addEventListener("mousemove", () => {
      $controls.style.opacity = 1;
      $topControls.style.opacity = 1;
      $videoContainer.classList.add("cursor");
      timer = setTimeout(() => {
        $controls.style.opacity = 0;
        $topControls.style.opacity = 0;
        $videoContainer.classList.remove("cursor");
      }, 5000);
    });
    $videoContainer.addEventListener("mouseout", () => {
      clearInterval(timer);
      $controls.style.opacity = 0;
      $topControls.style.opacity = 0;
      $videoContainer.classList.remove("cursor");
    });
  });
}

function overOut(overDom, openDom) {
  overDom.addEventListener("mouseover", () => {
    openDom.style.opacity = 1;
  });
  overDom.addEventListener("mouseout", () => {
    openDom.style.opacity = 0;
  });
}
overOut($volumeControl, $volumeWrap);
overOut($fastControl, $fastWrap);
overOut($settingsControl, $settingsWrap);
overOut($controls, $controls);
overOut($forward, $nextHint);
opacity();
