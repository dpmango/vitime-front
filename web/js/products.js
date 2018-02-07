/***********************************************
 Animate Icons Main Page
 ***********************************************/
function pathPrepareCss() {
    $(".svg-comp").each(function (index, elem) {
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
            .add(TweenMax.to(arrPath[i], 1.5, {
                strokeDashoffset: 0, ease: Linear.easeNone, onComplete: function () {
                    $(el).addClass('active');
                }
            }));
    }
}

/***********************************************
 Animate SVG Main Page
 ***********************************************/
var controllerSvg = new ScrollMagic.Controller();

$(".svg-comp").each(function (index, elem) {
    new ScrollMagic.Scene({
        triggerElement: elem,
        triggerHook: 0.8,
        reverse: false
    }).on('start', function () {
        animateSvgPath(elem);

    })
        .addTo(controllerSvg);
});


/***********************************************
 Triangle
 ***********************************************/
function setBorderWidthBg() {
    $(window).on("resize", function () {
        var el = $('.comp-dr');
        // var h = e.innerHeight();
        var wS = $(window).width();
        el.each(function (e) {
            var h = el.innerHeight();
            var bg = el.children('.af-sec-line-bor');
            bg.css("borderLeftWidth", wS + 'px');
            bg.css("borderBottomWidth", h + 'px');
        });
        // $('.triangle-left').css("borderLeftWidth", wS + 'px');
        // $('.triangle-right').css("borderRightWidth", wS + 'px');
    }).trigger('resize');
}

setBorderWidthBg();
/***********************************************
 Animate Block end Check
 ***********************************************/
var controllerAnimateBlock = new ScrollMagic.Controller();
$(".img-scale-bl").each(function (index, elem) {
    new ScrollMagic.Scene({
        triggerElement: elem,
        triggerHook: 0.85
    })
        .on('start', function () {
            $(elem).addClass('active');
        })
        .addTo(controllerAnimateBlock);
    //.addIndicators();
});
$(".check-anim").each(function (index, elem) {
    new ScrollMagic.Scene({
        triggerElement: elem,
        triggerHook: 0.5
    })
        .on('start', function () {
            $(elem).addClass('active');
        })
        .addTo(controllerAnimateBlock);
    //.addIndicators();
});
$(".check-anim-c").each(function (index, elem) {
    new ScrollMagic.Scene({
        triggerElement: elem,
        triggerHook: 0.8
    })
        .on('start', function () {
            $(elem).addClass('active');
        })
        .addTo(controllerAnimateBlock);
    //.addIndicators();
});
$(".num-art").each(function (index, elem) {
    new ScrollMagic.Scene({
        triggerElement: elem,
        triggerHook: 0.6
    })
        .on('start', function () {
            $(elem).addClass('active');
        })
        .addTo(controllerAnimateBlock);
    //.addIndicators();
});
/***********************************************
 Animate Img
 ***********************************************/
$(".filter-img").each(function (index, elem) {
    new ScrollMagic.Scene({
        triggerElement: elem,
        triggerHook: 0.85
    })
        .on('start', function () {
            $(elem).addClass('active');
        })
        .addTo(controllerAnimateBlock);
});
//Random Fn
function randomInteger(min, max) {
    var rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    return rand;
}
function animateChekCard(n) {
    var ste = 0;
    if (n == 0) {
        ste = 100;
    } else {
        ste = n * 100 + 300;
    }
    return ste;
}
/***********************************************
 Link Product
 ***********************************************/
var owl = $('.owl-carousel');
owl.owlCarousel({
    loop: false,
    margin: 10,
    nav: false,
    // autoHeight:true,
    // autoHeightClass: 'item',
    responsive: {
        0: {
            items: 1
        },
        480: {
            items: 3
        },
        768: {
            items: 4
        },
        1023: {
            items: 5
        }
    }
});
owl.on('changed.owl.carousel', function (event) {
    var itemsNav = $('.owl-dot');
    if (3 > itemsNav.length) {
        itemsNav.removeClass('active');
        var itemActive = 0 == event.item.index ? 0 : 1;
        itemsNav.eq(itemActive).addClass('active');
    }
});
$(function () {
    $('.owl-carousel .item').matchHeight({
        //target: $('.sidebar')
    });
});
/***********************************************
 Parallax Section
 ***********************************************/
var controllerParallax = new ScrollMagic.Controller();
var questionScene = new ScrollMagic.Scene({
    triggerElement: '.divert',
    triggerHook: 0.6
    //reverse: false
}).setTween(".parall-sec", 1.5, {y: "20%", ease: Power0.easeNone}, '-=1.5')
    .addTo(controllerParallax);
var question = $('.divert');
$(window).on("resize", function () {
    questionScene.duration(question.innerHeight() + 100);
}).trigger('resize');
$(window).triggerHandler("resize");
/***********************************************
 3D Carousel
 ***********************************************/
$(document).ready(function () {
    $(function () {
        var has3D = $("div").is("#showcase");
        //console.log(has3D);
        if (has3D) {
            var showcase = $("#showcase");
            var title = $('#item-title'), icon3D = $('#ic-3d');
            showcase.Cloud9Carousel({
                yRadius: -50,
                //xRadius:500,
                buttonLeft: $(".nav-3d-left"),
                buttonRight: $(".nav-3d-right"),
                autoPlay: 0,
                bringToFront: true,
                speed: 2,
                onRendered: rendered,
                onLoaded: function () {
                    showcase.css('visibility', 'visible');
                    showcase.css('display', 'none');
                    showcase.fadeIn(900);

                },
                onAnimationFinished: function () {
                    var indexActiveItem = showcase.data("carousel").nearestIndex();
                    if (indexActiveItem == 2 || indexActiveItem == 1) {
                        setTimeout(function () {
                            removepuls3DHelp();
                        }, 4000);
                    }
                }
            });
            function rendered(carousel) {
                var activeItem = showcase.data("carousel").nearestItem();
                title.html('<span>' + carousel.nearestItem().element.alt + '</span>');
                removeClassAll();
                //removepuls3DHelp();

                $(activeItem.element).addClass('active3D');
                // Fade in based on proximity of the item
                var c = Math.cos((carousel.floatIndex() % 1) * 2 * Math.PI);
                title.css('opacity', 0.5 + (0.5 * c));
                icon3D.css('opacity', 0.5 + (0.5 * c));
            }

            function startSlide3D() {
                if (showcase.data("carousel").nearestItem() !== undefined) {
                    showcase.data("carousel").go(1);
                }

            }

            function removeClassAll() {
                var all3D = $('.cloud9-item');
                all3D.removeClass('active3D');

            }

            function puls3DHelp() {
                var effekt = $('.effekt');
                effekt.addClass('replay');
            }

            function removepuls3DHelp() {
                var effekt = $('.effekt');
                effekt.removeClass('replay');
            }

            $('.img-pac').click(function () {
                removepuls3DHelp();
            });
            //
            // Simulate physical button click effect
            //
            /* $('.nav-3d_button').click(function (e) {
             var b = $(e.target).addClass('down');
             setTimeout(function () {
             b.removeClass('down')
             }, 80)
             });*/
            $(document).keydown(function (e) {
                //
                // More codes: http://www.javascripter.net/faq/keycodes.htm
                //
                switch (e.keyCode) {
                    /* left arrow */
                    case 37:
                        $('.nav-3d-left').click();
                        break;
                    /* right arrow */
                    case 39:
                        $('.nav-3d-right').click();
                }
            });
            //Resize
            (function () {
                var THRESHOLD = 450;
                var timeoutId;
                var resizing = false;
                var win = $(window);

                win.on('resize', function () {
                    var timeout = function () {
                        clearTimeout(timeoutId);

                        timeoutId = setTimeout(function () {
                            resizing = false;
                            win.trigger('resizeEnd');
                            showcase.Cloud9Carousel({
                                yRadius: -50,
                                //xRadius:500,
                                buttonLeft: $(".nav-3d-left"),
                                buttonRight: $(".nav-3d-right"),
                                autoPlay: 0,
                                bringToFront: true,
                                speed: 2,
                                onRendered: rendered,
                                onLoaded: function () {
                                    showcase.css('visibility', 'visible');
                                    showcase.css('display', 'none');
                                    showcase.fadeIn(900);

                                },
                                onAnimationFinished: function () {
                                    var indexActiveItem = showcase.data("carousel").nearestIndex();
                                    if (indexActiveItem == 2 || indexActiveItem == 1) {
                                        setTimeout(function () {
                                            removepuls3DHelp();
                                        }, 4000);
                                    }
                                }
                            });
                        }, THRESHOLD);
                    };

                    if (!resizing) {
                        resizing = true;
                        win.trigger('resizeStart');
                        showcase.data("carousel").deactivate();
                    }

                    timeout();
                });
            }());
            /***********************************************
             Animate 3D
             ***********************************************/
            new ScrollMagic.Scene({
                triggerElement: '#forma-3d',
                triggerHook: 0.6,
                reverse: false
            })
                .on('start', function () {
                    startSlide3D();
                    setTimeout(function () {
                        puls3DHelp();
                    }, 300);
                })
                .addTo(controllerAnimateBlock);
        }
    });
});

