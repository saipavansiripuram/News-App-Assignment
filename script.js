const apiKey = 'f65064aa6fde4e9e86490eff01f1a72e';
const pageSize = 10; 
let page = 1;
let totalResults = 0;
let articles = [];


const newsContainer = document.getElementById('news-container');
const loadingSpinner = document.getElementById('loading-spinner');

async function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    try {
        loadingSpinner.classList.remove('hidden'); 
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        const response = await fetch(url);
        const data = await response.json();
        totalResults = data.totalResults;
        articles = articles.concat(data.articles);
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    } finally {
        loadingSpinner.classList.add('hidden'); 
    }
}

function displayNews(articles) {
    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <img src="${article.urlToImage}" alt="${article.title}" loading="lazy">
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsItem);
    });

    if ((page * pageSize) < totalResults) {
        page++;
    } else {
        loadingSpinner.classList.add('hidden');
    }
}
fetchNews();

// Lazy loading 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        fetchNews();
    }
});
