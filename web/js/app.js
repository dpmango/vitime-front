var startIndexTxt;
$(document).ready(function () {
    /***********************************************
     Preloader
     ***********************************************/
    var preloaderOutTl = new TimelineMax();
    var preload = $('#preloader');
    var hedIndex = $('#scale');
    var progressTl = new TimelineMax({paused: true, onUpdate: progressUpdate, onComplete: loadComplete});

    preloaderOutTl.set(hedIndex, {scale: 1.02, ease: Power1.easeOut});

    function loadProgress() {
        TweenLite.to(progressTl, 2, {progress: 1, ease: Linear.easeNone});

    }

    /***********************************************
     Start Page
     ***********************************************/
    if (!fooSt) {
        loadProgress();
    } else {
        loadComplete();
    }
// loadProgress();
    progressTl
    //tween the progress bar width
        .to($('.progress span'), 1, {width: 100, ease: Linear.easeNone});

//as the progress bar witdh updates and grows we put the precentage loaded in the screen
    function progressUpdate() {
        loadingProgress = Math.round(progressTl.progress() * 100);
        $(".txt-perc").text(loadingProgress + '%');

    }

    function loadComplete() {
        if (!fooSt) {
            preloaderOutTl
                .to($('.progress'), 0.3, {y: 100, autoAlpha: 0, ease: Back.easeIn})
                .to($('.txt-perc'), 0.3, {y: 100, autoAlpha: 0, ease: Back.easeIn}, 0.1)
                //.to(preload, 0.7, {yPercent: 100, autoAlpha: 0, ease: Power4.easeInOut})
                .to(preload, 1, {yPercent: 100, autoAlpha: 0, ease: Power1.easeOut}, '-=0.1')
                // .set(preload, {className: '+=is-hidden'})
                .to(hedIndex, 1.2, {
                    scale: 1, ease: Power1.easeInOut, onComplete: function () {
                        startIndexTxt().startH1.textillate('start');
                        startIndexTxt().startH3.textillate('start');

                    }
                });
        } else {
            preloaderOutTl
                .to(hedIndex, 1.2, {
                    scale: 1, ease: Power1.easeInOut, onComplete: function () {
                        startIndexTxt().startH1.textillate('start');
                        startIndexTxt().startH3.textillate('start');

                    }
                });
        }
        return preloaderOutTl;
    }

    /***********************************************
     Menu BG Scroll Fixed
     ***********************************************/

    function menuScrollBg() {
        var fl = 1;
        var menu = $('.menu-container');
        var controllerMenu = new ScrollMagic.Controller();
        var sceneMenu = new ScrollMagic.Scene({
            triggerElement: "#trigger-m",
            reverse: true,
            triggerHook: 0,
            offset: -200
        })
            .setClassToggle('.menu-container', "scroll")
            .addTo(controllerMenu)
            .on("update", function (e) {
                if (e.target.controller().info("scrollDirection") == 'REVERSE') {
                    if (fl) {
                        menu.addClass('open-menuT');
                        fl = 0;
                        // console.log(6);
                    }
                } else {
                    if (!fl) {
                        menu.removeClass('open-menuT');
                        fl = 1;
                        // console.log(7);
                    }

                }
                // console.log(e.target.controller().info("scrollDirection"));
            });
        var sceneMenu2 = new ScrollMagic.Scene({triggerElement: "#trigger-m", reverse: true, triggerHook: 0})
            .setClassToggle('.menu-container', "menu-vis")
            .addTo(controllerMenu);


        $(window).on("resize", function (e) {
            if ($(window).width() < 1023 && controllerMenu.enabled()) {
                controllerMenu.enabled(false);
                sceneMenu.enabled(false);
                sceneMenu2.enabled(false);
            } else if (!controllerMenu.enabled()) {
                controllerMenu.enabled(true);
                sceneMenu.enabled(true);
                sceneMenu2.enabled(true);
            }
        });

    }

    //Init Menu Fixed
    if (getWidthScreen() >= 1023) {
        menuScrollBg();
    }
    /***********************************************
     Resize Header
     ***********************************************/
    //getWidthScreen();
    function getWidthScreen() {
        // console.log($(window).width());
        return $(window).width();

    }

    /***********************************************
     Navigation Hover Container
     ***********************************************/
    /* $("li.has-sub").hover(
     function () {
     $('#fon-hover-menu').addClass('active');
     }, function () {
     $('#fon-hover-menu').removeClass('active');
     }
     );*/
    /***********************************************
     Page Animsition
     ***********************************************/
    /* $(".animsition").animsition({
     inClass: 'fade-in',
     outClass: 'fade-out',
     inDuration: 250,
     outDuration: 50,
     linkElement: '.animsition-link',
     // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
     loading: true,
     loadingParentElement: 'body', //animsition wrapper element
     loadingClass: 'animsition-loading',
     loadingInner: '', // e.g '<img src="loading.svg" />'
     timeout: false,
     timeoutCountdown: 1000,
     onLoadEvent: true,
     browser: ['animation-duration', '-webkit-animation-duration'],
     // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
     // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
     overlay: false,
     overlayClass: 'animsition-overlay-slide',
     overlayParentElement: 'body',
     transition: function (url) {
     window.location.href = url;
     }
     });*/

    /***********************************************
     Reset Link
     ***********************************************/
    /* $(document).on('click', 'a:not(.animsition-link)', function (event) {
     event.preventDefault();
     var inst = $('[data-remodal-id=modal]').remodal();
     inst.open();
     $('body').addClass('demo');

     });*/
    /***********************************************
     TXT Animate
     ***********************************************/
    startIndexTxt = function () {
        var obgTXT = {
            startH1: $('.fotorama__active .index-tlt-logo').textillate({
                autoStart: false,
                in: {
                    loop: false,
                    effect: 'fadeInLeftBig',
                    // effect: 'fadeIn',
                    delayScale: 1,
                    delay: 80,
                    callback: function () {
                        // console.log(5);
                        //subTltSl.textillate('start');
                    }
                }
            }),
            startH3: $('.fotorama__active .sub-tlt-sl').textillate({
                autoStart: false,
                in: {
                    loop: false,
                    effect: 'fadeIn',
                    delayScale: 1,
                    delay: 60,
                    callback: function () {
                        //  console.log(6);
                    }
                }
            })
        };
        return obgTXT;
    };

    startIndexTxt();
    /***********************************************
     Animation Block All
     ***********************************************/
    var controllerAllBlock = new ScrollMagic.Controller();
    $(".anim-block").each(function (index, elem) {
        new ScrollMagic.Scene({
            triggerElement: elem,
            triggerHook: 0.85
        })
            .on('start', function () {
                $(elem).addClass('active');
            })
            .addTo(controllerAllBlock);
        //.addIndicators();
    });
    /***********************************************
     Search Link
     ***********************************************/
    $(document).on('click', '.lk-ser', function (event) {
        var ser = $('#search-wr');
        ser.toggleClass('active');

    });
    /***********************************************
     Animate SVG Header Section
     ***********************************************/
    function animateSvgHeader() {
        function pathPrepareCss() {
            $(".svg-hd-sec").each(function (index, elem) {
                var arrAllPath = $(elem).find('path');
                for (var i = 0; i < arrAllPath.length; i++) {
                    $(arrAllPath[i]).css("stroke-dasharray", getSvgPath(arrAllPath[i]));
                    $(arrAllPath[i]).css("stroke-dashoffset", getSvgPath(arrAllPath[i]));
                }
            });
        }

        pathPrepareCss();

        function getSvgPath(el) {
            return el.getTotalLength();
        }


        function animateSvgPath(el) {
            var arrPath = $(el).find('path');
            for (var i = 0; i < arrPath.length; i++) {
                new TimelineMax()
                    .add(TweenMax.to(arrPath[i], 2, {
                        strokeDashoffset: 0, ease: Linear.easeNone, onComplete: function () {

                        }
                    }));
            }
        }

        /***********************************************
         Animate SVG Start
         ***********************************************/
        function stHeadSvg() {
            animateSvgPath($('.svg-hd-sec'));
        }

        setTimeout(stHeadSvg, 1000);

    }

    if ($('.svg-hd-sec')) {
        animateSvgHeader();
    }
    /***********************************************
     Open Menu
     ***********************************************/
    function openMenuMobile() {
        var wrapperContentMenu = $('.menu-container');
        var menuMain = $("#trigger-menu-mobile");
        var menuNav = $('.menu .nav-list');
        //var openBtnTop = $(".nav-icon");
        //openBtnTop.toggleClass("open");
        menuMain.toggleClass("open");
        wrapperContentMenu.toggleClass("mobile");
        menuNav.toggleClass("mobile");

    }

    $('.open-menu-top').click(function () {
        //console.log(1);
        //openMenuMobile();
    });
    $('#toggle').click(function() {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
    });

    /* statistics BYYD */
    BYYD.init();

    /***********************************************
    Scroll Up
    ***********************************************/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            //$('#wr-scroller').fadeIn();
            $('#wr-scroller').addClass('active');
        } else {
            // $('#wr-scroller').fadeOut();
            $('#wr-scroller').removeClass('active');
        }
    });
    $('#scroller').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
    /***********************************************

    ***********************************************/
    var checkItem = $('#consent-visitor input');
    var inst = $('[data-remodal-id=modal-visitor]').remodal();
    var inst2 = $('[data-remodal-id=modal]').remodal();
    $(document).on("click", '.remodal-cancel-in-l', function (e) {
        inst.close();
        checkItem.removeAttr("checked");
        //checkItem.removeClass('active');
        inst2.close();
    });
    $(document).on("click", '.remodal-confirm-in-r', function (e) {
        inst.close();
        checkItem.removeAttr("checked");
        checkItem.attr("checked","checked");
        // checkItem.addClass('active');
        checkItem.trigger('click');
        inst2.open();
    });
});

