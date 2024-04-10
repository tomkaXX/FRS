var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

var enablePopupBtns = function() {
  var _closeBtns =  [].slice.call(document.querySelectorAll( '[data-action="close"]'));
  _closeBtns.forEach(function(entry, index, object) {
    entry.addEventListener('click', function(event){
      event.preventDefault();

      var popup = document.getElementById('popup-content-detail-container');
      popup.classList.add('hidden');
    });
  });

  var _popupBtns = [].slice.call(document.querySelectorAll( '[data-action="popup"]'));
  _popupBtns.forEach(function(entry, index, object) {
    entry.addEventListener('click', function(event){
      event.preventDefault();
      
      var id = entry.dataset.id;
      fetch(window.location.href + '?c=' + id)
        .then((response) => response.json())
        .then((data) => processReturn(data));
    });
  });
}

var enableShowPanel = function(){
  var _panelBtns = [].slice.call(document.querySelectorAll( '[data-action="panel"]'));
  var _panelGroups = [].slice.call(document.querySelectorAll( '.panel-group'));
  var _h3s = [].slice.call(document.querySelectorAll( '.content-header h3.title'));

  _panelBtns.forEach(function(entry, index, object) {
    entry.addEventListener('click', function(event){
      event.preventDefault();
      var id = event.currentTarget.dataset.id;

      _panelGroups.forEach(function(entry, index, object) {
        entry.classList.add('hidden');
      });

      _panelBtns.forEach(function(entry, index, object) {
        entry.classList.remove('active');
      });

      _h3s.forEach(function(entry, index, object) {
        entry.classList.add('hidden');
      });
      
      // console.log('id', id);

      document.getElementById('title-' + id).classList.remove('hidden');

      event.currentTarget.classList.add('active');

      var _panelGroupsActive = [].slice.call(document.querySelectorAll( '.panel-group-' + id));
      _panelGroupsActive.forEach(function(entry, index, object) {
        entry.classList.remove('hidden');
      });

    });
  });
}

var processReturn = function(data){
  console.log('data', data);

  var popup = document.getElementById('popup-content-detail-container');
  var body = document.getElementById('popup-content-body');
  
  var bcSegmentTitle = document.getElementById('breadCrumbSegmentTitle');
  var bcGroupTitle = document.getElementById('breadCrumbGroupTitle');
  var bcFaseTitle = document.getElementById('breadCrumbFaseTitle');

  var title = document.getElementById('popup-title');
  var subtitle = document.getElementById('popup-subtitle');
  var contentNavBtn1 = document.getElementById('contentNavBtn1');
  var contentNavBtn2 = document.getElementById('contentNavBtn2');

  title.innerHTML = data.titel;
  subtitle.innerHTML = data.subtitle;

  breadCrumbSegmentTitle = document.querySelector('.nav-btn.active').innerHTML;
  breadCrumbGroupTitle = document.querySelector('[data-current="' + data.current + '"]').dataset.grouptitle;
  
  bcSegmentTitle.innerHTML = breadCrumbSegmentTitle;
  bcGroupTitle.innerHTML = breadCrumbGroupTitle;

  if(!data.faseTitle) {
    bcFaseTitle.classList.add('hidden');
  } else {
    bcFaseTitle.classList.remove('hidden');
    bcFaseTitle.innerHTML = data.faseTitle;
  }

  body.innerHTML = data.content;

  var _cells = [].slice.call(document.querySelectorAll( '.cell'));
  var activeIndex = 0;
  _cells.forEach(function(entry, index, object) {
    entry.classList.remove('active');

    if(entry.dataset.id == data.current) {
      activeIndex = index;
      // console.log('found activeIndex', data.current, activeIndex);
    }
  });

  contentNavBtn1.classList.add('hidden');
  contentNavBtn2.classList.add('hidden');
  if (activeIndex > 0) {
    contentNavBtn1.classList.remove('hidden');
    contentNavBtn1.dataset.id = _cells[activeIndex - 1].dataset.id;
  }

  console.log('_cells.length', _cells.length, activeIndex);
  if(activeIndex < _cells.length) {
    
    if(_cells[activeIndex + 1] !== undefined) {
      contentNavBtn2.classList.remove('hidden');
      contentNavBtn2.dataset.id = _cells[activeIndex + 1].dataset.id; 
    }
  }

  // console.log('id', data.current);
  document.querySelector('.cell[data-id="' +  data.current + '"]').classList.add('active');

  popup.classList.remove('hidden');
}

var startOtb = function(){
  if(!document.getElementById('otb-container')){
    return false;
  }
  enableShowPanel();

  enablePopupBtns();

}

document.addEventListener('DOMContentLoaded', function(event){
  startOtb();
});