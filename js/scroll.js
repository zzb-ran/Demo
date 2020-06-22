window.addEventListener("scroll", () => {
  scroll();
});

function scroll() {
  var scroll = document.documentElement.scrollTop;
  if (scroll > 416) {
    $videoContainer.classList.add("scroll");
    $video.addEventListener("mousedown", downVideoContainer);
    $video.removeEventListener("click", play);
    $videoContainer.removeEventListener("dblclick", dblclick);
    $playWrap.style.background = "transparent";
  } else if (scroll < 416) {
    $videoContainer.classList.remove("scroll");
    $videoContainer.style.top = null;
    $videoContainer.style.left = null;
    $video.addEventListener("click", play);
    $videoContainer.addEventListener("dblclick", dblclick);
    $video.removeEventListener("mousedown", downVideoContainer);
    $playWrap.style.background = "black";
  }
}

function downVideoContainer(e) {
  document.documentElement.addEventListener("mousemove", overVideoContainer);
  document.documentElement.addEventListener("mouseup", upVideoContainer);
}
function overVideoContainer(e) {
  $videoContainer.style.top = `${e.clientY - 120}px`;
  $videoContainer.style.left = `${e.clientX - 213}px`;
}
function upVideoContainer(e) {
  $videoContainer.style.top = `${e.clientY - 120}px`;
  $videoContainer.style.left = `${e.clientX - 213}px`;
  document.documentElement.removeEventListener("mousemove", overVideoContainer);
  document.documentElement.removeEventListener("mouseup", upVideoContainer);
}

// 总行数   总数量 / 5
// 行数 在播放集数 / 5
// 滚动距离 行数 * 49
//function scrollKM(index) {
//  var ztotal = Math.floor(mztknData.length / 5);
//  var total = Math.ceil((parseInt(index) + 1) / 5);
//  if (total > ztotal) {
//    total = 0;
//  }
//  document.querySelector(".collect > ul").scrollTo(0, 49 * (total - 3));
//}
