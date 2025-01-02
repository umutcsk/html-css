(function ($) {
	
	"use strict";

	$(function() {
        $("#tabs").tabs();
    });

	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	});
	

	$('.schedule-filter li').on('click', function() {
        var tsfilter = $(this).data('tsfilter');
        $('.schedule-filter li').removeClass('active');
        $(this).addClass('active');
        if (tsfilter == 'all') {
            $('.schedule-table').removeClass('filtering');
            $('.ts-item').removeClass('show');
        } else {
            $('.schedule-table').addClass('filtering');
        }
        $('.ts-item').each(function() {
            $(this).removeClass('show');
            if ($(this).data('tsmeta') == tsfilter) {
                $(this).addClass('show');
            }
        });
    });


	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init
	window.sr = new scrollReveal();
	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
	       	var target = $(this.hash);
	        $('html, body').stop().animate({
	            scrollTop: (target.offset().top) + 1
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.nav ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	// Page loading animation
	 $(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function() {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function() {
			if(width < 767) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}
	
})(window.jQuery);

let msslideIndex = 1;

msshowSlides(msslideIndex);

function msshowSlides(n) {
  let i;
  let msslides = document.getElementsByClassName("msmySlides");
  let msdots = document.getElementsByClassName("msdot");
  if (n > msslides.length) {msslideIndex = 1}
  if (n < 1) {msslideIndex = msslides.length}
  for (i = 0; i < msslides.length; i++) {
	msslides[i].style.display = "none";
  }
  for (i = 0; i < msdots.length; i++) {
	msdots[i].className = msdots[i].className.replace(" active", "");
  }
  msslides[msslideIndex-1].style.display = "block";
  msdots[msslideIndex-1].className += " active";
}
	// Next/previous controls
function msplusSlides(n) {
  msshowSlides(msslideIndex += n);
}

// Thumbnail image controls
function mscurrentSlide(n) {
  msshowSlides(msslideIndex = n);
}

let asslideIndex = 0;
asshowSlides();

function asshowSlides() {
  let i;
  let asslides = document.getElementsByClassName("asmySlides");
  for (i = 0; i < asslides.length; i++) {
    asslides[i].style.display = "none";
  }
  asslideIndex++;
  if (asslideIndex > asslides.length) {asslideIndex = 1}
  asslides[asslideIndex-1].style.display = "block";
  setTimeout(asshowSlides, 2000); // Change image every 2 seconds
}