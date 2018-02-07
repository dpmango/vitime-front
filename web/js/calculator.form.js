$(document).ready(function () {
    /***********************************************
     Vars
     ***********************************************/

    $("#example-form").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        autoFocus: true,
        transitionEffectSpeed: 500,
        labels: {
            cancel: "Отменить",
            finish: "Расчитать",
            next: "Следующий шаг",
            previous: "Предыдущий шаг"
        },
        onFinished: function (event, currentIndex) {
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            var lineForm = $('.wizard > .content');
            var numForm = $('#num_form');
            if (currentIndex == '0') {
                lineForm.removeClass('step1 step2 step3');
                lineForm.addClass('step1');
                numForm.text('1/3');

            }
            if (currentIndex == 1) {
                lineForm.removeClass('step1 step2 step3');
                lineForm.addClass('step2');
                numForm.text('2/3');
            }
            if (currentIndex == 2) {
                lineForm.removeClass('step1 step2 step3');
                lineForm.addClass('step3');
                numForm.text('3/3');
            }
        }
    });

    $('form#calculator-form a').click(function () {
        if (this.hash == "#finish") {
            $('form#calculator-form').submit();
        }
    });

    /***********************************************
     Form Calculate and Email
     ***********************************************/
    var sendInProgress = false;
    var resultBlock = $('#result_block');
    $('form#calculator-form').submit(function () {
        if (sendInProgress) return false;
        sendInProgress = true;
        $('#response-wr').removeClass('success-sent').removeClass('error-sent').html('');
        resultBlock.html('');
        var form = $(this);
        $.ajax({
            url: form.attr('action'),
            type: 'post',
            data: form.serialize(),
            success: function (response) {
                var responseClass;
                if (response.calc) {
                    //form.find('input[type=text], textarea, select').val('');
                    resultBlock.html(response.data);
                    resultBlock.addClass('visible');
                    $('html, body').animate({
                        'scrollTop':   resultBlock.offset().top
                    }, 300);
                } else {
                    responseClass = 'error';
                }
                $('#response-wr').addClass(responseClass + '-sent').html('<p>' + response.errors + '</p>');
            },
            complete: function (response) {
                console.log(response);
                sendInProgress = false;
            }
        });
        return false;
    });

    $('form#send-mail-form').submit(function () {
        if (sendInProgress) return false;
        sendInProgress = true;
        $('#response-wr').removeClass('success-sent').removeClass('error-sent').html('');
        $('#send-mail-body').val('<div class="container">' + $('#table-calc-title').html() + '{FORM}' + $('form#calculator-form').serialize() + '{FORM}' + $('#table-calc').html() + '</div>');
        var form = $(this);
        $.ajax({
            url: form.attr('action'),
            type: 'post',
            data: form.serialize(),
            success: function (response) {
                var responseClass;
                if (response.sent) {
                    responseClass = 'success';
                } else {
                    responseClass = 'error';
                }
                $('#response-wr').addClass(responseClass + '-sent').html('<p>' + response.text + '</p>');
            },
            complete: function (response) {
                console.log(response);
                $('.remodal-close').click();
                sendInProgress = false;
            }
        });
        return false;
    });

    /***********************************************
     Help
     ***********************************************/
    $(document).on("click", ".help-fig", function (e) {
        var id = $(this).attr("data-help");
        var str = '#' + id;
        viewHelp(str, $(this));
        // $('.help-body.active').removeClass('active');


    });
    function viewHelp(str, obj) {
        if (!obj.hasClass('visit')) {
            obj.addClass('visit hover-active');
            var cloneObj = $(str).clone();
            var cl = cloneObj.appendTo(obj);
            setTimeout(function () {
                cl.addClass('active');
            }, 200)
        } else {
            $(str).toggleClass('active');
            obj.toggleClass('hover-active');
        }

    }

    $(document).mouseup(function (e) {
        var div = $(".help-fig");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            $('.help-body').removeClass('active');
            $('.help-fig').removeClass(('hover-active'));
        }
    });
    /***********************************************
     Error Close
     ***********************************************/
    $('#response-wr').click(function () {
        $(this).removeClass('error-sent success-sent');
        setTimeout(function () {
            $(this).removeClass('error-sent success-sent');
        },1400);
    });
    /***********************************************
     Print Page
     ***********************************************/
    $('#print-menu').click(function () {
        $('#result_block').printThis({
            importStyle: true,
            pageTitle: "www.vitime.pro Брось вызов себе! Будь всегда в форме. Vitime Sport - продукты для поддержки организма до, во время и после тренировок"
        });
    });
    /***********************************************
     Test Высоты блока меню #table-calc
     ***********************************************/
   /* $('#table-cal-lk').click(function () {
        $('#result_block').toggleClass('visible ');
    });*/
});