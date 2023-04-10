let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let applyDiscount = document.querySelector(".applyDiscount");
let discountAmount = document.querySelector(".discountValue");
let quantity = document.querySelector('.quantity');
openShopping.addEventListener('click', () => {
  body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
})
// Add products
let products = [
  {
    id: 1,
    name: 'Chunky Sneaker',
    image: 'sh.jpg',
    price: 1200
  },
  {
    id: 2,
    name: 'Casual Sneaker',
    image: 'sh3.jpg',
    price: 1500
  },
  {
    id: 3,
    name: 'Runner Sneaker',
    image: 'sh1.jpg',
    price: 2000
  },
  {
    id: 4,
    name: 'Canvas Sneaker',
    image: 'sh4.jpg',
    price: 1500
  },
  {
    id: 5,
    name: 'Light Grey Runner Sneaker',
    image: 'sh5.jpg',
    price: 1400
  },
  {
    id: 6,
    name: 'Runner High Top Sneaker',
    image: 'shh.jpg',
    price: 1200
  },
];
let listCards = JSON.parse(localStorage.getItem("data")) || [];
function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = `
        <img src="image/${value.image}"/>
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}</div>
        <button onclick="addToCard(${key})">Add To Card</button>
    `;
    list.appendChild(newDiv);
  })
  if (listCards.length > 0) {
    reloadCard();
  }
}
initApp();
function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  } else {
    listCards[key].quantity++;
  }
  reloadCard();
  updateLocalStorage();
}
function reloadCard() {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    if (value != null) {
      totalPrice = totalPrice + value.price;
      count = count + value.quantity;
      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
      <div><img src="image/${value.image}"/></div>
      <div>${value.name}</div>
      <div>${value.price.toLocaleString()}</div>
      <div>
      <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
      <div class="count">${value.quantity}</div>
      <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
      </div>` ;
      listCard.appendChild(newDiv);
    }
  })
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
    var percentageToSubtract = 5;
    discountAmount.innerText = totalPrice - (totalPrice * percentageToSubtract / 100);
  
 
}
function changeQuantity(key, quantity) {
  if (quantity == 0) {

    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
  updateLocalStorage();
}
function updateLocalStorage() {
  localStorage.setItem("data", JSON.stringify(listCards));
}

function applyDiscountCode(){
        var totalValue = total.innerText;
        var percentageToSubtract = 5;
        var result = totalValue - (totalValue * percentageToSubtract / 100);
        discountAmount.innerText = result;
   

}