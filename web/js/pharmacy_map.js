var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;
        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push({value: str});
            }
        });
        cb(matches);
    };
};
var myPlCoor = new Array();
var myMap;
var objectsBounds;
function runPharmacyMap() {
    $('#geolocation').attr({checked: false});
    $('#local').val('Москва');
    $('.typeahead').typeahead({
            hint: false,
            highlight: true,
            minLength: 1
        },
        {
            name: 'local',
            displayKey: 'value',
            source: substringMatcher(locals)
        }).bind("typeahead:selected", function (obj, datum, name) {
            searchLocal(this.value);
        });


    ymaps.ready(init);

    $('#geolocation').change(function () {
        if (this.checked) getGeolocation();
    });

    $('#local').change(function () {
        if ('' != this.value) searchLocal(this.value);
    }).focus(function () {
        $(this).select();
    });
}

function init() {
    myMap = new ymaps.Map('pharmacy-map', {
        center: [55.76, 37.64], // Москва
        zoom: 14
    });

    /*firstButton = new ymaps.control.Button("Ближайшие аптеки");
     myMap.controls.add(firstButton, {float: 'left'});*/

    for (var key in pharmacies) {
        coor = pharmacies[key]['coordinates'].split(',');
        myPlCoor[key] = [coor[0], coor[1]];
        phone = pharmacies[key]['phone'] ? "<br>тел.:<b>" + pharmacies[key]['phone'] + "</b><br>Звоните, чтобы узнать о наличие<br>препаратов или для заказа" : "";
        myPlacemark = new ymaps.Placemark(myPlCoor[key], {
            balloonContentHeader: "<b>" + pharmacies[key]['company_id'] + "</b>",
            balloonContentBody: pharmacies[key]['city_id'] + "<br>" + pharmacies[key]['address'] + phone,
            balloonContentFooter: "<a href='#' onclick='printPharmacy(" + pharmacies[key]['id'] + "); return false;'><span class='redhex-svg25 balloon-print'></span></a>",
            hintContent: pharmacies[key]['company_id']
        }, {
            iconLayout: 'default#image',
            iconImageHref: '/img/dashboard/map-pr.png',
            iconImageSize: [26, 34],
            iconOffset: [-20, -15]
        });
        myMap.geoObjects.add(myPlacemark);
    }
    objectsBounds = myMap.geoObjects.getBounds();
    //Zoom при прокрутке
    myMap.behaviors.disable('scrollZoom');
    // myMap.copyrights.add('&copy; Vassily Poupkine');
}

function getGeolocation() {
    ymaps.geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
    }).then(function (result) {
        // Синим цветом пометим положение, полученное через браузер.
        // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        myMap.geoObjects.add(result.geoObjects);
        $('#local').val(result.geoObjects.get(0).properties.get('description'));
        var bounds = result.geoObjects.get(0).properties.get('boundedBy');
        console.log(bounds);
        $('#geolocation').attr({checked: false});
        setVisible(bounds);
    });
}

function searchLocal(local) {
    $('#local').blur();
    ymaps.geocode(local, {
        results: 1 // Если нужен только один результат, экономим трафик пользователей
    }).then(function (res) {
        // Выбираем первый результат геокодирования.
        var firstGeoObject = res.geoObjects.get(0),
        // Координаты геообъекта.
        //coords = firstGeoObject.geometry.getCoordinates(),
        // Область видимости геообъекта.
            bounds = firstGeoObject.properties.get('boundedBy');
        // Добавляем первый найденный геообъект на карту.
        //myMap.geoObjects.add(firstGeoObject);
        // Масштабируем карту на область видимости геообъекта.
        myMap.setBounds(bounds, {
            checkZoomRange: true // проверяем наличие тайлов на данном масштабе.
        });
        setVisible(bounds);
    });
}

function setVisible(bounds) {
    myMap.setBounds(bounds);
    var visible = false;
    var coorMap = bounds ? bounds : myMap.getBounds();
    var coorLeft;
    var coorBottom;
    var coorRight;
    var coorTop;
    while (!visible && 2 < myMap.getZoom()) {
        coorLeft = coorMap[0][0];
        coorBottom = coorMap[0][1];
        coorRight = coorMap[1][0];
        coorTop = coorMap[1][1];
        for (i = 0; i < myPlCoor.length; i++) {
            if (myPlCoor[i][0] > coorLeft && myPlCoor[i][0] < coorRight && myPlCoor[i][1] > coorBottom && myPlCoor[i][1] < coorTop) {
                visible = true;
                break;
            }
        }
        if (!visible) {
            myMap.setZoom(myMap.getZoom() - 2);
            coorMap = myMap.getBounds();
        }
    }
}

function printPharmacy(pharmacyId) {
    window.open('/apteka/print/' + pharmacyId, 'pharmacyPrint', 'width=650, height=780');
    return false;
}

runPharmacyMap();

