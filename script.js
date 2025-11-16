
const toggler = document.querySelector("#toggler");
const navbar = document.querySelector(".navbar");

toggler.addEventListener("change", () => {
  navbar.style.clipPath = toggler.checked
    ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
    : "polygon(0 0, 100% 0, 100% 0, 0 0)";
});



const productHeartButtons = document.querySelectorAll(".box .fa-heart");
const headerHeart = document.querySelector(".header-heart") || document.querySelector("header .fa-heart");

let favoriteCountSpan = document.getElementById("favorite-count");


if (!favoriteCountSpan && headerHeart) {
  const span = document.createElement("span");
  span.id = "favorite-count";
  span.textContent = "0";
  headerHeart.appendChild(span);
}

favoriteCountSpan = document.getElementById("favorite-count");
let totalFavoritos = 0;


function updateFavoriteDisplay(count) {
  favoriteCountSpan.textContent = count;
  favoriteCountSpan.style.display = count > 0 ? "inline-block" : "none";
}


productHeartButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    btn.classList.toggle("active");

    if (btn.classList.contains("active")) {
      btn.style.color = "#ff4081"; 
      totalFavoritos++;
    } else {
      btn.style.color = "aliceblue";
      totalFavoritos = Math.max(0, totalFavoritos - 1);
    }

    updateFavoriteDisplay(totalFavoritos);
  });
});


const produtos = document.querySelectorAll(".box");

produtos.forEach((produto) => {
  produto.addEventListener("mouseenter", () => {
    produto.style.transform = "scale(1.05)";
    produto.style.transition = "transform 0.3s ease";
  });
  produto.addEventListener("mouseleave", () => {
    produto.style.transform = "scale(1)";
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const filtroBotoes = document.querySelectorAll(".filtro-desconto button");
  const todasAsBoxes = document.querySelectorAll(".products .box");

  function getDesconto(box) {
    const span = box.querySelector(".desconto");
    if (!span) return 0;
    return parseInt(span.textContent.replace(/[^0-9]/g, "")) || 0;
  }

  function filtrarProdutos(filtro) {
    todasAsBoxes.forEach(box => {
      const desconto = getDesconto(box);
      box.style.display = (filtro === "all" || desconto >= parseInt(filtro)) ? "block" : "none";
    });
  }

  function atualizarBotaoAtivo(btn) {
    filtroBotoes.forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");
  }

  filtroBotoes.forEach(btn => {
    btn.addEventListener("click", () => {
      const filtro = btn.getAttribute("data-filter");
      filtrarProdutos(filtro);
      atualizarBotaoAtivo(btn);
    });
  });

  filtrarProdutos("all");
});



let cartCount = 0;
let totalPrice = 0;

const cartCountSpan = document.getElementById("cart-count");
const cartSidebar = document.getElementById("cart-sidebar");
const cartItemsContainer = document.getElementById("cart-items");
const overlay = document.getElementById("overlay");
const closeCartBtn = document.getElementById("close-cart");
const cartButtons = document.querySelectorAll(".cart-btn");
const cartIcon = document.querySelector(".fa-shopping-cart");

const totalDiv = document.createElement("div");
totalDiv.id = "total-cart";
totalDiv.style.fontWeight = "bold";
totalDiv.style.fontSize = "1.5rem";
totalDiv.style.marginTop = "15px";
totalDiv.style.borderTop = "1px solid #ccc";
totalDiv.style.paddingTop = "10px";
cartSidebar.appendChild(totalDiv);

const finalizarBtn = document.createElement("button");
finalizarBtn.textContent = "Finalizar Compra";
finalizarBtn.style.width = "100%";
finalizarBtn.style.marginTop = "10px";
finalizarBtn.style.padding = "12px";
finalizarBtn.style.backgroundColor = "#702088ff";
finalizarBtn.style.color = "#fff";
finalizarBtn.style.fontSize = "1.4rem";
finalizarBtn.style.border = "none";
finalizarBtn.style.borderRadius = "8px";
finalizarBtn.style.cursor = "pointer";
cartSidebar.appendChild(finalizarBtn);

function updateCartCount() {
  cartCountSpan.textContent = cartCount;
  cartCountSpan.style.display = cartCount > 0 ? "inline-block" : "none";
}

function openCart() {
  cartSidebar.classList.add("active");
  overlay.classList.add("active");
}

function closeCart() {
  cartSidebar.classList.remove("active");
  overlay.classList.remove("active");
}

function atualizarTotal() {
  totalDiv.textContent = "Total: R$" + totalPrice.toFixed(2).replace(".", ",");
}

cartButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const productBox = btn.closest(".box");
    const productName = productBox.querySelector("h3").textContent;

    const precoElement = productBox.querySelector(".preco");
    const priceText = precoElement.firstChild.textContent.trim();
    const priceNumber = parseFloat(priceText.replace("R$", "").replace(",", "."));

    const img = productBox.querySelector("img").src;

    const item = document.createElement("div");
    item.classList.add("cart-item");
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.marginBottom = "15px";

    item.innerHTML = `
      <img src="${img}" style="width:90px; height:90px; object-fit:cover; border-radius:8px; margin-right:10px;">
      <div style="font-size:1.2rem;">
        <p style="margin:0; font-weight:bold;">${productName}</p>
        <p style="margin:0;">R$${priceNumber.toFixed(2).replace(".", ",")}</p>
      </div>
    `;

    cartItemsContainer.appendChild(item);

    cartCount++;
    totalPrice += priceNumber;
    updateCartCount();
    atualizarTotal();
  });
});

finalizarBtn.addEventListener("click", () => {
  if (cartCount === 0) {
    alert("Seu carrinho está vazio!");
  } else {
    alert("Compra finalizada! Total: R$" + totalPrice.toFixed(2).replace(".", ","));
    cartItemsContainer.innerHTML = "";
    totalPrice = 0;
    cartCount = 0;
    updateCartCount();
    atualizarTotal();
  }
});

cartIcon.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

