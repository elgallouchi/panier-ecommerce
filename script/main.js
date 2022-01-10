// import { getProductsInCart } from "../script/control.js";
import { fetchData } from "../script/getData.js";

// showing number of products in cart
export const getProductsInCart = async () => {
  const numberProductsInCart = await document.querySelector("#number-products");
  const productsLocal = await JSON.parse(localStorage.getItem("data"));
  if (productsLocal) {
    const products = productsLocal.map((el) => el.count);
    numberProductsInCart.textContent =
      products.length === 0 ? "0" : products.reduce((acc, el) => acc + el); //products;
  }
};

// show content cart if available in localstorage
const getItemsFromLocalStorage = async () => {
  await getProductsInCart();
  const displayProduct = await document.querySelector("#display-product");
  const dataFromStorage = await JSON.parse(localStorage.getItem("data"));
  if (dataFromStorage) {
    let output = "";
    await dataFromStorage.forEach((product) => {
      output += `
          <tr >
              <td><img src=${product.cardImg} alt=${product.cardTitle} /></td>
              <td>${product.cardTitle}</td>
              <td>${product.cardPrice} €</td>
              <td data-id=${+product.id}>
              <button class="change-item" data-action="substract">-</button>
              <span>${+product.count}</span>
              <button class="change-item" data-action="add">+</button>
              </td>
              <td>${(+product.cardPrice * +product.count).toFixed(2)} €</td>
              <td><span class="delete-item">Supprimer</span></td>
            </tr>
          `;
    });
    if (dataFromStorage.length < 1 || dataFromStorage === "null") {
      output = `<tr>
      <td colspan="6"><h2>Votre panier est vide</h2></td>
      </tr>`;
    }
    await (displayProduct.innerHTML = output);
  } else {
    await (displayProduct.innerHTML = `<tr>
    <td colspan="6"><h2>Votre panier est vide</h2></td>
    </tr>`);
  }
  await addAndSubtractItemFromCart();
  await getTotalPriceCart();
  await deleteProduct();
  await getPromo();
};

// add to cart
const handlClick = async () => {
  const btnAddToCart = await document.querySelectorAll(".btn-add-to-cart");
  await btnAddToCart.forEach(async (btn) => {
    await btn.addEventListener("click", async () => {
      const product = await getProduct(btn);
      await saveData(product);
      await getItemsFromLocalStorage();
      await msgProductAdded(btn);
    });
  });
};

// message when product added to cart
const msgProductAdded = (btn) => {
  const accessCart = document.querySelector(".access-cart"); // get parent element
  const product = getProduct(btn);
  const div = document.createElement("div"); // create div element
  accessCart.appendChild(div); // add it to parent element
  div.classList.add("message-product-added"); // add class to child

  div.innerHTML = `
  <div class="check-msg">
    <img src="./img/check.png" alt="check"/>
    <span>Ajouté au panier</span>
  </div>
  <div class="check-product">
    <img src=${product.cardImg} />
    <div>
      <h4>${product.cardTitle.substring(0, 20) + "..."}</h4>
      <span class="check-price">Prix: ${product.cardPrice.toFixed(2)} €</span>
    </div>
  </div>
  `;
  div.style.pointerEvents = "none";
  setTimeout(async () => {
    await div.setAttribute("style", "opacity: 0");
    setTimeout(() => div.remove(), 500);
  }, 2000);
};

// detele item from cart
const deleteProduct = async () => {
  const btnDelete = await document.querySelectorAll(".delete-item");
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const confirmDelete = window.confirm(
        "Êtes-vous sûre de vouloir retirer cet article de panier ?"
      );
      if (confirmDelete) {
        const dataFromStorage = await JSON.parse(localStorage.getItem("data"));
        const id = +btn.parentElement.parentElement.children[3].dataset.id;
        if (dataFromStorage) {
          const res = dataFromStorage.filter((element) => {
            return element.id !== id;
          });
          await localStorage.setItem("data", JSON.stringify(res));
        }
        await getItemsFromLocalStorage();
      }
    });
  });
};

//
const getProduct = (btn) => {
  let cardImg = btn.parentElement.children[0];
  let cardTitle = btn.parentElement.children[1];
  let cardPrice = btn.parentElement.children[3];
  let cardId = btn.parentElement.children[5];
  const product = {
    id: JSON.parse(cardId.value),
    cardImg: cardImg.src.trim(),
    cardTitle: cardTitle.textContent.trim(),
    cardPrice: +cardPrice.firstChild.innerText,
  };
  return product;
};

// execution program
fetchData(handlClick);
getItemsFromLocalStorage();

// get total price of cart
const getTotalPriceCart = async (codePromo) => {
  let displayCartPrice = await document.querySelector("#total-price");
  let displayTotalOrder = await document.querySelector("#total-order");
  let displayShippingOrder = await document.querySelector("#total-shipping");
  const codePromoMsg = await document.querySelector("#code-promo-msg");
  const localData = await JSON.parse(localStorage.getItem("data"));
  if (localData) {
    let priceTotal = 0;
    let priceShipping = 50;
    for (const obj of localData) {
      priceTotal += obj.count * obj.cardPrice;
    }

    // shipping free if total is more than 500€
    if (priceTotal > 500) {
      await (displayShippingOrder.innerHTML = `Offert <span class="free-priceShipping">50 €</span>`);
      await (displayTotalOrder.innerText = +priceTotal.toFixed(2) + " €");
    } else if (priceTotal === 0) {
      await (displayShippingOrder.innerText = priceShipping + " €");
      await (displayTotalOrder.innerText = +priceTotal.toFixed(2) + " €");
    } else {
      await (displayShippingOrder.innerText = priceShipping + " €");
      await (displayTotalOrder.innerText =
        (+priceTotal + priceShipping).toFixed(2) + " €");
    }

    // promo code message and discount total
    if (codePromo && priceTotal > 100) {
      if (codePromo === "CD2022") {
        const percentage = (15 * priceTotal) / 100;
        await (displayTotalOrder.innerText =
          (priceTotal - percentage).toFixed(2) + " €");
        await (codePromoMsg.innerHTML =
          "<span class='success-code-promo'>Code promo valide</span>");
      } else {
        await (codePromoMsg.innerHTML =
          "<span class='error-code-promo'>Ce code n'est pas valide</span>");
        await (displayTotalOrder.innerText = +priceTotal.toFixed(2) + " €");
      }
    } else {
      await (codePromoMsg.innerHTML = "");
    }
    if (priceTotal === 0) {
      await (codePromoMsg.innerHTML = "<span></span>");
    }

    await (displayCartPrice.innerText = +priceTotal.toFixed(2) + " €");
  }
};

const getPromo = async () => {
  const btnPromo = await document.querySelector("#add-promo");
  await btnPromo.addEventListener("click", () => {
    const inputCode = btnPromo.parentElement.children[0].value;
    getTotalPriceCart(inputCode);
  });
};

// add or substract number of products in cart
const addAndSubtractItemFromCart = async () => {
  const addItem = await document.querySelectorAll(".change-item");
  addItem.forEach(async (item) => {
    item.addEventListener("click", async () => {
      const itemID = await +item.parentElement.dataset.id;
      const quantityProduct = await +item.parentElement.children[1].textContent;
      if (item.textContent === "+") {
        await changeQuentity("+", itemID);
      }
      if (item.textContent === "-" && quantityProduct > 1) {
        await changeQuentity("-", itemID);
      }
      await getItemsFromLocalStorage();
    });
  });
};

// change the quentity of product in cart
const changeQuentity = async (action, itemId) => {
  const localData = await JSON.parse(localStorage.getItem("data"));
  if (localData) {
    if (localData.length > 0) {
      const res = await localData.filter((el) => {
        if (el.id === itemId) {
          if (action === "+") {
            el.count += 1;
          }
          if (action === "-") {
            el.count -= 1;
          }
        }
        return el;
      });
      await localStorage.setItem("data", JSON.stringify(res));
    }
  }
};

addAndSubtractItemFromCart();

//
const saveData = async (data) => {
  const localData = await JSON.parse(localStorage.getItem("data"));
  if (localData) {
    const productExist = await localData.some((el) => el.id === data.id);
    if (productExist) {
      const res = await localData.filter((item) => {
        if (item.id === data.id) {
          item.count += 1;
        }
        return item;
      });
      localStorage.setItem("data", JSON.stringify(res));
    } else {
      localData.push({ ...data, count: 1 });
      localStorage.setItem("data", JSON.stringify(localData));
    }
  } else {
    localStorage.setItem("data", JSON.stringify([{ ...data, count: 1 }]));
  }
};
