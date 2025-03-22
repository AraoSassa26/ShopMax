// Lista de produtos (exemplo; adicione subcategory conforme sua lógica)
const productsData = [
  {
    id: 1,
    name: 'Produto 1',
    price: 50,
    category: 'eletronicos',
    // subcategory: 'smartphones', // se quiser
    image: 'assets/images/produto1.jpg'
  },
  {
    id: 2,
    name: 'Produto 2',
    price: 30,
    category: 'moda',
    image: 'assets/images/produto2.jpg'
  },
  {
    id: 3,
    name: 'Produto 3',
    price: 70,
    category: 'casa',
    image: 'assets/images/produto3.jpg'
  },
  // etc...
];

// Carrinho (persistido em localStorage)
let cart = [];

/* ===============================
   FUNÇÕES DE CARRINHO E STORAGE
=================================*/
function loadCart() {
  const storedCart = localStorage.getItem('shopmaxCart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
}

function saveCart() {
  localStorage.setItem('shopmaxCart', JSON.stringify(cart));
}

function updateCartCount() {
  const cartCountSpan = document.getElementById('cart-count');
  if (cartCountSpan) {
    cartCountSpan.textContent = cart.length;
  }
}

/* ===============================
   FUNÇÕES DE RELÓGIO (TEMPO REAL)
=================================*/
function startClock() {
  const clockEl = document.getElementById('clock');
  if (!clockEl) return;
  setInterval(() => {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString();
  }, 1000);
}

/* ===============================
   FUNÇÕES DE RENDERIZAÇÃO
=================================*/
function renderProducts(products) {
  const productsContainer = document.getElementById('products-container');
  if (!productsContainer) return;
  productsContainer.innerHTML = '';
  if (products.length === 0) {
    productsContainer.innerHTML = '<p style="text-align:center;">Produto não encontrado no estoque.</p>';
    return;
  }
  products.forEach(prod => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}" />
      <h2>${prod.name}</h2>
      <p>Preço: R$${prod.price.toFixed(2)}</p>
      <button onclick="addToCart(${prod.id})">Adicionar ao Carrinho</button>
    `;
    productsContainer.appendChild(card);
  });
}

function renderCartItems() {
  const cartItemsDiv = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('cart-total-price');
  if (!cartItemsDiv || !totalPriceEl) return;

  cartItemsDiv.innerHTML = '';
  let total = 0;
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
    totalPriceEl.textContent = 'Total: R$0,00';
    return;
  }
  cart.forEach((item, index) => {
    total += item.price;
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <span>${item.name} - R$${item.price.toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Remover</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });
  totalPriceEl.textContent = `Total: R$${total.toFixed(2)}`;
}

function renderCheckoutItems() {
  const checkoutItemsDiv = document.getElementById('checkout-items');
  const checkoutTotalPrice = document.getElementById('checkout-total-price');
  if (!checkoutItemsDiv || !checkoutTotalPrice) return;

  checkoutItemsDiv.innerHTML = '';
  let total = 0;
  if (cart.length === 0) {
    checkoutItemsDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
    checkoutTotalPrice.textContent = 'Total: R$0,00';
    return;
  }
  cart.forEach(item => {
    total += item.price;
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.textContent = `${item.name} - R$${item.price.toFixed(2)}`;
    checkoutItemsDiv.appendChild(div);
  });
  checkoutTotalPrice.textContent = `Total: R$${total.toFixed(2)}`;
}

/* ===============================
   FUNÇÕES DE BUSCA E CATEGORIA
=================================*/
function filterBySearch(query) {
  query = query.toLowerCase();
  const filtered = productsData.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
}

function filterByCategory(category) {
  if (category === 'todos') {
    renderProducts(productsData);
  } else if (category === 'ofertas' || category === 'mais-vendidos') {
    // Exemplo: poderia filtrar produtos marcados como oferta
    renderProducts(productsData); // ou filtrar
  } else {
    const filtered = productsData.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

/* ===============================
   SUBCATEGORIAS
=================================*/
// Se quiser subcategory no array (ex: subcategory: 'smartphones'), filtra:
function filterBySubcategory(subcat) {
  const filtered = productsData.filter(p => p.subcategory === subcat);
  renderProducts(filtered);
}

/* ===============================
   FUNÇÕES DE ADIÇÃO/REMOÇÃO CARRINHO
=================================*/
function addToCart(id) {
  const product = productsData.find(p => p.id === id);
  cart.push(product);
  saveCart();
  updateCartCount();
  // Sem alert
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  renderCartItems();
}

/* ===============================
   FUNÇÕES DE FATURA (PDF)
=================================*/
function generatePDFInvoice() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;
  doc.setFontSize(18);
  doc.text('Fatura - ShopMax', 14, y);
  y += 10;
  doc.setFontSize(12);
  doc.text('Produtos Comprados:', 14, y);
  y += 10;

  let total = 0;
  cart.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.name} - R$${item.price.toFixed(2)}`, 14, y);
    total += item.price;
    y += 10;
  });
  y += 5;
  doc.text(`Total: R$${total.toFixed(2)}`, 14, y);

  // Pode exibir endereço e método de pagamento, se quiser
  const nome = document.getElementById('nome')?.value || '';
  const endereco = document.getElementById('endereco')?.value || '';
  const cidade = document.getElementById('cidade')?.value || '';
  const cep = document.getElementById('cep')?.value || '';
  y += 10;
  doc.text(`Nome: ${nome}`, 14, y); y += 10;
  doc.text(`Endereço: ${endereco}`, 14, y); y += 10;
  doc.text(`Cidade: ${cidade}`, 14, y); y += 10;
  doc.text(`CEP: ${cep}`, 14, y);

  doc.save('fatura.pdf');
}

/* ===============================
   SUGESTÕES DE BUSCA
=================================*/
function showSuggestions(query) {
  const suggestionsList = document.getElementById('suggestions');
  if (!suggestionsList) return;
  if (query.length === 0) {
    suggestionsList.style.display = 'none';
    return;
  }
  // Filtra produtos que começam com a letra digitada
  const filtered = productsData.filter(p => p.name.toLowerCase().startsWith(query.toLowerCase()));
  if (filtered.length === 0) {
    suggestionsList.innerHTML = '<li>Produto não encontrado no estoque.</li>';
    suggestionsList.style.display = 'block';
    return;
  }
  suggestionsList.innerHTML = '';
  filtered.forEach(prod => {
    const li = document.createElement('li');
    li.textContent = prod.name;
    li.addEventListener('click', () => {
      // Ao clicar na sugestão, faz a busca
      document.getElementById('search-input').value = prod.name;
      suggestionsList.style.display = 'none';
      filterBySearch(prod.name);
    });
    suggestionsList.appendChild(li);
  });
  suggestionsList.style.display = 'block';
}

/* ===============================
   EVENTOS DOM (UNIFICADOS)
=================================*/
document.addEventListener('DOMContentLoaded', () => {
  // Carrega carrinho, atualiza contador, inicia relógio
  loadCart();
  updateCartCount();
  startClock();

  // Se estiver em index.html, renderiza produtos e configura busca/categorias
  if (document.getElementById('products-container')) {
    renderProducts(productsData);

    // Busca
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', () => {
      filterBySearch(searchInput.value);
    });
    searchInput.addEventListener('keyup', (e) => {
      // Sugestões a cada letra
      showSuggestions(e.target.value);
      if (e.key === 'Enter') {
        filterBySearch(searchInput.value);
        document.getElementById('suggestions').style.display = 'none';
      }
    });

    // Categorias (principais)
    const categoryLinks = document.querySelectorAll('.nav-links a[data-category]');
    categoryLinks.forEach(link => {
      link.addEventListener('click', (ev) => {
        ev.preventDefault();
        const cat = link.getAttribute('data-category');
        filterByCategory(cat);
      });
    });

    // Subcategorias (dropdown)
    const subcatLinks = document.querySelectorAll('.submenu a[data-subcategory]');
    subcatLinks.forEach(sublink => {
      sublink.addEventListener('click', (ev) => {
        ev.preventDefault();
        const subcat = sublink.getAttribute('data-subcategory');
        filterBySubcategory(subcat);
      });
    });
  }

  // Se estiver em cart.html, renderiza itens e botões
  if (document.getElementById('cart-items')) {
    renderCartItems();
    const goCheckoutBtn = document.getElementById('go-checkout');
    if (goCheckoutBtn) {
      goCheckoutBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
      });
    }
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', () => {
        cart = [];
        saveCart();
        updateCartCount();
        renderCartItems();
      });
    }
  }

  // Se estiver em checkout.html, renderiza itens e finaliza compra
  if (document.getElementById('checkout-items')) {
    renderCheckoutItems();
    const finalizeBtn = document.getElementById('finalize-purchase-checkout');
    if (finalizeBtn) {
      finalizeBtn.addEventListener('click', () => {
        document.getElementById('invoice-modal').style.display = 'block';
      });
    }
    const closeInvoiceModal = document.getElementById('close-invoice-modal');
    if (closeInvoiceModal) {
      closeInvoiceModal.addEventListener('click', () => {
        document.getElementById('invoice-modal').style.display = 'none';
      });
    }
    const downloadInvoiceBtn = document.getElementById('download-invoice');
    if (downloadInvoiceBtn) {
      downloadInvoiceBtn.addEventListener('click', () => {
        generatePDFInvoice();
        // Limpa carrinho após compra
        cart = [];
        saveCart();
        updateCartCount();
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      });
    }
  }
});
