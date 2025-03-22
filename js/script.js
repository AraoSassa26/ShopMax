// Array para armazenar os produtos do carrinho
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
  // Menu hambúrguer
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      nav.classList.remove('active');
    }
  });

  // Busca de produtos (caso exista input)
  const searchInput = document.getElementById('search-input');
  const productCards = document.querySelectorAll('.produto');
  if (searchInput) {
    searchInput.addEventListener('keyup', function () {
      const query = this.value.toLowerCase();
      productCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
      });
    });
  }

  // Adiciona produto ao carrinho
  const buyButtons = document.querySelectorAll('.buy-btn');
  const cartCount = document.getElementById('cartCount');

  buyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const produtoElem = button.closest('.produto');
      const produto = {
        id: produtoElem.getAttribute('data-id'),
        nome: produtoElem.getAttribute('data-nome'),
        preco: parseFloat(produtoElem.getAttribute('data-preco'))
      };

      cart.push(produto);
      updateCartCount();
      // Você pode adicionar feedback visual aqui, se desejar
    });
  });

  // Atualiza o contador do carrinho
  function updateCartCount() {
    cartCount.textContent = cart.length;
  }

  // Modal do Carrinho
  const cartIcon = document.getElementById('cart');
  const cartModal = document.getElementById('cartModal');
  const cartModalClose = document.getElementById('cartModalClose');

  cartIcon.addEventListener('click', () => {
    renderCartItems();
    cartModal.style.display = 'block';
  });

  cartModalClose.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
      cartModal.style.display = 'none';
    }
    if (event.target === document.getElementById('invoiceModal')) {
      document.getElementById('invoiceModal').style.display = 'none';
    }
  });

  // Renderiza os itens do carrinho no modal
  function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
      return;
    }
    cart.forEach((item, index) => {
      const itemElem = document.createElement('div');
      itemElem.classList.add('cart-item');
      itemElem.innerHTML = `<p>${index + 1}. ${item.nome} - R$ ${item.preco.toFixed(2)}</p>`;
      cartItemsContainer.appendChild(itemElem);
    });
  }

  // Finaliza a compra: exibe modal de fatura
  const finalizarCompraBtn = document.getElementById('finalizarCompra');
  const invoiceModal = document.getElementById('invoiceModal');
  const invoiceModalClose = document.getElementById('invoiceModalClose');
  const downloadInvoiceBtn = document.getElementById('downloadInvoice');

  finalizarCompraBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
    invoiceModal.style.display = 'block';
  });

  // Gera o PDF da fatura usando jsPDF
  downloadInvoiceBtn.addEventListener('click', () => {
    generatePDFInvoice();
  });
});

// Geração da fatura em PDF com jsPDF
function generatePDFInvoice() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 20;
  doc.setFontSize(18);
  doc.text("Fatura - ShopMax", 14, y);
  y += 10;
  doc.setFontSize(12);
  doc.text("Produtos Comprados:", 14, y);
  y += 10;
  
  let total = 0;
  cart.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.nome} - R$ ${item.preco.toFixed(2)}`, 14, y);
    total += item.preco;
    y += 10;
  });

  y += 5;
  doc.text(`Total: R$ ${total.toFixed(2)}`, 14, y);

  doc.save('fatura.pdf');
}

