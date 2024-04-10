var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;


function qsShowMsg(file){
  document.getElementById('quickscan-form').classList.remove('active');
  document.getElementById('download').classList.add('active');

  var filename = file.split("/").pop();
// console.log('file', file);
  var link = document.getElementById('download-link');
  link.href = file;
  link.innerHTML = filename;

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

var enableDownload = function(){

  var _downloads = [].slice.call(document.querySelectorAll( '[data-action="download"]'));
  
  _downloads.forEach(function(entry, index, object) {
    entry.addEventListener("click", function(event){
      event.preventDefault();

      var resultsRaw = localStorage.getItem('results');
      var results = JSON.parse(resultsRaw);

      // encodeURIComponent
      var URL = window.location.href + "?cmd=1&results=" + JSON.stringify(results);
      URL = URL.replace('#', '');
      // console.log('URL', URL);
      var win = window.open(URL, "_blank");
    });
  });
  
  // JSON.stringify();
}

function removeClassByPrefix(node, prefix) {
	var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
	node.className = node.className.replace(regx, '');
	return node;
}

function qsReqListener (e) {
  var xhr = e.target;
  var reply = xhr.response;
  if(isIE11){
    reply = JSON.parse(xhr.response);
    
  }
  // console.log('response', reply);
  document.getElementById('loading').classList.remove('active');

  if(reply.file){
    showMsg(reply.file);
  }
}

var resetCircleBtns = function(){
  var _circleBtns = [].slice.call(document.querySelectorAll( '.circle-btn:not(.back)'));
  _circleBtns.forEach(function(entry, index, object) {
    entry.classList.add('disabled');
  });
}

var removeCircleBtnDisabled = function(targetId){
  var _circleBtns = [].slice.call(document.querySelectorAll( '.circle-btn:not(.back)'));
  _circleBtns.forEach(function(entry, index, object) {
    // console.log('targetId',targetId, entry.dataset.id);
    if(targetId >= entry.dataset.id) {
      entry.classList.remove('disabled');
    }
  });
}

var saveIdxToStorage = function(parentId, questionid, inputIdx){
  var resultsRaw = localStorage.getItem('results');
  if(!resultsRaw) {
    results = {};
  } else {
    results = JSON.parse(resultsRaw);
  }

  if(!results.hasOwnProperty(parentId)) {
    results[parentId] = {};
  }

  // console.log(parentId, 'q' + questionid, inputIdx);

  results[parentId]['q' + questionid] = inputIdx;

  localStorage.setItem('results', JSON.stringify(results));
}

var saveSquareIdxToStorage = function(parentId, questionid, inputIdx, chkbxValue){
 // console.log('saveSquareIdxToStorage', parentId, questionid, inputIdx, chkbxValue);

  var resultsRaw = localStorage.getItem('results');
  if(!resultsRaw) {
    results = {};
  } else {
    results = JSON.parse(resultsRaw);
  }

  if(!results.hasOwnProperty(parentId)) {
    results[parentId] = {};
  }

  //console.log(parentId, questionid, inputIdx, chkbxValue);

  results[parentId]['q' + inputIdx] = chkbxValue;
  localStorage.setItem('results', JSON.stringify(results));
} 

var resetActiveStates = function(){
  var panels = [].slice.call(document.querySelectorAll( '#quickscan .panels'));
  var _goto = [].slice.call(document.querySelectorAll( '[data-action="goto"]'));

  removeClassByPrefix(document.body, 'panel-');

  panels.forEach(function(entry, index, object) {
    entry.classList.remove('active');
  });

  _goto.forEach(function(entry, index, object) {
    entry.classList.remove('active');
  });
}

var setActiveState = function(activeIdx){
  var panelActive = document.getElementById('panel-' + activeIdx);
  var _btnShowActive = document.querySelectorAll('[data-id="' + activeIdx+'"]');

  if(panelActive)
    panelActive.classList.add('active');

  _btnShowActive.forEach(function(entry, index, object) {
    entry.classList.add('active');
  });  
  // if(btnShowActive)
  //   btnShowActive.classList.add('active');

  if(activeIdx){
    document.body.classList.add('panel-' + activeIdx);
  } else {
    document.body.classList.add('panel-0');
    
    enablePrompt();
  }

  const quickscan = document.getElementById("quickscan");
  quickscan.scrollIntoView({behavior: "smooth", inline: "nearest"});
}

var setChbxChecked = function(entry, entryIdx){
  var parent = entry.closest('.panels'); 
  var question = entry.closest('.radio-container');

  var questionid = question.dataset.questionid;  

  var resultsRaw = localStorage.getItem('results');

  // console.log('****',parent.id, resultsRaw, entryIdx);

  if(!resultsRaw) {
    results = {};
  } else {
    results = JSON.parse(resultsRaw);
  }

  // console.log(parent.id,'q' + questionid, entryIdx);
  if(!results.hasOwnProperty(parent.id)){
    return false;
  }

  if(!results[parent.id].hasOwnProperty('q' + questionid)){
    return false;
  }

  // console.log('>>>>   inside', parent.id,entryIdx,  results[parent.id]['q' + entryIdx])
  if(results[parent.id]['q' + questionid] == entryIdx) {
    
    entry.querySelector('input').checked = true;
  } else if(results[parent.id]['q' + entryIdx] === true) {

    // console.log('   inside', entry, parent.id, entryIdx);
    entry.querySelector('input').checked = true;
  }
}

var resetMaturityContent = function(){
  var _levels = [].slice.call(document.querySelectorAll( '.maturity'));

  _levels.forEach(function(entry, index, object) {
    entry.classList.add('hidden');
  });

  var _optionallevels = [].slice.call(document.querySelectorAll( '.optional-maturities'));

  _optionallevels.forEach(function(entry, index, object) {
    entry.classList.add('hidden');
  });

};

var resetOptionalQuestions = function(){
  // var _questions = [].slice.call(document.querySelectorAll( '.optional-questions'));

  // _questions.forEach(function(entry, index, object) {
  //   entry.classList.add('hidden');
  // });

};

var resetErrorMsg = function(){
  var _msgs = [].slice.call(document.querySelectorAll( '.message.error'));

  _msgs.forEach(function(entry, index, object) {
    entry.classList.add('hidden');
  });
};

var enableRadioGroups = function() {
  
  var _radioGroups = [].slice.call(document.querySelectorAll( '[data-action="radio"]'));
  
  _radioGroups.forEach(function(entry, index, object) {

    setChbxChecked(entry, index);

    // console.log('radio index', index, 'parentid', parent.id);

    entry.addEventListener("click", function(event){
      event.preventDefault();
      // console.log('radio clicked');
      // var parentContainer = entry.closest('.radio-container-group');
      var question = entry.closest('.radio-container');
      
      // console.log('radio [click] index', index);

      //find inputs within a question
      var chkbxs = question.querySelectorAll( 'input');

      //we need to know the page we're on
      var parentPanel = entry.closest('.panels');
      

      //only do this for radio group, not multi choice
      if (!entry.classList.contains('square')) {
        // within a container only one selection allowed
        saveIdxToStorage(parentPanel.id, question.dataset.questionid, index);
        
        //reset all
        chkbxs.forEach(function(entryChkbx, index, object) {
          entryChkbx.checked = false;
        });

        //set active
        if(entry.querySelector('input')){
          entry.querySelector('input').checked = true;
        }

      } else {
        //console.log('square toggle');
        var input = entry.querySelector('input');
        if(input){
          input.checked = !input.checked;
        }

        saveSquareIdxToStorage(parentPanel.id, question.dataset.questionid, index, input.checked);

      }
      
      resetErrorMsg();
    });
  });
}

var showErrorMsgIfNoSelection = function(entry){
  var parent = entry.closest('.panels');

  if (parent) {
    var checked = parent.querySelectorAll('.radio-container input:checked');

    //total questions within page
    var questions = parent.querySelectorAll('.radio-container');

    var msg = parent.querySelector('.error');
    if(msg){
      // console.log('checked', checked, 'checked:length', checked.length);

      // total answers need to match total questions on page
      if(checked.length !== questions.length){
        msg.classList.remove('hidden');
        return false;
      }
      msg.classList.add('hidden');
    }
  }

  return true;
}

var calculateResult = function(){
  //calculate maturity
  var resultsRaw = localStorage.getItem('results');
  if(!resultsRaw) {
    results = {};
  } else {
    results = JSON.parse(resultsRaw);
  }

  resetMaturityContent();

  var total = 0;
  var weight = 0;
  var totalAnswers = 0;
  var overall = 0;
  var overallWeight = 0;

  var _chxbx = [].slice.call(document.querySelectorAll( 'input.chxbx'));

  var totalPages = Object.keys(results).length + 1;
  // console.log(_chxbx);

  Object.values(results).forEach(function(answers, indexQ, object) { 
    
    // console.log('answers', answers);
    total = 0;
    totalAnswers = Object.keys(answers).length;
    var questionIdx = 0;
    //selected answers
    Object.values(answers).forEach(function(answer, indexA) { 
      
      if(_chxbx[answer]) {
        weight = parseInt(_chxbx[answer].value, 10) + 1;
        total = total + weight;

        // console.log('question: ' + indexQ, 'answer index:' + answer, questionIdx, weight);
        //console.log('checked', _chxbx[answer].value, indexA);
        // if(weight < 4) {

          // console.log('feedback-' + indexQ + '-' + weight + '-' + questionIdx);
          var _fbs = [].slice.call(document.getElementsByClassName('feedback-' + indexQ + '-' + weight + '-' + questionIdx));
          // console.log('_fbs', _fbs);
          _fbs.forEach(function(entry, index, object) {
            entry.classList.remove('hidden');
          });

         
        // }
      }

      questionIdx += 1;

      // weight = (answer + 1)/ ( (indexA + 1) * (indexQ + 1) );
      // console.log('answer', answer, weight, indexA + 1, ( (indexA + 1) * (indexQ + 1)));

      
    });

    // console.log('optional-maturity-' + indexQ + '-' + Math.floor(total/totalAnswers));

    overall = overall + (total / totalAnswers);
    var overallFloored = Math.floor(total/totalAnswers);

    //show result maturiy level content
    var _om = [].slice.call(document.getElementsByClassName('optional-maturity-' + indexQ + '-' + overallFloored));
    // console.log('_om', _om);
    _om.forEach(function(entry, index, object) {
      entry.classList.remove('hidden');
    });
    //console.log('*** question ' + indexQ, Math.floor(total / totalAnswers));
  });

  overallWeight = Math.floor(overall / totalPages);
  // console.log(document.getElementById('maturity-' + overallWeight));
  // if (document.getElementById('maturity-' + overallWeight)) {
  //   document.getElementById('maturity-' + overallWeight).classList.remove('hidden');
  // }

  // console.log('overallWeight', overallWeight);
}

var displayOptionalContent = function(){
  //calculate maturity
  var resultsRaw = localStorage.getItem('results');
  if(!resultsRaw) {
    results = {};
  } else {
    results = JSON.parse(resultsRaw);
  }

  // resetOptionalQuestions();

  var total = 0;
  var weight = 0;
  var totalAnswers = 0;
  var overall = 0;

  var _chxbx = [].slice.call(document.querySelectorAll( 'input.chxbx'));
  // console.log(results['panel-7']);
  // var totalPages = Object.keys(results).length + 1;
  // console.log(_chxbx);

  //loop thru results to gather weights, pages 1 - 5
  Object.values(results).forEach(function(answers, indexQ, object) { 
    var answers = results['panel-7'];
    console.log('displayOptionalContent / answers', answers);
    
    // if(!totalAnswers) {
    //   return false;
    // }

    total = 0;
    totalAnswers = Object.keys(answers).length;
    Object.keys(answers).forEach(key => {
      
      var oChbx = _chxbx[key.replace('q', '')];
      // console.log(key, answers[key], oChbx);
      var chbxKey = key.replace('q', '');
      if(_chxbx[chbxKey]) {
        _chxbx[chbxKey].checked = answers[key];
      }
    });

    // console.log('optional-maturity-' + indexQ + '-' + Math.floor(total/totalAnswers));

    overall = overall + (total / totalAnswers);
    var overallWeight = Math.floor(total/totalAnswers);

    // console.log('indexQ', indexQ, 'overallWeight', overallWeight);
    if(overallWeight < 4) {
      var _oq = [].slice.call(document.getElementsByClassName('optional-questions-' + indexQ));
      // console.log('_oq', _oq);
      _oq.forEach(function(entry, index, object) {
        entry.classList.remove('hidden');
      });
    }
    // console.log('*** question ' + indexQ, Math.floor(total / totalAnswers));
  });
}

var checkIfResultPage = function(targetId) {
  
  if (targetId != 6 ) {
    return false;
  }
  
  calculateResult();

  // console.log('6 result', result);
}

var checkIfOptionalPage = function(targetId) {
  
  if (targetId != 7 ) {
    return false;
  }
  displayOptionalContent();
}

var resetMobileMenu = function(targetId) {
  
  document.getElementById('menu__toggle').checked = false;
}

var checkIfFinalResultPage = function(targetId) {
  console.log('checkIfFinalResultPage', targetId);
  if (targetId != 8 ) {
    return false;
  }

  var resultsRaw = localStorage.getItem('results');
  var results = JSON.parse(resultsRaw);

  // encodeURIComponent
  var URL = window.location.href + "?r=1&results=" + JSON.stringify(results);
  URL = URL.replace('#', '');

  console.log('URL', URL);
  fetch(URL)
    // .then(response=> response.text())
    // .then(text=> document.getElementById('displayResultDownload').innerHTML = text);
    .then(function (response) {
      // The API call was successful!
      return response.text();
    }).then(function (html) {
    
      // Convert the HTML string into a document object
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
    
      // Get the image file
      var content = doc.getElementById('quickScanWindowDownload');
      //console.log('found');
      document.getElementById('displayResultDownload').innerHTML = content.outerHTML;
    
    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
}

var goto = function(){
  var _goto = [].slice.call(document.querySelectorAll( '[data-action="goto"]'));
  
  _goto.forEach(function(entry, index, object) {
    entry.addEventListener("click", function(event){
      event.preventDefault();
      
      var isBackBtn = false;
      if(event.currentTarget && event.currentTarget.classList){
        isBackBtn = event.currentTarget.classList.contains('back');
      }
      document.body.classList.remove('show-intro');

      var targetId = entry.dataset.target;
      if (targetId > 0 ) {
        removeCircleBtnDisabled(targetId);
      } else if (targetId == -1) {
        // console.log('show intro');
        document.body.classList.add('show-intro');
        targetId = 0;
      }

      if(!isBackBtn){
        var isSelectionMade = showErrorMsgIfNoSelection(entry);
        if(!isSelectionMade){
          return false; 
        }
      }

      // console.log('click goto:' + targetId);
      
      resetMobileMenu();

      //reset active state
      resetActiveStates();

      setActiveState(targetId);

      checkIfResultPage(targetId);

      checkIfOptionalPage(targetId);

      //DISABLED IN THE TWIG VIEW
      // checkIfFinalResultPage(targetId);

    });
  });
}

var resetChxbxs= function(){
  var _radioGroups = [].slice.call(document.querySelectorAll( '[data-action="radio"]'));
  
  _radioGroups.forEach(function(entry, index, object) {
    entry.querySelector('input').checked = false;
  });
}

var enableReset = function() {
  
  var _reload = [].slice.call(document.querySelectorAll( '[data-action="reload"]'));
  _reload.forEach(function(entry, index, object) {
    entry.addEventListener("click", function(event){
      event.preventDefault();
      //console.log('click reload');
      localStorage.clear();

      resetErrorMsg();

      resetChxbxs();

      resetCircleBtns();

      //reset active state
      resetActiveStates();

      setActiveState(0);
      
    });
  });
}

var enableClose = function(){
  var _close = [].slice.call(document.querySelectorAll( '[data-action="close"]'));

  _close.forEach(function(entry, index, object) {
    entry.addEventListener("click", function(event){
      event.preventDefault();

      var quickscanWindow = document.getElementById('quickScanWindow');
      var quickscan = document.getElementById('quickscan');

      removeClassByPrefix(document.body, 'panel-');

      quickscanWindow.classList.add('hidden');
      quickscan.classList.add('hidden');

      document.body.classList.remove('quickscanActive');

    });
  });
}

var enablePrompt = function(){
  var resultsRaw = localStorage.getItem('results');
  if(resultsRaw) {
    // console.log('found');
    document.querySelector('.quickscan-tool-questionaire-body').classList.add('hidden');
    document.getElementById('prompt').classList.remove('hidden');
  } else {
    document.querySelector('.quickscan-tool-questionaire-body').classList.remove('hidden');
    document.getElementById('prompt').classList.add('hidden');
  }
}

var run = function(){
  if(document.getElementById('quickScanWindowDownload')) {
    return false;
  }

  if(!document.getElementById('quickScanWindow')) {
    return false;
  }
  
  var _starts = [].slice.call(document.querySelectorAll( '[data-action="start"]'));

  _starts.forEach(function(entry, index, object) {
    entry.addEventListener("click", function(event){
      event.preventDefault();
      //console.log('click');
      var quickscanWindow = document.getElementById('quickScanWindow');
      var quickscan = document.getElementById('quickscan');

      document.body.appendChild(quickscanWindow);

      quickscanWindow.classList.remove('hidden');
      quickscan.classList.remove('hidden');

      document.body.classList.add('quickscanActive', 'panel-0');
    });
  });


  enableRadioGroups();
  enableReset();
  enableDownload();

  goto();

  enablePrompt();
  enableClose();
};

document.addEventListener('DOMContentLoaded', function(event){
  run();
  // document.querySelector('.elementor-shortcode button').click();
});