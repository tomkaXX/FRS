jQuery(document).ready(function() { 
	
	"use strict";
  
	/*******************************
	OPEN COMMENT BOX ONCE ON CLICK
	********************************/
    jQuery("#feedback-form").on("click",function() { 
       jQuery("#comment-form").slideDown( "slow" );
       jQuery("#feedback-form").hide();
       	return false;
    });
	
	/******
	MOBILE NAV
	********/
	jQuery('.navbar-header i.navbar-toggle').on("click",function(e) { 
	   jQuery('.mobile-menu-holder').slideToggle('slow', function() {
		   jQuery('.mobile-menu-holder').toggleClass('open-mobile-menu', jQuery(this).is(':visible'));
	   });
        e.preventDefault(); 
    });
	
	/******
	MOBILE MENU
	********/
	jQuery('.mobile-menu-holder ul > li.menu-item-has-children').on('click', function(e) {
		e.stopPropagation();
		if( jQuery(this).children('i.mobile_menu_arrow').first().hasClass( "fa fa-caret-down" ) ) {
			jQuery(this).children('i.mobile_menu_arrow').first().removeClass('fa fa-caret-down');
			jQuery(this).children('i.mobile_menu_arrow').first().addClass('fa fa-caret-up');
		} else {
			jQuery(this).children('i.mobile_menu_arrow').first().removeClass('fa fa-caret-up');
			jQuery(this).children('i.mobile_menu_arrow').first().addClass('fa fa-caret-down');
		}
		
		if( jQuery(this).children('a').children('i').first().hasClass( 'fa fa-angle-up' ) ) {
			jQuery(this).children('a').children('i').first().removeClass('fa fa-angle-up');
			jQuery(this).children('a').children('i').first().addClass('fa fa-angle-right');
		} else {
			jQuery(this).children('a').children('i').first().removeClass('fa fa-angle-right');
			jQuery(this).children('a').children('i').first().addClass('fa fa-angle-up');
		}
		jQuery(this).find('ul').first().slideToggle();
	});
	
	/******
	ICON SEARCH
	********/
	jQuery('#page-open-popup-search').on('click', function(e) {
		jQuery(".icon-page-popup.page-search-popup").addClass('open');
		jQuery("#jquery-live-search").css("z-index", "999999");
		return false;
	});
	jQuery('#manual-icon-search-popup-close').on('click', function(e) {
		jQuery(".icon-page-popup.page-search-popup").removeClass('open');
		jQuery("#jquery-live-search").css("z-index", "99");
		return true;
	});
	
	/******
	TREE VIEW KB
	********/
	jQuery(".kb_tree_viewmenu").each(function(e){
		if( jQuery( ".kb_tree_viewmenu li.root_cat a" ).hasClass( "open-ul-first" ) ){  
			var current_post_ID = jQuery( ".kb_tree_viewmenu li.root_cat a.open-ul-first" ).attr("rel");
			jQuery(".kb_tree_viewmenu li.root_cat a.open-ul-first").addClass('dataicon child-a-icon-'+current_post_ID);
			jQuery('.kb_tree_viewmenu').find("ul.kb-tree-records-"+current_post_ID).addClass('child-open-'+current_post_ID).slideDown(300);
			jQuery('.kb_tree_viewmenu').find("ul.kb-tree-chidcat-"+current_post_ID).addClass('child-open-'+current_post_ID).slideDown(300);
		}
	});
	
	jQuery('.kb_tree_viewmenu a.kb-tree-recdisplay').on('click', function(e){ 
		var current_post_ID = jQuery(this).attr("rel");
		if( current_post_ID != '' ) {
			var current_ul_status = jQuery(this).parents(".kb_tree_viewmenu").find("ul.kb-tree-records-"+current_post_ID).is(':hidden');
			if ( 0 < jQuery(this).next("ul").size() ) {  
			  e.preventDefault();
			}
			if( current_ul_status == true ) { 
				jQuery(this).parents(".kb_tree_viewmenu").find("li.root_cat > ul.kbroot_cat_records").slideUp(300); 
				jQuery(this).parents(".kb_tree_viewmenu").find("li.root_cat ul.tree_child_records ").slideUp(300); 
				jQuery(this).parents(".kb_tree_viewmenu").find("a.kb-tree-recdisplay").removeClass('dataicon'); 
				jQuery(this).parents(".kb_tree_viewmenu").find("ul.kb-tree-records-"+current_post_ID).slideDown(300);
				jQuery(this).parents(".kb_tree_viewmenu").find("ul.kb-tree-chidcat-"+current_post_ID).slideDown(300); 
				jQuery(this).addClass('dataicon child-a-icon-'+current_post_ID);
				jQuery(this).parents(".kb_tree_viewmenu").find("ul.kb-tree-records-"+current_post_ID).addClass('child-open-'+current_post_ID);
			} else if( jQuery(this).parents(".kb_tree_viewmenu").find('ul').hasClass('child-open-'+current_post_ID) ) {
				jQuery(this).parents(".kb_tree_viewmenu").find("ul.child-open-"+current_post_ID).not(":hidden").slideUp(300);
				jQuery(this).parents(".kb_tree_viewmenu").find('ul').removeClass('child-open-'+current_post_ID);
				jQuery(this).parents(".kb_tree_viewmenu").find("a.child-a-icon-"+current_post_ID).removeClass('dataicon');
				jQuery(this).parents(".kb_tree_viewmenu").find("a.child-a-icon-"+current_post_ID).removeClass('child-a-icon-'+current_post_ID);
				jQuery(this).parents(".kb_tree_viewmenu").find("ul.kb-tree-chidcat-"+current_post_ID).slideUp(300); 
			}
		}
    });
	
	/*************
	HAMBURGER MENU
	**************/
	jQuery('.hamburger-menu').on('click', function(e) {  
		 if (jQuery(".hamburger-menu").hasClass("menu-open")) {
			  jQuery('.hamburger-menu').removeClass( "menu-open" ); 
			  jQuery('ul.nav.navbar-nav').hide(); 
			  jQuery('.form-group.menu-bar-form').show(); 
			  jQuery(window).trigger("resize");
		 } else {
			 jQuery('.hamburger-menu').addClass( "menu-open" );  
			 jQuery('ul.nav.navbar-nav').show(); 
			 jQuery('.form-group.menu-bar-form').hide(); 
			 jQuery(window).trigger("resize");
		 }
	});

	/********************
	FAQ COLLAPSIBLE PANEL 
	********************/
	if ( faq_search_id != '' ){ 
		 jQuery('.collapsible-panels div').hide(); 
		 jQuery('#'+faq_search_id ).addClass( "active" ); 
		 jQuery(".display-faq-section .entry-content-"+faq_search_id+"").slideDown(300).show(); 
	} else {  
		jQuery('.collapsible-panels div').hide(); 
	}
	jQuery('.collapsible-panels.theme-faq-cat-pg').on("click",function(e) { 
		var current_post_ID = jQuery(this).attr("id");															   
		if( jQuery(".display-faq-section div.faq-catpg-"+current_post_ID+", .knowledgebase-cat-body div.faq-catpg-"+current_post_ID+"").hasClass('active') ) {
			jQuery(".display-faq-section div.theme-faq-cat-pg, .knowledgebase-cat-body div.theme-faq-cat-pg").removeClass('active');
			jQuery(".entry-content-"+current_post_ID+"").slideUp(300).show(); 
		} else {
			jQuery(".display-faq-section .entry-content-faq-all").slideUp(300);
			jQuery(".display-faq-section div.theme-faq-cat-pg, .knowledgebase-cat-body div.theme-faq-cat-pg").removeClass('active');
			jQuery(".display-faq-section .entry-content-"+current_post_ID+"").slideDown(300).show(); 
			jQuery(".display-faq-section div.faq-catpg-"+current_post_ID+", .knowledgebase-cat-body div.faq-catpg-"+current_post_ID+"").addClass('active');
		}
		e.preventDefault();
    });
	jQuery('#faq-expandall').on("click",function() { 
		 jQuery(".display-faq-section .entry-content-faq-all").slideToggle(300).show(); 	
		 jQuery(".display-faq-section .theme-faq-cat-pg").toggleClass('active');
	});
	
	/***************
	TRENDING SEARCH 
	****************/
	jQuery('.trending-search a.trending-search-popular-keyword').on('click', function(e){  
		var current_text = jQuery(this).text();
		jQuery('#s').val(current_text).focus();
		return false;
	});
	jQuery( ".form-group input.header-search" ).mousedown(function() { 
		jQuery('.form-group input.header-search').attr('placeholder',manual_searchmsg);
	});
	jQuery( ".form-group input.header-search"  ).focusout(function() { 
	  var old_place_holder = jQuery( "#oldplacvalue" ).val();
	  jQuery('.form-group input.header-search').attr('placeholder', old_place_holder);
	});
	
	/*************************
	ON SCROLL STICKY MENU BAR 
	**************************/
	if( sticky_menu == 2 ) {
		jQuery(window).on("scroll",function() {
			var $mainClass = jQuery(".navbar"), $body = jQuery("body");	
			var $original_html_height = jQuery( document ).height();
			if ((jQuery("html nav").hasClass("navbar"))){
				if ((jQuery(window).scrollTop() > 25)&& (jQuery(window).width()>=1100) ) {  
					// Active
					if($mainClass.hasClass("after-scroll-wrap"))
					return false;
					
					$body.addClass("search-active-sticky").css("padding-top", 1);
					$mainClass.addClass("after-scroll-wrap");
					jQuery(window).trigger("resize").trigger("scroll");
				} else {
					if($body.hasClass("search-active-sticky")) {
						$body.removeClass("search-active-sticky").css("padding-top", 0);
						$mainClass.removeClass("after-scroll-wrap");
						jQuery(window).trigger("resize").trigger("scroll");
					}
				}
			}
		});	
	}
	
	/**********
	VIDEO PLAY
	**********/
	jQuery('.manual_vc_video_image_effect_tag_a').magnificPopup({
	  disableOn: 700,
	  type: 'iframe',
	  mainClass: 'mfp-fade',
	  removalDelay: 160,
	  preloader: false,
	  fixedContentPos: false
	});
	
	/**************
	WOO PLUS/MINUS 
	***************/
	jQuery('.quantity.woo-add-plus-minus').on('click', '.plus', function(e) {
		var input = jQuery(this).prev('input.qty');
		var val = parseInt(input.val());
		input.val( val+1 ).change();
	});
	jQuery('.quantity.woo-add-plus-minus').on('click', '.minus', 
		function(e) {
		var input = jQuery(this).next('input.qty');
		var val = parseInt(input.val());
		if (val > 0) {
			input.val( val-1 ).change();
		} 
	});
	
	/************************
	GLOBAL :: SCROLL PAGE UP 
	*************************/
	if ( (jQuery(window).width()>=767) ) {
		jQuery("#scrollbkToTop").hide();
		jQuery( "body" ).append( "<p id=\"scrollbkToTop\" style=\"display: none;\"><a href=\"#top\"><span> <i class=\'"+go_up_icon+" footer-go-uplink\'></i></span></a></p>" );
		jQuery(function () {
			jQuery(window).on("scroll",function() {
				if (jQuery(this).scrollTop() > 150) {
					jQuery('#scrollbkToTop').fadeIn();
				} else {
					jQuery('#scrollbkToTop').fadeOut();
				}
			});
			jQuery('#scrollbkToTop a').on("click",function() { 
				jQuery('body,html').animate({
					scrollTop: 0
				}, 800);
				return false;
			});
		});
	}

	/**************************
	DOCUMENTATION :: SHOW/HIDE
	***************************/
	jQuery('#list-manual > li > a.has-child i, #list-manual li a.has-inner-child i').on('click', function(e){
		e.preventDefault();
	});	
	jQuery('#list-manual > li > a.has-child').on('click', function(e){
		var current_post_ID = jQuery(this).attr("rel");
		if( doc_disable_ajaxload == 1 ) {
			if ( 0 < jQuery(this).next("ul").size() ) {
			  e.preventDefault();
			}
		}
		if ( 0 == jQuery(this).next("ul").size() || 0 == jQuery(this).next("ul:hidden").size() ) {
		  return;
		}
		jQuery(this).parents("#list-manual").find("li > a").removeClass('dataicon');
		jQuery(this).parents("#list-manual").find("ul").not(":hidden").slideUp(300);
		jQuery(this).addClass('dataicon').next("ul").slideDown(300);
	});
	jQuery('#list-manual li a.has-inner-child').on('click', function(e){ 
		var current_post_ID = jQuery(this).attr("rel");
		var current_ul_status = jQuery(this).parents("#list-manual").find("ul.child-open-"+current_post_ID).is(':hidden');
		if( doc_disable_ajaxload == 1 ) {
			if ( 0 < jQuery(this).next("ul").size() ) {  
			  e.preventDefault();
			}
		}
		if( current_ul_status == true ) { 
				jQuery(this).next("ul").slideDown(300);
		} else if( jQuery(this).parents("#list-manual").find('ul').hasClass('child-open-'+current_post_ID) ) {
			jQuery(this).parents("#list-manual").find("ul.child-open-"+current_post_ID).not(":hidden").slideUp(300);
			jQuery(this).parents("#list-manual").find('ul').removeClass('child-open-'+current_post_ID);
			jQuery(this).parents("#list-manual").find("li > a.child-a-icon-"+current_post_ID+" > i").removeClass('fa-minus-circle');  
			jQuery(this).parents("#list-manual").find("li > a.child-a-icon-"+current_post_ID+" > i").addClass('fa-plus-circle');  
			jQuery(this).parents("#list-manual").find("li > a.child-a-icon-"+current_post_ID).removeClass('dataicon');
			jQuery(this).parents("#list-manual").find("li > a.child-a-icon-"+current_post_ID).removeClass('child-a-icon-'+current_post_ID);
		} else {
			jQuery(this).addClass('dataicon child-a-icon-'+current_post_ID).next("ul").addClass('child-open-'+current_post_ID).slideDown(300);
			jQuery(this).find("a.has-inner-child > i").removeClass('fa-plus-circle'); 
			jQuery(this).find("a.has-inner-child > i").addClass('fa-minus-circle'); 
		}
	});
	jQuery('#list-manual > li > a.no-child').on('click', function(e){
		jQuery(this).parents("#list-manual").find("li > a").removeClass('dataicon');
		jQuery(this).parents("#list-manual").find("ul").not(":hidden").slideUp(300);
	});															   
	jQuery("#list-manual").each(function(e){
		if( jQuery( "#list-manual > li > a" ).hasClass( "open-ul-first" ) ){ 
			jQuery( "#list-manual > li > a.open-ul-first" ).addClass('dataicon').next("ul").slideDown(300);
		}
		if( manual_expand_doc_treemenu_default == 2 ) {
			jQuery("#list-manual li a").addClass('dataicon');
			jQuery(".doc-expandall").hide();
			jQuery(".doc-collapseall").show();
			jQuery("#list-manual li").children('ul').slideDown(300);
		}
	});
	jQuery('.doc-expandall').on('click', function(e){ 
		 jQuery("#list-manual li a").addClass('dataicon');
		 jQuery(".doc-expandall").hide();
		 jQuery(".doc-collapseall").show();
		 jQuery("#list-manual li").children('ul').slideDown(300); 
	});
	jQuery('.doc-collapseall').on('click', function(e){ 
		 jQuery("#list-manual li a").removeClass('dataicon');
		 jQuery(".doc-collapseall").hide();
		 jQuery(".doc-expandall").show();
		 jQuery("#list-manual li").children('ul').slideUp(300); 
	});

	/****************************************
	DOCUMENTATION :: DISPLAY SELECTED ARTICLE
	*****************************************/
	window.onload = manual__direct_doc_artilceload_default();
	if( global_ajaxload_shortcode == 1 ) { // Only on page :: shortcode fix
		window.onload = manual__direct_doc_artilceload_ajax();
	} else {
		if( doc_disable_ajaxload == 1 ) {
			window.onload = manual__direct_doc_artilceload_ajax();
		}
	}
	window.onload = manual__direct_doc_artilceload_open_close();
	
	function manual__direct_doc_artilceload_default(){								  
		if( jQuery( "#list-manual li > a" ).hasClass( "doc-active-normal" ) ){
			var current_post_ID = jQuery("#list-manual li > a.doc-active-normal").attr('rel');
			var current_href = jQuery("#list-manual li > a.doc-active-normal").attr("href");
			History.pushState({id:jQuery("#list-manual li > a.doc-active-normal").attr("rel")},jQuery("#list-manual li > a.doc-active-normal").text(), current_href);
		}
	}
	function manual__direct_doc_artilceload_ajax(){	
	   // call ajax
	   if( jQuery( "#list-manual li > a" ).hasClass( "doc-active" ) ){
		   var current_post_ID = jQuery("#list-manual li > a.doc-active").attr('rel');
		   if( doc_disable_ajaxload == 1 && doc_ajaxload_autoscroll == 1 ) {
		   		jQuery('html,body').animate({ scrollTop: jQuery('.doc-single-post').offset().top-100 }, 2000);
		   }
		   /*** Current Page HREF ***/
		   var current_href = jQuery("#list-manual li > a.doc-active").attr("href");
		   History.pushState({id:jQuery("#list-manual li > a.doc-active").attr("rel")},jQuery("#list-manual li > a.doc-active").text(), current_href);
		   /*** Eof Current Page HREF ***/
		   jQuery("#single-post-container").html("<div style=\"width:100%; margin:30px; min-height:300px;\"><div class=\"spinner-loader\"></div></div>");
			// Ajax call
			jQuery.ajax({
				type: "post",
				url: doc_ajax_var.url,
				data: { action: 'display-doc-post', 
						nonce: doc_ajax_var.nonce,
						post_id: current_post_ID,
					  },
				success: function(data, textStatus, XMLHttpRequest){  
						jQuery( "#single-post-container" ).html(data); 
						jQuery( document ).trigger( "manual_jsCodeOnAjaxCallPost", { "post_id": current_post_ID, "nonce": doc_ajax_var.nonce, "onclickdisplay_feedback": kb_display_feedback_form_onclick_thumbsdown, } ); 
						if( execute_js_after_ajax_call_pg_doc == 1 ) {
							jQuery( document ).trigger( "executeJSCodeOnAjaxCallDocPost", { "post_id": current_post_ID, "nonce": doc_ajax_var.nonce } );  
						}
				},
				error: function(MLHttpRequest, textStatus, errorThrown){  
				}
			});
			return false;
	    }
	}
	function manual__direct_doc_artilceload_open_close(){
		// - run other tree check
		if( jQuery( "#list-manual li > a" ).hasClass( "has-child doc-active"  ) ){
			var current_post_ID = jQuery("#list-manual li > a.doc-active").attr('rel');
			jQuery("#list-manual li > a.doc-active").parents("#list-manual").find("ul.parent-display-"+current_post_ID).slideDown(300);
			jQuery("#list-manual li > a.doc-active").parents("#list-manual").find("a.doc-active > i").removeClass('fa-plus-circle'); 
			jQuery("#list-manual li > a.doc-active").parents("#list-manual").find("a.doc-active > i").addClass('fa-minus-circle'); 
			//HIDE FIRST UL OPEN
			if( manual_expand_doc_treemenu_default != 2 ) {
				if(jQuery( "#list-manual li > a" ).hasClass("has-child open-ul-first")) {
					jQuery( "#list-manual li > a.open-ul-first" ).next("ul").slideUp(300);
					jQuery( "#list-manual li > a.open-ul-first" ).removeClass('open-ul-first dataicon');
				}
			}
		}
		if( jQuery( "#list-manual li > a" ).hasClass( "has-inner-child doc-active" ) ){
			var current_post_ID = jQuery("#list-manual li > a.doc-active").attr('rel');
			jQuery("#list-manual li > a.doc-active").addClass('dataicon child-a-icon-'+current_post_ID).next("ul").addClass('child-open-'+current_post_ID).slideDown(300); 
			jQuery("#list-manual li > a.doc-active").parents("#list-manual").find("a.doc-active > i").removeClass('fa-plus-circle'); 
			jQuery("#list-manual li > a.doc-active").parents("#list-manual").find("a.doc-active > i").addClass('fa-minus-circle');
			//HIDE FIRST UL OPEN
			if( manual_expand_doc_treemenu_default != 2 ) {
				var chkrel = jQuery("#list-manual li > a.doc-active").closest("li.nav-header").find("a.open-ul-first").attr('rel');
				if(typeof(chkrel)  === "undefined") {
					if(jQuery( "#list-manual li > a" ).hasClass("has-child open-ul-first")) { 
						jQuery( "#list-manual li > a.open-ul-first" ).next("ul").slideUp(300);
						jQuery( "#list-manual li > a.open-ul-first" ).removeClass('open-ul-first dataicon');
					}
				}
			}
		}
		if( jQuery( "#list-manual li > a" ).hasClass( "no-child doc-active"  ) ){ 
			if( manual_expand_doc_treemenu_default != 2 ) {
				if(jQuery( "#list-manual li > a" ).hasClass("has-child doc-active")) { 
					jQuery( "#list-manual li > a.doc-active" ).next("ul").slideUp(300);
				}
				if(jQuery( "#list-manual li > a" ).hasClass("has-child open-ul-first")) { 
					jQuery( "#list-manual li > a.open-ul-first" ).next("ul").slideUp(300);
					jQuery( "#list-manual li > a.open-ul-first" ).removeClass('open-ul-first dataicon');
				}
			}
		}
		if( jQuery( "#list-manual li > a" ).hasClass( "has-no-inner-child doc-active"  ) ){ 
			if( manual_expand_doc_treemenu_default != 2 ) {
				var chkrel = jQuery("#list-manual li > a.doc-active").closest("li.nav-header").find("a.open-ul-first").attr('rel');
				if(typeof(chkrel)  === "undefined") {
					if(jQuery( "#list-manual li > a" ).hasClass("has-child open-ul-first")) { 
						jQuery( "#list-manual li > a.open-ul-first" ).next("ul").slideUp(300);
						jQuery( "#list-manual li > a.open-ul-first" ).removeClass('open-ul-first dataicon');
					}
				}
			}
		}
	}
	
	/*************************
	DOCUMENTATION :: AJAX LOAD
	**************************/
	jQuery(".post-link").on("click",function() {
		jQuery("#list-manual li a").removeClass('doc-active');
		if( doc_ajaxload_autoscroll == 1 ) {
			jQuery('html,body').animate({ scrollTop: jQuery('.doc-single-post').offset().top-100 }, 2000);
		}
		jQuery(this).addClass('doc-active');
		jQuery("#single-post-container").html("<div style=\"width:100%; margin:30px; min-height:300px;\"><div class=\"spinner-loader\"></div></div>");
		// Retrieve post ID from data attribute 
		var current_post_ID = jQuery(this).attr("rel");
        // Ajax call
        jQuery.ajax({
            type: "post",
            url: doc_ajax_var.url,
			data: { action: 'display-doc-post', 
					nonce: doc_ajax_var.nonce,
					post_id: current_post_ID,
				  },
			success: function(data, textStatus, XMLHttpRequest){  
					jQuery( "#single-post-container" ).html(data); 
					jQuery( document ).trigger( "manual_jsCodeOnAjaxCallPost", { "post_id": current_post_ID, "nonce": doc_ajax_var.nonce, "onclickdisplay_feedback": kb_display_feedback_form_onclick_thumbsdown, } );  
					if( execute_js_after_ajax_call_pg_doc == 1 ) {
						jQuery( document ).trigger( "executeJSCodeOnAjaxCallDocPost", { "post_id": current_post_ID, "nonce": doc_ajax_var.nonce } );  
					}
			},
			error: function(MLHttpRequest, textStatus, errorThrown){  
			}
        });
        return false;
    });
	
	/*******
	mScroll
	********/
	if( doc_catpage_active == 1 ) { jQuery("#list-manual").mCustomScrollbar({ setHeight: doc_scroll_menu_define_height, theme:doc_scroll_menu_design }); }
	
	/**********************
	Accurate # Cache Search
	**********************/
	if( doc_catpage_hash == 1 ) { 
		var doc_search = location.href.split('#');
		if ( doc_search[1] != null ){
			jQuery("#list-manual li a").removeClass('doc-active').filter('a[rel^="'+doc_search[1]+'"]').addClass('doc-active');
			jQuery("#list-manual li a").addClass('dataicon');
			jQuery(".doc-expandall").hide();
			jQuery(".doc-collapseall").show();
			jQuery("#list-manual li").children('ul').slideDown(300);
			jQuery("#single-post-container").html("<div style=\"width:100%; margin:30px; min-height:300px;\"><div class=\"spinner-loader\"></div></div>");
			// Ajax call
			jQuery.ajax({
				type: "post",
				url: doc_ajax_var.url,
				data: { action: 'display-doc-post', 
						nonce: doc_ajax_var.nonce,
						post_id: doc_search[1],
					  },
				success: function(data, textStatus, XMLHttpRequest){  
						jQuery( "#single-post-container" ).html(data);
						if( doc_catpage_active == 1 ) { jQuery("#list-manual").mCustomScrollbar("scrollTo", ".doc-active"); }
						jQuery( document ).trigger( "manual_jsCodeOnAjaxCallPost", { "post_id": doc_search[1], "nonce": doc_ajax_var.nonce, "onclickdisplay_feedback": kb_display_feedback_form_onclick_thumbsdown, } ); 
						if( execute_js_after_ajax_call_pg_doc == 1 ) {
							jQuery( document ).trigger( "executeJSCodeOnAjaxCallDocPost", { "post_id": doc_search[1], "nonce": doc_ajax_var.nonce } );  
						}
				},
				error: function(MLHttpRequest, textStatus, errorThrown){  
					//alert(textStatus); 
				}
			});
		}
	}
	
	/**********************
	HOME PAGE :: HELP DESK
	**********************/
	jQuery('.loop-help-desk').owlCarousel({
			items : owlCarousel_item,
			navigation :false,
			pagination : true,
			responsive: true,
			lazyLoad : true,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [979,3],
			itemsTablet: [768,3],
			itemsTablet: [603,2],
			itemsMobile : [479,1],
	});
	
	/**********************
	LIVE SEARCH URL
	**********************/
	if( live_search_active ==  1 ) {
		jQuery('#searchform #s').liveSearch({
				url: live_search_url
		});
	}
	
	/**********************
	KNOWLEDGEBASE
	**********************/
	jQuery('.masonry-vc-grid-four, .masonry-grid, .masonry-vc-grid-six').masonry({
	  itemSelector: '.masonry-item',
	  columnWidth: 200,
	  columnWidth: '.col-md-3, .col-md-4, .col-md-6, .col-md-12',
	  percentPosition: true
	});
	jQuery('.masonry-grid-without-sidebar, .masonry-grid-inner').masonry({
	  itemSelector: '.masonry-item',
	  columnWidth: '.col-md-6, .col-md-12',
	  percentPosition: true
	});
	jQuery(".owl-portfolio").owlCarousel({
	  slideSpeed : 300,
	  paginationSpeed : 400,
	  singleItem:true,
	  navigation:false,
	});
	
	/******************
	HOME PAGE CAROUSEL
	*******************/
	jQuery('.home-testo-desk').owlCarousel({
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true,
	  navigation :false,
	  items : 1, 
	});
	
	/*********
	LOAD MORE
	***********/
	var loada = 1;
	jQuery(".ajax_load_more_post a").on("click", function(b) {
		 b.preventDefault();
		 var c = jQuery(this).attr("href"),
		     d = ".projects_holder",
			 g = jQuery(".projects_holder .filler").length,
			 e = ".portfolio_paging .ajax_load_more_post a",
			 f = jQuery(e).attr("href"),
		     h = jQuery(".portfolio_paging"),
             i = jQuery(".portfolio_paging_loading");
			 h.hide(), i.show(), jQuery.get(c + "", function(b) {
				 jQuery(".projects_holder .filler").slice(-g).remove();
				 var c = jQuery(d, b).wrapInner("").html();
				 f = jQuery(e, b).attr("href"), jQuery(d, b).waitForImages(function() {
					jQuery("div.portfolio-section-records:last").after(c);
					jQuery(".projects_holder").isotope("reloadItems").isotope();
					jQuery(".ajax_load_more_post").attr("rel") > loada ? jQuery(".ajax_load_more_post a").attr("href", f) : jQuery(".portfolio_paging").remove();
					h.show(); i.hide();
					jQuery(window).trigger("resize");
				 })
			 }), loada++
	})
	
	/*******************************
	SCROLLSPY
	********************************/
	jQuery('body').scrollspy({
        target: '#docinlinespy'
    });
	jQuery('[data-spy="scroll"]').each(function () {
		var $spy = jQuery(this).scrollspy('refresh')
	})
	if(jQuery('#docinlinespy').length){
		jQuery('#docinlinespy').affix({
			offset: {
				top: jQuery('#docinlinespy').offset().top,
				bottom: (jQuery('footer').outerHeight(true)) + 200
			}
		});	
	}
	jQuery(".inlineclick").on("click",function() { 
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = jQuery(this.hash);
			target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				jQuery('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}									   
	});
	
	/*******************************
	MOBILE MENU FOR - DOCUMENTATION
	********************************/
	if( doc_responsive_treemenu == 1 ) {
		jQuery("#list-manual").each(function(e){
			var checklist = '';
			if(mCSB_scroll == 1) checklist = '#list-manual .mCSB_container';
			else checklist = '#list-manual';
			
			var menuList = jQuery(checklist).html();
			jQuery('.mobile-menu-holder ul.navbar-nav').html(menuList);
			jQuery('.mobile-menu-holder').addClass("doc-mobile-menu");
			jQuery(".mobile-menu-holder.doc-mobile-menu ul.navbar-nav a.doc-active").parentsUntil('.mobile-menu-holder.doc-mobile-menu .navbar-nav > li > ul', 'ul').each(function (index, el) {
				var current_post_ID = jQuery(this).prev('a').attr("rel");
				jQuery(el).css('height', 'auto').addClass('child-open-' + current_post_ID).prev('a').addClass('dataicon').addClass('child-a-icon-' + current_post_ID);
			});
			jQuery('.mobile-menu-holder.doc-mobile-menu .navbar-nav > li > a.has-child i, .mobile-menu-holder.doc-mobile-menu .navbar-nav li a.has-inner-child i').on('click', function(e){
				e.preventDefault();
			});
			jQuery(".mobile-menu-holder.doc-mobile-menu .navbar-nav").each(function(e){ 
				jQuery(".mobile-menu-holder.doc-mobile-menu .navbar-nav > li > a.has-child").next("ul").css('height', 'auto').css('display', 'block');	
				jQuery(".mobile-menu-holder.doc-mobile-menu .navbar-nav > li > a.has-child").find("i").removeClass('fa-plus-circle'); 
				jQuery(".mobile-menu-holder.doc-mobile-menu .navbar-nav > li > a.has-child").find("i").addClass('fa-minus-circle');		
			});
			jQuery('.mobile-menu-holder.doc-mobile-menu .navbar-nav li a.has-inner-child').on('click', function(e){ 
				var current_post_ID = jQuery(this).attr("rel");
				var current_ul_status = jQuery(this).parents(".mobile-menu-holder.doc-mobile-menu .navbar-nav").find("ul.child-open-"+current_post_ID).is(':hidden');
				if( current_ul_status == true ) { 
						jQuery(this).next("ul").css('height', 'auto').slideDown(300);
				} else if( jQuery(this).parents(".mobile-menu-holder.doc-mobile-menu .navbar-nav").find('ul').hasClass('child-open-'+current_post_ID) ) {
					jQuery(this).parents(".mobile-menu-holder.doc-mobile-menu .navbar-nav").find("ul.child-open-"+current_post_ID).not(":hidden").slideUp(300);
					jQuery(this).parents(".mobile-menu-holder.doc-mobile-menu .navbar-nav").find('ul').removeClass('child-open-'+current_post_ID);
					jQuery(this).parents(".mobile-menu-holder.doc-mobile-menu .navbar-nav").find("li > a.child-a-icon-"+current_post_ID+" > i").removeClass('fa-minus-circle');  
					jQuery(this).parents(".mobile-menu-holder.doc-mobile-menu .navbar-nav").find("li > a.child-a-icon-"+current_post_ID+" > i").addClass('fa-plus-circle');  
					jQuery(this).parents(".mobile-menu-holder.doc-mobile-menu .navbar-nav").find("li > a.child-a-icon-"+current_post_ID).removeClass('dataicon');
					jQuery(this).parents(".mobile-menu-holder.doc-mobile-menu .navbar-nav").find("li > a.child-a-icon-"+current_post_ID).removeClass('child-a-icon-'+current_post_ID);
				} else {
					jQuery(this).addClass('dataicon child-a-icon-'+current_post_ID).next("ul").addClass('child-open-'+current_post_ID).css('height', 'auto').slideDown(300);
					jQuery(this).find("a.has-inner-child > i").removeClass('fa-plus-circle'); 
					jQuery(this).find("a.has-inner-child > i").addClass('fa-minus-circle'); 
				}
			});
		});
	}
	/*******************************
	EOF -- MOBILE MENU FOR - DOCUMENTATION
	********************************/
});



jQuery(window).load(function(){
	
	"use strict";
	initmanualDropDownMenu();
	
	/*******************************
	PORTFOLIO - FILTER MASNORY
	********************************/
	var $masnorygrid = jQuery('.isotope-container-masnory').isotope({
		itemSelector: '.element-item',
	});
	jQuery('.filter-portfolio-group-masnory').on( 'click', 'li', function() {  
		var $filter  = jQuery(this),
			selector = $filter.attr('data-filter-masnory');
		
		$masnorygrid.imagesLoaded( function() {		
			$masnorygrid.isotope({
				filter: selector
			});
		});
		jQuery(this).addClass('selected').siblings().removeClass('selected');
	});
	
	/*******************************
	PORTFOLIO - FILTER FITROWS
	********************************/
	var $grid = jQuery('.isotope-container').isotope({
		itemSelector: '.element-item',
		layoutMode: 'fitRows'
	});
	jQuery('.filter-portfolio-group').on( 'click', 'li', function() {  
		var $filter  = jQuery(this),
			selector = $filter.attr('data-filter');
		
		$grid.imagesLoaded( function() {	
			$grid.isotope({
				filter: selector
			});
		});
		jQuery(this).addClass('selected').siblings().removeClass('selected');
	});
	
	/*************
	DOCUMENTATION
	**************/
	if( doc_cookie_sh == 1 && doc_catpage_active == 1 ) { jQuery("#list-manual").mCustomScrollbar("scrollTo", ".doc-active"); }
	
});


function initmanualDropDownMenu() { 
    "use strict";
	jQuery(".navbar ul.nav.navbar-nav li").on('mouseenter mouseleave', function (e) {
	   	var window_width = jQuery(window).width(); 
		if( window_width > 767 ) {
			if (jQuery('ul', this).length) { 
				var elm = jQuery('ul:first', this);
				var off = elm.offset();
				var l = off.left;
				var w = elm.width();
				var docH = jQuery(".navbar").height();
				var docW = jQuery(".navbar").width();
				var isEntirelyVisible = (l + w <= docW);
				if (!isEntirelyVisible) {
					jQuery(this).addClass('menu-edge');
				} else {
					jQuery(this).removeClass('menu-edge');
				}
			}
	   }
    });
}

/**************
**  FUN ACT  **
***************/
jQuery(function($) {
	"use strict";
	$('.funact-main-div').appear(function() { 
		$('.timer').countTo();
	},{accX: 90, accY: 100});

});