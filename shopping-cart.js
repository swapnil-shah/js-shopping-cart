
import items from './items.json'
import formatCurrency from './util/formatCurrency.js'
const cartButton = document.querySelector('[data-cart-button]')
const cartItemsWrapper = document.querySelector('[data-cart-items-wrapper]')
const cartItemsContainer = document.querySelector('[data-cart-items]')
const cartItemTemplate = document.querySelector('#cart-item-template')
const IMAGE_URL = "https://dummyimage.com/210x130"
let shoppingCart = []
export function setUpShoppingCart() { }
// Remove items from cart
// show hide the cart button when no items or when it goed from 0 to 1
// persist across multiple pages
// calculate accurate total

// show hide the cart when clicked
cartButton.addEventListener('click', () => {
  cartItemsWrapper.classList.toggle('invisible')
})
export function addToCart(id) {
  shoppingCart.push({ id: id, quantity: 1 })
  renderCart(shoppingCart)
}
function renderCart(shoppingCart) {
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
    console.log(cartItem.querySelector('[data-quantity]'))

    const quantity = cartItem.querySelector('[data-quantity]')
    quantity.innerText = `x${entry.quantity}`

    const price = cartItem.querySelector('[data-price]')
    price.innerText = formatCurrency(item.priceCents * entry.quantity / 100)

    cartItemsContainer.appendChild(cartItem)
  })
}
// Add items to Cart
  // Handle click event for adding
  // Handle multiple of the same item in the cart
  // Calculate accurate total