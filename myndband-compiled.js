'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// constant url to vide.json
var videoJsonUrl = "videos.json";

document.addEventListener('DOMContentLoaded', function () {
  /*
  Þegar myndband er valið er farið á aðra síðu með auðkenni á myndbandi í querystring, t.d.
  video.html?id=1 . Sá vefur grípur hvert það myndband er og birtir það með titil þess í
  haus og stýringum:
  */
  var videoParam = new URLSearchParams(window.location.search);
  var video = new Video();
  video.init(videoParam.get('id'));
});

var Video = function () {
  function Video() {
    _classCallCheck(this, Video);

    this.isPlaying = false;
    // binda foll
    this.onPressPlay = this.onPressPlay.bind(this);
    this.onPressMute = this.onPressMute.bind(this);
    this.onPressNext = this.onPressNext.bind(this);
    this.onPressBack = this.onPressBack.bind(this);
    this.onPressFullscreen = this.onPressFullscreen.bind(this);
  }

  _createClass(Video, [{
    key: 'onLoadMetaData',
    value: function onLoadMetaData() {
      var _this = this;

      // create a new instance of XMLHttpRequest
      var request = new XMLHttpRequest();
      // set the url
      request.open('GET', videoJsonUrl, true);
      // register to the onload event
      request.onload = function () {
        // parse the response
        var res = JSON.parse(request.response);
        // try to find the video by id
        var infoResult = res.videos.find(function (video) {
          return video.id == _this.id;
        });
        // call the setInfo with the result
        _this.setInfo(infoResult);
      };
      // register to the onerror event
      request.onerror = function () {};
      // send the request
      request.send();
    }
    /*
      Til baka takki, þegar ýtt er á hann og myndband er að spila, er það fært til baka um 3
      sekúndur eða á byrjun
    */

  }, {
    key: 'onPressBack',
    value: function onPressBack() {
      this.video.currentTime = this.video.currentTime - 3 > 0 ? this.video.currentTime - 3 : 0;
    }

    /*
      Spila takki, ef videó er ekki að spila er það spilað, annars er pásu táknmynd sýnd og
      vídeó pásað.
       Meðan vídeó er ekki að spila er sýnt overlay með play takka í miðju og gegnsæum
      bakgrunn ( rgba(0, 0, 0, 0.2) í fyrirmynd).
    */

  }, {
    key: 'onPressPlay',
    value: function onPressPlay(e) {
      var btn = document.querySelector('.play-button > img');
      if (!this.video.paused) {
        btn.src = "./img/pause.svg";
        this.video.pause();
        document.querySelector('.overlay').classList.remove('hidden');
      } else {
        btn.src = "./img/play.svg";
        this.video.play();
        document.querySelector('.overlay').classList.add('hidden');
      }
    }
    /*
      Áfram takki, þegar ýtt er á hann og myndband er að spila, er það fært áfram um 3
    sekúndur eða á enda
    */

  }, {
    key: 'onPressNext',
    value: function onPressNext() {
      this.video.currentTime = this.video.currentTime + 3 > this.video.duration ? this.video.duration : this.video.currentTime + 3;
    }

    /*
      Slökkva á hljóði takki, ef hljóð er að spila er slökkt á því annars öfugt
    */

  }, {
    key: 'onPressMute',
    value: function onPressMute(e) {
      if (this.video.volume !== 0) {
        e.target.src = "./img/unmute.svg";
        this.video.volume = 0;
      } else {
        e.target.src = "./img/mute.svg";
        this.video.volume = 1;
      }
    }
  }, {
    key: 'onPressFullscreen',
    value: function onPressFullscreen() {
      if (this.video.requestFullscreen) {
        video.requestFullscreen;
      } else if (this.video.webkitRequestFullscreen) {
        this.video.webkitRequestFullscreen();
      }
    }
  }, {
    key: 'setInfo',
    value: function setInfo(info) {
      var _this2 = this;

      // set the title
      document.querySelector('.video-title').innerText = info.title;

      this.video.poster = info.poster;
      // add the source
      this.video.src = info.video;
      // when we can start to play we do so
      this.video.oncanplay = function () {
        _this2.video.play();
      };
    }
  }, {
    key: 'initVideo',
    value: function initVideo() {
      this.video = document.querySelector('video');
    }
  }, {
    key: 'init',
    value: function init(id) {
      this.id = id;
      this.initVideo();
      this.onLoadMetaData();
      var controls = document.querySelector('.controls');
      controls.querySelector('.play-button').addEventListener('click', this.onPressPlay);
      controls.querySelector('.mute-button').addEventListener('click', this.onPressMute);
      controls.querySelector('.back-button').addEventListener('click', this.onPressBack);
      controls.querySelector('.next-button').addEventListener('click', this.onPressNext);
      controls.querySelector('.next-button').addEventListener('click', this.onPressNext);
      controls.querySelector('.fullscreen-button').addEventListener('click', this.onPressFullscreen);
      document.querySelector('video').addEventListener('click', this.onPressPlay);
      document.querySelector('button').addEventListener('click', function () {
        window.location.href = "/";
      });
    }
  }]);

  return Video;
}();

//# sourceMappingURL=myndband-compiled.js.map