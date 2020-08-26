const $ = el => document.querySelector(el),
    $$ = (el, key) => document.getElementsByClassName(el)[key],
    all = el => document.querySelectorAll(el);

let i = 0,
    left = 100;

let playSliderRooms = (type) => {
    if (type === 'left') {
        i = i === 0 ? 2 : i - 1;
    } else {
        i = i === 2 ? 0 : i + 1;
    }

    $('.rooms__slid--active').style.opacity = 0;

    setTimeout(() => {
        $('.rooms__slid--active').classList.remove('rooms__slid--active');
        $('.rooms__point--active').classList.remove('rooms__point--active');
        $$('rooms__slid', i).style.opacity = 1;

        $$('rooms__slid', i).classList.add('rooms__slid--active');
        $$('rooms__point', i).classList.add('rooms__point--active');
    }, 800)
};

let playSliderReviews = (type) => {
    if (type === 'left') {
        left = left === 100 ? 100 : left + 567
    } else {
        left = left === -1034 ? -1034 : left - 567
    }

    $('.reviews__slider').style.marginLeft = left + 'px';
    $('.reviews__point--active').classList.remove('reviews__point--active');
    $$('reviews__point', -Math.round(left / 567)).classList.add('reviews__point--active');
};

ymaps.ready(function () {
    var myMap = new ymaps.Map('map__block', {
        center: [59.938635, 30.323118],
        zoom: 16.4
    });

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Собственный значок метки',
        balloonContent: 'Это красивая метка'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/cat.png',
        iconImageSize: [70, 100],
        iconImageOffset: [-25, 0]
    }),

        myMap.geoObjects
            .add(myPlacemark)
});

all('.navigation__link').forEach(el => {
    el.addEventListener('click', (e) => {
        let url = el.attributes["href"].value.split('#');
        if (url[0] !== "./index.html") {
            e.preventDefault();
            let block = $(`#${url[1]}`);

            window.scrollTo({
                behavior: "smooth",
                top: block.offsetTop,
                left: 0
            })
        }
    }, true)
});

function selectOpen() {
    $('.select__value').style.display = 'none';
    $('.select__options').style.display = 'block';
}

function selectChange(value, index) {
    $$('select__option', index).innerHTML = $$('select__option', 0).innerText;
    $$('select__option', index).attributes[1].value = `selectChange("${$$('select__option', 0).innerText}", ${index})`

    $$('select__text', 1).innerText = value;
    $$('select__option', 0).attributes[1].value = `selectChange("${value}", 0)`;

    $('.select__options').style.display = 'none';
    $$('select__text', 0).innerText = value;
    $('.select__value').style.display = 'flex';
}

all('.price__input').forEach((el, index) => {
    el.addEventListener('input', (e) => {
        if(String(e.data) || Number(e.data)){
            if(isNaN(parseFloat(e.data))){
                el.value = el.value.slice(0, -1);
            }
        }

        el.value = `${index === 0 ? 'от' : 'до'} ${e.target.value.split(' ')[1] ? e.target.value.split(' ')[1] : ''}`
    });
});