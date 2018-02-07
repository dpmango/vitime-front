$(btFaqsMore).click(function (e) {
    e.preventDefault();
    if (btFaqsMoreOff) return false;
    //$(this).hide(600);
    var formValues = $('form#filter-questions').serialize();
    $.get('/vopros-otvet/?page=' + nextPage + '&' + formValues, function (response) {
        // $(btFaqsMore).show();
        $('#question-list').append(response);
    });
});
$('form#filter-questions input').prop('checked', false);
$('form#filter-questions').change(function () {
    btFaqsMoreOff = false;
    $(btFaqsMore).text('Показать ещё');
    var formValues = $(this).serialize();
    $.get('/vopros-otvet/?page=1&' + formValues, function (response) {
        $('#question-list').html(response);
    });
});
