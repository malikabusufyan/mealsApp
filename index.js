
if (localStorage.getItem("favouritesList") == null) {
    localStorage.setItem("favouritesList", JSON.stringify([]));
}

let arr = JSON.parse(localStorage.getItem("favouritesList"));

async function mealsList(searchQuery = '') {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
  const data = await response.json();
  const meals = data.meals;
  console.log(meals);
  const cards = document.querySelector('.cards');
  cards.innerHTML = '';
  if (meals) {
    meals.forEach(meal => {
        const card = document.createElement('div');
        card.classList.add('food-card');
        cards.appendChild(card);

        const leftSection = document.createElement('div');
        const rightSection = document.createElement('div');
        const extras = document.createElement('div');
        leftSection.classList.add('left-section');
        rightSection.classList.add('right-section');
        extras.classList.add('extras');
        card.appendChild(leftSection);
        card.appendChild(rightSection);
        card.appendChild(extras);

        const image = document.createElement('img');
        image.src = meal.strMealThumb;
        image.classList.add('image');
        leftSection.appendChild(image);

        const mName = document.createElement('p');
        const mCategory = document.createElement('p');
        const mType = document.createElement('p');

        const name = document.createElement('span');
        const category = document.createElement('span');
        const type = document.createElement('span');

        name.innerHTML = meal.strMeal;
        category.innerHTML = meal.strCategory;
        type.innerHTML = meal.strArea;

        mName.innerHTML = 'Name: ';
        mCategory.innerHTML = 'Category: ';
        mType.innerHTML = 'Type: ';

        mName.appendChild(name);
        mCategory.appendChild(category);
        mType.appendChild(type);

        rightSection.appendChild(mName);
        rightSection.appendChild(mCategory);
        rightSection.appendChild(mType);

        const details = document.createElement('button');
        const video = document.createElement('a');
        const favIcon = document.createElement('button');

        details.innerHTML = 'Details';
        video.innerHTML = 'Video📺';
        favIcon.innerHTML = 'Fav<i class="bi bi-suit-heart-fill"></i>';
        details.classList.add('details');
        video.classList.add('video');
        favIcon.classList.add('fav-icon');

    favIcon.addEventListener('click', () => {
        arr.push(meal);
        localStorage.setItem("favouritesList", JSON.stringify(arr));
        alert("Added To Favorites!");
        removeAll();
        showFavMeals();
    });

        const youtubeUrl = `https://www.youtube.com/watch?v=${meal.strYoutube.slice(-11)}`;
        video.href = youtubeUrl;

        extras.appendChild(details);
        extras.appendChild(video);
        extras.appendChild(favIcon);
    details.addEventListener('click', () => {
        // Clear the cards container
        cards.innerHTML = '';

        // Create the card container
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        // Create the title
        const titleDiv = document.createElement('div');
        const title = document.createElement('h3');
        title.innerHTML = meal.strMeal;
        titleDiv.classList.add('mtitle');
        titleDiv.appendChild(title);
        cardContainer.appendChild(titleDiv);

        // Create the sectionLR div
        const sectionLR = document.createElement('div');
        sectionLR.classList.add('sectionLR');
        cardContainer.appendChild(sectionLR);

        // Create the left and right sections
        const leftPart = document.createElement('div');
        const rightPart = document.createElement('div');
        leftPart.classList.add('left_section');
        rightPart.classList.add('right_section');
        sectionLR.appendChild(leftPart);
        sectionLR.appendChild(rightPart);

        // Create the image
        const image = document.createElement('img');
        image.src = meal.strMealThumb;
        image.classList.add('image');
        leftPart.appendChild(image);

        // Create the category, ingredients, and instructions
        const category = document.createElement('p');
        const ingredients = document.createElement('p');
        const instructions = document.createElement('p');
        rightPart.appendChild(category);
        rightPart.appendChild(ingredients);
        rightPart.appendChild(instructions);

        category.innerHTML = `Category: ${meal.strCategory}`;
        ingredients.innerHTML = `Ingredients: ${meal.strIngredient1}, ${meal.strIngredient2}, ${meal.strIngredient3}`;
        instructions.innerHTML = `Instructions: ${meal.strInstructions}`;

        // Create the extras div
        const extras = document.createElement('div');
        extras.classList.add('extras');

        // Create the video link and favorite icon
        const video = document.createElement('a');
        video.innerHTML = 'Video📺';
        video.classList.add('video');
        const youtubeUrl = `https://www.youtube.com/watch?v=${meal.strYoutube.slice(-11)}`;
        video.href = youtubeUrl;

        const favIcon = document.createElement('button');
        favIcon.innerHTML = 'Fav<i class="bi bi-suit-heart-fill"></i>';
        favIcon.classList.add('fav-icon');

        extras.appendChild(video);
        extras.appendChild(favIcon);
        rightPart.appendChild(extras);

        // Append the card container to the cards holder
        cards.appendChild(cardContainer);
        searchInput.value = '';
        });
    });
  } else {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No matching meals found.';
    cards.appendChild(noResultsMessage);
  }  
}

function searchMeals() {
  const searchInput = document.getElementById('search-input');
  const searchText = searchInput.value.trim().toLowerCase();
  mealsList(searchText); 
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.right = sidebar.style.right === '-320px' ? '0' : '-320px';
}

function removeAll(){
    let container = document.getElementById('favourites-body');
    let child = container.lastElementChild;
    while (child){
        container.removeChild(child);
        child = container.lastElementChild;
    }
  }

async function showFavMeals() {
  removeAll();
  let favoritesBody = document.querySelector('.fav_items');

  if (arr.length === 0) {
    let message = document.createElement('p');
    message.innerHTML = "No meals added to favorites!";
    favoritesBody.appendChild(message);
    return;
  }

  // Creating dynamic cards for favorite meals section
  for (let i = 0; i < arr.length; i++) {
    let favItem = document.createElement('div');
    favItem.classList.add('item');
    favoritesBody.appendChild(favItem);

    let leftSection = document.createElement('div');
    leftSection.classList.add('left');
    favItem.appendChild(leftSection);

    let rightSection = document.createElement('div');
    rightSection.classList.add('right');
    favItem.appendChild(rightSection);

    let favItemImage = document.createElement('div');
    favItemImage.classList.add('fav-item-image');
    leftSection.appendChild(favItemImage);

    let favImage = document.createElement('img');
    favImage.src = arr[i].strMealThumb;
    favItemImage.appendChild(favImage);

    let favItemDetails = document.createElement('div');
    favItemDetails.classList.add('fav-item-details');
    rightSection.appendChild(favItemDetails);

    let favName = document.createElement('p');
    favName.innerHTML = "Name: " + arr[i].strMeal;
    favItemDetails.appendChild(favName);

    let remove = document.createElement('button');
    remove.innerHTML = "Remove";
    remove.classList.add('remove-button');
    favItemDetails.appendChild(remove);

    // Event listener to remove single element from the local storage
    remove.addEventListener('click', function() {
      const index = arr.findIndex((meal) => meal.strMeal === arr[i].strMeal);
      arr.splice(index, 1);
      localStorage.setItem('favouritesList', JSON.stringify(arr));
      removeAll();
      showFavMeals();
    });
  }
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', searchMeals);
mealsList();