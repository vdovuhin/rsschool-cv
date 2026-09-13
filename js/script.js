//===БУРГЕР==============================================================================================================================================
let documentActions = (e) => {
  const targetElement = e.target;
  if (targetElement.closest(".icon-menu")) {
    document.documentElement.classList.toggle("open-menu");
    document.body.classList.toggle("lock");
  }
};
document.addEventListener("click", documentActions);
//===SLAIDER====================================================================================
const wrapper = document.querySelector(".slider__swiper-wrapper");
const slides = Array.from(document.querySelectorAll(".swiper-slide"));
const buttonPrev = document.querySelector(".slider__button--prev");
const buttonNext = document.querySelector(".slider__button--next");

let currentIndex = 0;

function moveSlider(i) {
  wrapper.style.transform = `translateX(-${i * 100}%)`;
}
function checkButtons() {
  buttonPrev.classList.toggle("disabled", currentIndex === 0);
  buttonNext.classList.toggle("disabled", currentIndex === slides.length - 1);
}

buttonNext.addEventListener("click", () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    moveSlider(currentIndex);
    checkButtons();
  }
});

buttonPrev.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    moveSlider(currentIndex);
    checkButtons();
  }
});
//====TIME=============================================================================================================================================
// 1. Находим элементы один раз (DOM-кеширование)
const nodes = {
  day: document.getElementById("day"),
  hour: document.getElementById("hour"),
  minute: document.getElementById("minute"),
  second: document.getElementById("second"),
};
// 2. Устанавливаем цель один раз
const deadline = new Date("January 1, 2027 00:00:00");
function updateTimer() {
  const now = new Date();
  const diff = deadline - now;
  // Если время вышло — останавливаем таймер
  if (diff <= 0) {
    Object.values(nodes).forEach((node) => (node.textContent = "00"));
    return;
  }
  // 3. Математика в одну структуру
  const time = {
    day: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hour: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minute: Math.floor((diff / (1000 * 60)) % 60),
    second: Math.floor((diff / 1000) % 60),
  };
  // 4. Автоматический вывод с добавлением нуля (01, 02...)
  for (let key in time) {
    nodes[key].textContent = String(time[key]).padStart(2, "0");
  }
}
// Запуск
setInterval(updateTimer, 1000);
updateTimer();
//======MODAL==============================================================================================================================================

const modal = document.querySelector(".modal");
const modalImg = modal.querySelector(".modal__image img");
const modalTitle = modal.querySelector(".modal__title");
const modalSubtitle = modal.querySelector(".modal__subtitle");
const closeBtn = document.querySelector(".modal__button");
const cards = document.querySelectorAll(".card");

const toggleModal = (e) => {
  if (e) {
    e.preventDefault();

    // Проверяем: если мы ОТКРЫВАЕМ модалку
    if (!modal.classList.contains("is-open")) {
      const currentCard = e.currentTarget;

      // 1. Копируем картинку
      const cardImg = currentCard.querySelector("img");
      if (cardImg) {
        modalImg.src = cardImg.src;
        modalImg.alt = cardImg.alt;
      }

      // 2. Копируем заголовок
      const cardTitle = currentCard.querySelector(".card__title");
      if (cardTitle) {
        modalTitle.textContent = cardTitle.textContent;
      }

      // 3. Копируем описание и КЛАСС ЦВЕТА
      const cardDesc = currentCard.querySelector(".card__description");
      if (cardDesc) {
        modalSubtitle.textContent = cardDesc.textContent;

        // Копируем классы (чтобы перенести цвет)
        modalSubtitle.className = cardDesc.className;
        // Возвращаем обязательный класс модалки
        modalSubtitle.classList.add("modal__subtitle");
      }
    }
  }

  // Переключаем класс открытия
  modal.classList.toggle("is-open");

  // Блокируем скролл
  const isOpen = modal.classList.contains("is-open");
  document.body.style.overflow = isOpen ? "hidden" : "";
};

// --- СЛУШАТЕЛИ СОБЫТИЙ ---

// На карточки
cards.forEach((card) => {
  card.addEventListener("click", toggleModal);
});

// На кнопку закрытия (проверка, чтобы не было ошибки если кнопки нет)
if (closeBtn) {
  closeBtn.addEventListener("click", toggleModal);
}

// На темный фон
modal.addEventListener("click", (e) => {
  if (e.target === modal) toggleModal();
});