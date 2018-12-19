// var submenu = document.getElementsByClassName('menu__submenu');
// submenu.addEventListener('click', function () {
//   submenu.classList.toggle('open');
// })

var menuItems = document.querySelectorAll('.menu__item')

menuItems.forEach(function (menuItem) {
  menuItem.addEventListener('click', function (event) {
    var clickedItem = event.target;
    clickedItem.classList.toggle('menu__item--open');
  })
})