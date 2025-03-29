// Lista de produtos (exemplo; adicione subcategory se desejar filtrar subcategorias)
const productsData = [
  // Eletrônicos
  { id: 1, name: 'iPhone 13', price: 850000, category: 'eletronicos', subcategory: 'smartphones', image: 'imagens/iphone-13.jpg' },
  { id: 2, name: 'Samsung Galaxy S23', price: 920000, category: 'eletronicos', subcategory: 'smartphones', image: 'imagens/galaxy-s23.jpg' },
  { id: 3, name: 'Notebook Dell Inspiron 15', price: 1100000, category: 'eletronicos', subcategory: 'notebooks', image: 'imagens/dell-15.jpg' },
  { id: 4, name: 'MacBook Air M2', price: 1500000, category: 'eletronicos', subcategory: 'notebooks', image: 'imagens/mackbook-2.jpg' },
  { id: 5, name: 'Fone JBL Tune 510BT', price: 45000, category: 'eletronicos', subcategory: 'fones', image: '/imagens/JBL-tunes.jpg' },
  
  // Moda
  { id: 6, name: 'Camisa Insider Tech T-Shirt', price: 18000, category: 'moda', subcategory: 'masculina', image: '/imagens/t-shirt-tech.jpg' },
  { id: 7, name: 'Jaqueta Nike Sportswear', price: 85000, category: 'moda', subcategory: 'masculina', image: '/imagens/Nike-sportswear.jpg' },
  { id: 8, name: 'Vestido Longo Elegante', price: 60000, category: 'moda', subcategory: 'feminina', image: '/imagens/vestido-mojessy.jpg' },
  { id: 9, name: 'Tênis Adidas Ultraboost', price: 95000, category: 'moda', subcategory: 'tenis', image: '/imagens/adidad-ultraboost.jpg' },
  { id: 10, name: 'Mochila Executiva Samsonite', price: 120000, category: 'moda', subcategory: 'bolsas', image: '/imagens/mochila_samsonite.jpg' },
  
  // Casa
  { id: 11, name: 'Aspirador de Pó Electrolux', price: 75000, category: 'casa', subcategory: 'eletro', image: '/imagens/aspirador.jpg' },
  { id: 12, name: 'Sofá Retrátil e Reclinável', price: 350000, category: 'casa', subcategory: 'moveis', image: '/imagens/sofa.jpg' },
  { id: 13, name: 'Jogo de Panelas Tramontina', price: 80000, category: 'casa', subcategory: 'cozinha', image: '/imagens/panelas.jpg' },
  { id: 14, name: 'Cama Box Queen', price: 280000, category: 'casa', subcategory: 'cama', image: '/imagens/cama_box.jpg' },
  { id: 15, name: 'Luminária LED Moderna', price: 35000, category: 'casa', subcategory: 'decoracao', image: '/imagens/luminaria.jpg' },
  
  // Esporte
  { id: 16, name: 'Bicicleta Aro 29 Shimano', price: 230000, category: 'esporte', subcategory: 'bicicletas', image: '/imagens/bicicleta.jpg' },
  { id: 17, name: 'Halteres 10kg (par)', price: 40000, category: 'esporte', subcategory: 'academia', image: '/imagens/halteres.jpg' },
  { id: 18, name: 'Suplemento Whey Protein 1kg', price: 30000, category: 'esporte', subcategory: 'suplementos', image: '/imagens/whey_protein.jpg' },
  
  // Livros
  { id: 19, name: ' O Poder do Hábito', price: 15000, category: 'livros', subcategory: 'autoajuda', image: '/imagens/poder_habito.jpg' },
  { id: 20, name: ' Código Limpo', price: 25000, category: 'livros', subcategory: 'academicos', image: '/imagens/codigo_limpo.jpg' },
  { id: 21, name: ' One Piece Vol. 1', price: 12000, category: 'livros', subcategory: 'mangas', image: '/imagens/one_piece.jpg' },
  
  // Automotivo
  { id: 22, name: 'Kit Som Automotivo JBL', price: 150000, category: 'automotivo', subcategory: 'som-automotivo', image: '/imagens/som_jbl.jpg' },
  { id: 23, name: 'Jogo de Rodas Aro 17', price: 400000, category: 'automotivo', subcategory: 'pneus', image: '/imagens/rodas_aro17.jpg' },
  
  // Pet
  { id: 24, name: 'Ração Golden Fórmula 15kg', price: 32000, category: 'pet', subcategory: 'racao', image: '/imagens/racao.jpg' },
  { id: 25, name: 'Cama para Cachorros', price: 25000, category: 'pet', subcategory: 'casinhas', image: '/imagens/cama_pet.jpg' },
  
  // Bebês
  { id: 26, name: 'Carrinho de Bebê Burigotto', price: 180000, category: 'bebes', subcategory: 'carrinhos', image: '/imagens/carrinho_bebe.jpg' },
  { id: 27, name: 'Mamadeira Philips Avent', price: 12000, category: 'bebes', subcategory: 'mamadeiras', image: '/imagens/mamadeira.jpg' },
  { id: 28, name: 'Banheira Dobrável para Bebê', price: 55000, category: 'bebes', subcategory: 'higiene-bebes', image: '/imagens/banheira.jpg' },

  // Adicione mais produtos conforme necessário
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

// Número de produtos exibidos por página
const PRODUCTS_PER_PAGE = 6;
let currentPage = 1;

// Renderiza os produtos com paginação
function renderProducts(products) {
  const productsContainer = document.getElementById('products-container');
  if (!productsContainer) return;

  // Limpa os produtos existentes
  productsContainer.innerHTML = '';

  // Renderiza os produtos
  products.forEach(product => {
    const productCard = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" onclick="openImageModal(${product.id})" />
        <h2>${product.name}</h2>
        <p>Preço: AOA ${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
      </div>
    `;
    productsContainer.innerHTML += productCard;
  });
}

// Atualiza os controles de paginação
function updatePaginationControls(totalProducts) {
  const paginationControls = document.getElementById('pagination-controls');
  if (!paginationControls) return;

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  // Limpa os controles existentes
  paginationControls.innerHTML = '';

  // Botão "Anterior"
  if (currentPage > 1) {
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Anterior';
    prevButton.onclick = () => {
      currentPage--;
      renderProducts(productsData);
    };
    paginationControls.appendChild(prevButton);
  }

  // Botão "Próximo"
  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Próximo';
    nextButton.onclick = () => {
      currentPage++;
      renderProducts(productsData);
    };
    paginationControls.appendChild(nextButton);
  }
}

// Renderiza itens do carrinho (cart.html)
function renderCartItems() {
  const cartItemsDiv = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('cart-total-price');
  if (!cartItemsDiv || !totalPriceEl) return;

  cartItemsDiv.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
    totalPriceEl.textContent = 'Total: AOA 0,00';
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <span>${item.name} - AOA ${item.price.toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Remover</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });

  totalPriceEl.textContent = `Total: AOA ${total.toFixed(2)}`;
}

// Renderiza itens do checkout (checkout.html)
function renderCheckoutItems() {
  const checkoutItemsDiv = document.getElementById('checkout-items');
  const checkoutTotalPrice = document.getElementById('checkout-total-price');
  if (!checkoutItemsDiv || !checkoutTotalPrice) return;

  checkoutItemsDiv.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    checkoutItemsDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
    checkoutTotalPrice.textContent = 'Total: AOA 0,00';
    return;
  }

  cart.forEach(item => {
    total += item.price;
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.textContent = `${item.name} - AOA ${item.price.toFixed(2)}`;
    checkoutItemsDiv.appendChild(div);
  });

  checkoutTotalPrice.textContent = `Total: AOA ${total.toFixed(2)}`;
}

/* ===============================
   FUNÇÕES DE BUSCA, CATEGORIA E SUBCATEGORIA
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
    renderProducts(productsData);
  } else {
    const filtered = productsData.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

// Filtra subcategoria
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
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  renderCartItems();
}

/* ===============================
   FUNÇÃO DE GERAÇÃO DE FATURA (RECIBO)
=================================*/
function generatePDFInvoice() {
  const { jsPDF } = window.jspdf;
  
  // Define o tamanho do recibo: 80mm de largura (~226pt), altura dinâmica
  const doc = new jsPDF({
    unit: "pt",
    format: [226, 400] // Largura fixa, altura ajustável
  });

  let y = 20;
  
  // Configurar fonte monoespaçada (parecido com recibos reais)
  doc.setFont("courier", "bold");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("SHOPMAX - FATURA", 113, y, { align: "center" });

  // Linha separadora
  y += 10;
  doc.setLineWidth(0.5);
  doc.line(15, y, 210, y);
  y += 10;

  // Número da fatura e data
  doc.setFont("courier", "normal");
  doc.setFontSize(10);
  const dataAtual = new Date().toLocaleString("pt-PT");
  doc.text(`Fatura Nº: ${Math.floor(Math.random() * 900000) + 100000}`, 15, y);
  y += 12;
  doc.text(`Data: ${dataAtual}`, 15, y);
  y += 15;

  // Produtos comprados
  doc.setFont("courier", "bold");
  doc.setFontSize(11);
  doc.text("ITEMS COMPRADOS", 15, y);
  y += 10;

  // Linha separadora
  doc.setLineWidth(0.3);
  doc.line(15, y, 210, y);
  y += 10;

  // Listagem de produtos
  let total = 0;
  cart.forEach((item, index) => {
    doc.setFont("courier", "normal");
    doc.setFontSize(10);
    doc.text(`${index + 1}. ${item.name}`, 15, y);
    doc.text(`AOA ${item.price.toFixed(2)}`, 200, y, { align: "right" });
    total += item.price;
    y += 12;
  });

  // Linha separadora
  y += 5;
  doc.line(15, y, 210, y);
  y += 10;

  // Total
  doc.setFont("courier", "bold");
  doc.setFontSize(11);
  doc.text("TOTAL:", 15, y);
  doc.text(`AOA ${total.toFixed(2)}`, 200, y, { align: "right" });
  y += 20;

  // Informações do cliente
  doc.setFont("courier", "bold");
  doc.setFontSize(11);
  doc.text("DADOS DO CLIENTE", 15, y);
  y += 10;
  doc.line(15, y, 210, y);
  y += 10;

  doc.setFont("courier", "normal");
  doc.setFontSize(10);
  const nome = document.getElementById("nome")?.value || "N/A";
  const endereco = document.getElementById("endereco")?.value || "N/A";
  const cidade = document.getElementById("cidade")?.value || "N/A";
  const nif = document.getElementById("nif")?.value || "N/A";

  doc.text(`Nome: ${nome}`, 15, y);
  y += 12;
  doc.text(`Endereço: ${endereco}`, 15, y);
  y += 12;
  doc.text(`Cidade: ${cidade}`, 15, y);
  y += 12;
  doc.text(`NIF: ${nif}`, 15, y);
  y += 20;

  // Mensagem final
  doc.setFont("courier", "bold");
  doc.setFontSize(10);
  doc.text("Obrigado pela preferência!", 113, y, { align: "center" });
  y += 15;
  doc.text("Volte Sempre!", 113, y, { align: "center" });

  // Salvar como PDF
  doc.save("Fatura.pdf");
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

  // Se estiver em index.html
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

    // Categorias
    const categoryLinks = document.querySelectorAll('.nav-links a[data-category]');
    categoryLinks.forEach(link => {
      link.addEventListener('click', (ev) => {
        ev.preventDefault();
        const cat = link.getAttribute('data-category');
        filterByCategory(cat);
      });
    });

    // Subcategorias
    const subcatLinks = document.querySelectorAll('.submenu a[data-subcategory]');
    subcatLinks.forEach(sublink => {
      sublink.addEventListener('click', (ev) => {
        ev.preventDefault();
        const subcat = sublink.getAttribute('data-subcategory');
        filterBySubcategory(subcat);
      });
    });
  }

  // Se estiver em cart.html
  if (document.getElementById('cart-items')) {
    renderCartItems();

    // Botão Prosseguir para Checkout
    const goCheckoutBtn = document.getElementById('go-checkout');
    if (goCheckoutBtn) {
      goCheckoutBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
      });
    }

    // Botão Esvaziar Carrinho
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

  // Se estiver em checkout.html
  if (document.getElementById('checkout-items')) {
    renderCheckoutItems();

    // Botão Concluir Compra → Abre modal de fatura
    const finalizeBtn = document.getElementById('finalize-purchase-checkout');
    if (finalizeBtn) {
      finalizeBtn.addEventListener('click', () => {
        document.getElementById('invoice-modal').style.display = 'block';
      });
    }

    // Botão Fechar modal
    const closeInvoiceModal = document.getElementById('close-invoice-modal');
    if (closeInvoiceModal) {
      closeInvoiceModal.addEventListener('click', () => {
        document.getElementById('invoice-modal').style.display = 'none';
      });
    }

    // Botão Baixar Fatura (PDF)
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

// Função para abrir o modal com os detalhes do produto
function openImageModal(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  // Preenche os detalhes do modal
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');

  modalImage.src = product.image;
  modalTitle.textContent = product.name;
  modalPrice.textContent = `Preço: AOA ${product.price.toFixed(2)}`;

  // Exibe o modal
  modal.style.display = 'flex';
}

// Função para fechar o modal
function closeImageModal() {
  const modal = document.getElementById('image-modal');
  modal.style.display = 'none';
}

// Adiciona evento ao botão de fechar o modal
document.addEventListener('DOMContentLoaded', () => {
  const closeModalButton = document.querySelector('.close-modal');
  closeModalButton.addEventListener('click', closeImageModal);

  // Fecha o modal ao clicar fora do conteúdo
  const modal = document.getElementById('image-modal');
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeImageModal();
    }
  });
});
