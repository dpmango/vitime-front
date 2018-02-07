ymaps.ready(init);
var myMap,
    myPlacemark;

function init(){
    myMap = new ymaps.Map("contact-map", {
        center: [55.746949, 37.539481],
        zoom: 15
    });
    myMap.controls.add('zoomControl', {left: 5, top: 5});
    myPlacemark = new ymaps.Placemark([55.746949, 37.539481], {
        hintContent: 'ЗАО «АКВИОН»',
        balloonContent: '123317, г. Москва, ул. Пресненская набережная, д. 8., стр. 1 МФК «Город Столиц», Северный блок, башня Москва. 7 (495) 780-72-34'},
        {
        iconImageHref: '/img/contact/logo-map.png',
        iconImageSize: [50, 70]

    });

    myMap.geoObjects.add(myPlacemark);
}