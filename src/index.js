import articlesTpl from "./templates/articles.hbs";
import "./css/common.css";
import animation from "./js/animationWrapper";
import PhotoApiService from "./js/apiService";
import LoadMoreBtn from "./js/components/load-more-btn";
import onOpenModal from "./js/modal";
import "./js/pnotify";
import { error } from "@pnotify/core";



animation()
const refs = {
  searchForm: document.querySelector(".js-search-form"), // поменять на ID
  articlesContainer: document.querySelector(".js-articles-container"),
  imageContainer: document.querySelector(".gallery"),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'), // ссылка на кнопку показать еще
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
//создаем экземпляр класса для кнопки
const photoApiService = new PhotoApiService(); // создаем экземпляр класса(получаем обьект с методами и свойствами)
// console.log(loadMoreBtn)
refs.imageContainer.addEventListener("click", onOpenModal);
refs.searchForm.addEventListener("submit", onSearch);
loadMoreBtn.refs.button.addEventListener("click", scrollTo);
// refs.articlesContainer.addEventListener('click', onOpenModal);
// Эксперемент. Сохраняем в переменную резельтат запроса (ГЛОБАЛЬНАЯ ПЕРЕМЕННАЯ)

function onSearch(event) {
  event.preventDefault();
  // получаем ссылку на форму
  // clearArticlesContainer();
  photoApiService.query = event.currentTarget.elements.query.value;

  if (photoApiService.query === "" || photoApiService.query.length <= 2) {
    return error("Please enter a more specific query!");
  }

  loadMoreBtn.show();
  photoApiService.resetPage(); // сбрасываем номер страницы
  clearArticlesContainer();
  fetchArticles();
}

// function onLoadMore() {
//  fetchArticles();
// }

function fetchArticles() {
  loadMoreBtn.disable();
  return photoApiService.fetchArticles().then((hits) => {
    appendArticlesMarkup(hits);
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(hits) {
  refs.articlesContainer.insertAdjacentHTML("beforeend", articlesTpl(hits));
}

// Очищаем контейнер

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = "";
}

function scrollTo() {
  fetchArticles()
    .then(
      setTimeout(() => {
        window.scrollBy({
          // top: document.documentElement.offsetHeight,
          top: document.documentElement.clientHeight - 100,
          behavior: "smooth",
        });
      }, 1000)
    )
    .catch((err) => console.log(err));
}
