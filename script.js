const search = document.getElementById('search-input');
const submit = document.getElementById('submit');
const randomBtn = document.getElementById('random-btn');
const searchTitle = document.getElementById('search-title');
const mealsContainer = document.getElementById('meals-container');
const pickedMeal = document.getElementById('picked-meal-container');


// Search meals
const searchMeals = (e) => {
    e.preventDefault();

    const input = search.value;

    // Check if input is not empty
    if (input) {
        // Fetch data API
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
            .then(response => response.json())
            .then(data => {
                // Set title
                searchTitle.innerHTML = `<h2>Search results for '${input}':</h2>`;
                // Check if response is not empty
                if (data.meals === null) {
                    searchTitle.innerHTML = `<h2>There are no results for '${input}'. Please try again.</h2>`;
                } else {
                    // Show response results
                    mealsContainer.innerHTML = data.meals.map(meal =>
                        `<div class="meal">
                            <img src="${meal.strMealThumb}" alt="${input} picture"/>
                            <h3>${meal.strMeal}</h3>
                        </div>`
                    ).join('');
                }
            });
        // Clear search input
        search.value = "";
    } else {
        alert('Please enter your question')
    }
}

// Add events
submit.addEventListener('submit', searchMeals);