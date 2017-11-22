const API_URL = '/videos.json';
const url = '/videos.json?id=';


document.addEventListener('DOMContentLoaded', function () {
  const body = document.querySelector('body');
  Videoplayer.init(body);
});

const Videoplayer = (function() {
    let container;
    function init(body){
    container = body.querySelector('body');
    fetchData();
  }

  function fetchData(id){
    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(this.readyState == XMLHttpRequest.DONE){
        if(this.status >= 400){
          error('Villa kom upp');
        }else{
          const data = JSON.parse(request.responseText);
          constructor(data);
        }
      }
    }
    
    request.onerror = function(){
      error('Óþekkt villa');
    };
      request.open('GET', url+id, true);
      request.send();
  }

  function constructor(data){
    container = document.querySelector('body');
    this.dataSet = data;
    container.appendChild(header());

    let queryId = parseInt(window.location.search.substring(4));

    if(!data.videos.find(item => item.id === queryId)){
      handleError();
    }else{
      container.appendChild(getVideo(queryId));
    }
  }

  function header(){
    const heading = document.createElement('h1');
    heading.className = 'titleHeading';
    heading.appendChild(document.createTextNode('Myndbandaleigan!'))

    const div = document.createElement('div');
    div.className = 'Header';
    div.appendChild(heading);

    return div;
  }

  function getVideo(id){
    const title = dataSet.videos[id-1].title;
    const videoURL = dataSet.videos[id-1].video;
    const duration = durationCalc(dataSet.videos[id-1].duration);

    const div = document.createElement('div');
    div.className = 'video';

    const titill = document.createElement('div');
    titill.className = 'videoTitle';
    div.appendChild(titill);

    const h1 = document.createElement('h1');
    h1.className = 'title__h1';
    h1.appendChild(document.createTextNode(title));
    titill.appendChild(h1);
    
    const videoDiv = document.createElement('div');
    videoDiv.className = 'videoPlayer';
    
    this.vidPlayer = document.createElement('video');
    vidPlayer.src = videoURL;
    videoDiv.appendChild(vidPlayer);
    div.appendChild(videoDiv);

    div.appendChild(buttonList());
    
    playPause();
    vidPlayer.play();
    return div;
    }

  function buttonList(){
    const buttonList = document.createElement('div');
    buttonList.className = 'buttonList';

  //Play takki og eventlistener á videoelement
    const play = document.createElement('button');
    this.playImg = document.createElement('img');
    playImg.src = '/img/play.svg';
    playImg.id = 'play';
    play.appendChild(playImg);
    play.id = 'playButton';

    play.addEventListener('click', function () {
      playPause();
    });
    vidPlayer.addEventListener('click', function () {
      playPause();
    });
    
  //Forward takki
    const forward = document.createElement('button');
    const forwardImg = document.createElement('img');
    forwardImg.src = '/img/next.svg';
    forward.appendChild(forwardImg);
    forward.id = 'forwardButton';

    forward.addEventListener('click', function () {
      forwardSeek();
    });

  //Fullscreen takki
    const fullscreen = document.createElement('button');
    const fullscreenImg = document.createElement('img');
    fullscreenImg.src = '/img/fullscreen.svg';
    fullscreen.appendChild(fullscreenImg);
    fullscreen.id = 'fullscreenButton';
    
    fullscreen.addEventListener('click', function () {
      fullscreenReq();
    });
    
  //Mute takki
    const mute = document.createElement('button');
    this.muteImg = document.createElement('img');
    muteImg.src = '/img/mute.svg';
    mute.appendChild(muteImg);
    mute.id = 'fullscreenButton';
    
    mute.addEventListener('click', function () {
      muteOnOff();
    });

  //Backward takki
    const backward = document.createElement('button');
    const backwardImg = document.createElement('img');
    backwardImg.src = '/img/back.svg';
    backward.appendChild(backwardImg);
    backward.id = 'backwardButton';

     backward.addEventListener('click', function () {
      backwardSeek();
    });

  //Append á container
    buttonList.appendChild(backward);
    buttonList.appendChild(play);
    buttonList.appendChild(fullscreen);
    buttonList.appendChild(mute);
    buttonList.appendChild(forward);

    return buttonList;
  }

  function playPause(){
    if (vidPlayer.paused){
        vidPlayer.play();
        playImg.src = '/img/pause.svg';
      } else {
        vidPlayer.pause();
        playImg.src = '/img/play.svg';
      }
  }

  function forwardSeek(){
    vidPlayer.currentTime +=3;
  }

  function backwardSeek(){
    vidPlayer.currentTime -=3;
  }

  function fullscreenReq(){
    if(vidPlayer.webkitRequestFullscreen){
      vidPlayer.webkitRequestFullscreen();
    }else if(vidPlayer.mozRequestFullScreen){
      vidPlayer.mozRequestFullScreen();
    }else if(vidPlayer.msRequestFullscreen){
      vidPlayer.msRequestFullscreen(); 
    }
  }

  function muteOnOff(){
    if(vidPlayer.muted){
      vidPlayer.muted = false;
    muteImg.src = '/img/mute.svg';
    } else {
      vidPlayer.muted = true;
    muteImg.src = '/img/unmute.svg';
    }
  }

  function durationCalc(duration) {
    const sec = Math.floor((duration ) % 60);
    const min = Math.floor((duration / 60) );
    const string =  min +   " min : " + sec + " sec";

    return string;
  }

  function handleError(){
    window.alert("Þetta myndskeið er ekki til");
    history.go(-1);
  }
  return {
    init: init
  }
})();