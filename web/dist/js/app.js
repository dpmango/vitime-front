var startIndexTxt;$(document).ready(function(){function e(){TweenLite.to(i,2,{progress:1,ease:Linear.easeNone})}function t(){loadingProgress=Math.round(100*i.progress()),$(".txt-perc").text(loadingProgress+"%")}function o(){return fooSt?l.to(s,1.2,{scale:1,ease:Power1.easeInOut,onComplete:function(){startIndexTxt().startH1.textillate("start"),startIndexTxt().startH3.textillate("start")}}):l.to($(".progress"),.3,{y:100,autoAlpha:0,ease:Back.easeIn}).to($(".txt-perc"),.3,{y:100,autoAlpha:0,ease:Back.easeIn},.1).to(c,1,{yPercent:100,autoAlpha:0,ease:Power1.easeOut},"-=0.1").to(s,1.2,{scale:1,ease:Power1.easeInOut,onComplete:function(){startIndexTxt().startH1.textillate("start"),startIndexTxt().startH3.textillate("start")}}),l}function n(){var e=1,t=$(".menu-container"),o=new ScrollMagic.Controller,n=new ScrollMagic.Scene({triggerElement:"#trigger-m",reverse:!0,triggerHook:0,offset:-200}).setClassToggle(".menu-container","scroll").addTo(o).on("update",function(o){"REVERSE"==o.target.controller().info("scrollDirection")?e&&(t.addClass("open-menuT"),e=0):e||(t.removeClass("open-menuT"),e=1)}),a=new ScrollMagic.Scene({triggerElement:"#trigger-m",reverse:!0,triggerHook:0}).setClassToggle(".menu-container","menu-vis").addTo(o);$(window).on("resize",function(e){$(window).width()<1023&&o.enabled()?(o.enabled(!1),n.enabled(!1),a.enabled(!1)):o.enabled()||(o.enabled(!0),n.enabled(!0),a.enabled(!0))})}function a(){return $(window).width()}function r(){function e(){$(".svg-hd-sec").each(function(e,o){for(var n=$(o).find("path"),a=0;a<n.length;a++)$(n[a]).css("stroke-dasharray",t(n[a])),$(n[a]).css("stroke-dashoffset",t(n[a]))})}function t(e){return e.getTotalLength()}function o(e){for(var t=$(e).find("path"),o=0;o<t.length;o++)(new TimelineMax).add(TweenMax.to(t[o],2,{strokeDashoffset:0,ease:Linear.easeNone,onComplete:function(){}}))}function n(){o($(".svg-hd-sec"))}e(),setTimeout(n,1e3)}var l=new TimelineMax,c=$("#preloader"),s=$("#scale"),i=new TimelineMax({paused:!0,onUpdate:t,onComplete:o});l.set(s,{scale:1.02,ease:Power1.easeOut}),fooSt?o():e(),i.to($(".progress span"),1,{width:100,ease:Linear.easeNone}),a()>=1023&&n(),(startIndexTxt=function(){var e={startH1:$(".fotorama__active .index-tlt-logo").textillate({autoStart:!1,in:{loop:!1,effect:"fadeInLeftBig",delayScale:1,delay:80,callback:function(){}}}),startH3:$(".fotorama__active .sub-tlt-sl").textillate({autoStart:!1,in:{loop:!1,effect:"fadeIn",delayScale:1,delay:60,callback:function(){}}})};return e})();var d=new ScrollMagic.Controller;$(".anim-block").each(function(e,t){new ScrollMagic.Scene({triggerElement:t,triggerHook:.85}).on("start",function(){$(t).addClass("active")}).addTo(d)}),$(document).on("click",".lk-ser",function(e){var t=$("#search-wr");t.toggleClass("active")}),$(".svg-hd-sec")&&r(),$(".open-menu-top").click(function(){}),$("#toggle").click(function(){$(this).toggleClass("active"),$("#overlay").toggleClass("open")}),BYYD.init(),$(window).scroll(function(){$(this).scrollTop()>600?$("#wr-scroller").addClass("active"):$("#wr-scroller").removeClass("active")}),$("#scroller").click(function(){return $("body,html").animate({scrollTop:0},500),!1});var u=$("#consent-visitor input"),g=$("[data-remodal-id=modal-visitor]").remodal(),f=$("[data-remodal-id=modal]").remodal();$(document).on("click",".remodal-cancel-in-l",function(e){g.close(),u.removeAttr("checked"),f.close()}),$(document).on("click",".remodal-confirm-in-r",function(e){g.close(),u.removeAttr("checked"),u.attr("checked","checked"),u.trigger("click"),f.open()})});