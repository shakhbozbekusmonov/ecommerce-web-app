import { API_URL } from "./constants.js";
import { generateRatingStarIcon, getProducts } from "./utils.js";

// Get elements from product.html
const elProductWrapper = document.querySelector(".js-product-wrapper");
const elProductTemplate = document.querySelector(
    ".js-product-template"
).content;

// Get localStorage product id
const id = JSON.parse(window.localStorage.getItem("productId"));

// Render product for HTML page
async function renderProduct() {
    elProductWrapper.innerHTML = null
    const product = await getProducts(API_URL + "/" + id);
    document.title = product.title;

    const cloneProduct = elProductTemplate.cloneNode(true);
    cloneProduct.querySelector(".js-product-img").src = product.image;
    cloneProduct.querySelector(".js-product-img").alt = product.title;
    cloneProduct.querySelector(".js-product-title").textContent = product.title;
    cloneProduct.querySelector(".js-product-category").textContent = "Category: " + product.category;
    cloneProduct.querySelector(".js-product-price").textContent = "Price: $" + product.price;
    cloneProduct.querySelector(".js-product-rating").textContent = "Rating: " + generateRatingStarIcon(product.rating.rate);
    cloneProduct.querySelector(".js-product-desc").textContent = "Description: " + product.description

    elProductWrapper.appendChild(cloneProduct);
}

renderProduct();
