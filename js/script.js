const $ = el => document.querySelector(el);
const $$ = (el, key) => document.getElementsByClassName(el)[key];
let i = 0;

let playSliderRooms = () => {
    setTimeout(() => {
        $('.rooms__slid--active').style.opacity = 0;
    },2100);

    i = i === 2 ? 0 : i + 1;

    $('.rooms__slid--active').classList.remove('rooms__slid--active');
    $('.rooms__point--active').classList.remove('rooms__point--active');
    $$('rooms__slid', i).style.opacity = 1;

    $$('rooms__slid', i).classList.add('rooms__slid--active');
    $$('rooms__point', i).classList.add('rooms__point--active');

    setTimeout(() => {
        playSliderRooms();
    }, 3000);
};

playSliderRooms();
