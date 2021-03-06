// constant url to vide.json
const videoJsonUrl = 'videos.json';
const test = '/';

class Video {
  constructor() {
    this.isPlaying = false;
    // bind functions
    this.onPressPlay = this.onPressPlay.bind(this);
    this.onPressMute = this.onPressMute.bind(this);
    this.onPressNext = this.onPressNext.bind(this);
    this.onPressBack = this.onPressBack.bind(this);
    this.onPressFullscreen = this.onPressFullscreen.bind(this);
    document.querySelector('.overlay').classList.remove('hidden');
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
      const intId = parseInt(this.id, 10);
      const infoResult = res.videos.find(video => video.id === intId);
      // call the setInfo with the result
      this.setInfo(infoResult);
    };
    // register to the onerror event
    request.onerror = () => {
    };
    // send the request
    request.send();
  }
  /*
    Til baka takki, þegar ýtt er á hann og myndband er að spila, er það fært til baka um 3
    sekúndur eða á byrjun
  */
  onPressBack() {
    this.video.currentTime = (this.video.currentTime - 3) > 0 ? (this.video.currentTime - 3) : 0;
  }

  /*
    Spila takki, ef videó er ekki að spila er það spilað, annars er pásu táknmynd sýnd og
    vídeó pásað.

    Meðan vídeó er ekki að spila er sýnt overlay með play takka í miðju og gegnsæum
    bakgrunn ( rgba(0, 0, 0, 0.2) í fyrirmynd).
  */
  onPressPlay() {
    // get the play button
    const btn = document.querySelector('.play-button > img');
    // if the video is not paused then pause it
    // and show overlay
    // else play it
    if (!this.video.paused) {
      btn.src = './img/play.svg';
      this.video.pause();
      document.querySelector('.overlay').classList.remove('hidden');
    } else {
      btn.src = './img/pause.svg';
      this.video.play();
      document.querySelector('.overlay').classList.add('hidden');
    }
  }
  /*
    Áfram takki, þegar ýtt er á hann og myndband er að spila, er það fært áfram um 3
  sekúndur eða á enda
  */
  onPressNext() {
    this.video.currentTime = (
      (this.video.currentTime + 3) > this.video.duration ?
        this.video.duration :
        (this.video.currentTime + 3));
  }

  /*
    Slökkva á hljóði takki, ef hljóð er að spila er slökkt á því annars öfugt
  */
  onPressMute(e) {
    if (this.video.volume !== 0) {
      e.target.src = './img/unmute.svg';
      this.video.volume = 0;
    } else {
      e.target.src = './img/mute.svg';
      this.video.volume = 1;
    }
  }
  /*
    Fullscreen takki, setur vídeó í fullscreen (athuga þarf stuðning og gera ráðstafanir með
    requestFullscreen API)
  */
  onPressFullscreen() {
    if (this.video.requestFullscreen) {
      video.requestFullscreen
    } else if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen();
    }
  }

  setInfo(info) {
    // Ef vídeó er ekki til ( id er ekki í videos.json ) er skilaboð um það birt.
    if (!info) {
      document.querySelector('.video-title').innerText = 'Video finnst ekki';
      const infoEl = document.querySelector('.info');
      infoEl.innerHTML = '<p>Þetta video er ekki til, farðu til baka.</p>';
      infoEl.classList.remove('hidden');
      document.querySelector('button').addEventListener('click', () => { window.location.href = test })
      return;
    }
    this.bindControls();
    // set the title
    document.querySelector('.video-title').innerText = info.title;
    this.video.poster = info.poster;
    // add the source
    this.video.src = info.video;
  }

  bindControls() {
    this.video = document.querySelector('video');
    const controls = document.querySelector('.controls');
    controls.querySelector('.play-button').addEventListener('click', this.onPressPlay);
    controls.querySelector('.mute-button').addEventListener('click', this.onPressMute);
    controls.querySelector('.back-button').addEventListener('click', this.onPressBack);
    controls.querySelector('.next-button').addEventListener('click', this.onPressNext);
    controls.querySelector('.next-button').addEventListener('click', this.onPressNext);
    controls.querySelector('.fullscreen-button').addEventListener('click', this.onPressFullscreen);
    document.querySelector('video').addEventListener('click', this.onPressPlay);
    document.querySelector('button').addEventListener('click', () => { window.location.href = test; });
  }

  init(id) {
    this.id = id;

    this.onLoadMetaData();
  }
}

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
