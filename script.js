const search = document.getElementById('search-input');
const submit = document.getElementById('submit');
const randomBtn = document.getElementById('random-btn');
const searchTitle = document.getElementById('search-title');
const mealsContainer = document.getElementById('meals-container');
const pickedMeal = document.getElementById('picked-meal-container');


// Search meals
const searchMeals = (e) => {
    e.preventDefault();
    console.log(search.value);
}

// Add events
submit.addEventListener('submit', searchMeals);