
import items from './items.json'
import formatCurrency from './util/formatCurrency.js'
import addGlobalEventListener from './util/addGlobalEventListener.js'

const cartButton = document.querySelector('[data-cart-button]')
const cartItemsWrapper = document.querySelector('[data-cart-items-wrapper]')
const cartItemsContainer = document.querySelector('[data-cart-items]')
const cartItemTemplate = document.querySelector('#cart-item-template')
const cartQuantity = document.querySelector('[data-cart-quantity]')
const cartTotal = document.querySelector('[data-cart-total]')
const cart = document.querySelector('[data-cart]')

const IMAGE_URL = "https://dummyimage.com/210x130"
let shoppingCart = []
export function setUpShoppingCart() {
  addGlobalEventListener("click", '[data-remove-from-cart-button]', e => {
    const id = e.target.closest('[data-item]').dataset.itemId
    removeFromCart(parseInt(id))
  })
  renderCart()
}
// Remove items from cart
// show hide the cart button when no items or when it goed from 0 to 1
// persist across multiple pages
// calculate accurate total
// show hide the cart when clicked
cartButton.addEventListener('click', () => {
  cartItemsWrapper.classList.toggle('invisible')
})

// Add items to Cart
export function addToCart(id) {
  // Handle multiple of the same item in the cart
  const existingItem = shoppingCart.find(entry => entry.id === id)
  if (existingItem) {
    existingItem.quantity++
  }
  else {
    shoppingCart.push({ id: id, quantity: 1 })
  }
  renderCart()
}
// Remove items from cart
function removeFromCart(id) {
  const existingItem = shoppingCart.find(entry => entry.id === id)
  if (existingItem == null) return
  shoppingCart = shoppingCart.filter(entry => entry.id !== id)
  renderCart()
}
// show hide the cart button when no items or when it goed from 0 to 1
function renderCart() {
  if (shoppingCart.length == 0) {
    hideCart()
  } else {
    showCart()
    renderCartItems()
  }
}
function hideCart() {
  cart.classList.add("invisible")
  cartItemsWrapper.classList.add("invisible")

}
function showCart() {
  cart.classList.remove("invisible")
}

function renderCartItems() {

  cartQuantity.innerHTML = shoppingCart.length //Cart Badge number

  //Calculate Total in the cart
  const totalCents = shoppingCart.reduce((sum, entry) => {
    const item = items.find(i => entry.id === i.id)
    return sum + item.priceCents * entry.quantity
  }, 0)
  cartTotal.innerHTML = formatCurrency(totalCents / 100)


  cartItemsContainer.innerHTML = ""
  shoppingCart.forEach(entry => {
    const item = items.find(i => entry.id === i.id)
    const cartItem = cartItemTemplate.content.cloneNode(true)

    const container = cartItem.querySelector('[data-item]')
    container.dataset.itemId = item.id

    const name = cartItem.querySelector('[data-name]')
    name.innerText = item.name

    const image = cartItem.querySelector('[data-image]')
    image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`

    if (entry.quantity > 1) {
      const quantity = cartItem.querySelector('[data-quantity]')
      quantity.innerText = `x${entry.quantity}`
    }

    const price = cartItem.querySelector('[data-price]')
    price.innerText = formatCurrency(item.priceCents * entry.quantity / 100)

    cartItemsContainer.appendChild(cartItem)
  })
}



  // Calculate accurate total