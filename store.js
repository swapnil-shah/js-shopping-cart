import items from './items.json'
import { addToCart } from './shopping-cart'
import addGlobalEventListener from './util/addGlobalEventListener.js'

import formatCurrency from './util/formatCurrency.js'
const storeItemTemplate = document.querySelector('#store-item-template')
const storeItemContainer = document.querySelector('[data-store-container]')
const IMAGE_URL = "https://dummyimage.com/420x260"

export function setUpStore() {
  if (storeItemContainer == null) return
  addGlobalEventListener("click", '[data-add-to-cart-button]', e => {
    const id = e.target.closest('[data-store-item]').dataset.itemId
    addToCart(parseInt(id))
  })
  items.forEach(item => renderStoreItem(item))
}

function renderStoreItem(item) {
  const storeItem = storeItemTemplate.content.cloneNode(true)
  const container = storeItem.querySelector('[data-store-item]')
  container.dataset.itemId = item.id
  const image = storeItem.querySelector('[data-image]');
  image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`
  const name = storeItem.querySelector('[data-name]')
  name.innerText = item.name
  const category = storeItem.querySelector('[data-category]')
  category.innerText = item.category
  const price = storeItem.querySelector('[data-price]')
  price.innerText = formatCurrency(item.priceCents / 100)
  storeItemContainer.appendChild(storeItem)
}