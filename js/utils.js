// Generate stars icon from HTML page
export function generateRatingStarIcon(rating) {
    const stars = ["⭐️", "⭐️", "⭐️", "⭐️", "⭐️"];
    const mathRating = Math.round(rating);

    return stars.slice(0, mathRating).join(" ");
}

// Create a new data fetching function for the shop list, GET request
export const getProducts = async (url) => {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.error(error.message);
    }
};
