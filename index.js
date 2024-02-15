// Цель: Разработать веб-приложение, которое будет отображать новое случайное изображение из коллекции Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

// Регистрация на Unsplash:

// • Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// • Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).

// Создание приложения:

// • Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
// • Нажмите "New Application".
// • Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
// • Получите свой API-ключ после создания приложения.

// Разработка веб-приложения:

// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу. Обратите внимание, что должно подгружаться всегда случайное изображение, для этого есть отдельная ручка (эндпоинт) у API.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу. Одну фотографию пользователь может лайкнуть только один раз. Также должна быть возможность снять лайк, если ему разонравилась картинка.
// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался, если будет показана та же самая картинка.
// • Реализуйте возможность просмотра предыдущих фото с сохранением их в истории просмотров в localstorage.
// • Реализовать все с помощью async/await, без цепочем then.

const apiKey = ""; // your api key;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const fotoData = await getImagesFetch();
    showPicture(fotoData);
  } catch (err) {
    alert(err);
  }
});

async function getImagesFetch() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Сервер встал");
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
}

function showPicture(picture) {
  const container = document.querySelector("#container");
  const pictureEl = document.createElement("img");
  pictureEl.setAttribute("src", picture.urls.small);
  container.appendChild(pictureEl);

  const author = document.createElement("h2");
  author.textContent = picture.user.name;
  container.appendChild(author);

  const authorLink = document.createElement("a");
  authorLink.textContent = "Link to see more pictures";
  authorLink.setAttribute("href", picture.user.portfolio_url);
  authorLink.setAttribute("target", "_blank");
  container.appendChild(authorLink);

  const likes = document.createElement("button");
  likes.textContent = picture.likes;
  container.appendChild(likes);

  likes.addEventListener("click", () => {
    likes.textContent = Number(likes.textContent) + 1;
    likes.setAttribute("disabled", true);
    const likedPhotos = JSON.parse(localStorage.getItem("likedPhotos")) || [];
    likedPhotos.push(picture.id);
    localStorage.setItem("likedPhotos", JSON.stringify(likedPhotos));
    if (likedPhotos.includes(picture.id)) {
      likes.setAttribute("disabled", true);
    }
  });
}
