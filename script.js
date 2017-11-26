const API_URL = '/videos.json';
const url = '/videos.json?id=';


document.addEventListener('DOMContentLoaded', function () {
  const body = document.querySelector('body');
  Myndband.init(body);
});

const Myndband = (function() {
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
    for (let i = 0; i < 3; i++) {
      Categories(i, data.categories[i].title, data.categories[i].videos)
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

  function Categories(i, title, videos){
    container = document.querySelector('body');

    const sec = document.createElement('section');
    sec.className = 'Category '+title;

    const h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(title));
    sec.appendChild(h2);

    const div = document.createElement('div');
    div.className = 'Videolist';
    sec.appendChild(div);

    container.appendChild(sec);

    for (let z = 0; z < videos.length; z++) {
      videolist = document.querySelectorAll('.Videolist')[i];
      videolist.appendChild(Videos(videos[z]));
    }
  }

  function Videos(id){
    const title = dataSet.videos[id-1].title;
    const poster = dataSet.videos[id-1].poster;
    const videoURL = dataSet.videos[id-1].video;
    const duration = durationCalc(dataSet.videos[id-1].duration);

    const div = document.createElement('div');
    div.className = 'Video';

    const a = document.createElement('a');
    a.setAttribute('href', "video.html?id="+id);
    div.appendChild(a);

    const img = document.createElement('img');
    img.src = poster;
    a.appendChild(img);

    const h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode(title))
    h3.className = 'videoTitle';
    div.appendChild(h3);
    
    const p = document.createElement('p');
    p.className = 'duration';
    p.appendChild(document.createTextNode(duration))
    div.appendChild(p);

    return div;
  }

  function durationCalc(duration) {
    const sec = Math.floor((duration ) % 60);
    const min = Math.floor((duration / 60) );
    const string =  min +   " min : " + sec + " sec";

    return string;
  }
  return {
    init: init
  }
})();