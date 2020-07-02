$(function () {

    // init typist
    new Typist(document.querySelector(".typist"), {
        letterInterval: 60,
        textInterval: 1000
    });

    // init feather icons
    feather.replace();

    $('#current-year').html(new Date().getFullYear());

    //scrollspy init
    $('body').scrollspy({target: '#navbar'});

    // init tooltip & popovers
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    //page scroll
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000);
        event.preventDefault();
    });

    //toggle scroll menu
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        //adjust menu background
        if (window.innerWidth < 768) {
            $('.sticky-navigation').removeClass('sticky-top').addClass('fixed-top');
        } else {
            $('.sticky-navigation').removeClass('fixed-top').addClass('sticky-top');
        }

        // adjust scroll to top
        if (scroll >= 600) {
            $('.scroll-top').addClass('active');
        } else {
            $('.scroll-top').removeClass('active');
        }
        return false;
    });

    // scroll top top
    $('.scroll-top').click(function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1000);
    });

    // init slick slider
    $('.slick-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    $('.slick-users').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false
    });


    //i18n

    var lang = 'en';

    /**Theme switcher - DEMO PURPOSE ONLY s*/
    // $('.switcher-trigger').click(function () {
    //     $('.switcher-wrap').toggleClass('active');
    // });
    // $('.color-switcher ul li').click(function () {
    //     var color = $(this).attr('data-color');
    //     $('#theme-color').attr("href", "css/" + color + ".css");
    //     $('.color-switcher ul li').removeClass('active');
    //     $(this).addClass('active');
    // });

    $(window).on("load",function() {

        // get the form elements defined in your form HTML above
        
        var form = document.getElementById("contact-form");
        var button = document.getElementById("contact-button");
        var status = document.getElementById("contact-status");
    
        // Success and Error functions for after the form is submitted
        
        function success() {
            form.reset();
            button.style = "display: none ";
            status.innerHTML = "Thanks! I'll contact you as soon as possible.";
            status.hidden = false;
        }
    
        function error() {
            status.innerHTML = "Oops! There was a problem.";
            status.hidden = false;
        }
    
        // handle the form submission event
    
        form.addEventListener("submit", function(ev) {
          ev.preventDefault();
          var data = new FormData(form);          
          var action = 'https://formspree.io/xwkrngwn';
          ajax('POST', action, data, success, error);
        });

      });
      
      // helper function for sending an AJAX request
    
      function ajax(method, url, data, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function() {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;
          if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
          } else {
            error(xhr.status, xhr.response, xhr.responseType);
          }
        };
        xhr.send(data);
      }
});