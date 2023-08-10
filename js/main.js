import { API_URL } from "./constants.js";
import { generateRatingStarIcon } from "./utils.js";

// Get elements from index.html for shop list items
const elShopList = document.querySelector(".js-shop-list");
const elShopListTemplate = document.querySelector(".js-shop-list-template").content;
const newShopListFragment = new DocumentFragment();

console.log(elShopListTemplate);

// Create a new data fetching function for the shop list, GET request
const getProducts = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        data.forEach((item) => {
            const cloneShopList = elShopListTemplate.cloneNode(true);

            cloneShopList.querySelector(".js-shop-item-img").src = item.image;
            cloneShopList.querySelector(".js-shop-item-img").alt = item.title;
            cloneShopList.querySelector(".js-shop-item-title").textContent = item.title;
            cloneShopList.querySelector(".js-shop-item-rating").textContent = generateRatingStarIcon(item.rating.rate) + " " + item.rating.rate + "(" + item.rating.count + ")";
            cloneShopList.querySelector(".js-shop-item-category").textContent = item.category;
            cloneShopList.querySelector(".js-shop-item-price").textContent = item.price + " $";

            newShopListFragment.appendChild(cloneShopList);
        });
    } catch (error) {
        console.error(error.message);
    }

    elShopList.appendChild(newShopListFragment);
};

getProducts(API_URL);
