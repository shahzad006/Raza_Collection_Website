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

        <span
          class="text-xs font-semibold  text-[#d4af37] uppercase">

          ${product.category}

        </span>


        <h3
          class="text-lg font-bold mt-2">

          ${product.title}

        </h3>


        <p
          class="text-sm font-medium mt-3">

          Rs. ${formatPrice(product.price)}

        </p>


        <div
          class="flex gap-2 mt-5">

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


  document
    .getElementById("products")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/*
================================
SHOW ALL PRODUCTS
================================
*/

function showAllProducts() {

  renderProducts(products);

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