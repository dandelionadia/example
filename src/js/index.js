var menuItems = document.querySelectorAll('.menu__item')

menuItems.forEach(function (menuItem) {
  menuItem.addEventListener('click', function (event) {
    var clickedItem = event.currentTarget;
    clickedItem.classList.toggle('menu__item--open');
    // debugger
  })
})