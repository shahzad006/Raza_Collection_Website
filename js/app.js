/*
================================
WHATSAPP NUMBER
================================
*/

const whatsappNumber = "923011240292";


/*
================================
FORMAT PRICE
================================
*/

function formatPrice(price) {

  return new Intl.NumberFormat("en-PK")
    .format(price);

}


/*
================================
WHATSAPP BUY
================================
*/

function buyOnWhatsApp(product) {

  const message =
  `✨ *RAZA COLLECTION* ✨\n` +
  `━━━━━━━━━━━━━━━━━━\n\n` +
  `🛍️ *Order Inquiry*\n\n` +
  `📦 *Product:* ${product.title}\n` +
  `💰 *Price:* Rs. ${formatPrice(product.price)}\n` +
  `🏷️ *Category:* ${product.category}\n\n` +
  `━━━━━━━━━━━━━━━━━━\n` +
  `👑 *Premium Shopping Experience*\n\n` +
  `Hello! I’m interested in purchasing this product.\n` +
  `Kindly share the available *payment methods* and *delivery details* to proceed with my order.\n\n` +
  `Thank you! ✨\n` +
  `*RAZA COLLECTION — Online Shopping*`;

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(
    whatsappURL,
    "_blank"
  );

}


/*
================================
PRODUCT CARDS
================================
*/

function renderProducts(productList) {

  const productGrid =
    document.getElementById("productGrid");

  const seeMoreBtn =
    document.getElementById("seeMoreBtn");

  productGrid.innerHTML = "";

  // Show only first 12 products initially.
  const initialProducts = 12;

  const visibleProducts =
    productList.length > initialProducts
      ? productList.slice(0, initialProducts)
      : productList;

  visibleProducts.forEach(product => {

    const card =
      document.createElement("div");

    card.className =
      "product-card";

    card.innerHTML = `

      <div class="overflow-hidden">

        <img
          src="${product.image}"
          alt="${product.title}"
          class="product-image"
        >

      </div>

      <div class="p-5">

        <span
          class="text-xs font-semibold text-[#d4af37] uppercase">
          ${product.category}
        </span>

        <h3 class="text-lg font-bold mt-2">
          ${product.title}
        </h3>

        <p class="text-sm font-medium mt-3">
          Rs. ${formatPrice(product.price)}
        </p>

        <div class="flex gap-2 mt-5">

          <button
            class="details-btn flex-1"
            onclick="openProduct(${product.id})">
            Details
          </button>

          <button
            class="buy-btn flex-1"
            onclick="buyProduct(${product.id})">
            Buy Now
          </button>

        </div>

      </div>

    `;

    productGrid.appendChild(card);

  });

  // Save the currently displayed list.
  window.currentProductList = productList;

  // Show/hide the button depending on product count.
  if (seeMoreBtn) {

    if (productList.length > initialProducts) {
      seeMoreBtn.style.display = "inline-flex";
      seeMoreBtn.dataset.expanded = "false";
      seeMoreBtn.textContent = "See More";
    } else {
      seeMoreBtn.style.display = "none";
    }

  }

}


/*
================================
SHOW ALL PRODUCTS
================================
*/

function showAllProducts() {

  const productGrid =
    document.getElementById("productGrid");

  const seeMoreBtn =
    document.getElementById("seeMoreBtn");

  const productList =
    window.currentProductList || products;

  // If already expanded, collapse back to first 12.
  if (seeMoreBtn && seeMoreBtn.dataset.expanded === "true") {
    renderProducts(productList);
    return;
  }

  // Show all products.
  productGrid.innerHTML = "";

  productList.forEach(product => {

    const card =
      document.createElement("div");

    card.className =
      "product-card";

    card.innerHTML = `

      <div class="overflow-hidden">

        <img
          src="${product.image}"
          alt="${product.title}"
          class="product-image"
        >

      </div>

      <div class="p-5">

        <span class="text-xs font-semibold text-[#d4af37] uppercase">
          ${product.category}
        </span>

        <h3 class="text-lg font-bold mt-2">
          ${product.title}
        </h3>

        <p class="text-sm font-medium mt-3">
          Rs. ${formatPrice(product.price)}
        </p>

        <div class="flex gap-2 mt-5">

          <button
            class="details-btn flex-1"
            onclick="openProduct(${product.id})">
            Details
          </button>

          <button
            class="buy-btn flex-1"
            onclick="buyProduct(${product.id})">
            Buy Now
          </button>

        </div>

      </div>

    `;

    productGrid.appendChild(card);

  });

  if (seeMoreBtn) {
    seeMoreBtn.dataset.expanded = "true";
    seeMoreBtn.textContent = "See Less";
  }

}


/*
================================
BUY PRODUCT
================================
*/

function buyProduct(id) {

  const product =
    products.find(
      item => item.id === id
    );

  if (product) {

    buyOnWhatsApp(product);

  }

}


/*
================================
FILTER PRODUCTS
================================
*/

function filterProducts(category) {

  const filteredProducts =
    products.filter(
      product =>
        product.category === category
    );


  renderProducts(filteredProducts);

  const seeMoreBtn =
    document.getElementById("seeMoreBtn");

  if (seeMoreBtn) {
    seeMoreBtn.dataset.expanded = "false";
    seeMoreBtn.textContent = "See More";
  }


  document
    .getElementById("products")
    .scrollIntoView({
      behavior: "smooth"
    });

}




/*
================================
PRODUCT DETAILS
================================
*/

function openProduct(id) {

  const product =
    products.find(
      item => item.id === id
    );


  if (!product) return;


  localStorage.setItem(
    "selectedProduct",
    JSON.stringify(product)
  );


  window.location.href =
    "product.html";

}


/*
================================
MOBILE MENU
================================
*/

const menuBtn =
  document.getElementById("menuBtn");

const mobileMenu =
  document.getElementById("mobileMenu");


menuBtn.addEventListener(
  "click",
  () => {

    mobileMenu.classList.toggle(
      "hidden"
    );

  }
);


// =================================
// WHATSAPP CONTACT
// =================================

const contactWhatsApp =
  document.getElementById("contactWhatsApp");

if (contactWhatsApp) {
  contactWhatsApp.href =
    `https://wa.me/${whatsappNumber}`;
}


// =================================
// LOAD PRODUCTS
// =================================

renderProducts(products);

const seeMoreBtn =
  document.getElementById("seeMoreBtn");

if (seeMoreBtn) {
  seeMoreBtn.dataset.expanded = "false";
  seeMoreBtn.textContent = "See More";
}