(function($) {
  $.toctoc = function(options) {
	
    var settings = $.extend({
      headText: 'Table of contents',
      headLinkText: ['show', 'hide'],
      minimized: true,
      target: 'body'
    }, options);
    
    const container = $('#toctoc');
    const head = $("<div id='toctoc-head'></div>");
    const body = $("<div id='toctoc-body'></div>");

    createToc();
    toggleLink();
	
	$(window).scroll(function(event) {
        onScroll();
    });

    $('#toctoc #toggle').on('click', () => {
      toggleLink();
    });

    function createToc() {
	  var chkToc = 1;	
      head.append("<p><span>" + settings.headText + "</span> [<a id='toggle' class='sh_toc'></a>]</p>");
      let titles = settings.target + " h2, " + settings.target + " h3, " + settings.target + " h4 ";
      $(titles).each(function(i) {
        let tag = $(this).prop('tagName').toLowerCase();
        let content = $(this).html();
        let anchor = content.replace(/[^a-z0-9\s]/gi, '').replace(/^\s+|\s+$|\s+(?=\s)/g, "").replace(/\s+/g, '-').toLowerCase(); 
        $(this).attr('id', anchor);
        body.append("<a href='#"+$('<div>' + content + '</div>').text().replace(/[^a-z0-9\s]/gi, '').replace(/^\s+|\s+$|\s+(?=\s)/g, "").replace(/\s+/g, '-').toLowerCase()+"'><p class='link link-"+tag+"'><i class='fas fa-angle-right'></i><span>"+$('<div>' + content + '</div>').text()+"</span></p></a>");
		chkToc = 2;
      });
	  if( chkToc == 2 ) {
		  container.append(head);
		  container.append(body);
	  }
    }
    
    function toggleLink() {
      if (settings.minimized) {
        settings.minimized = false;
        $('#toctoc-head a').text(settings.headLinkText[0]);
        body.addClass('hidden');
      } else {
        settings.minimized = true;
        $('#toctoc-head a').text(settings.headLinkText[1]);
        body.removeClass('hidden');
      }
    }
	
	function onScroll() { 
	}
	
  };
})(jQuery);

jQuery(document).ready(function() { 
	"use strict";						
	jQuery.toctoc({
	  headLinkText: [toc_show_text,toc_hide_text],
	  minimized: false,
	  headText:toc_title,
	  target:'content'
	});
});