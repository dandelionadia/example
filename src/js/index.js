var menuItems = document.querySelectorAll('.menu__item')
var menuOpenClass = 'menu__item--open';
var menuMobItems = document.querySelectorAll('.menu-mobile__item')
var menuMobOpenClass = 'menu-mobile__item--open';

menuItems.forEach(function (menuItem) {
  menuItem.addEventListener('click', function (event) {
    // по замовчуванню всі події ідуть вгору
    // запобігаємо тому щоб боді реагував при кліку на лі
    event.stopPropagation();

    // змінна зберігає елемент лі на який нажали
    var clickedItem = event.currentTarget;

    // змінна перевіряж чи елемент лі на який надажали має цей клас
    var isOpen = clickedItem.classList.contains(menuOpenClass);

    // видаляємо клас у всіх лі
    resetMenuClasses(menuItems);

    if (!isOpen) {
      clickedItem.classList.add(menuOpenClass);
    }
  })
})

function resetMenuClasses(items) {
  items.forEach(function (item) {
    item.classList.remove(menuOpenClass);
  })
}

// change icon menu mob list
menuMobItems.forEach(function (menuMobItem) {
  menuMobItem.addEventListener('click', function (event) {
    event.stopPropagation();
    var clickedItemMob = event.currentTarget;
    var isOpenMob = clickedItemMob.classList.contains(menuMobOpenClass);
    resetMenuMobClasses(menuMobItems);

    if (!isOpenMob) {
      clickedItemMob.classList.add(menuMobOpenClass);
    }
  })
})

function resetMenuMobClasses(items) {
  items.forEach(function (item) {
    item.classList.remove(menuMobOpenClass);
  })
}

// click on the bottom menu-mob and opet window
document.body.addEventListener('click', function () {
  resetMenuClasses(menuItems);
})

var menuMobile = document.querySelector('.menu-mobile');
var menuBtn = document.querySelector('.menu-btn');

menuBtn.addEventListener('click', function () {
  menuMobile.classList.toggle('menu-mobile__open');
})

$(document).ready(function () {
  $('.carousel').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    adaptiveHeight: true
  });

  $('.carousel-slides').slick({
    dots: true,
    // autoplay: true,
    arrows: false,
    adaptiveHeight: true,
    speed: 600,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  });
});
