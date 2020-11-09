export default class photoApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1; // храним значение первой страницы
  }

  fetchArticles() {
    const API_KEY = '11349157-fc9c2ea73d90d296f310c891d';
    const BASE_URL = 'https://pixabay.com/api/';
    return fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
    )
      .then(response => response.json())
      .then(data => {
        this.incrementPage();

        return data.hits; //возвращаем промис во внешний код
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() { 
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
