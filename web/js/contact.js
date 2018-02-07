define('contact', ['captcha'], function () {
    return {
        init: function () {
            $('#contactform-verifycode-image').yiiCaptcha({
                "refreshUrl": "https://vitime.pro/site/captcha?refresh=1",
                "hashKey": "yiiCaptcha/site/captcha"
            });
            $('#captcha-bt').click(function () {
                $(this).fadeOut().fadeIn();
                $('#contactform-verifycode-image').click();
            });
            $('#contact-form').submit(function () {
                $('#response-wr').removeClass('success-sent').removeClass('error-sent').html('');
                var form = $(this);
                $.ajax({
                    url: form.attr('action'),
                    type: 'post',
                    data: form.serialize(),
                    success: function (response) {
                        var responseClass;
                        if (response.sent) {
                            form.find('input[type=text], textarea').val('');
                            responseClass = 'success';
                        } else {
                            $('#contactform-verifycode-image').click();
                            responseClass = 'error';
                        }
                        $('#response-wr').addClass(responseClass + '-sent').html(response.text);
                    }
                });
                return false;
            });
        }
    };
});
