jQuery(function() {
		jQuery('body').on('manual.ajaxload', function() {
			Prism.highlightAll();
			handleDocumentationLinks();
		});
					
    //THIS SCRIPT BREAKS NORMAL HASHBANG URLS
    //NEEDED FOR THE DCP plugins
    if(!document.body.classList.contains('postid-27989') && !document.body.classList.contains('postid-30309')){
      var currentID = 0;
      jQuery(".post-link").on("click",function() {
        var current_href = jQuery(this).attr("href");
        currentID = jQuery(this).attr("rel");
        
        History.pushState({id:jQuery(this).attr("rel")},jQuery(this).text(), current_href);

      });
      
      History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
        
        if(State.data.id == currentID) return;
        
        jQuery('.post-link[rel="' + State.data.id + '"]').trigger('click');
      });
    }
		/** Handle internal links **/
		if(jQuery(".doc-single-post").length > 0 && typeof window.location.origin != 'undefined') {
			var pathname = window.location.pathname;
			if(pathname.substr(0, 1) == '/') {
				pathname = pathname.substr(1);
			}
			var currentPath = pathname.split('/');		
		
			function handleDocumentationLinks() {
				//var currentPage = window.location
				jQuery('.doc-single-post a[href^="' + window.location.origin + '/' + currentPath[0] + '/' + currentPath[1] + '/"]').on('click', function(e) {
					var url = jQuery(this).attr('href');
					
					var ele = jQuery('ul#list-manual a.post-link[href="' + url +'"]');

					if(ele.length > 0) {
						e.preventDefault();
						e.stopPropagation();
						
						jQuery(ele).parentsUntil('#list-manual', 'ul').slideDown(300).each(function(index, ele) {
							jQuery(ele).prev('a').addClass('dataicon');
						});
						ele.trigger('click');
					}
				});
					
			}
			
			handleDocumentationLinks();
		}
		/** Handle Internal Links END **/
});
