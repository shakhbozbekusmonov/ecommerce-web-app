export function generateRatingStarIcon(rating) {
    const stars = ["⭐️", "⭐️", "⭐️", "⭐️", "⭐️"];
    const mathRating = Math.round(rating);

    return stars.slice(0, mathRating).toString();
}
