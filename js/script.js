// ======================================================
// SCRIPT PRINCIPAL DO TEMPLATE
// Renderiza configurações, cardápio, carrinho e WhatsApp.
// ======================================================

let cart = JSON.parse(localStorage.getItem("cart_restaurante")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites_restaurante")) || [];
let activeCategory = "Todos";
let onlyFavorites = false;

const money = value => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  renderCategories();
  renderMenu();
  renderCart();
  setupEvents();
  setupReveal();
});

function applyConfig() {
  document.title = `${CONFIG.nomeRestaurante} | Cardápio Digital`;
  document.documentElement.style.setProperty("--hero-image", `url("${CONFIG.heroImage}")`);

  const whatsappLink = `https://wa.me/${CONFIG.whatsapp}`;
  setText("brandName", CONFIG.nomeRestaurante);
  setText("heroTitle", CONFIG.nomeRestaurante);
  setText("heroSlogan", CONFIG.slogan);
  setText("addressText", CONFIG.endereco);
  setText("hoursText", CONFIG.horario);
  setText("couponName", CONFIG.cupomPadrao);

  setSrc("siteLogo", CONFIG.logo);
  setSrc("aboutImage", CONFIG.sobreImage);

  byId("mapFrame").src = CONFIG.mapaEmbed;

  ["headerWhatsapp", "heroWhatsapp", "contactWhatsapp", "floatWhatsapp"].forEach(id => {
    byId(id).href = whatsappLink;
  });
  byId("contactInstagram").href = CONFIG.instagram;
  byId("contactFacebook").href = CONFIG.facebook;
  byId("contactEmail").href = `mailto:${CONFIG.email}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": CONFIG.nomeRestaurante,
    "description": CONFIG.slogan,
    "address": CONFIG.endereco,
    "telephone": CONFIG.telefone,
    "email": CONFIG.email,
    "servesCuisine": ["Brasileira", "Hambúrgueres", "Pizzas", "Sobremesas"],
    "openingHours": CONFIG.horario,
    "url": window.location.href
  };
  byId("schema-json").textContent = JSON.stringify(schema);
}

function setupEvents() {
  byId("menuToggle").addEventListener("click", () => byId("navLinks").classList.toggle("open"));

  byId("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.documentElement.dataset.theme = document.body.classList.contains("light") ? "light" : "dark";
    byId("themeToggle").textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
  });

  byId("searchInput").addEventListener("input", () => renderMenu());

  window.addEventListener("scroll", () => {
    byId("backTop").classList.toggle("visible", window.scrollY > 500);
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: .12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

function renderCategories() {
  const categories = ["Todos", ...new Set(MENU.map(item => item.categoria))];
  byId("categories").innerHTML = categories.map(cat => `
    <button class="category-btn ${cat === activeCategory ? "active" : ""}" onclick="setCategory('${cat}')">
      ${cat}
    </button>
  `).join("");
}

function setCategory(category) {
  activeCategory = category;
  onlyFavorites = false;
  renderCategories();
  renderMenu();
}

function showFavorites() {
  onlyFavorites = !onlyFavorites;
  renderMenu();
}

function renderMenu() {
  const query = byId("searchInput").value.toLowerCase().trim();

  let products = MENU.filter(item => {
    const matchesCategory = activeCategory === "Todos" || item.categoria === activeCategory;
    const matchesSearch = item.nome.toLowerCase().includes(query) || item.descricao.toLowerCase().includes(query);
    const matchesFavorite = !onlyFavorites || favorites.includes(item.id);
    return matchesCategory && matchesSearch && matchesFavorite;
  });

  byId("menuGrid").innerHTML = products.map(product => {
    const fav = favorites.includes(product.id);
    return `
      <article class="product-card">
        <div class="product-img">
          <img src="${product.imagem}" alt="${product.nome}" loading="lazy">
          <div class="badges">
            ${(product.badges || []).map(badge => `<span class="badge">${badge}</span>`).join("")}
            ${product.destaque ? `<span class="badge">Destaque</span>` : ""}
          </div>
          <button class="favorite ${fav ? "active" : ""}" onclick="toggleFavorite(${product.id})" aria-label="Favoritar ${product.nome}">
            ♥
          </button>
        </div>
        <div class="product-info">
          <h3>${product.nome}</h3>
          <p>${product.descricao}</p>
          <div class="product-footer">
            <span class="price">${money(product.preco)}</span>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Adicionar</button>
          </div>
        </div>
      </article>
    `;
  }).join("") || `<p>Nenhum produto encontrado.</p>`;
}

function toggleFavorite(id) {
  favorites = favorites.includes(id)
    ? favorites.filter(item => item !== id)
    : [...favorites, id];

  localStorage.setItem("favorites_restaurante", JSON.stringify(favorites));
  renderMenu();
}

function addToCart(id) {
  const product = MENU.find(item => item.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(product => product.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);

  saveCart();
  renderCart();
}

function renderCart() {
  byId("cartCount").textContent = cart.reduce((sum, item) => sum + item.qty, 0);

  byId("cartItems").innerHTML = cart.length ? cart.map(item => `
    <div class="cart-item">
      <img src="${item.imagem}" alt="${item.nome}">
      <div>
        <strong>${item.nome}</strong>
        <br><small>${money(item.preco)}</small>
        <div class="qty">
          <button type="button" onclick="changeQty(${item.id}, -1)">-</button>
          <span>${item.qty}</span>
          <button type="button" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="remove" type="button" onclick="removeFromCart(${item.id})">Remover</button>
    </div>
  `).join("") : `<p>Seu carrinho está vazio.</p>`;

  updateTotals();
}

function updateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.preco * item.qty, 0);
  const delivery = cart.length ? CONFIG.taxaEntrega : 0;
  const coupon = byId("couponInput")?.value?.trim().toUpperCase();
  const discount = coupon === CONFIG.cupomPadrao ? subtotal * CONFIG.descontoCupom : 0;
  const total = Math.max(0, subtotal + delivery - discount);

  setText("subtotalText", money(subtotal));
  setText("deliveryText", money(delivery));
  setText("discountText", `- ${money(discount)}`);
  setText("totalText", money(total));

  return { subtotal, delivery, discount, total };
}

document.addEventListener("input", event => {
  if (event.target && event.target.id === "couponInput") updateTotals();
});

function finishOrder(event) {
  event.preventDefault();

  if (!cart.length) {
    alert("Adicione pelo menos um item ao pedido.");
    return;
  }

  const totals = updateTotals();

  const itemsText = cart.map(item =>
    `• ${item.qty}x ${item.nome} - ${money(item.preco * item.qty)}`
  ).join("%0A");

  const message =
`Olá, ${CONFIG.nomeRestaurante}! Gostaria de fazer um pedido:%0A%0A` +
`*Cliente:* ${encodeURIComponent(byId("customerName").value)}%0A` +
`*Telefone:* ${encodeURIComponent(byId("customerPhone").value)}%0A` +
`*Endereço:* ${encodeURIComponent(byId("customerAddress").value)}%0A` +
`*Pagamento:* ${encodeURIComponent(byId("paymentMethod").value)}%0A%0A` +
`*Itens:*%0A${itemsText}%0A%0A` +
`*Observações:* ${encodeURIComponent(byId("orderNotes").value || "Nenhuma")}%0A%0A` +
`*Subtotal:* ${money(totals.subtotal)}%0A` +
`*Entrega:* ${money(totals.delivery)}%0A` +
`*Desconto:* ${money(totals.discount)}%0A` +
`*Total:* ${money(totals.total)}`;

  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${message}`, "_blank");
}

function openCart() { byId("cartDrawer").classList.add("open"); }
function closeCart() { byId("cartDrawer").classList.remove("open"); }

function copyCoupon() {
  navigator.clipboard.writeText(CONFIG.cupomPadrao);
  alert(`Cupom ${CONFIG.cupomPadrao} copiado!`);
}

function saveCart() {
  localStorage.setItem("cart_restaurante", JSON.stringify(cart));
}

function byId(id) { return document.getElementById(id); }
function setText(id, value) { const el = byId(id); if (el) el.textContent = value; }
function setSrc(id, value) { const el = byId(id); if (el) el.src = value; }
