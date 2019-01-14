var menuItems = document.querySelectorAll('.menu__item')
var menuOpenClass = 'menu__item--open';

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
  items.forEach(function(item) {
    item.classList.remove(menuOpenClass);
  })
}

document.body.addEventListener('click', function() {
  resetMenuClasses(menuItems);
}) 

var menuMobile = document.querySelector('.menu-mobile');
var menuBtn = document.querySelector('.menu-btn');

menuBtn.addEventListener('click', function() {
  menuMobile.classList.toggle('menu-mobile__open');
})