//Video

const video = document.querySelector(".works__video-play");
const videoBtn = document.querySelector(".works__play-btn");

video.addEventListener(
  "click",
  function () {
    if (video.paused) {
      videoBtn.style.display = "none";
      video.removeAttribute("poster", "assets/img/bg-video.jpg");
    } else {
      videoBtn.style.display = "block";
      video.setAttribute("poster", "assets/img/bg-video.jpg");
    }
  },
  false
);

videoBtn.addEventListener(
  "click",
  function () {
    if (video.paused) {
      video.play();
      videoBtn.style.display = "none";
    } else {
      video.pause();
      videoBtn.style.display = "block";
    }
  },
  false
);
