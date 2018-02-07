$('.pagination a').each(function () {
    var text = +$(this).text();
    if (0 < text)$(this).text(('0' + text).slice(-2));
});
