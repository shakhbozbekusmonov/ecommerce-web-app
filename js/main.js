import { API_URL, CART_KEY, PRODUCTS } from "./constants.js";
import { generateRatingStarIcon, getProducts } from "./utils.js";

// Get elements from index.html for shop list items
const elShopList = document.querySelector(".js-shop-list");
const elShopListTemplate = document.querySelector(
    ".js-shop-list-template"
).content;
const newShopListFragment = new DocumentFragment();
const elShopSearchForm = document.querySelector(".shop-search-form");
const elShopSearchInput = document.querySelector(".shop-search-input");
const elCategoryWrapper = document.querySelector(".category__wrapper");
const elCartCount = document.querySelector(".korzinka-count");
const elCartCartBtn = document.querySelector(".korzinka");

async function renderShopList(data) {
    elShopList.innerHTML = null;

    data.slice(0, 8).forEach((item) => {
        const cloneShopList = elShopListTemplate.cloneNode(true);

        cloneShopList.querySelector(".js-shop-item-img").src = item.image;
        cloneShopList.querySelector(".js-shop-item-img").alt = item.title;
        cloneShopList.querySelector(".js-shop-item-link").href =
            "/product.html";
        cloneShopList.querySelector(".js-shop-item-title").dataset.productId =
            item.id;
        cloneShopList.querySelector(".js-shop-item-title").textContent =
            item.title;
        cloneShopList.querySelector(".js-shop-item-rating").textContent =
            generateRatingStarIcon(item.rating.rate) +
            " " +
            item.rating.rate +
            "(" +
            item.rating.count +
            ")";
        cloneShopList.querySelector(".js-shop-item-category").textContent =
            item.category;
        cloneShopList.querySelector(".js-shop-item-price").textContent =
            item.price + " $";
        cloneShopList.querySelector(".js-shop-item-cart").dataset.productId =
            item.id;

        newShopListFragment.appendChild(cloneShopList);
    });
    elShopList.appendChild(newShopListFragment);
}

// Event delegation function for link click
let productCount = 0;
elShopList.addEventListener("click", async (evt) => {
    if (evt.target.matches(".js-shop-item-title")) {
        window.localStorage.setItem(
            "productId",
            JSON.stringify(evt.target.dataset.productId)
        );
    } else if (evt.target.matches(".js-shop-item-cart")) {
        const id = evt.target.dataset.productId;
        const product = await getProducts(API_URL + "/" + id);
        productCount++;
        PRODUCTS.push(product);
        window.localStorage.setItem(CART_KEY, JSON.stringify(PRODUCTS));
        elCartCount.textContent = productCount;
    }
});

elCartCartBtn.addEventListener("click", () => {
    window.location.replace("/cart.html");
});

// Search and Filter category product event function
async function filterProducts(category) {
    const products = await getProducts(API_URL);

    const filteredProducts = products.filter(
        (product) => product.category === category
    );

    if (filteredProducts.length > 0) {
        renderShopList(filteredProducts);
    } else {
        renderShopList(products);
    }
}

elCategoryWrapper.addEventListener("click", (evt) => {
    if (evt.target.matches(".btn-dark")) {
        filterProducts("men's clothing");
    } else if (evt.target.matches(".btn-danger")) {
        filterProducts("women's clothing");
    } else if (evt.target.matches(".btn-warning")) {
        filterProducts("jewelery");
    } else if (evt.target.matches(".btn-success")) {
        filterProducts("electronics");
    } else {
        filterProducts("all");
    }
});

async function searchProducts(searchQuery) {
    const products = await getProducts(API_URL);

    const searchProducts = products.filter((product) =>
        product.title.match(searchQuery)
    );

    if (searchProducts.length > 0) {
        renderShopList(searchProducts);
    } else {
        renderShopList(products);
    }
}

searchProducts();

elShopSearchForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const inputValue = elShopSearchInput.value.trim();
    const SEARCH_QUERY = new RegExp(inputValue, "gi");
    searchProducts(SEARCH_QUERY);
});
