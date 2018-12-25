var menuItems = document.querySelectorAll('.menu__item')

menuItems.forEach(function (menuItem) {
  menuItem.addEventListener('click', function (event) {
    var clickedItem = event.currentTarget;
    var isOpen = clickedItem.classList.contains('menu__item--open');
    resetMenuClasses(menuItems);
    if (!isOpen) {
      clickedItem.classList.add('menu__item--open');
    } 
    // debugger
  })
})

function resetMenuClasses(items) {
  items.forEach(function(item) {
    item.classList.remove('menu__item--open');
  })
}