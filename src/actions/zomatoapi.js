// Zomato Constants.
const zomatoBaseAPIUrl = "https://developers.zomato.com/api/v2.1/"
const apiKey = "62bef65d02f52935e9df6fdada9d59fe"
const headerInfo = { method: 'GET', headers: { 'user-key': apiKey, 'Content-Type': 'application/json' }, credentials: 'same-origin' }

// User Constants
const baseAPIUrl = "https://5c72fab9ba65bb0014ebf059.mockapi.io/userdocs/"
const usersApi = baseAPIUrl + "Users"
const reviewsApi = baseAPIUrl + "reviews"

const zomatoReviewsUrl = "https://developers.zomato.com/api/v2.1/reviews?res_id="
const zomatoResturantUrl = zomatoBaseAPIUrl + "restaurant"
const zomatoCatigoriesUrl = zomatoBaseAPIUrl + "categories"

// get resturant details.
export const getResturants = async (cityId) => {
    const restaurantUrl = zomatoBaseAPIUrl + `search?entity_id=${cityId}&entity_type=city&sort=rating`;
    const restaurantInfo = await fetch(restaurantUrl, headerInfo);
    const restaurantJson = await restaurantInfo.json();
    const restaurantsData = await restaurantJson.restaurants;
    const restaurants = [];
    restaurantsData.forEach(restaurant => {
        const exactRestaurant = restaurant.restaurant;
        restaurants.push(exactRestaurant);
    });
    return restaurants
}

//get categories details.
export const getCategoriesData = async () => {
    const categoryInfo = await fetch(zomatoCatigoriesUrl, headerInfo);
    const categoryJson = await categoryInfo.json();
    const categories = await categoryJson.categories;
    return categories
};

// get resturant reviews.
export const getResturantReviews = async (restaurantId) => {
    const callURL = zomatoReviewsUrl + restaurantId
    const allReviews = await fetch(callURL, headerInfo);
    const reviews = await allReviews.json();
    return reviews.user_reviews
}


//get users details.
export const getUsers = async () => {
    const allUsers = await fetch(usersApi);
    const users = await allUsers.json();
    return users
};

//get user id details.
export const getUser = async (name) => {
    const allUsers = await fetch(usersApi);
    const users = await allUsers.json();
    let user = users.filter((user) => user.name === name)
    if (Object.keys(user).length > 0) {
        return user[0]
    }
    return user
};

// get user reviews per resturant details.
export const getReviews = async (restaurantId) => {
    const allReviews = await fetch(reviewsApi);
    const reviews = await allReviews.json();
    return reviews //reviews.filter((review)=> review.resturantId === restaurantId)
}

// post reviews agianst a resturant 
export const postReview = async (restaurantId, rating, review) => {
    const postHeaderInfo = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
            "username": localStorage.getItem('user'),
            "description": review,
            "ratings": rating,
            "resturantId": restaurantId
        })
    }
    let res = await fetch(reviewsApi, postHeaderInfo);
    return res
}