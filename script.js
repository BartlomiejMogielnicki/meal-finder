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
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                            </div>
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

// Update DOM with meal description
const updateDomMeal = (mealData) => {

    // Push ingredients and measures to an array
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (mealData[`strIngredient${i}`]) {
            ingredients.push(`${mealData[`strIngredient${i}`]} - ${mealData[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    // Update DOM
    pickedMeal.innerHTML = `
    <h2>${mealData.strMeal}</h2>
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"/>
    <div class="main">
        <div class="category">
            <p>${mealData.strArea}</p>
            <p>${mealData.strCategory}</p>
        </div>
        <div class="recipe">
            <p>${mealData.strInstructions}</p>
        </div>
        <h2>Ingredients</h2>
        <ul class="ingredients">
            ${ingredients.map(item =>
                `<li>${item}</li>`).join('')}
        </ul>
    </div>`
}

// Get description of specific meal
const getSpecificMeal = (mealID) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            const mealData = data.meals[0]

            updateDomMeal(mealData);
        })
}


// Add events

submit.addEventListener('submit', searchMeals);

mealsContainer.addEventListener('click', (e) => {
    const mealID = e.target.getAttribute('data-mealID');
    getSpecificMeal(mealID)
})