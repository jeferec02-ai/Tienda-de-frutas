// === Lista de productos ===
const products = [
  {
    id: 1,
    name: "Fresas",
    price: 5500,
    description: "Fresas frescas y dulces, ideales para postres.",
    image: "fresas.jpg",
    badge: "Nuevo"
  },
  {
    id: 2,
    name: "Mango",
    price: 4200,
    description: "Mango maduro lleno de sabor tropical.",
    image: "mango.jpg",
    badge: "Oferta"
  },
  {
    id: 3,
    name: "Piña",
    price: 4800,
    description: "Piña jugosa y refrescante de cultivo local.",
    image: "pina.jpg"
  },
  {
    id: 4,
    name: "Sandía",
    price: 6000,
    description: "Sandía fresca y perfecta para los días calurosos.",
    image: "sandia.jpg"
  }
];

let cart = [];

// === Renderizar productos ===
const productsGrid = document.getElementById("products-grid");

function renderProducts() {
  productsGrid.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-overlay"></div>
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">$${product.price.toLocaleString()}</span>
          <button class="btn-add" onclick="addToCart(${product.id})">Agregar</button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}
renderProducts();

// === Funciones del carrito ===
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

function toggleCart() {
  cartModal.classList.toggle("active");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">Tu carrito está vacío</p>`;
  } else {
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <img src="${item.image}" class="cart-item-image" alt="${item.name}">
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">$${item.price.toLocaleString()}</p>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${index})">Eliminar</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  }

  cartCount.textContent = cart.length;
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  cartTotal.textContent = `$${total.toLocaleString()}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío 🛒");
    return;
  }
  alert("¡Gracias por tu compra! 🥝🍍");
  clearCart();
}
