var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

var remove_activated_items = function(extra){
  
  var _active = [].slice.call(document.querySelectorAll('.bgc.set_hover'));
  _active.forEach(function(entry, index, object) {
    entry.classList.remove('set_hover');
  });

  _active = [].slice.call(document.querySelectorAll('.active_slice'));
  _active.forEach(function(entry, index, object) {
    entry.classList.remove('active_slice');
  });

  _active = [].slice.call(document.querySelectorAll('.activated'));
  _active.forEach(function(entry, index, object) {
    entry.classList.remove('activated');
  });

  _active = [].slice.call(document.querySelectorAll('.active'));
  _active.forEach(function(entry, index, object) {
    entry.classList.remove('set_hover', 'active');
  });

  _active = [].slice.call(document.querySelectorAll('.set_active_by_icon'));
  _active.forEach(function(entry, index, object) {
    entry.classList.remove('set_active_by_icon');
  });
  
  if(extra == 'remove_fixed'){
    _active = [].slice.call(document.querySelectorAll('.fixed_set_active_by_icon'));
    _active.forEach(function(entry, index, object) {
      entry.classList.remove('fixed_set_active_by_icon');
    }); 

    _active = [].slice.call(document.querySelectorAll('.fixed_activated'));
    _active.forEach(function(entry, index, object) {
      entry.classList.remove('fixed_activated');
    }); 
  }
};

var update_hover_boxes = function(entry){

  var dTxt = entry.getBoundingClientRect();

  var rect = document.getElementById('r' + entry.id);
  if(rect){

    // console.log(Math.round(dTxt.width), Math.round(dTxt.height));
    rect.style.width = Math.round(dTxt.width) + 9;
    rect.style.height = Math.round(dTxt.height) + 2;
  } 
};

document.addEventListener('DOMContentLoaded', function(event){

  // document.getElementById('wheel-container').addEventListener('mouseout', function(event){
  //   event.preventDefault();
  //   remove_activated_items();
  // });

  var _show = [].slice.call(document.querySelectorAll('[data-action="show"]'));
  _show.forEach(function(entry, index, object) {
    entry.addEventListener('click', function(event){
      event.preventDefault();
      document.getElementById('intro').classList.toggle("show");
    });
  });
  
  var _mobile_icons = [].slice.call(document.querySelectorAll('[data-action="mobile-icon"]'));
  _mobile_icons.forEach(function(entry, index, object) {
    entry.addEventListener('click', function(event){
      event.preventDefault();
      event.stopPropagation();
      
      var e = event.currentTarget,
          category_id =  e.dataset.category,
          slice_id =  e.dataset.slice;

      remove_activated_items();

      e.classList.toggle('activated');
      
      if(e.classList.contains('activated')){
        var _terms = [].slice.call(document.querySelectorAll('.t-slice' + slice_id + '.t-' + category_id ) );
        _terms.forEach(function(entry, index, object) {
          // console.log('.t-slice' + slice_id + '.t-' + category_id );
          entry.classList.add('set_active_by_icon');
        });
      }
    });    
  });

  var mo = [].slice.call(document.querySelectorAll('.mobile-mouseover'));
  mo.forEach(function(entry, index, object) {

    entry.addEventListener('click', function(event){
      event.preventDefault();

      var e = event.currentTarget;
      var id = e.id;
      
      remove_activated_items();

      //add source to popup
      if(sources[id].length){
        var content = '';

        sources[id].forEach(function(entry, index, object) {
          var status_class = '';
          if(entry.status){
            status_class = 'locked';
          }

          content += '<div class="row-source">' +
                      '<div class="relative"><div class="status ' + status_class + ' "></div> ' +
                      '<div class="descr">' + entry.content_short + '</div></div>' +
                      '<div class="term">' + entry.title + '</div>' +
                      '<div class="category_list">' + entry.categories_list + '</div>' +
                      '<a class="link" target="_blank" href="' + entry.source + '"><span class="label-nl">Bron</span><span class="label-en">Source</span></a>' +
                    '</div>';
        });

        if(content){
          document.getElementById('wheel-overlay-content').innerHTML = content;
        }
      }

      e.classList.add('active');
      document.getElementById('r' + id).classList.add('active');
      document.body.classList.add('show_popup', 'right');
    });

  });

  var _icons = [].slice.call(document.querySelectorAll('.icon-mouseover'));
  _icons.forEach(function(entry, index, object) {

    entry.addEventListener('mouseover', function(event){
      event.preventDefault();
      event.stopPropagation();
      var e = event.currentTarget,
          category_node = e.parentNode,
          category_id =  category_node.id,
          slice_id =  category_node.parentNode.id;

      remove_activated_items();

      console.log(slice_id);

      category_node.classList.add('activated');
      var regex = /slice/i;
      document.getElementById(slice_id.replace(regex, 'slice-')).classList.add('active_slice');

      var _terms = [].slice.call(document.querySelectorAll('.t-' + slice_id + '.t-' + category_id ) );
      _terms.forEach(function(entry, index, object) {
        // const mouseoverEvent = new Event('mouseover');
        // entry.dispatchEvent(mouseoverEvent);
        entry.classList.add('set_active_by_icon');
      });
    });

    entry.addEventListener('click', function(event){
      event.preventDefault();
      event.stopPropagation();

      var e = event.currentTarget,
          category_node = e.parentNode,
          category_id =  category_node.id,
          slice_id =  category_node.parentNode.id;

      remove_activated_items('remove_fixed');

      category_node.classList.add('fixed_activated');
      var regex = /slice/i;
      document.getElementById(slice_id.replace(regex, 'slice-')).classList.add('fixed_active_slice');

      var _terms = [].slice.call(document.querySelectorAll('.t-' + slice_id + '.t-' + category_id ) );
      _terms.forEach(function(entry, index, object) {
        // const mouseoverEvent = new Event('mouseover');
        // entry.dispatchEvent(mouseoverEvent);
        entry.classList.add('fixed_set_active_by_icon');
      });
    });    
  });

  var clsBtns = [].slice.call(document.querySelectorAll('[data-action="wheel-overlay-close"]'));
  clsBtns.forEach(function(entry, index, object) {
    entry.addEventListener('click', function(event){
      event.preventDefault();

      document.body.classList.remove('show_popup');

      remove_activated_items('remove_fixed');

    });
  });

  var mo = [].slice.call(document.querySelectorAll('.mouseover'));
  mo.forEach(function(entry, index, object) {

    entry.addEventListener('mouseout', function(event){
      event.preventDefault();

      var _bgc = [].slice.call(document.querySelectorAll('.set_hover' ) );
      _bgc.forEach(function(entry, index, object) {
        entry.classList.remove('set_hover');
      });
      // remove_activated_items();
    });

    entry.addEventListener('mouseover', function(event){
      event.preventDefault();

      var e = event.currentTarget;
      var id = e.id;

      remove_activated_items();
      
      document.getElementById('r' + id).classList.add('set_hover');

      //set slice active
      var active_slice_id = terms_by_slices[id];
      document.getElementById('slice' + active_slice_id).classList.add('active_slice');

      //bg slice color
      document.getElementById('slice-' + active_slice_id).classList.add('active_slice');
      
      // console.log('slice' + active_slice_id);

      //set category active
      var active_categorory_ids = categories[id];
      // console.log('active_categorory_ids', active_categorory_ids);
      active_categorory_ids.forEach(function(entry, index, object){
        var targetIcon = document.querySelector('.active_slice #' + entry);
        
        if (!targetIcon) {
          targetIcon = document.querySelector('.active_slice #' + entry.toLowerCase());
        }
        // console.log('.active_slice #' + entry, targetIcon);
        if (targetIcon) {
          targetIcon.classList.add('activated');
        }
      });
    });

    entry.addEventListener('click', function(event){
      event.preventDefault();

      var e = event.currentTarget;
      var id = e.id;
      
      remove_activated_items('remove_fixed');

      //add source to popup
      if(sources[id].length){
        var content = '';

        sources[id].forEach(function(entry, index, object) {
          var status_class = '';
          if(entry.status){
            status_class = 'locked';
          }
          content += '<div class="row-source">' +
                      '<div class="relative"><div class="status ' + status_class + ' "></div> ' +
                      '<div class="descr">' + entry.content_short + '</div></div>' +
                      '<div class="term">' + entry.title + '</div>' +
                      '<div class="category_list">' + entry.categories_list + '</div>' +
                      '<a class="link" target="_blank" href="' + entry.source + '"><span class="label-nl">Bron</span><span class="label-en">Source</span></a>' +
                    '</div>';
        });

        if(content){
          document.getElementById('wheel-overlay-content').innerHTML = content;
        }
      }

      e.classList.add('active');
      document.getElementById('r' + id).classList.add('active');
      document.body.classList.add('show_popup', 'right');
    });

    update_hover_boxes(entry);

  });
  
});