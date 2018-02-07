$(document).ready(function () {
    $.fn.yiiCaptcha = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.yiiCaptcha');
            return false;
        }
    };

    var defaults = {
        refreshUrl: undefined,
        hashKey: undefined
    };

    var methods = {
        init: function (options) {
            return this.each(function () {
                var $e = $(this);
                var settings = $.extend({}, defaults, options || {});
                $e.data('yiiCaptcha', {
                    settings: settings
                });

                $e.on('click.yiiCaptcha', function () {
                    methods.refresh.apply($e);
                    return false;
                });

            });
        },

        refresh: function () {
            var $e = this,
                settings = this.data('yiiCaptcha').settings;
            $.ajax({
                url: 'https://vitime.pro/site/captcha/?refresh=1',//$e.data('yiiCaptcha').settings.refreshUrl,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                dataType: 'json',
                cache: false,
                success: function (data) {
                    $e.attr('src', data.url);
                    $('body').data(settings.hashKey, [data.hash1, data.hash2]);
                },
                error : function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        },

        destroy: function () {
            return this.each(function () {
                $(window).unbind('.yiiCaptcha');
                $(this).removeData('yiiCaptcha');
            });
        },

        data: function () {
            return this.data('yiiCaptcha');
        }
    };


    /***********************************************
     Form
     ***********************************************/

    $('#contact-form').yiiActiveForm([{
        "id": "contactform-name",
        "name": "name",
        "container": ".field-contactform-name",
        "input": "#contactform-name",
        "error": ".help-block.help-block-error",
        "validate": function (attribute, value, messages, deferred, $form) {
            yii.validation.required(value, messages, {"message": "Необходимо заполнить «Имя»"});
        }
    }, {
        "id": "contactform-email",
        "name": "email",
        "container": ".field-contactform-email",
        "input": "#contactform-email",
        "error": ".help-block.help-block-error",
        "validate": function (attribute, value, messages, deferred, $form) {
            yii.validation.required(value, messages, {"message": "Необходимо заполнить «E-mail»"});
            yii.validation.email(value, messages, {
                "pattern": /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
                "fullPattern": /^[^@]*<[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?>$/,
                "allowName": false,
                "message": "Значение «E-mail» не является правильным email адресом",
                "enableIDN": false,
                "skipOnEmpty": 1
            });
        }
    }, {
        "id": "contactform-subject",
        "name": "subject",
        "container": ".field-contactform-subject",
        "input": "#contactform-subject",
        "error": ".help-block.help-block-error",
        "validate": function (attribute, value, messages, deferred, $form) {
            yii.validation.required(value, messages, {"message": "Необходимо заполнить «Выберите тему»"});
        }
    }, {
        "id": "contactform-body",
        "name": "body",
        "container": ".field-contactform-body",
        "input": "#contactform-body",
        "error": ".help-block.help-block-error",
        "validate": function (attribute, value, messages, deferred, $form) {
            yii.validation.required(value, messages, {"message": "Необходимо заполнить «Сообщение»"});
        }
    }, {
        "id": "contactform-verifycode",
        "name": "verifyCode",
        "container": ".field-contactform-verifycode",
        "input": "#contactform-verifycode",
        "error": ".help-block.help-block-error",
        "validate": function (attribute, value, messages, deferred, $form) {
            yii.validation.captcha(value, messages, {
                "hash": 316,
                "hashKey": "yiiCaptcha/site/captcha",
                "caseSensitive": false,
                "message": "Неправильный код"
            });
        }
    }], []);

    $('#contactform-verifycode-image').yiiCaptcha({
        "refreshUrl": "\/site\/captcha?refresh=1",
        "hashKey": "yiiCaptcha\/site\/captcha"
    });

    $('#contactform-verifycode-image').click();

    var sendInProgress = false;
    $('form#contact-form').submit(function () {
        if (sendInProgress) return false;
        sendInProgress = true;
        $('#response-wr').removeClass('success-sent').removeClass('error-sent').html('');
        var form = $(this);
        $.ajax({
            url: form.attr('action'),
            type: 'post',
            data: form.serialize(),
            success: function (response) {
                sendInProgress = false;
                //console.debug(response);
                var responseClass;
                if (response.sent) {
                    form.find('input[type=text], textarea, select').val('');
                    responseClass = 'success';
                } else {
                    $('#contactform-verifycode-image').click();
                    responseClass = 'error';
                }
                $('#response-wr').addClass(responseClass + '-sent').html('<p>' + response.text + '</p>');
                if (responseClass == 'success') {
                   setTimeout(function(){
                       closeTopSend();
                   },1500);
                }
            }
        });
        return false;
    });

    $('form#contact-form input').focus( function(){
        $(this).next().next().text('');
        $(this).parent().parent().removeClass('has-error');
    });

    $('#captcha-bt').click(function () {
        $(this).fadeOut().fadeIn();
        $('#contactform-verifycode-image').click();
    });
    /***********************************************
     Form Label
     ***********************************************/
    (function ($) {
        function floatLabel(inputType) {
            $(inputType).each(function () {
                var $this = $(this);
                $this.focus(function () {
                    $this.next().addClass("active");
                });
                $this.blur(function () {
                    closeTopSend();
                    if ($this.val() === '' || $this.val() === 'blank') {
                        $this.next().removeClass();
                    }
                });
            });
        }

        floatLabel(".form-control");
    })(jQuery);
    /***********************************************
     width Input
     ***********************************************/
    $(document).on("click", "#response-wr", function (e) {
        closeTopSend();
    });
    function closeTopSend() {
        $('#response-wr').removeClass('success-sent').removeClass('error-sent');
    }
    $(window).on("resize", function () {

    });
});

