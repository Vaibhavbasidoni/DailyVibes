function showNews(apiUrl) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  event.target.classList.add('active');

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayNews(data.articles))
    .catch(error => console.log(error));
}

function searchNews() {
  const searchText = document.getElementById('searchText').value;
  const apiUrl = ` https://newsapi.org/v2/top-headlines?country=us&apiKey=157d5c87b2f3497c99b7e61bd15a4a1d=${searchText}`;

  fetch(apiUrl, {
    headers: {
      'X-Api-Key': '157d5c87b2f3497c99b7e61bd15a4a1d'
    }
  })
    .then(response => response.json())
    .then(data => displayNews(data.articles))
    .catch(error => console.log(error));
}

function displayNews(newsData) {
  const cardsContainer = document.getElementById('cardsContainer');
  cardsContainer.innerHTML = '';

  // Check if newsData is an array
  if (!Array.isArray(newsData)) {
    console.error('Invalid news data');
    return;
  }

  const filteredNews = newsData.filter(news => news.urlToImage && !isInvalidImage(news.urlToImage));

  filteredNews.forEach(news => {
    const newsCard = createNewsCard(news);
    cardsContainer.appendChild(newsCard);
  });
}

function createNewsCard(news) {
  const newsCard = document.createElement('div');
  newsCard.className = 'card';

  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';

  const newsImg = document.createElement('img');
  newsImg.src = news.urlToImage;
  newsImg.onerror = () => handleImageError(newsCard);

  cardHeader.appendChild(newsImg);

  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';

  const newsTitle = document.createElement('h3');
  newsTitle.textContent = news.title;
  cardContent.appendChild(newsTitle);

  const newsSource = document.createElement('h6');
  newsSource.className = 'news-source';
  newsSource.textContent = `${news.source.name} ${news.publishedAt}`;
  cardContent.appendChild(newsSource);

  const newsDesc = document.createElement('p');
  newsDesc.className = 'news-desc';
  newsDesc.textContent = news.description;
  cardContent.appendChild(newsDesc);

  newsCard.appendChild(cardHeader);
  newsCard.appendChild(cardContent);

  // Add an event listener to the card element
  newsCard.addEventListener('click', () => {
    window.open(news.url, '_blank'); // Open the news URL in a new tab/window
  });

  return newsCard;
}

function isInvalidImage(url) {
  return url.includes('400x200');
}

function handleImageError(newsCard) {
  newsCard.style.display = 'none'; // Hide the entire card in case of image loading error
}

window.addEventListener('load', () => {
  const activeNavItem = document.querySelector('.nav-item.active');
  const activeCategory = activeNavItem.id;
  const apiUrl = getApiUrl(activeCategory);

  fetchNews(apiUrl);
});

function onNavItemClick(category) {
  const apiUrl = getApiUrl(category);
  fetchNews(apiUrl);

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  document.getElementById(category).classList.add('active');
}

function fetchNews(apiUrl) {
  fetch(apiUrl, {
    headers: {
      'X-Api-Key': '157d5c87b2f3497c99b7e61bd15a4a1d'
    }
  })
    .then(response => response.json())
    .then(data => displayNews(data.articles))
    .catch(error => console.log(error));
}

function getApiUrl(category) {
  if (category === 'ipl') {
    return 'https://newsapi.org/v2/top-headlines?country=in&category=sports';
  } else if (category === 'finance') {
    return 'https://newsapi.org/v2/top-headlines?country=in&category=business';
  } else if (category === 'politics') {
    return 'https://newsapi.org/v2/top-headlines?country=in&category=politics';
  }
  return 'https://newsapi.org/v2/top-headlines?country=in';
}

const apiUrl = 'https://newsapi.org/v2/everything?q';
const apiKey = '157d5c87b2f3497c99b7e61bd15a4a1d';

fetch(apiUrl, {
  headers: {
    'X-Api-Key': apiKey
  }
})
  .then(response => response.json())
  .then(data => {
    // Process the API response
  })
  .catch(error => console.log(error));
