// Create a new contstans.
export const API_URL = "https://fakestoreapi.com/products";
export const CART_KEY = "app-shopping-cart";
export const PRODUCTS = window.localStorage.getItem(CART_KEY) || [];
