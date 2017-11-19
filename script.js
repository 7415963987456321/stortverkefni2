var API_URL = '/videos.json';
var url = '/videos.json?id=';

document.addEventListener('DOMContentLoaded', function () {
  var body = document.querySelector('body');
  Myndband.init(body);
});

var Myndband = (function() {
	
	function init(){
		for(var id = 0; id < 4; id++){
			fetchData(id);
		}
	}
	
  function fetchData(id){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(this.readyState == XMLHttpRequest.DONE){
        if(this.status >= 400){
          error('Villa kom upp');
        }else{
          var data = JSON.parse(request.responseText);
          console.log(data.videos[id]);
        }
      }
    }
		
    request.onerror = function(){
      error('Óþekkt villa');
    };

      request.open('GET', url+id, true);
      request.send();
    
  }
  return {
    init: init
  }
})();