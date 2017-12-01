const url = '/videos.json?id=';

const Videoplayer = (function a() {
  let container;
  function fetchData(id) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function b() {
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status >= 400) {
          console.log('Villa kom upp');
        } else {
          const data = JSON.parse(request.responseText);
          constructor(data);
        }
      }
    };

    request.onerror = function c() {
      console.log('Óþekkt villa');
    };
    request.open('GET', url + id, true);
    request.send();
  }

  function init(body) {
    container = body.querySelector('body');
    fetchData();
  }

  function header() {
    const heading = document.createElement('h1');
    heading.className = 'titleHeading';
    heading.appendChild(document.createTextNode('Myndbandaleigan!'));

    const div = document.createElement('div');
    div.className = 'Header';
    div.appendChild(heading);

    return div;
  }

  function handleError() {
    window.alert('Þetta myndskeið er ekki til');
    history.go(-1);
  }

  function getVideo(id) {
    const title = this.dataSet.videos[id - 1].title;
    const videoURL = this.dataSet.videos[id - 1].video;

    const div = document.createElement('div');
    div.className = 'video';

    const divOverlay = document.createElement('div');
    divOverlay.className = 'overlay';
    
    this.overlayImg = document.createElement('img');
    this.overlayImg.src = '/img/play.svg';

    divOverlay.appendChild(overlayImg);
    div.appendChild(divOverlay);

    const titill = document.createElement('div');
    titill.className = 'videoTitle';
    div.appendChild(titill);

    const h1 = document.createElement('h1');
    h1.className = 'title__h1';
    h1.appendChild(document.createTextNode(title));
    titill.appendChild(h1);

    const videoDiv = document.createElement('div');
    videoDiv.className = 'videoPlayer';

    vidPlayer = document.createElement('video');
    vidPlayer.src = videoURL;
    videoDiv.appendChild(this.vidPlayer);
    div.appendChild(videoDiv);

    div.appendChild(buttonList());

    playPause();
    this.vidPlayer.play();
    return div;
  }


  function buttonList() {
    const buttonList = document.createElement('div');
    buttonList.className = 'buttonList';

    // Play takki og eventlistener á videoelement
    const play = document.createElement('button');
    
    this.playImg = document.createElement('img');
    this.playImg.src = '/img/play.svg';
    this.playImg.id = 'play';
    play.appendChild(playImg);
    play.id = 'playButton';

    play.addEventListener('click', () => {
      playPause();
    });
    vidPlayer.addEventListener('click', () => {
      playPause();
    });

    // Forward takki
    const forward = document.createElement('button');
    const forwardImg = document.createElement('img');
    forwardImg.src = '/img/next.svg';
    forward.appendChild(forwardImg);
    forward.id = 'forwardButton';

    forward.addEventListener('click', () => {
      forwardSeek();
    });

    // Fullscreen takki
    const fullscreen = document.createElement('button');
    const fullscreenImg = document.createElement('img');
    fullscreenImg.src = '/img/fullscreen.svg';
    fullscreen.appendChild(fullscreenImg);
    fullscreen.id = 'fullscreenButton';

    fullscreen.addEventListener('click', () => {
      fullscreenReq();
    });

    // Mute takki
    const mute = document.createElement('button');
    this.muteImg = document.createElement('img');
    muteImg.src = '/img/mute.svg';
    mute.appendChild(muteImg);
    mute.id = 'fullscreenButton';

    mute.addEventListener('click', () => {
      muteOnOff();
    });

    // Backward takki
    const backward = document.createElement('button');
    const backwardImg = document.createElement('img');
    backwardImg.src = '/img/back.svg';
    backward.appendChild(backwardImg);
    backward.id = 'backwardButton';

    backward.addEventListener('click', () => {
      backwardSeek();
    });

    // Til baka takki
    const goback = document.createElement('button');
    const textgoback = document.createTextNode('Til baka');
    goback.appendChild(textgoback);

    goback.addEventListener('click', () => {
      window.history.go(-1);
    });

    // Append á container
    buttonList.appendChild(backward);
    buttonList.appendChild(play);
    buttonList.appendChild(fullscreen);
    buttonList.appendChild(mute);
    buttonList.appendChild(forward);
    buttonList.appendChild(goback);

    return buttonList;
  }
  
  function constructor(data) {
    container = document.querySelector('body');
    this.dataSet = data;
    container.appendChild(header());

    const queryId = parseInt(window.location.search.substring(4));

    if (!data.videos.find(item => item.id === queryId)) {
      handleError();
    } else {
      container.appendChild(getVideo(queryId));
    }
  }

  function playPause() {
    if (vidPlayer.paused) {
      this.vidPlayer.play();
      playImg.src = '/img/pause.svg';
      overlayImg.className = 'hidden';
    } else {
      this.vidPlayer.pause();
      playImg.src = '/img/play.svg';
      overlayImg.className = '';
    }
  }

  function forwardSeek() {
    this.vidPlayer.currentTime += 3;
  }

  function backwardSeek() {
    this.vidPlayer.currentTime -= 3;
  }

  function fullscreenReq() {
    if (vidPlayer.webkitRequestFullscreen) {
      vidPlayer.webkitRequestFullscreen();
    } else if (vidPlayer.mozRequestFullScreen) {
      vidPlayer.mozRequestFullScreen();
    } else if (vidPlayer.msRequestFullscreen) {
      vidPlayer.msRequestFullscreen();
    }
  }

  function muteOnOff() {
    if (vidPlayer.muted) {
      vidPlayer.muted = false;
      muteImg.src = '/img/mute.svg';
    } else {
      vidPlayer.muted = true;
      muteImg.src = '/img/unmute.svg';
    }
  }

  function durationCalc(duration) {
    const sec = Math.floor((duration) % 60);
    const min = Math.floor((duration / 60));
    const string = `${min} min : ${sec} sec`;

    return string;
  }


  return {
    init,
  };
}());

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  Videoplayer.init(body);
});
