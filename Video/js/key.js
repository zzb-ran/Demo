//取消键盘的默认事件
window.onkeydown = function (event) {
  var e = window.event || event;
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    window.event.returnValue = false;
  }
};

window.onkeyup = function (event) {
  var e = window.event || event;
  var seekTime = 5;
  var volume = 0.05;
  if (e && e.keyCode === 32) {
    if ($video.paused) {
      $video.play();
      $playBtn.classList.replace("fa-play", "fa-pause");
      creatCircle("fa-pause");
    } else {
      $video.pause();
      $playBtn.classList.replace("fa-pause", "fa-play");
      creatCircle("fa-play");
    }
  }
  if (e && e.keyCode === 38) {
    var nowVol = $video.volume;
    var $volumeClass = $volumeI.getAttribute("class").split(" ")[1];
    var addVol = (nowVol + volume).toFixed(2);
    console.log(nowVol);
    if (addVol >= 1) {
      addVol = 1;
      $volumeI.classList.replace($volumeClass, "fa-volume-up");
      creatCircle("fa-volume-up");
    } else if (addVol <= 50 && addVol > 0) {
      $volumeI.classList.replace($volumeClass, "fa-volume-down");
      creatCircle("fa-volume-down");
    } else if (addVol <= 0) {
      addVol = 0;
      $volumeI.classList.replace($volumeClass, "fa-volume-off");
      creatCircle("fa-volume-off");
    }
    $volLin.style.height = `${100 - addVol * 100}%`;
    $volBall.style.bottom = `calc(${addVol * 100}% - 3px)`;
    $volumeTitle.innerHTML = `${Math.floor(addVol * 100)}%`;
    $video.volume = addVol;
  }
  if (e && e.keyCode === 40) {
    var nowVol = $video.volume;
    var $volumeClass = $volumeI.getAttribute("class").split(" ")[1];
    var jianVol = (nowVol - volume).toFixed(2);
    console.log(nowVol);
    if (jianVol >= 1) {
      jianVol = 1;
      $volumeI.classList.replace($volumeClass, "fa-volume-up");
      creatCircle("fa-volume-up");
    } else if (jianVol <= 50 && jianVol > 0) {
      $volumeI.classList.replace($volumeClass, "fa-volume-down");
      creatCircle("fa-volume-down");
    } else if (jianVol <= 0) {
      jianVol = 0;
      $volumeI.classList.replace($volumeClass, "fa-volume-off");
      creatCircle("fa-volume-off");
    }
    $volLin.style.height = `${100 - jianVol * 100}%`;
    $volBall.style.bottom = `calc(${jianVol * 100}% - 3px)`;
    $volumeTitle.innerHTML = `${Math.floor(jianVol * 100)}%`;
    $video.volume = jianVol;
  }
  if (e && e.keyCode === 39) {
    var nowCurrentTime = $video.currentTime;
    var addCurrentTime = nowCurrentTime + seekTime;
    if (addCurrentTime >= $video.duration) {
      addCurrentTime = $video.duration;
    }
    var ballLeft = (addCurrentTime / $video.duration) * 100;
    $proPlay.style.width = `${ballLeft}%`;
    $proBall.style.left = `calc(${ballLeft}% - 8px)`;
    creatCircle("fa-forward");
    $video.currentTime = addCurrentTime;
  }
  if (e && e.keyCode === 37) {
    var nowCurrentTime = $video.currentTime;
    var jianCurrentTime = nowCurrentTime - seekTime;
    if (jianCurrentTime <= 0) {
      jianCurrentTime = 0;
    }
    var ballLeft = (addCurrentTime / $video.duration) * 100;
    $proPlay.style.width = `${ballLeft}%`;
    $proBall.style.left = `calc(${ballLeft}% - 8px)`;
    creatCircle("fa-backward");
    $video.currentTime = jianCurrentTime;
  }
};
//esc键
window.onresize = function () {
  if (!document.fullscreenElement) {
    //要执行的动作
    var $expandClass = $expandI.getAttribute("class").split(" ")[1];
    ExitFullscreen();
    document.body.oncontextmenu = function () {};
    $expandI.classList.replace($expandClass, "fa-expand");
    window.addEventListener("scroll", scroll);
    $videoContainer.style.top = null;
    $videoContainer.style.left = null;
    //鼠标拖动预览
    $proBar.addEventListener("mouseover", (e) => {
      $proLin.style.opacity = 1;
      $yuTime.style.opacity = 1;
    });
    $proBar.addEventListener("mousemove", (e) => {
      $proLin.style.opacity = 1;
      $yuTime.style.opacity = 1;
      var startX = ($playerBox.clientWidth * 0.2) / 2;
      $proLin.style.left = `${
        ((e.clientX - startX) / $proBar.clientWidth) * 100
      }%`;
      if (e.clientX - startX <= 40) {
        $yuTime.style.left = 0;
      } else if (e.clientX - startX >= $proBar.clientWidth - 40) {
        $yuTime.style.left = `${$proBar.clientWidth - 80}px`;
      } else {
        $yuTime.style.left = `calc(${
          ((e.clientX - startX) / $proBar.clientWidth) * 100
        }% - 40px)`;
      }
      $yuTimeTitle.innerHTML = timeUp(
        ((e.clientX - startX) / $proBar.clientWidth) * $video.duration
      );
    });
    $proBar.addEventListener("mouseout", (e) => {
      $proLin.style.opacity = 0;
      $yuTime.style.opacity = 0;
    });
    //点击进度条跳转到视频相应位置
    $proBar.addEventListener("click", (e) => {
      $video.pause();
      $playBtn.classList.replace("fa-pause", "fa-play");
      var startX = ($playerBox.clientWidth * 0.2) / 2;
      $video.currentTime =
        ((e.clientX - startX) / $proBar.clientWidth) * $video.duration;
      $playBtn.classList.replace("fa-play", "fa-pause");
      $video.play();
    });
    //按下进度条的圆圈
    $proBall.addEventListener("mousedown", downBall);
    function downBall(e) {
      document.documentElement.addEventListener("mousemove", overBall);
      document.documentElement.addEventListener("mouseup", upBall);
    }
    function overBall(e) {
      $video.pause();
      $playBtn.classList.replace("fa-pause", "fa-play");
      var startX = ($playerBox.clientWidth * 0.2) / 2;
      var ballLeft = ((e.clientX - startX) / $proBar.clientWidth) * 100;
      $proPlay.style.width = `${ballLeft}%`;
      $proBall.style.left = `calc(${ballLeft}% - 8px)`;
      $video.currentTime = (ballLeft / 100) * $video.duration;
    }
    function upBall(e) {
      var startX = ($playerBox.clientWidth * 0.2) / 2;
      $video.currentTime =
        ((e.clientX - startX) / $proBar.clientWidth) * $video.duration;
      $playBtn.classList.replace("fa-play", "fa-pause");
      $video.play();
      document.documentElement.removeEventListener("mousemove", overBall);
      document.documentElement.removeEventListener("mouseup", upBall);
    }
  }
};

//创建弹窗
function creatCircle(cl) {
  var $div = document.createElement("div");
  var $i = document.createElement("i");
  $i.setAttribute("class", `fa ${cl}`);
  $div.appendChild($i);
  $div.style.position = "absolute";
  $div.style.top = `${50}%`;
  $div.style.left = `${50}%`;
  $div.style.transform = `translate(${-50}% , ${-50}%)`;
  $div.classList.add("skip");
  $div.style.width = `${90}px`;
  $div.style.height = `${90}px`;
  $div.style.lineHeight = `${90}px`;
  $div.style.textAlign = "center";
  $div.style.borderRadius = `${50}%`;
  $div.style.animationName = "divslk";
  $div.style.animationDuration = `${0.4}s`;
  $div.style.animationTimingFunction = "ease-in-out";
  $div.style.webkitAnimationFillMode = "forwards";
  $div.style.background = `rgba(${1},${1},${1},${0.5})`;
  $div.style.fontSize = `${30}px`;
  $div.style.color = "white";
  $videoContainer.appendChild($div);
  $div.addEventListener("animationend", () => {
    $videoContainer.removeChild($div);
  });
}
