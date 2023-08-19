const apiKey = '157d5c87b2f3497c99b7e61bd15a4a1d'; // Replace 'YOUR_NEWSAPI_API_KEY' with your actual News API key

// Function to display news based on the provided API URL
function showNews(apiUrl) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  event.target.classList.add('active');

  fetchNews(apiUrl);
}

// Function to perform a search for news based on the input text
function searchNews() {
  const searchText = document.getElementById('searchText').value;
  const encodedSearchText = encodeURIComponent(searchText); // Encode search text
  const apiUrl = `https://newsapi.org/v2/everything?q=${encodedSearchText}&apiKey=${apiKey}`;

  fetchNews(apiUrl);
}

// Function to fetch news data from the provided API URL
function fetchNews(apiUrl) {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch news. Please try again later.');
      }
      return response.json();
    })
    .then(data => displayNews(data.articles))
    .catch(error => {
      console.error(error);
      displayErrorMessage('An error occurred while fetching news. Please try again later.');
    });
}

// Function to display news cards in the UI
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

// Function to create a news card element
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

// Function to check if an image URL is invalid
function isInvalidImage(url) {
  return url.includes('400x200');
}

// Function to handle image loading error for a news card
function handleImageError(newsCard) {
  newsCard.style.display = 'none'; // Hide the entire card in case of image loading error
}

// Function to handle errors with a custom error message
function displayErrorMessage(message) {
  const cardsContainer = document.getElementById('cardsContainer');
  cardsContainer.innerHTML = `<div class="error-message">${message}</div>`;
}

// Event listener to fetch news on page load
window.addEventListener('load', () => {
  const activeNavItem = document.querySelector('.nav-item.active');
  const activeCategory = activeNavItem.id;
  const apiUrl = getApiUrl(activeCategory);

  fetchNews(apiUrl);
});

// Function to handle navigation item click
function onNavItemClick(category) {
  const apiUrl = getApiUrl(category);
  fetchNews(apiUrl);

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  document.getElementById(category).classList.add('active');
}

// Function to get the API URL based on the category
// Function to get the API URL based on the category
function getApiUrl(category) {
  if (category === 'sports') {
    return `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${apiKey}`;
  } else if (category === 'business') {
    return `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${apiKey}`;
  } else if (category === 'politics') {
    return `https://newsapi.org/v2/top-headlines?country=in&category=politics&apiKey=${apiKey}`;
  }
  return `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
}


async function fetchNews(url) {

  try {

    // fetch logic

  } catch (err) {

    if(err instanceof TypeError) {
      console.error('Invalid URL');
    } else if(err instanceof Response) {  
      if(!err.ok) {
        console.error('API Error:', err);  
      }
    } else {
      console.error('Unknown Error:', err);
    }

    displayErrorMessage('Failed to fetch news');

  }

}


window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.error('Error: ', error);
}
