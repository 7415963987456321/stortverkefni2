var API_URL = '/videos.json';
var url = '/videos.json?id=';

document.addEventListener('DOMContentLoaded', function () {
  var body = document.querySelector('body');
  Myndband.init(body);
});

var Myndband = function () {
  var container;
  function init(body) {
    container = body.querySelector('body');
    fetchData();
  }

  function fetchData(id) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE) {
        if (this.status >= 400) {
          error('Villa kom upp');
        } else {
          var data = JSON.parse(request.responseText);
          constructor(data);
        }
      }
    };

    request.onerror = function () {
      error('Óþekkt villa');
    };
    request.open('GET', url + id, true);
    request.send();
  }

  function constructor(data) {
    for (var i = 0; i < 3; i++) {
      Categories(data.categories[i].title, data.categories[i].videos);
    }
  }

  function Categories(title, videos) {
    container = document.querySelector('body');
    console.log(title);
    console.log(videos);

    const sec = document.createElement('section');
    sec.className = 'Category__' + title;
    const div = document.createElement('div');
    div.className = 'Videos';
    sec.appendChild(div);
    const h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(title));
    div.appendChild(h2);
    container.appendChild(sec);
  }
  return {
    init: init
  };
}();

//# sourceMappingURL=script-compiled.js.map