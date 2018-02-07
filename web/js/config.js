requirejs.config({
    // baseUrl: '/',
    shim: {
        'pjax': {"deps": ['jquery']},
        'fotorama': {"deps": ['jquery']},
        'textillate': {"deps": ['jquery']},
        'index': {"deps": ['app', 'fotorama','modal']},
        'matchHeight': {'deps': ['jquery']},
        'modal': {'deps': ['jquery']},
        'TweenMax': {'deps': ['jquery']},
        'app': {'deps': ['jquery', 'matchHeight','textillate']}
    },
    paths: {
        'jquery': '/vendor/bower/jquery/dist/jquery.min',
        'pjax': '/js/pjax',
        'fotorama': '/dist/js/fotorama',
        'scroolly': '/js/scroolly/jquery.scroolly.min',
        'TweenMax': "/js/greensock/src/minified/TweenMax.min",
       // 'TweenLite': "/js/greensock/src/minified/TweenLite.min",
        'CSSPlugin': "/js/greensock/src/minified/plugins/CSSPlugin.min",
        'TimelineLite': "/js/greensock/src/minified/TimelineLite.min",
        'TimelineMax': "/js/greensock/src/minified/TimelineMax.min",
        'ScrollToPlugin': '/js/greensock/src/minified/plugins/ScrollToPlugin.min',
        //ScrollMagic
        'ScrollMagic': '/vendor/bower/scrollmagic/scrollmagic/minified/ScrollMagic.min',
        'GSAP': '/vendor/bower/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min',
        'ScrollMagic.debug': '/vendor/bower/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min',
        //Snap SVG
        // 'Snap': '/js/Snap/dist/snap.svg-min',
        //textillate
        'textillate': '/dist/js/textillate_all.min',
        //Height
        'matchHeight': '/vendor/bower/matchHeight/jquery.matchHeight-min',
        //Modal
        'modal':'/vendor/bower/remodal/dist/remodal.min',
        'index': '/dist/js/index',
        'product': '/js/products',
        'app': '/js/app',
        // Yii captcha
        'captcha': '/js/yii/yii.captcha'
    }
});
define(['jquery','TweenMax', 'fotorama', 'pjax', 'app'], function ($,TweenMax, fotorama, pjax) {
    //Init Pjax
     $(document).pjax('a.pjax-l', '#main-content');

    //Init Script Page
    requirePageScript();
    //Success Pjax
    $(document).on('pjax:success', function (data, content) {
        requirePageScript();
    });


    /***********************************************
     Test
     ***********************************************/
/*    if ($.support.pjax) {
        $(document).on('click', 'a.pjax-load', function (event) {
            var container = $(this).closest('[data-pjax-container]');
            event.preventDefault();
            var url = $(this).attr('href');
            var $main = $('#main-content');
            // $main.after($main.clone().attr('id', 'clone'));
            // $('#clone').css('z-index', 600);
            // $body.css('overflow', 'hidden');
            $main.before($(this).clone().attr('id', 'clone'));
            $(this).children().addClass('active');
            var allDr = $(".sec-w:not('.active')");
            console.log(allDr);
            TweenMax.to(allDr, 2, {
                opacity: 0.6, ease: Power2.easeInOut, onComplete: function () {
                    // applyFilters(url)
                }
            });
            // $.pjax.click(event, {container: container})
        })
    }*/
    $(document).on('pjax:end', function (e) {
        /*   TweenMax.to($('#main-content'), 2, {opacity:0, ease:Power2.easeInOut,onComplete:function(){
         }});*/
        /*  TweenMax.to($('#clone'), 2, {opacity:0, ease:Power2.easeInOut,onComplete:function(){
         $('#clone').remove();
         TweenMax.to($('#main-content'), 1, {opacity:1, ease:Power2.easeInOut,onComplete:function(){
         $('#clone').remove();
         }});
         }});*/

        //$('body').css('overflow', 'auto');
    });
    function applyFilters(url) {
        $.pjax({url: url, container: '#main-content', scrollTo: 1})
    }
});


function requirePageScript() {
    var pageName = $('section[data-pjax]').data('pjax');
    require([pageName], function (Module) {
        if ('contact' == pageName) Module.init();
    });
}

/*define(function (require) {


 });*/
/*require(['jquery', 'pjax'], function (pjax) {
 console.log(4);

 });*/
/*require(['jquery'],function($){
 require(['pjax'],function(pjax){
 $(document).pjax('#menu a', '#main');
 });

 });*/
/*
 require(['fotorama'], function ($, fotorama) {
 });*/
