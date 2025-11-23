// === Lista completa de productos con categoría, unidad, stock y promo ===
const products = [
  { id: 1, name: "Manzana", price: 3000, description: "Manzana fresca", image: "public/manzana.jpg", category: "Fruta", unit: "libra", stock: 10, promo: false },
  { id: 2, name: "Plátano", price: 2000, description: "Plátano maduro", image: "public/platano.jpg", category: "Fruta", unit: "libra", stock: 15, promo: true },
  { id: 3, name: "Aguacate", price: 4500, description: "Aguacate cremoso", image: "public/aguacate.jpg", category: "Fruta", unit: "unidad", stock: 12, promo: false },
  { id: 4, name: "Tomate", price: 3500, description: "Tomate rojo fresco", image: "public/tomate.jpg", category: "Verdura", unit: "libra", stock: 8, promo: false },
  { id: 5, name: "Arándanos", price: 6000, description: "Arándanos importados", image: "public/arandanos.jpg", category: "Fruta", unit: "libra", stock: 5, promo: true },
  { id: 6, name: "Sandía", price: 8000, description: "Sandía dulce", image: "public/sandia.jpg", category: "Fruta", unit: "unidad", stock: 7, promo: false },
  { id: 7, name: "Piña", price: 9000, description: "Piña tropical", image: "public/piña.jpg", category: "Fruta", unit: "unidad", stock: 6, promo: true },
  { id: 8, name: "Fresas", price: 4000, description: "Fresas rojas y dulces", image: "public/fresas.jpg", category: "Fruta", unit: "libra", stock: 10, promo: false },
  { id: 9, name: "Pera", price: 3200, description: "Pera jugosa", image: "public/pera.jpeg", category: "Fruta", unit: "libra", stock: 9, promo: false },
  { id: 10, name: "Naranja", price: 2800, description: "Naranja dulce", image: "public/naranja.jpeg", category: "Fruta", unit: "libra", stock: 12, promo: false },
  { id: 11, name: "Uvas", price: 5500, description: "Uvas frescas", image: "public/uvas.jpg", category: "Fruta", unit: "libra", stock: 4, promo: true },
  { id: 12, name: "Mango", price: 4000, description: "Mango maduro", image: "public/mango.jpg", category: "Fruta", unit: "unidad", stock: 8, promo: false },
  { id: 13, name: "Papaya", price: 6500, description: "Papaya dulce", image: "public/papaya.jpg", category: "Fruta", unit: "unidad", stock: 6, promo: true },
  { id: 14, name: "Limón", price: 1500, description: "Limón fresco", image: "public/limon.jpeg", category: "Fruta", unit: "libra", stock: 10, promo: false },
  { id: 15, name: "Lechuga", price: 2000, description: "Lechuga crujiente", image: "public/lechuga.jpeg", category: "Verdura", unit: "unidad", stock: 9, promo: false },
  { id: 16, name: "Zanahoria", price: 1800, description: "Zanahoria fresca", image: "public/zanahoria.jpeg", category: "Verdura", unit: "libra", stock: 11, promo: false },
  { id: 17, name: "Cebolla cabezona", price: 2200, description: "Cebolla fresca", image: "public/cebolla.jpeg", category: "Verdura", unit: "libra", stock: 10, promo: false },
  { id: 18, name: "Papa criolla", price: 2500, description: "Papa criolla amarilla", image: "public/papa_criolla.webp", category: "Verdura", unit: "libra", stock: 12, promo: true },
  { id: 19, name: "Brócoli", price: 3800, description: "Brócoli fresco", image: "public/brocoli.jpeg", category: "Verdura", unit: "unidad", stock: 5, promo: false },
  { id: 20, name: "Espinaca", price: 2000, description: "Espinaca verde", image: "public/espinaca.jpg", category: "Verdura", unit: "manojo", stock: 15, promo: false },
  { id: 21, name: "Pepino cohombro", price: 1800, description: "Pepino fresco", image: "public/pepino.jpeg", category: "Verdura", unit: "unidad", stock: 10, promo: false },
  { id: 22, name: "Ajo", price: 1200, description: "Ajo blanco", image: "public/ajos.jpeg", category: "Hierba", unit: "manojo", stock: 12, promo: false },
  { id: 23, name: "Banano", price: 2000, description: "Banano dulce", image: "public/banano.webp", category: "Fruta", unit: "libra", stock: 14, promo: true },
  { id: 24, name: "Maracuyá", price: 4000, description: "Maracuyá ácido", image: "public/maracuya.jpg", category: "Fruta", unit: "libra", stock: 8, promo: false },
  { id: 25, name: "Cilantro", price: 1000, description: "Cilantro fresco", image: "public/cilantro.png", category: "Hierba", unit: "manojo", stock: 0, promo: true },
  { id: 26, name: "Apio", price: 2500, description: "Apio fresco", image: "public/apio.jpg", category: "Hierba", unit: "manojo", stock: 10, promo: false },
  { id: 27, name: "Remolacha", price: 2000, description: "Remolacha roja", image: "public/remolacha.jpeg", category: "Verdura", unit: "libra", stock: 6, promo: false }
];

let cart = [];

// === Contenedores ===
const productsGrid = document.getElementById("products-grid");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

// === Renderizar productos ===
function renderProducts(list = products) {
  productsGrid.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    // Badge de promoción si aplica
    const promoBadge = product.promo ? `<span class="promo-badge">PROMO</span>` : "";

    // Stock
    const stockText = product.stock === 0 ? `<span class="out-stock">Agotado</span>` : `<span>Disponible: ${product.stock} ${product.unit}</span>`;
    const disabledBtn = product.stock === 0 ? "disabled" : "";

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-overlay"></div>
        ${promoBadge}
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">$${product.price.toLocaleString()} / ${product.unit}</span>
          <input type="number" min="1" max="${product.stock}" value="1" class="product-quantity" id="qty-${product.id}" ${disabledBtn}>
          <button class="btn-add" onclick="addToCart(${product.id})" ${disabledBtn}>Agregar</button>
        </div>
        <small>${stockText}</small>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// === Filtrado por categoría ===
function filterProducts(category) {
  if(category.toLowerCase() === "todos") {
   renderProducts(); // Al cargar la página
  } else {
    const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    renderProducts(filtered);
  }
}

// === Carrito ===
function toggleCart() {
  cartModal.classList.toggle("active");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if(product.stock === 0) {
    alert("Este producto está agotado 😔");
    return;
  }

  // Buscar si ya está en el carrito
  const cartItem = cart.find(item => item.id === id);

  if(cartItem) {
    // Aumentar cantidad solo si no excede stock
    if(cartItem.quantity < product.stock) {
      cartItem.quantity++;
    } else {
      alert("No hay más stock disponible 😔");
    }
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}


function updateCart() {
  cartItemsContainer.innerHTML = "";

  if(cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">Tu carrito está vacío</p>`;
  } else {
    cart.forEach((item, index) => {
      const totalPrice = item.price * item.quantity;
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.image}" class="cart-item-image">
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-quantity">Cantidad: ${item.quantity}</p>
          <p class="cart-item-price">Total: $${totalPrice.toLocaleString()}</p>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${index})">Eliminar</button>
      `;
      cartItemsContainer.appendChild(div);
    });
  }

  // Actualizar contador y total general
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  cartTotal.textContent = `$${total.toLocaleString()}`;
}


function removeFromCart(index) {
  if(cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function checkout() {
  if(cart.length === 0) {
    alert("El carrito está vacío 🛒");
    return;
  }
  alert("¡Compra realizada con éxito! 🥑🍎🥦");
  clearCart();
}
// === Combos especiales ===
const combos = [
  {
    id: 1,
    name: "Combo Frutas Tropicales",
    price: 15000,
    description: "Manzana, Piña y Mango",
    products: [1, 7, 12], // IDs de los productos
    image: "public/combo1.jpg"
  },
  {
    id: 2,
    name: "Combo Verduras Frescas",
    price: 12000,
    description: "Lechuga, Zanahoria y Pepino",
    products: [15, 16, 21],
    image: "public/combo2.webp"
  },
  {
    id: 3,
    name: "Combo Saludable",
    price: 18000,
    description: "Aguacate, Arándanos y Cilantro",
    products: [3, 5, 25],
    image: "public/combo3.jpg"
  }
];const promotionsGrid = document.getElementById("promotions-grid");

function renderPromotions() {
  promotionsGrid.innerHTML = "";

  const promos = products.filter(p => p.promo);

  promos.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-overlay"></div>
        <span class="promo-badge">PROMO</span>
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
    promotionsGrid.appendChild(card);
  });
}

renderPromotions();
const combosGrid = document.getElementById("combos-grid");

function renderCombos() {
  combosGrid.innerHTML = "";

  combos.forEach(combo => {
    const comboCard = document.createElement("div");
    comboCard.classList.add("product-card");

    // Mostrar nombre de los productos del combo
    const comboProducts = combo.products.map(id => {
      const prod = products.find(p => p.id === id);
      return prod ? prod.name : "";
    }).join(", ");

    comboCard.innerHTML = `
      <div class="product-image">
        <img src="${combo.image}" alt="${combo.name}">
        <div class="product-overlay"></div>
        <span class="promo-badge">COMBO</span>
      </div>
      <div class="product-info">
        <h3 class="product-name">${combo.name}</h3>
        <p class="product-description">${combo.description} (${comboProducts})</p>
        <div class="product-footer">
          <span class="product-price">$${combo.price.toLocaleString()}</span>
          <button class="btn-add" onclick="addComboToCart(${combo.id})">Agregar Combo</button>
        </div>
      </div>
    `;
    combosGrid.appendChild(comboCard);
  });
}

renderCombos();
function addComboToCart(comboId) {
  const combo = combos.find(c => c.id === comboId);
  if(!combo) return;

  // Guardamos como un producto especial en el carrito
  cart.push({ 
    id: `combo-${combo.id}`, 
    name: combo.name, 
    price: combo.price, 
    quantity: 1, 
    image: combo.image,
    isCombo: true
  });

  updateCart();
}