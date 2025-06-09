// const form = document.getElementById("offerForm");
// const totalPrice = document.getElementById("total-price");
// const cards = document.querySelectorAll(".card");

// form.addEventListener("change", () => {
//   const selectedValue = form.unit.value;

//   cards.forEach((card) => {
//     const input = card.querySelector('input[type="radio"]');
//     if (input.value === selectedValue) {
//       card.classList.add("selected");
//     } else {
//       card.classList.remove("selected");
//     }
//   });

//   let price = 0;
//   if (selectedValue === "1") price = 10;
//   else if (selectedValue === "2") price = 18;
//   else if (selectedValue === "3") price = 24;

//   totalPrice.textContent = `$${price.toFixed(2)} USD`;
// });
// const cart = [];
// function addToCart(event) {
//   event.preventDefault(); // prevent form submission

//   const selectedRadio = form.querySelector('input[name="unit"]:checked');
//   const selectedCard = selectedRadio.closest(".card");
//   const selectedValue = selectedRadio.value;
//   const unitCount = parseInt(selectedValue);

//   let item = {
//     name: `${unitCount} Unit Pack`,
//     variants: [],
//     price: 0,
//   };

//   // Set price based on selection
//   if (unitCount === 1) item.price = 10;
//   else if (unitCount === 2) item.price = 18;
//   else if (unitCount === 3) item.price = 24;

//   // Get all size/color dropdowns inside selected card
//   const selects = selectedCard.querySelectorAll("select");
//   for (let i = 0; i < selects.length; i += 2) {
//     const size = selects[i].value;
//     const color = selects[i + 1].value;
//     item.variants.push({ size, color });
//   }

//   cart.push(item);

//   // Show cart details in alert
//   let message = `Added to Cart:\n\n${item.name}\n`;
//   item.variants.forEach((variant, index) => {
//     message += `#${index + 1} - Size: ${variant.size}, Color: ${
//       variant.color
//     }\n`;
//   });
//   message += `Total Price: $${item.price.toFixed(2)}`;

//   alert(message);
// }

// form.addEventListener("submit", addToCart);

// window.addEventListener("DOMContentLoaded", () => {
//   const checked = form.querySelector('input[type="radio"]:checked');
//   if (checked) {
//     checked.closest(".card").classList.add("selected");
//   }
// });
const cardsData = [
  {
    unit: 1,
    label: "1 Unit",
    badge: "10% Off",
    price: 10,
    original: 24,
    variants: 1,
    popular: false,
  },
  {
    unit: 2,
    label: "2 Unit",
    badge: "20% Off",
    price: 18,
    original: 24,
    variants: 2,
    popular: true,
  },
  {
    unit: 3,
    label: "3 Unit",
    badge: "30% Off",
    price: 24,
    original: 24,
    variants: 3,
    popular: false,
  },
];

const form = document.getElementById("offerForm");
const totalPrice = document.getElementById("total-price");
const template = document.getElementById("card-template");
const cardContainer = document.getElementById("card-container");

cardsData.forEach((data) => {
  const clone = template.content.cloneNode(true);
  const card = clone.querySelector(".card");
  const radio = clone.querySelector('input[type="radio"]');
  const mostPopular = clone.querySelector(".most-popular");
  const standardPrice = clone.querySelector(".standard-price"); 

  radio.value = data.unit;
  radio.name = "unit";
  if (data.unit === 2) radio.checked = true;
  

  card.querySelector(".unit-label").textContent = data.label;
  card.querySelector(".badge").textContent = data.badge;
  card.querySelector(".price-final").textContent = `$${data.price.toFixed(
    2
  )} USD`;
  card.querySelector(".price-original").textContent = `$${data.original.toFixed(
    2
  )} USD`;

  if (!data.popular) mostPopular.style.display = "none";
  if (data.unit === 1) {
    standardPrice.textContent = "Standard Price";
    standardPrice.style.color = "#000000";
    standardPrice.style.fontSize = "12px";
    standardPrice.style.marginTop = "-6px";
  }

  const variantContainer = card.querySelector(".variant-container");
  for (let i = 1; i <= data.variants; i++) {
    const option = document.createElement("div");
    option.className = "option";
    option.innerHTML = `
      <label>#${i}</label>
      <select name="size${data.unit}-${i}"><option>S</option><option>M</option><option>L</option></select>
      <select name="color${data.unit}-${i}"><option>Black</option><option>Red</option><option>Blue</option></select>
    `;
    variantContainer.appendChild(option);
  }

  cardContainer.appendChild(clone);
});

function updateSelection() {
  const selectedValue = form.unit.value;
  document.querySelectorAll(".card").forEach((card) => {
    const input = card.querySelector('input[type="radio"]');
    card.classList.toggle("selected", input.value === selectedValue);
  });

  const selected = cardsData.find((c) => c.unit == selectedValue);
  totalPrice.textContent = `$${selected.price.toFixed(2)} USD`;
}

form.addEventListener("change", updateSelection);
updateSelection();

function addToCart() {
  const selected = cardsData.find((c) => c.unit == form.unit.value);
  const item = {
    name: `${selected.unit} Unit Pack`,
    variants: [],
    price: selected.price,
  };

  for (let i = 1; i <= selected.variants; i++) {
    const size = form[`size${selected.unit}-${i}`].value;
    const color = form[`color${selected.unit}-${i}`].value;
    item.variants.push({ size, color });
  }

  let message = `Added to Cart:\n\n${item.name}\n`;
  item.variants.forEach((v, i) => {
    message += `#${i + 1} - Size: ${v.size}, Color: ${v.color}\n`;
  });
  message += `Total Price: $${item.price.toFixed(2)}`;

  alert(message);
}
form.addEventListener("submit", addToCart);