(
	function( $ ) {
		'use strict';
		
		/**************************
		**** MANUAL == COUNTER ****
		**************************/
		var manualcounter = function( $scope, $ ) {
			$('.funact-main-div').appear(function() { 
				$('.timer').countTo();
			},{accX: 90, accY: 100});
		};
		
		/*******************************
		**** MANUAL == TESTIMONIALS ****
		********************************/
		var manualtestimonials = function( $scope, $ ) {
			$('.home-testo-desk').owlCarousel({
			  slideSpeed : 300,
			  paginationSpeed : 400,
			  singleItem:true,
			  navigation :false,
			  items : 1, 
			});
		};
		
		/*********************
		**** MANUAL == KB ****
		**********************/
		var manualkb = function( $scope, $ ) {
			$('.masonry-grid').masonry({
			  itemSelector: '.masonry-item',
			  columnWidth: '.col-md-3, .col-md-4, .col-md-6, .col-md-12',
			  percentPosition: true
			});
		};
		
		/*************************
		**** MANUAL == INLINE ****
		**************************/
		var manualinline = function( $scope, $ ) {
			
			$('body').scrollspy({
				target: '#docinlinespy'
			});
			$('[data-spy="scroll"]').each(function () {
				var $spy = $(this).scrollspy('refresh')
			});
			if($('#docinlinespy').length){
				$('#docinlinespy').affix({
					offset: {
						top: $('#docinlinespy').offset().top,
						bottom: ($('footer').outerHeight(true)) + 200
					}
				});	
			}
			$(".inlineclick").on("click",function() { 
				if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
					if (target.length) {
						$('html,body').animate({
							scrollTop: target.offset().top
						}, 1000);
						return false;
					}
				}									   
			});
		};
		
		/****************************
		**** MANUAL == PORTFOLIO ****
		*****************************/
		var manualportfolio = function( $scope, $ ) {
			
			// Filter Masnory
			var $masnorygrid = $('.isotope-container-masnory').isotope({
				itemSelector: '.element-item',
			});
			$('.filter-portfolio-group-masnory').on( 'click', 'li', function() {  
				var $filter  = $(this),
					selector = $filter.attr('data-filter-masnory');
				
				$masnorygrid.imagesLoaded( function() {		
					$masnorygrid.isotope({
						filter: selector
					});
				});
				$(this).addClass('selected').siblings().removeClass('selected');
			});
			
			
			// Filter fitRows
			var $grid = $('.isotope-container').isotope({
				itemSelector: '.element-item',
				layoutMode: 'fitRows'
			});
			$('.filter-portfolio-group').on( 'click', 'li', function() {  
				var $filter  = $(this),
					selector = $filter.attr('data-filter');
				
				$grid.imagesLoaded( function() {	
					$grid.isotope({
						filter: selector
					});
				});
				$(this).addClass('selected').siblings().removeClass('selected');
			});
		};	
		
		/******************************
		**** MANUAL == AJAX LOAD 1 ****
		*******************************/
		var manuaajaxload = function( $scope, $ ) {
			
			/**** DOCUMENTATION :: S=H  ****/
			$('#list-manual > li > a.has-child i, #list-manual li a.has-inner-child i').on('click', function(e){
				e.preventDefault();
			});	
			
			$('#list-manual > li > a.has-child').on('click', function(e){
				var current_post_ID = $(this).attr("rel");
				
				if( doc_disable_ajaxload == 1 ) {
					if ( 0 < $(this).next("ul").size() ) {
					  e.preventDefault();
					}
				}
				
				if ( 0 == $(this).next("ul").size() || 0 == $(this).next("ul:hidden").size() ) {
				  return;
				}
				
				$(this).parents("#list-manual").find("li > a").removeClass('dataicon');
				$(this).parents("#list-manual").find("ul").not(":hidden").slideUp(300);
				$(this).addClass('dataicon').next("ul").slideDown(300);
			});
			
			$('#list-manual li a.has-inner-child').on('click', function(e){ 
				var current_post_ID = $(this).attr("rel");
				var current_ul_status = $(this).parents("#list-manual").find("ul.child-open-"+current_post_ID).is(':hidden');
				
				if( doc_disable_ajaxload == 1 ) {
					if ( 0 < $(this).next("ul").size() ) {  
					  e.preventDefault();
					}
				}
				
				if( current_ul_status == true ) { 
						$(this).next("ul").slideDown(300);
				} else if( $(this).parents("#list-manual").find('ul').hasClass('child-open-'+current_post_ID) ) {
					$(this).parents("#list-manual").find("ul.child-open-"+current_post_ID).not(":hidden").slideUp(300);
					$(this).parents("#list-manual").find('ul').removeClass('child-open-'+current_post_ID);
					$(this).parents("#list-manual").find("li > a.child-a-icon-"+current_post_ID+" > i").removeClass('fa-minus-circle');  
					$(this).parents("#list-manual").find("li > a.child-a-icon-"+current_post_ID+" > i").addClass('fa-plus-circle');  
					$(this).parents("#list-manual").find("li > a.child-a-icon-"+current_post_ID).removeClass('dataicon');
					$(this).parents("#list-manual").find("li > a.child-a-icon-"+current_post_ID).removeClass('child-a-icon-'+current_post_ID);
				} else {
					$(this).addClass('dataicon child-a-icon-'+current_post_ID).next("ul").addClass('child-open-'+current_post_ID).slideDown(300);
					$(this).find("a.has-inner-child > i").removeClass('fa-plus-circle'); 
					$(this).find("a.has-inner-child > i").addClass('fa-minus-circle'); 
				}
			});
			
			$("#list-manual").each(function(e){
				if( $( "#list-manual > li > a" ).hasClass( "open-ul-first" ) ){ 
					$( "#list-manual > li > a.open-ul-first" ).addClass('dataicon').next("ul").slideDown(300);
				}
				if( manual_expand_doc_treemenu_default == 2 ) {
					$("#list-manual li a").addClass('dataicon');
					$(".doc-expandall").hide();
					$(".doc-collapseall").show();
					$("#list-manual li").children('ul').slideDown(300);
				}
			});
			
			$('.doc-expandall').on('click', function(e){ 
				 $("#list-manual li a").addClass('dataicon');
				 $(".doc-expandall").hide();
				 $(".doc-collapseall").show();
				 $("#list-manual li").children('ul').slideDown(300); 
			});
			
			$('.doc-collapseall').on('click', function(e){ 
				 $("#list-manual li a").removeClass('dataicon');
				 $(".doc-collapseall").hide();
				 $(".doc-expandall").show();
				 $("#list-manual li").children('ul').slideUp(300); 
			});
			
			/******
				DOCUMENTATION :: AJAX LOAD
			********/
			$(".post-link").on("click",function() {
				$("#list-manual li a").removeClass('doc-active');
				if( doc_ajaxload_autoscroll == 1 ) {
					$('html,body').animate({ scrollTop: $('.doc-single-post').offset().top-100 }, 2000);
				}
				$(this).addClass('doc-active');
				$("#single-post-container").html("<div style=\"width:100%; margin:30px; min-height:300px;\"><div class=\"spinner-loader\"></div></div>");
				// Retrieve post ID from data attribute 
				var current_post_ID = $(this).attr("rel");
				// Ajax call
				$.ajax({
					type: "post",
					url: doc_ajax_var.url,
					data: { action: 'display-doc-post', 
							nonce: doc_ajax_var.nonce,
							post_id: current_post_ID,
						  },
					success: function(data, textStatus, XMLHttpRequest){  
							$( "#single-post-container" ).html(data); 
							$( document ).trigger( "manual_jsCodeOnAjaxCallPost", { "post_id": current_post_ID, "nonce": doc_ajax_var.nonce, "onclickdisplay_feedback": kb_display_feedback_form_onclick_thumbsdown, } );  
							if( execute_js_after_ajax_call_pg_doc == 1 ) {
								$( document ).trigger( "executeJSCodeOnAjaxCallDocPost", { "post_id": current_post_ID, "nonce": doc_ajax_var.nonce } );  
							}
					},
					error: function(MLHttpRequest, textStatus, errorThrown){  
					}
				});
				return false;
			});
			
		};	
		
		/******************************
		**** MANUAL == AJAX LOAD 2 ****
		*******************************/ 
		var manuaajaxload2 = function( $scope, $ ) {
			
			/******
			DOC :: DISPLAY SELECTED ARTICLE
			********/
			if( $( "#list-manual li > a" ).hasClass( "doc-active-normal" ) ){
			   var current_post_ID = $("#list-manual li > a.doc-active-normal").attr('rel');
			   var current_href = $("#list-manual li > a.doc-active-normal").attr("href");
			   History.pushState({id:$("#list-manual li > a.doc-active-normal").attr("rel")},$("#list-manual li > a.doc-active-normal").text(), current_href);
			}
			
		   if( $( "#list-manual li > a" ).hasClass( "doc-active" ) ){
			   var current_post_ID = $("#list-manual li > a.doc-active").attr('rel');
			   
			   /*** Current Page HREF ***/
			   var current_href = $("#list-manual li > a.doc-active").attr("href");
			   History.pushState({id:$("#list-manual li > a.doc-active").attr("rel")},$("#list-manual li > a.doc-active").text(), current_href);
			   /*** Eof Current Page HREF ***/
			   
			   $("#single-post-container").html("<div style=\"width:100%; margin:30px; min-height:300px;\"><div class=\"spinner-loader\"></div></div>");
				// Ajax call
				$.ajax({
					type: "post",
					url: doc_ajax_var.url,
					data: { action: 'display-doc-post', 
							nonce: doc_ajax_var.nonce,
							post_id: current_post_ID,
						  },
					success: function(data, textStatus, XMLHttpRequest){  
							$( "#single-post-container" ).html(data); 
							$( document ).trigger( "manual_jsCodeOnAjaxCallPost", { "post_id": current_post_ID, "nonce": doc_ajax_var.nonce, "onclickdisplay_feedback": kb_display_feedback_form_onclick_thumbsdown, } );  
							if( execute_js_after_ajax_call_pg_doc == 1 ) {
								$( document ).trigger( "executeJSCodeOnAjaxCallDocPost", { "post_id": current_post_ID, "nonce": doc_ajax_var.nonce } );  
							}
					},
					error: function(MLHttpRequest, textStatus, errorThrown){  
					}
				});
				return false;
		   }
			
			if( $( "#list-manual li > a" ).hasClass( "has-child doc-active"  ) ){
				var current_post_ID = $("#list-manual li > a.doc-active").attr('rel');
				$("#list-manual li > a.doc-active").parents("#list-manual").find("ul.parent-display-"+current_post_ID).slideDown(300);
				$("#list-manual li > a.doc-active").parents("#list-manual").find("a.doc-active > i").removeClass('fa-plus-circle'); 
				$("#list-manual li > a.doc-active").parents("#list-manual").find("a.doc-active > i").addClass('fa-minus-circle'); 
			}
			if( $( "#list-manual li > a" ).hasClass( "has-inner-child doc-active" ) ){
				var current_post_ID = $("#list-manual li > a.doc-active").attr('rel');
				$("#list-manual li > a.doc-active").addClass('dataicon child-a-icon-'+current_post_ID).next("ul").addClass('child-open-'+current_post_ID).slideDown(300); 
				$("#list-manual li > a.doc-active").parents("#list-manual").find("a.doc-active > i").removeClass('fa-plus-circle'); 
				$("#list-manual li > a.doc-active").parents("#list-manual").find("a.doc-active > i").addClass('fa-minus-circle');
			}
				
		};
		
		/**************************
		**** MANUAL == KB TREE ****
		**************************/
		var manualkbtree = function( $scope, $ ) {
			$(".kb_tree_viewmenu_elementor").each(function(e){
				if( $( ".kb_tree_viewmenu_elementor li.root_cat a" ).hasClass( "open-ul-first" ) ){  
					var current_post_ID = $( ".kb_tree_viewmenu_elementor li.root_cat a.open-ul-first" ).attr("rel");
					$(".kb_tree_viewmenu_elementor li.root_cat a.open-ul-first").addClass('dataicon child-a-icon-'+current_post_ID);
					$('.kb_tree_viewmenu_elementor').find("ul.kb-tree-records-"+current_post_ID).addClass('child-open-'+current_post_ID).slideDown(300);
					$('.kb_tree_viewmenu_elementor').find("ul.kb-tree-chidcat-"+current_post_ID).addClass('child-open-'+current_post_ID).slideDown(300);
				}
			});
	
			$('.kb_tree_viewmenu_elementor a.kb-tree-recdisplay').on('click', function(e){ 
				var current_post_ID = $(this).attr("rel");
				if( current_post_ID != '' ) {
					var current_ul_status = $(this).parents(".kb_tree_viewmenu_elementor").find("ul.kb-tree-records-"+current_post_ID).is(':hidden');
					if ( 0 < $(this).next("ul").size() ) {  
					  e.preventDefault();
					}
					if( current_ul_status == true ) { 
						$(this).parents(".kb_tree_viewmenu_elementor").find("li.root_cat > ul.kbroot_cat_records").slideUp(300); 
						$(this).parents(".kb_tree_viewmenu_elementor").find("li.root_cat ul.tree_child_records ").slideUp(300); 
						$(this).parents(".kb_tree_viewmenu_elementor").find("a.kb-tree-recdisplay").removeClass('dataicon'); 
						$(this).parents(".kb_tree_viewmenu_elementor").find("ul.kb-tree-records-"+current_post_ID).slideDown(300);
						$(this).parents(".kb_tree_viewmenu_elementor").find("ul.kb-tree-chidcat-"+current_post_ID).slideDown(300); 
						$(this).addClass('dataicon child-a-icon-'+current_post_ID);
						$(this).parents(".kb_tree_viewmenu_elementor").find("ul.kb-tree-records-"+current_post_ID).addClass('child-open-'+current_post_ID);
					} else if( $(this).parents(".kb_tree_viewmenu_elementor").find('ul').hasClass('child-open-'+current_post_ID) ) {
						$(this).parents(".kb_tree_viewmenu_elementor").find("ul.child-open-"+current_post_ID).not(":hidden").slideUp(300);
						$(this).parents(".kb_tree_viewmenu_elementor").find('ul').removeClass('child-open-'+current_post_ID);
						$(this).parents(".kb_tree_viewmenu_elementor").find("a.child-a-icon-"+current_post_ID).removeClass('dataicon');
						$(this).parents(".kb_tree_viewmenu_elementor").find("a.child-a-icon-"+current_post_ID).removeClass('child-a-icon-'+current_post_ID);
						$(this).parents(".kb_tree_viewmenu_elementor").find("ul.kb-tree-chidcat-"+current_post_ID).slideUp(300); 
					}
				}
			});
		};
		
		
		/**************************
		**** MANUAL == FAQ CAT ****
		**************************/
		var manualfaqcatarticles = function( $scope, $ ) {
			$('.display-faq-section .collapsible-panels.theme-faq-cat-pgs').on("click",function(e) { 
				var current_post_ID = $(this).attr("id");															   
				if( $(".display-faq-section div.faq-catpg-"+current_post_ID+"").hasClass('active') ) {
					$(".display-faq-section div.theme-faq-cat-pgs").removeClass('active');
					$(".entry-content-"+current_post_ID+"").slideUp(300).show(); 
				} else {
					$(".display-faq-section .entry-content-faq-all").slideUp(300);
					$(".display-faq-section div.theme-faq-cat-pgs").removeClass('active');
					$(".display-faq-section .entry-content-"+current_post_ID+"").slideDown(300).show(); 
					$(".display-faq-section div.faq-catpg-"+current_post_ID+"").addClass('active');
				}
				e.preventDefault();
			});
		};
		
		
		/****************************
		**** MANUAL ==HELP BLOCK ****
		*****************************/
		var manualhelpblock = function( $scope, $ ) {
			$('.loop-manual-elementor-help-blocks').owlCarousel({
					items:4,
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
		};
		
		
		$( window ).on( 'elementor/frontend/init', function() {
			elementorFrontend.hooks.addAction( 'frontend/element_ready/manual-counter.default', manualcounter );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/manual-testimonials.default', manualtestimonials );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/manual-knowledgebase.default', manualkb );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/manual-inlinedocumentation.default', manualinline );
			//elementorFrontend.hooks.addAction( 'frontend/element_ready/manual-ajaxloaddocumentation.default', manuaajaxload );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/manual-ajaxloaddocumentation.default', manuaajaxload2 );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/manual-portfolio.default', manualportfolio );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/manual-kb-tree-view.default', manualkbtree );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/manual-faq-article.default', manualfaqcatarticles );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/manual-mega-post-grid.default', manualkb );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/manual-home-help-block.default', manualhelpblock );
			elementorFrontend.hooks.addAction( 'frontend/element_ready/manual-course.default', manualkb );
		} );
	}
)( jQuery );