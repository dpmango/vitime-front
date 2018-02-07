/***********************************************
 Animate News
 ***********************************************/
var controllerNews = new ScrollMagic.Controller();
$(".check-anim").each(function (index, elem) {
    new ScrollMagic.Scene({
        triggerElement: elem,
        triggerHook: 0.6
    })
        .on('start', function () {
            $(elem).addClass('active');
        })
        .addTo(controllerNews);
});
/***********************************************
 Read More
 ***********************************************/
$('.news-list article').readmore({
    speed: 300,
    moreLink: '<span><span class="read-more down">открыть</span></span>',
    lessLink: '<span><span class="read-more up">свернуть</span></span>',
    collapsedHeight: 190,
    beforeToggle: function () {
        $(".equalHeight").setEqualHeight();
    },
    afterToggle: function () {
        $(".equalHeight").setEqualHeight();
    }
});

/***********************************************

 ***********************************************/
$.fn.setEqualHeight = function () {
    var $this = this;
    if ($(window).width() > 768) {
        $this.each(function (index, elem) {
            var maxHeight = 0;
            $(this).children('.equal').each(function () {
                if ($(this).innerHeight() > maxHeight)
                    maxHeight = $(this).innerHeight();
            });
            $(elem).children('.equal-pr').height(maxHeight);
        });
    }
};
$(".equalHeight").setEqualHeight();

$(window).on("resize", function () {
    $(".equalHeight").setEqualHeight();
}).trigger('resize');
//$(window).triggerHandler("resize");
