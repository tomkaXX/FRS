var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;


function showMsg(file){
  document.getElementById('kompas-form').classList.remove('active');
  document.getElementById('download').classList.add('active');

  var filename = file.split("/").pop();
// console.log('file', file);
  var link = document.getElementById('download-link');
  link.href = file;
  // link.innerHTML = 'Aanbevelingen en toelichtingen Hybride leeromgevingen';//filename;

  var offset = document.getElementById('offset');
  offset.scrollIntoView();
  offset.scrollIntoView(false);
  offset.scrollIntoView({block: "end"});
  offset.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  
  // var headerOffset = 145;
  // var elementPosition = link.getBoundingClientRect().top;
  // var offsetPosition = elementPosition - headerOffset;
  // console.log(elementPosition,headerOffset,offsetPosition);
  // window.scrollTo({
  //   top: -1 * offsetPosition,
  //   behavior: "smooth"
  // });

}

function reqListener (e) {
  var xhr = e.target;
  var reply = xhr.response;
  if(isIE11){
    reply = JSON.parse(xhr.response);
    
  }
  console.log('response', reply);
  document.getElementById('loading').classList.remove('active');

  if(reply.file){
    showMsg(reply.file);
  }
}

var enablePanels = function(){
  var _tabs = [].slice.call(document.querySelectorAll( '[data-action="show-panel"]')),
      _panels = [].slice.call(document.querySelectorAll( '.panel')),
      _items = [].slice.call(document.querySelectorAll( '.checkmark'));

  if(!_tabs.length){
    return false;
  }

  var msg = '';

  _items.forEach(function(entry, index, object) {
    entry.addEventListener("click", function(event){
      msg = document.getElementById('form-msg').innerHTML;
      if(msg){
        document.getElementById('form-msg').innerHTML = '';
      }

    });
  });

  _tabs.forEach(function(entry, index, object) {
    entry.addEventListener("click", function(event){
      event.preventDefault();

      _panels.forEach(function(entry, index, object) {
        entry.classList.remove('active');
      });

      _tabs.forEach(function(entry, index, object) {
        entry.classList.remove('active');
      });

      entry.classList.add('active');

      var target = entry.dataset.target;
      document.getElementById(target).classList.add('active');

    });
  });

  _tabs[0].click();
};

var enableTriggers = function(){
  var _triggers = [].slice.call(document.querySelectorAll( '[data-action="get-pdf"]'));

  _triggers.forEach(function(entry, index, object) {
    entry.addEventListener("click", function(event){
      event.preventDefault();

      var result = 'r=';
      var _items = [].slice.call(document.querySelectorAll( '.item:checked'));

      if(!_items.length){
        document.getElementById('form-msg').innerHTML = 'Geen selectie ontvangen';
        return false;        
      }

      _items.forEach(function(entry, index, object) {
        result = result + '.' + entry.value;
      });

      document.getElementById('loading').classList.add('active');

      var pageid = document.getElementById('pageid').value;
      var ajaxurl = document.getElementById('ajaxurl').value;

      var oReq = new XMLHttpRequest();
      oReq.addEventListener('load', reqListener);
      oReq.open("post", ajaxurl, true);
      
      params = {
        result : result,
        pid : pageid,
        cmd : 1,
      };
      res = '';
      for (var key in params) {
        if (res !== "") {
            res += "&";
        }
        res += key + "=" + encodeURIComponent(params[key]);
      }

      oReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      oReq.responseType = 'json';
      oReq.json = true;
    
      oReq.send(res);

    });
  });
};

document.addEventListener('DOMContentLoaded', function(event){
  enablePanels();
  enableTriggers();
});