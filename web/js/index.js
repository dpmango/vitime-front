$(document).ready(function () {
    /***********************************************
     Animate Icons Main Page
     ***********************************************/
    function pathPrepareCss() {
        $(".svg-index").each(function (index, elem) {
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

    function animateSvgLine(el) {
        var arrLinePath = $(el).find('path.line-svg');
        var arLine = $(el).find('path.line-svg-ar');
        for (var s = 0; s < arrLinePath.length; s++) {
            new TimelineMax()
                .add(TweenMax.to(arrLinePath[s], 0.5, {
                    strokeDashoffset: 0, ease: Linear.easeNone, onComplete: function () {
                        new TimelineMax().add(TweenMax.to(arLine, 0.1, {
                            strokeDashoffset: 0, ease: Linear.easeNone
                        }));
                    }
                }));
        }
    }

    function animateSvgPath(el) {
        var arrPath = $(el).find('path:not(.line-svg,.line-svg-ar)');
        for (var i = 0; i < arrPath.length; i++) {
            new TimelineMax()
                .add(TweenMax.to(arrPath[i], 0.8, {
                    strokeDashoffset: 0, ease: Linear.easeNone, onComplete: function () {
                        animateSvgLine(el);
                    }
                }));
        }
    }

    /***********************************************
     Animate SVG Main Page
     ***********************************************/
    var controllerSvg = new ScrollMagic.Controller();

    $(".svg-index").each(function (index, elem) {
        new ScrollMagic.Scene({
            triggerElement: elem,
            triggerHook: 0.6,
            reverse: false
        }).on('start', function () {
            animateSvgPath(elem);
        })
            .addTo(controllerSvg);
        // .addIndicators();
    });
    /***********************************************
     Rotate TXT end Animation Block
     ***********************************************/
    var controllerRotate = new ScrollMagic.Controller();
    $(".name-rotate").each(function (index, elem) {
        new ScrollMagic.Scene({
            triggerElement: elem,
            triggerHook: 0.6
        })
            .on('start', function () {
                $(elem).addClass('active');
            })
            .addTo(controllerRotate);
        //.addIndicators();
    });

    /***********************************************
     Triangle
     ***********************************************/
    function setBorderWidth() {
        $(window).on("resize", function () {
            var wS = $(window).width();
            $('.triangle-left').css("borderLeftWidth", wS + 'px');
            $('.triangle-right').css("borderRightWidth", wS + 'px');
        }).trigger('resize');
    }

    setBorderWidth();


    /***********************************************
     Fotorama center Animation
     ***********************************************/
    var controllerFotCen = new ScrollMagic.Controller();

    new ScrollMagic.Scene({triggerElement: "#fot-center", triggerHook: 0.9, reverse: false})
        .on('start', function () {
            fotoramaCenter(1);
        })
        .addTo(controllerFotCen);
//
    /***********************************************
     Init Fotorama Header
     ***********************************************/
    function fotoramaIndex(h, n, num) {
        var fotoramaClass = $('.fotorama');
        if (0 == fotoramaClass.length) return false;
        var $fotoramaDiv = fotoramaClass.fotorama();
        var fotorama = $fotoramaDiv.data('fotorama');
        //Set Height
        if (h || n) {
            fotorama.resize({
                height: h
            });
        }
        //Set Animation TXT
        fotoramaClass.on(
            'fotorama:show fotorama:showend',
            function (e, fotorama) {
                if (e.type == 'fotorama:show') {
                    // startIndexTxt().startH1.textillate('start');
                    // startIndexTxt().startH3.textillate('start');

                } else {
                    startIndexTxt().startH1.textillate('start');
                    startIndexTxt().startH3.textillate('start');
                }
            }
        );
        //Slider Active
        if (num) {
            fotorama.show(num);
            //  console.log(num);

        }

    }

    //Init TXT Animation
    fotoramaIndex();
    //Nav Class Fotorama
    $(function () {
        $(".fotorama__nav__frame--dot").each(function (index) {
            $(this).addClass('num-sl' + index);
            $(this).children().text('0' + (index + 1));
            if (+index == 5) {
                $('.fotorama__nav__shaft').after('<div class="ar-sl ar-sl-r" data-slide=">"></div>')
            }
        });
    });
    $(document).on("click", ".ar-sl", function (e) {
        var index = $(this);
        var num = index.attr('data-slide');
        fotoramaIndex(false, false, num);

    });

    /***********************************************
     Slider Set Height //
     ***********************************************/

    function setOptionFotorama() {
        $(window).on("resize", function () {
            var wS = $(window).width();
            if (wS > 1023) {
                fotoramaIndex(600);
            }
            if (wS > 768 && wS <= 1023) {
                fotoramaIndex(550);
                fotoramaCenter('', '', '', 500);
            }
            if (wS >= 640 && wS <= 768) {
                fotoramaIndex(500);
                fotoramaCenter('', '', '', 450);
            }
            if (wS < 640) {
                fotoramaIndex(480);
                fotoramaCenter('', '', '', 350);
            }
        }).trigger('resize');
    }

    setOptionFotorama();
    /***********************************************
     Fotorama Center
     ***********************************************/

    function fotoramaCenter(index, option, next, h) {
        var fotoramaClass = $('.fotorama-cen');
        if (0 == fotoramaClass.length) return false;
        var $fotoramaDiv = fotoramaClass.fotorama();
        var fotorama = $fotoramaDiv.data('fotorama');
        fotoramaClass.on(
            'fotorama:show fotorama:showend',
            function (e, fotorama) {
                setClaccNavCen(false, fotorama.activeIndex);
            }
        );
        //Slider Active
        if (index) {
            fotorama.show(index);

        }
        //Set Height
        if (h) {
            fotorama.resize({
                height: h
            });
        }

    }

    fotoramaCenter();
    function setClaccNavCen(e, active) {
        var navCen = $('.nav-list-cen');
        navCen.find('li').removeClass('active');
        if (e) {
            e.addClass('active');
        }
        if (active || active == 0) {
            navCen.find('li[data-slide=' + active + ']').addClass('active');
        }
    }

    $(document).on("click", ".nav-list-cen li:not('.arrow-cen')", function (e) {
        var index = $(this);
        if (!index.hasClass('active')) {
            var num = index.attr('data-slide');
            fotoramaCenter(num);
            setClaccNavCen($(this), false);
        }

    });
    $(document).on("click", ".nav-list-cen li.arrow-cen", function (e) {
        var index = $(this);
        if (!index.hasClass('active')) {
            var num = index.attr('data-slide');
            fotoramaCenter(num);
        }

    });
    /***********************************************
     Video
     ***********************************************/
    $('.venobox').venobox();

    /***********************************************
     Change packing images
     ***********************************************/
    $(document).on("click", ".link-change", function (e) {
        var $this = $(this);
        var imgNav = $this.find('.nav-change-product');
        var parentImg = $this.parent().parent();
        var change_product_main = parentImg.find('.change-product-main');
        var imgSrcNav = change_product_main.attr('src');
        change_product_main.addClass('hide-change-img');
        imgNav.addClass('hide-change-img');
        setTimeout(
            function () {
                change_product_main.attr('src',imgNav.attr('src')).removeClass('hide-change-img');
                imgNav.attr('src',imgSrcNav).removeClass('hide-change-img');
            }
        ,200);

    });

});