const cartButton = document.querySelector('[data-cart-button]')
const cartItemsWrapper = document.querySelector('[data-cart-items-wrapper]')
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
  renderCart()
}
function renderCart() {

}
// Add items to Cart
  // Handle click event for adding
  // Handle multiple of the same item in the cart
  // Calculate accurate total