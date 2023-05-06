async function mealsList() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  const meals = data.meals;
  const cards = document.querySelector('.cards');
  for (let i = 0; i < meals.length; i++) {
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
    image.src = meals[i].strMealThumb;
    image.classList.add('image');
    leftSection.appendChild(image);

    const mName = document.createElement('p');
    const mCategory = document.createElement('p');
    const mType = document.createElement('p');

    const name = document.createElement('span');
    const category = document.createElement('span');
    const type = document.createElement('span');

    name.innerHTML = meals[i].strMeal;
    category.innerHTML = meals[i].strCategory;
    type.innerHTML = meals[i].strArea;

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
    const video = document.createElement('button');
    const favIcon = document.createElement('button');

    details.innerHTML = 'Details';
    video.innerHTML = 'Video📺';
    favIcon.innerHTML = 'Fav<i class="bi bi-suit-heart-fill"></i>';
    details.classList.add('details');
    video.classList.add('video');
    favIcon.classList.add('fav-icon');

    extras.appendChild(details);
    extras.appendChild(video);
    extras.appendChild(favIcon);
  }
}

mealsList();
