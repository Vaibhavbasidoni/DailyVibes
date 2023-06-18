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
    const apiKey = '157d5c87b2f3497c99b7e61bd15a4a1d'; // Replace with your News API key
    const apiUrl = `https://newsapi.org/v2/everything?q=${searchText}&apiKey=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => displayNews(data.articles))
      .catch(error => console.log(error));
  }
  


  function displayNews(newsData) {
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';
  
    const filteredNews = newsData.filter(news => news.urlToImage && !isInvalidImage(news.urlToImage));
  
    filteredNews.forEach(news => {
      const newsCard = document.createElement('div');
      newsCard.className = 'card';
  
      const cardHeader = document.createElement('div');
      cardHeader.className = 'card-header';
  
      const newsImg = document.createElement('img');
      newsImg.src = news.urlToImage;
      newsImg.onerror = handleImageError;
  
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
  
      cardsContainer.appendChild(newsCard);
    });
  }
  
  function isInvalidImage(url) {
    return url.includes('400x200');
  }
  
  function handleImageError(event) {
    const newsImg = event.target;
    const newsCard = newsImg.closest('.card');
    newsCard.style.display = 'none'; // Hide the entire card in case of image loading error
  }
  
  
  function handleImageError(event) {
    const newsImg = event.target;
    newsImg.removeEventListener('error', handleImageError); // Remove the event listener
    newsImg.style.display = 'none'; // Hide the image in case of loading error
  }
  
  
  function handleImageError(event) {
    const newsImg = event.target;
    newsImg.style.display = 'none'; // Hide the image in case of loading error
  }
  
  

// Rest of the code...

  
  
function redirectToNewsPage(news) {
    // Encode the news article object as JSON to handle special characters in the URL
    const encodedNews = encodeURIComponent(JSON.stringify(news));

    // Redirect to the news page with the encoded news article as a query parameter
    window.location.href = `news.html?news=${encodedNews}`;
}

// Rest of the code...


function redirectToNewsPage(news) {
    // Encode the news article object as JSON to handle special characters in the URL
    const encodedNews = encodeURIComponent(JSON.stringify(news));

    // Redirect to the news page with the encoded news article as a query parameter
    window.location.href = `news.html?news=${encodedNews}`;
}

// Rest of the code...


function redirectToNewsPage(description) {
    // Encode the description to handle special characters in the URL
    const encodedDescription = encodeURIComponent(description);

    // Redirect to the news page with the encoded description as a query parameter
    window.location.href = `news.html?desc=${encodedDescription}`;
}

// Rest of the code...

  
  
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
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => displayNews(data.articles))
      .catch(error => console.log(error));
  }
  
  function getApiUrl(category) {
    const apiKey = '157d5c87b2f3497c99b7e61bd15a4a1d'; // Replace with your News API key
  
    if (category === 'ipl') {
      return `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${apiKey}`;
    } else if (category === 'finance') {
      return `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${apiKey}`;
    } else if (category === 'politics') {
      return `https://newsapi.org/v2/top-headlines?country=in&category=politics&apiKey=${apiKey}`;
    }
    return `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
  }
  