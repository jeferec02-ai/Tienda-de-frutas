// Datos de productos
const products = [
  {
    id: 1,
    name: "Mango",
    description: "Mango fresco y jugoso",
    price: 8500,
    image: "mango.jpg",
    organic: true,
  },
  {
    id: 2,
    name: "Fresas",
    description: "Fresas orgánicas dulces",
    price: 12000,
    image: "fresas.jpg",
    organic: true,
  },
  {
    id: 3,
    name: "Aguacate",
    description: "Aguacate cremoso",
    price: 6500,
    image: "aguacate.jpg",
    organic: false,
  },
  {
    id: 4,
    name: "Piña",
    description: "Piña tropical dulce",
    price: 9000,
    image: "pina.jpg",
    organic: true,
  },
  {
    id: 5,
    name: "Arándanos",
    description: "Arándanos frescos",
    price: 15000,
    image: "arandanos.jpg",
    organic: true,
  },
  {
    id: 6,
    name: "Sandía",
    description: "Sandía jugosa y refrescante",
    price: 7500,
    image: "sandia.jpg",
    organic: false,
  },
]

// Carrito
const cart = []

// Formatear precio
function formatPrice(price) {
  return `$${price.toLocaleString("es-CO")}`
}

// Renderizar productos
function renderProducts() {
  const grid = document.getElementById("products-grid")

  products.forEach((product, index) => {
    const card = document.createElement("div")
    card.className = "product-card"
    card.style.animationDelay = `${index * 0.1}s`

    card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay"></div>
                ${product.organic ? '<div class="product-badge">Orgánico</div>' : ""}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="btn-add" onclick="addToCart(${product.id})">
                        Agregar
                    </button>
                </div>
            </div>
        `

    grid.appendChild(card)
  })
}

// Agregar al carrito
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  cart.push(product)
  updateCartCount()
  updateCartView()

  // Animación de feedback
  const cartElement = document.querySelector(".cart")
  cartElement.style.transform = "scale(1.2)"
  setTimeout(() => {
    cartElement.style.transform = "scale(1)"
  }, 200)

  showNotification("Producto agregado al carrito")
}

// Actualizar contador del carrito
function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length
}

function toggleCart() {
  const modal = document.getElementById("cart-modal")
  modal.classList.toggle("active")
  updateCartView()
}

function updateCartView() {
  const cartItemsContainer = document.getElementById("cart-items")
  const cartTotal = document.getElementById("cart-total")

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>'
    cartTotal.textContent = "$0"
    return
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (product, index) => `
        <div class="cart-item">
            <img src="${product.image}" alt="${product.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${product.name}</div>
                <div class="cart-item-price">${formatPrice(product.price)}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">
                Eliminar
            </button>
        </div>
    `,
    )
    .join("")

  const total = cart.reduce((sum, product) => sum + product.price, 0)
  cartTotal.textContent = formatPrice(total)
}

function removeFromCart(index) {
  cart.splice(index, 1)
  updateCartCount()
  updateCartView()
  showNotification("Producto eliminado del carrito")
}

function clearCart() {
  if (cart.length === 0) return

  if (confirm("¿Estás seguro de vaciar el carrito?")) {
    cart.length = 0
    updateCartCount()
    updateCartView()
    showNotification("Carrito vaciado")
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío")
    return
  }

  const total = cart.reduce((sum, product) => sum + product.price, 0)
  alert(`¡Gracias por tu compra!\nTotal: ${formatPrice(total)}\n\nEn una tienda real, aquí se procesaría el pago.`)
  clearCart()
  toggleCart()
}

function showNotification(message) {
  const notification = document.createElement("div")
  notification.textContent = message
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 2000;
    animation: slideIn 0.3s ease;
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease"
    setTimeout(() => notification.remove(), 300)
  }, 2000)
}

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  renderProducts()
})
