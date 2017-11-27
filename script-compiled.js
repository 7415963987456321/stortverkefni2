const url = '/videos.json?id=';

const Myndband = function a() {
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
  function constructor(data) {
    container = document.querySelector('body');
    this.dataSet = data;
    container.appendChild(header());
    for (let i = 0; i < 3; i++) {
      Categories(i, data.categories[i].title, data.categories[i].videos);
    }
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

  function Categories(i, title, videos) {
    container = document.querySelector('body');

    const sec = document.createElement('section');
    sec.className = `Category ${title}`;

    const h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(title));
    sec.appendChild(h2);

    const div = document.createElement('div');
    div.className = 'Videolist';
    sec.appendChild(div);

    container.appendChild(sec);

    for (let z = 0; z < videos.length; z++) {
      const videolist = document.querySelectorAll('.Videolist')[i];
      videolist.appendChild(Videos(videos[z]));
    }

    const border = document.createElement('div');
    border.className = 'border';
    sec.appendChild(border);
  }

  function Videos(id) {
    const title = this.dataSet.videos[id - 1].title;
    const poster = this.dataSet.videos[id - 1].poster;
    const videoURL = this.dataSet.videos[id - 1].video;
    const duration = durationCalc(dataSet.videos[id - 1].duration);
    const created = this.dataSet.videos[id - 1].created;

    const div = document.createElement('div');
    div.className = 'Video';

    const a = document.createElement('a');
    a.setAttribute('href', `video.html?id=${id}`);
    div.appendChild(a);

    const img = document.createElement('img');
    img.src = poster;
    a.appendChild(img);

    const h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode(title));
    h3.className = 'videoTitle';
    div.appendChild(h3);

    const p = document.createElement('p');
    p.className = 'duration';
    p.appendChild(document.createTextNode(duration));
    div.appendChild(p);

    console.log(age(created));
    return div;
  }

  function durationCalc(duration) {
    const sec = Math.floor(duration % 60);
    const min = Math.floor(duration / 60);
    const secZero = (sec < 10 ? "0" : "") + sec;
    const string = `${min}:${secZero} `;

    return string;
  }

  function age(created) {
    //TODO Klára þetta
    const now = Date.parse(new Date());
    const diff = now - created;
    console.log(created);
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    const week = Math.floor(diff / 604800);
    const month = week % 4;
    const year = month % 12;

    return day % 30 % 7 + "days " + week % 4 + "weeks " + month % 12 + "months " + year;
  }
  return {
    init
  };
}();

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  Myndband.init(body);
});

//# sourceMappingURL=script-compiled.js.map