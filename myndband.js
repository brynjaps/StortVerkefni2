// constant url to vide.json
const videoJsonUrl = "videos.json";

document.addEventListener('DOMContentLoaded', () => {
  /*
  Þegar myndband er valið er farið á aðra síðu með auðkenni á myndbandi í querystring, t.d.
  video.html?id=1 . Sá vefur grípur hvert það myndband er og birtir það með titil þess í
  haus og stýringum:
  */
  const videoParam = new URLSearchParams(window.location.search);
  const video = new Video();
  video.init(videoParam.get('id'));
});

class Video {
  constructor() {
    this.isPlaying = false;
    this.onPressPlay = this.onPressPlay.bind(this);
    this.onPressMute = this.onPressMute.bind(this);
    this.onPressNext = this.onPressNext.bind(this);
    this.onPressBack = this.onPressBack.bind(this);
    this.onPressFullscreen = this.onPressFullscreen.bind(this);
  }

  onLoadMetaData() {
    // create a new instance of XMLHttpRequest
    const request = new XMLHttpRequest();
    // set the url
    request.open('GET', videoJsonUrl, true);
    // register to the onload event
    request.onload = () => {
      // parse the response
      const res = JSON.parse(request.response);
      // try to find the video by id
      const infoResult = res.videos.find(video => video.id == this.id);
      // call the setInfo with the result
      this.setInfo(infoResult);
    };
    // register to the onerror event
    request.onerror = () => {
    }
    // send the request
    request.send();
  }

  onPressBack() {
    this.video.currentTime = (this.video.currentTime - 3) > 0 ? (this.video.currentTime - 3) : 0;
  }

  onPressPlay(e) {
    if (!this.video.paused) {
      e.target.src = "./img/pause.svg";
      this.video.pause();
    } else {
      e.target.src = "./img/play.svg";
      this.video.play();
    }
  }

  onPressNext() {
    this.video.currentTime = (this.video.currentTime + 3) > this.video.duration ? this.video.duration : (this.video.currentTime + 3);
  }

  onPressMute(e) {
    if (this.video.volume !== 0) {
      e.target.src = "./img/unmute.svg";
      this.video.volume = 0;
    } else {
      e.target.src = "./img/mute.svg";
      this.video.volume = 1;
    }
  }

  onPressFullscreen() {
    if (this.video.requestFullscreen) {
      video.requestFullscreen
    } else if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen();
    }
  }

  setInfo(info) {
    // set the title
    document.querySelector('.video-title').innerText = info.title;
    
    this.video.poster = info.poster;
    // add the source
    this.video.src = info.video;
    // when we can start to play we do so
    this.video.oncanplay = () => {
      this.video.play();
    }
  }

  initVideo() {
    this.video = document.querySelector('video');
  }

  init(id) {
    this.id = id;
    this.initVideo();
    this.onLoadMetaData();
    const controls = document.querySelector('.controls');
    controls.querySelector('.play-button').addEventListener('click', this.onPressPlay);
    controls.querySelector('.mute-button').addEventListener('click', this.onPressMute);
    controls.querySelector('.back-button').addEventListener('click', this.onPressBack);
    controls.querySelector('.next-button').addEventListener('click', this.onPressNext);
    controls.querySelector('.next-button').addEventListener('click', this.onPressNext);
    controls.querySelector('.fullscreen-button').addEventListener('click', this.onPressFullscreen);
    
  }
}

