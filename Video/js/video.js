var timeOut = null;
var videoUrl = [{ url: "190319222227698228.mp4" }];
var videoIndex = localStorage.getItem("collect");
if (videoIndex) {
  videoIndex = localStorage.getItem("collect");
} else {
  videoIndex = 0;
}

window.onload = () => {
  //默认值
  playVideo(videoUrl, videoIndex);
  CreateHander(videoUrl);
  collect(videoIndex);
  //scrollKM(videoIndex);
  //title(videoIndex);
  DocumentTitle(videoIndex);
  //声音
  $video.volume = 1;
  $volumeTitle.innerHTML = `${100}%`;
  $volLin.style.height = `${0}%`;
  $volBall.style.bottom = `calc(${100}% - 3px)`;
  //从那一秒开始播
  $video.currentTime = 0;
  $video.loop = false;
  // $video.style.height = `${$video.clientWidth * 0.5421}px`;
  $video.playbackRate = 1;
  $fastWrapLi[2].style.color = "red";
  $fastWrapLi[2].style.fontSize = `${16}px`;
  $video.play(); //防止自动播放没效果
  setInterval(nowTime, 1000);
};
//获取视频总时长
$video.addEventListener("canplay", () => {
  var duration = timeUp($video.duration);
  $time[2].innerHTML = duration;
});
//获取视频实时时长
$video.addEventListener("timeupdate", () => {
  var currentTime = timeUp($video.currentTime);
  $time[0].innerHTML = currentTime;
  var pro = ($video.currentTime / $video.duration) * 100;
  $proPlay.style.width = `${pro}%`;
  $proBall.style.left = `calc(${pro}% - 8px)`;
});
//点击video播放或暂停
$video.addEventListener("click", play);
//视频播放完了换下一个视频
$video.addEventListener("ended", () => {
  next(videoIndex);
});
//缓冲
$video.addEventListener("waiting", (e) => {
  // $video.pause();
  $hcLonding.style.opacity = 1;
});
//缓冲完
$video.addEventListener("playing", (e) => {
  $hcLonding.style.opacity = 0;
  // $video.play();
});
//点击下一集
$forward.addEventListener("click", () => {
  next(videoIndex);
});
//点击btn播放或暂停
$playBtn.addEventListener("click", play);
//鼠标拖动预览
$proBar.addEventListener("mouseover", (e) => {
  $proLin.style.opacity = 1;
  $yuTime.style.opacity = 1;
});
$proBar.addEventListener("mousemove", (e) => {
  $proLin.style.opacity = 1;
  $yuTime.style.opacity = 1;
  var startX = ($playerBox.clientWidth * 0.2) / 2;
  $proLin.style.left = `${((e.clientX - startX) / $proBar.clientWidth) * 100}%`;
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
//调整声音大小
$volBall.addEventListener("mousedown", downVolBall);
function downVolBall(e) {
  document.documentElement.addEventListener("mousemove", overVolBall);
  document.documentElement.addEventListener("mouseup", upVolBall);
}
function overVolBall(e) {
  var volValue =
    Math.floor(((e.offsetY - 8) / $volumePro.clientHeight) * 100) >= 100
      ? 100
      : Math.floor(((e.offsetY - 8) / $volumePro.clientHeight) * 100);
  var $volumeClass = $volumeI.getAttribute("class").split(" ")[1];
  if (volValue <= 0) {
    volValue = 0;
    $volumeI.classList.replace($volumeClass, "fa-volume-up");
  } else if (volValue <= 50 && volValue > 0) {
    $volumeI.classList.replace($volumeClass, "fa-volume-down");
  } else if (volValue >= 100) {
    $volumeI.classList.replace($volumeClass, "fa-volume-off");
  }
  $volumeTitle.innerHTML = `${100 - volValue}%`;
  $video.volume = (100 - volValue) / 100 >= 1 ? 1 : (100 - volValue) / 100;
  $volLin.style.height = `${volValue}%`;
  $volBall.style.bottom = `calc(${100 - volValue}% - 3px)`;
}
function upVolBall(e) {
  var volValue =
    Math.floor(((e.offsetY - 8) / $volumePro.clientHeight) * 100) >= 100
      ? 100
      : Math.floor(((e.offsetY - 8) / $volumePro.clientHeight) * 100);
  $volumeTitle.innerHTML = `${100 - 8 - volValue}%`;
  $video.volume = (100 - volValue) / 100 >= 1 ? 1 : (100 - volValue) / 100;
  document.documentElement.removeEventListener("mousemove", overVolBall);
  document.documentElement.removeEventListener("mouseup", upVolBall);
}
//点击声音0/100
var isVolume = true; //true表示100
$volumeI.addEventListener("click", () => {
  var $volumeClass = $volumeI.getAttribute("class").split(" ")[1];
  if (isVolume == true) {
    $video.volume = 0;
    $volumeTitle.innerHTML = `${0}%`;
    $volLin.style.height = `${100}%`;
    $volBall.style.bottom = `calc(${0}% - 3px)`;
    $volumeI.classList.replace($volumeClass, "fa-volume-off");
    isVolume = false;
  } else {
    $video.volume = 1;
    $volumeTitle.innerHTML = `${100}%`;
    $volLin.style.height = `${0}%`;
    $volBall.style.bottom = `calc(${100}% - 3px)`;
    $volumeI.classList.replace($volumeClass, "fa-volume-up");
    isVolume = true;
  }
});
//循环播放开关
var isLoop = true; //true表示打开
$loopBtn.addEventListener("click", () => {
  if (isLoop == true) {
    $btnBall.classList.add("active");
    $video.loop = true;
    isLoop = false;
  } else {
    $btnBall.classList.remove("active");
    $video.loop = false;
    isLoop = true;
  }
});
//点击全屏
$expandI.addEventListener("click", full);
//双击video-container
$videoContainer.addEventListener("dblclick", dblclick);
//双击事件
function dblclick() {
  {
    if (timeOut) {
      timeOut = clearTimeout(timeOut);
    }
    full();
  }
}
function full() {
  var $expandClass = $expandI.getAttribute("class").split(" ")[1];
  if (document.fullscreenElement) {
    //不是全屏
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
  } else {
    // 全屏
    FullScreen();
    document.body.oncontextmenu = function () {
      return false;
    };
    window.removeEventListener("scroll", scroll);
    $videoContainer.style.top = null;
    $videoContainer.style.left = null;
    $expandI.classList.replace($expandClass, "fa-compress");
    $proBar.addEventListener("mouseover", (e) => {
      $proLin.style.opacity = 1;
      $yuTime.style.opacity = 1;
    });
    $proBar.addEventListener("mousemove", (e) => {
      $proLin.style.opacity = 1;
      $yuTime.style.opacity = 1;
      var startX = 0;
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
      var startX = 0;
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
      var startX = 0;
      var ballLeft = ((e.clientX - startX) / $proBar.clientWidth) * 100;
      $proPlay.style.width = `${ballLeft}%`;
      $proBall.style.left = `calc(${ballLeft}% - 8px)`;
      $video.currentTime = (ballLeft / 100) * $video.duration;
    }
    function upBall(e) {
      var startX = 0;
      $video.currentTime =
        ((e.clientX - startX) / $proBar.clientWidth) * $video.duration;
      $playBtn.classList.replace("fa-play", "fa-pause");
      $video.play();
      document.documentElement.removeEventListener("mousemove", overBall);
      document.documentElement.removeEventListener("mouseup", upBall);
    }
  }
}
//点击实现视频倍速播放
$fastWrapLi.forEach((item) => {
  item.addEventListener("click", () => {
    $video.playbackRate = item.getAttribute("data-text");
    for (var i = 0; i < siblings(item).length; i++) {
      siblings(item)[i].style.color = "white";
      siblings(item)[i].style.fontSize = `${14}px`;
    }
    item.style.color = "red";
    item.style.fontSize = `${16}px`;
  });
});

//进入全屏
function FullScreen() {
  var doc = document.documentElement;
  if (doc.requestFullscreen) {
    $playerBox.requestFullscreen();
    $playerContainer.classList.add("fullsrceen");
    $playWrap.classList.add("fullsrceen");
    $videoContainer.classList.add("fullsrceen");
    $video.style.height = `${100}%`;
    $nowTime.style.display = "block";
    $collectWrap.style.display = "none";
  } else if (doc.mozRequestFullScreen) {
    $playerBox.mozRequestFullScreen();
    $playerContainer.classList.add("fullsrceen");
    $playWrap.classList.add("fullsrceen");
    $videoContainer.classList.add("fullsrceen");
    $video.style.height = `${100}%`;
    $nowTime.style.display = "block";
    $collectWrap.style.display = "none";
  } else if (doc.webkitRequestFullScreen) {
    $playerBox.webkitRequestFullScreen();
    $playerContainer.classList.add("fullsrceen");
    $playWrap.classList.add("fullsrceen");
    $videoContainer.classList.add("fullsrceen");
    $video.style.height = `${100}%`;
    $nowTime.style.display = "block";
    $collectWrap.style.display = "none";
  }
}
//退出全屏
function ExitFullscreen() {
  var doc = document;
  if (doc.exitFullscreen) {
    doc.exitFullscreen();
    $playerContainer.classList.remove("fullsrceen");
    $playWrap.classList.remove("fullsrceen");
    $videoContainer.classList.remove("fullsrceen");
    $video.style.height = `${100}%`;
    $nowTime.style.display = "none";
    $collectWrap.style.display = "block";
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
    $playerContainer.classList.remove("fullsrceen");
    $playWrap.classList.remove("fullsrceen");
    $videoContainer.classList.remove("fullsrceen");
    $video.style.height = `${100}%`;
    $nowTime.style.display = "none";
    $collectWrap.style.display = "block";
  } else if (doc.webkitCancelFullScreen) {
    doc.webkitCancelFullScreen();
    $playerContainer.classList.remove("fullsrceen");
    $playWrap.classList.remove("fullsrceen");
    $videoContainer.classList.remove("fullsrceen");
    $video.style.height = `${100}%`;
    $nowTime.style.display = "none";
    $collectWrap.style.display = "block";
  }
}
//获取视频缓冲时间
function getBuffered() {
  var buffered = $video.buffered;
  var loaded;
  $time[2].innerHTML = timeUp($video.duration);
  if (buffered.length == 1) {
    // 获取当前缓冲进度
    // var hcTime = $video.buffered.end(0) - $video.buffered.start(0);
    // console.log(hcTime);
    // if (hcTime < 60) {
    // getBuffered();
    // }
    loaded = (100 * buffered.end(0)) / $video.duration;
    // 渲染缓冲条的样式
    $proHc.style.width = `${loaded}%`;
  }

  setTimeout(getBuffered, 500);
}
//下一集
function next(index) {
  if (index) {
    index = localStorage.getItem("collect");
  } else {
    index = 0;
  }
  index++;
  $video.currentTime = 0;
  $proHc.style.width = 0;
  $proPlay.style.width = 0;
  $proBall.style.left = 0;
  if (index >= videoUrl.length) index = 0;
  setIndex(index);
  collect(index);
  playVideo(videoUrl, index);
  scrollKM(index);
  title(index);
  DocumentTitle(index);
}

function playVideo(url, index) {
  var videoUrlSplit = url[index].url.split(".");
  var videoCoty = videoUrlSplit[videoUrlSplit.length - 1];
  // console.log(videoCoty);
  if (videoCoty === "mp4") {
    blob(url[index].url);
  } else if (videoCoty === "m3u8") {
    m38u(url[index].url);
  }
}
//格式化视频时间
function timeUp(time) {
  let hour = Math.floor(time / 60 / 60);
  let min = Math.floor((time - 3600 * hour) / 60);
  let sec = Math.floor(time - hour * 3600 - min * 60);
  let hours = hour <= 9 ? `0${hour}` : hour;
  let mins = min <= 9 ? `0${min}` : min;
  let secs = sec <= 9 ? `0${sec}` : sec;
  if (hour < 1) {
    return `${mins}:${secs}`;
  } else {
    return `${hours}:${mins}:${secs}`;
  }
}
//调用获取视频缓冲时间函数
getBuffered();

//获取所有的兄弟节点
function siblings(el) {
  var a = []; //保存所有兄弟节点
  var p = el.parentNode.children; //获取父级的所有子节点
  //循环
  for (var i = 0; i < p.length; i++) {
    //p里面的元素最少为2个并且如果该节点是元素节点与不是这个节点本身
    if (p.length >= 2 && p[i] != el) {
      a.push(p[i]); // 添加到兄弟节点里
    }
  }
  return a;
}
//点击播放或暂停
function play() {
  if (timeOut) {
    timeOut = clearTimeout(timeOut);
  } // 清除第一个单击事件
  timeOut = setTimeout(function () {
    if ($video.paused) {
      $video.play();
      $playBtn.classList.replace("fa-play", "fa-pause");
      creatCircle("fa-pause");
    } else {
      $video.pause();
      $playBtn.classList.replace("fa-pause", "fa-play");
      creatCircle("fa-play");
    }
  }, 350);
}

//video地址转成blob地址
function blob(url) {
  fetch(url)
    .then(function (response) {
      return response.blob();
    })
    .then(function (res) {
      $video.src = URL.createObjectURL(res);
      $video.play()
    });
  // var xhr = new XMLHttpRequest();
  // xhr.open("GET", url, true);
  // xhr.responseType = "blob";
  // xhr.send();
  // xhr.onload = () => {
  //   if (xhr.status == 200) {
  //     $video.src = URL.createObjectURL(xhr.response);
  //   }
  // };
}
//支持m3u8格式地址 有跨域
function m38u(url) {
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia($video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      $video.play();
    });
  }
}

function setIndex(index) {
  localStorage.setItem("collect", index);
}
//关闭刷新页面干的事
window.onbeforeunload = function (e) {
  //添加localStorage
  setIndex(index);
  //return "真的要关掉页面吗";
  //这一句如果写了，会弹窗提示是否要关掉页面，如果没这个需求，可以不写
};
//创建集数
function CreateHander(data, index) {
  let $collect = document.querySelector(".collect");
  let $collectUl = $collect.querySelector("ul");
  for (var item in data) {
    // let $item = parseInt(item) + 1;
    let $item = item;
    let $li = document.createElement("li");
    let $title = document.createTextNode($item + 1);
    $li.setAttribute("class", "li");
    $li.appendChild($title);
    $li.addEventListener("click", () => {
      $li.classList.add("collectActive");
      for (var i = 0; i < siblings($li).length; i++) {
        siblings($li)[i].classList.remove("collectActive");
      }
      playVideo(data, $item);
      setIndex($item);
      scrollKM($item);
      title($item);
      DocumentTitle($item);
    });
    $collectUl.appendChild($li);
  }
}
//集数变样式
function collect(index) {
  let $collectLi = document.querySelectorAll(".li")[index];
  $collectLi.classList.add("collectActive");
  for (var i = 0; i < siblings($collectLi).length; i++) {
    siblings($collectLi)[i].classList.remove("collectActive");
  }
}

//获取现在时间
function nowTime() {
  var date = new Date();
  var hour = date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours();
  var min =
    date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes();
  $nowTime.innerHTML = hour + ":" + min;
}

function DocumentTitle(index) {
  document.title = `第${index + 1}集`;
}
