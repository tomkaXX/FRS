/**************************************
**** TRIGGET JS AFTER AJAX LOAD DOC ****
**************************************/
jQuery( document ).on("manual_jsCodeOnAjaxCallPost", function(event, data) {  
  
	/******
	// UNIQUE POST ID
	********/
	postID = data.post_id; 
	
	
	"use strict";
   
   // Any code you wish to run on AJAX page change
   
   
	/******
	// POST LIKE
	********/
	jQuery(".post-like a").on("click",function() {
		var heart = jQuery(this);
		// Retrieve post ID from data attribute
		var post_id = postID;
		// Ajax call
		jQuery.ajax({
			type: "post",
			url: doc_ajax_var.url,
			data: { action: 'post-like', 
					nonce: doc_ajax_var.nonce,
					post_id: post_id,
					post_like: '',
				  },
			success: function(data, textStatus, XMLHttpRequest){
					jQuery( "span.manual_doc_count" ).text(data); 
			},
			error: function(MLHttpRequest, textStatus, errorThrown){ }
		});
		return false;
	})
	
	
	/******
	// POST UNLIKE
	********/
	jQuery(".post-unlike a").on("click",function() { 
		var heart = jQuery(this);
		// Retrieve post ID from data attribute
		var post_id = postID;
		
		// display commnet box after click thumbs down :: for kb
		if( data.onclickdisplay_feedback == 1 ) {
			jQuery('html,body').animate({ scrollTop: jQuery('.kb-respond-no-message').offset().top }, 2000);
			jQuery('.kb-feedback-showhide').show();
		}
		
		// Ajax call
		jQuery.ajax({
			type: "post",
			url: doc_ajax_var.url,
			data: { action: 'post-unlike', 
					nonce: doc_ajax_var.nonce,
					post_id: post_id,
					post_like: '',
				  },
			success: function(data, textStatus, XMLHttpRequest){ 
					jQuery( "span.manual_doc_unlike_count" ).text(data);
			},
			error: function(MLHttpRequest, textStatus, errorThrown){ }
		});
		return false;
	})
	
	
	/******
	// POST RESET STATUS
	********/
	jQuery(".post-reset a").on("click",function() { 
		var action = confirm("Are you sure you want to start reset (like/unlike/total post visitors) process. Once reset it cant be undone");
		if (action == true) {
				var heart = jQuery(this);
				// Retrieve post ID from data attribute
				var post_id = postID;
				// Ajax call
				jQuery.ajax({
					type: "post",
					url: doc_ajax_var.url,
					data: { action: 'post-reset-stats', 
							nonce: doc_ajax_var.nonce,
							post_id: post_id,
							post_reset: '',
						  },
					success: function(data, textStatus, XMLHttpRequest){ 
							jQuery( "span.manual_doc_count" ).text(''); 
							jQuery( "span.manual_doc_unlike_count" ).text('');
					},
					error: function(MLHttpRequest, textStatus, errorThrown){ }
				});
				return false;
		}
	})	
	
	
	/******
	// POST IMPRESSION
	********/
	var imp_postIDs = '';
	var ids = 0;
	jQuery('.manual-views').each(function(){
		imp_postIDs = postID;
		ids++;
	});
	if(imp_postIDs != '' ) { 
		jQuery.ajax({
				type: "post",
				url: doc_ajax_var.url,
				data: { action: 'manual-doc-impression', 
						nonce: doc_ajax_var.nonce,
						post_id: imp_postIDs,
					  },
				success: function(data, textStatus, XMLHttpRequest){ },
				error: function(MLHttpRequest, textStatus, errorThrown){ }
		});
	}
	
	/******
	// TOC
	********/
	jQuery(document).ready(function() { 
		"use strict";
		jQuery( "#toctoc" ).empty();
		jQuery.toctoc({
		  headLinkText: [toc_show_text,toc_hide_text],
		  minimized: false,
		  headText:toc_title,
		  target:'content'
		});
	});
	
	
	/******
	// print-o-matic
	********/
	jQuery('.printomatic, .printomatictext').on('click', function() {
		var id = jQuery(this).attr('id');
		var target = jQuery(this).data('print_target');
		if(!target){
			target = jQuery('#target-' + id).val();
		}
		if (target == '%prev%') {
			target = jQuery(this).prev();
		}
		if (target == '%next%') {
			target = jQuery(this).next();
		}
	
		var w = window.open('', 'printomatic print page', 'status=no, toolbar=no, menubar=no, location=no');
	
		var print_html = '<!DOCTYPE html><html><head><title>' + document.getElementsByTagName('title')[0].innerHTML + '</title>';
		if ( typeof print_data != 'undefined' && typeof print_data[id] != 'undefined'){
	
			if ( 'pom_site_css' in print_data[id] && print_data[id]['pom_site_css'] ){
				print_html += '<link rel="stylesheet" type="text/css" href="' + print_data[id]['pom_site_css'] + '" />';
			}
	
			if ( 'pom_custom_css' in print_data[id] && print_data[id]['pom_custom_css']){
				print_html += '<style>'+ print_data[id]['pom_custom_css'] +'</style>';
			}
	
			//build the blank page
			w.document.open();
			w.document.write( print_html + '</head><body></body></html>');
			w.document.close();
	
			if ( 'pom_do_not_print' in print_data[id] && print_data[id]['pom_do_not_print'] ){
				jQuery(print_data[id]['pom_do_not_print']).hide();
			}
	
			if ( 'pom_html_top' in print_data[id] && print_data[id]['pom_html_top']){
				jQuery(w.document.body).html( print_data[id]['pom_html_top'] );
			}
	
		}
	
		var ua = window.navigator.userAgent;
		var ie = true;
	
		//rot in hell IE
		if ( ua.indexOf("MSIE ") != -1) {
			jQuery(w.document.body).append( jQuery( target ).clone( true ).html() );
		}
		else if ( ua.indexOf("Trident/") != -1) {
			jQuery(w.document.body).append( jQuery( target ).clone( true ).html() );
		}
		else if ( ua.indexOf("Edge/") != -1 ){
			//there is a bug in Edge where no nested elements can be appended.
			jQuery( target ).each(function(){
				var s = jQuery.trim( jQuery( this ).clone( true ).html() );
				jQuery( w.document.body ).append( s );
			});
		}
		else{
			jQuery(w.document.body).append( jQuery( target ).clone( true ) );
			ie = false;
		}
	
		if ( typeof print_data != 'undefined' && typeof print_data[id] != 'undefined'){
			if ( 'pom_do_not_print' in print_data[id] ){
				jQuery( print_data[id]['pom_do_not_print']).show();
			}
	
			if ( 'pom_html_bottom' in print_data[id] && print_data[id]['pom_html_bottom']){
				jQuery(w.document.body).append( jQuery.trim( print_data[id]['pom_html_bottom'] ) );
			}
		}
	
		//for IE cycle through and fill in any text input values... rot in hell IE
		if(ie){
			jQuery( target ).find('input[type=text]').each(function() {
				var user_val = jQuery(this).val();
				if(user_val){
					var elem_id = jQuery(this).attr('id');
					if(elem_id){
						w.document.getElementById(elem_id).value = user_val;
					}
					else{
						//we really should have a ID, let's try and grab the element by name attr.
						var elem_name = jQuery(this).attr('name');
						if(elem_name.length){
							named_elements = w.document.getElementsByName(elem_name);
							named_elements[0].value = user_val;
						}
					}
				}
			});
		}
	
		/* hardcodeed iframe and if so, force a pause... pro version offers more options */
	
		iframe = jQuery(w.document).find('iframe');
		if (iframe.length && typeof print_data != 'undefined' && typeof print_data[id] != 'undefined') {
			if('pom_pause_time' in print_data[id] && print_data[id]['pom_pause_time'] < 3000){
				print_data[id]['pom_pause_time'] = 3000;
			}
			else if(print_data[id]['pom_pause_time'] === 'undefined'){
				print_data[id]['pom_pause_time'] = 3000;
			}
		}
	
		if(typeof print_data != 'undefined' && typeof print_data[id] != 'undefined' && 'pom_pause_time' in print_data[id] && print_data[id]['pom_pause_time'] > 0){
			pause_time = setTimeout(printIt, print_data[id]['pom_pause_time']);
		}
		else{
			printIt();
		}
	
		function printIt(){
			w.focus();
			w.print();
	
			if('pom_close_after_print' in print_data[id] && print_data[id]['pom_close_after_print'] == '1'){
				//need a bit of a pause to let safari on iOS render the print privew properly
				setTimeout(
					function() {
						w.close()
					}, 1000
				);
			}
		}
	
	});

	(function (original) {
	  jQuery.fn.clone = function () {
		var result           = original.apply(this, arguments),
			my_textareas     = this.find('textarea').add(this.filter('textarea')),
			result_textareas = result.find('textarea').add(result.filter('textarea')),
			my_selects       = this.find('select').add(this.filter('select')),
			result_selects   = result.find('select').add(result.filter('select'));
	
		for (var i = 0, l = my_textareas.length; i < l; ++i) jQuery(result_textareas[i]).val(jQuery(my_textareas[i]).val());
		for (var i = 0, l = my_selects.length;   i < l; ++i) {
		  for (var j = 0, m = my_selects[i].options.length; j < m; ++j) {
			if (my_selects[i].options[j].selected === true) {
			  result_selects[i].options[j].selected = true;
			}
		  }
		}
		return result;
	  };
	}) (jQuery.fn.clone);
   
	var print_data = {"idpostID":{"pom_site_css":"","pom_custom_css":"","pom_html_top":"","pom_html_bottom":"","pom_do_not_print":"","pom_pause_time":"","pom_close_after_print":"1"}};
		
});