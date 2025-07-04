let header = document.querySelector('header');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar__link');

// Обработка прокрутки + проверка на ТГ бразуер
function isTelegramBrowser() {
  return /Telegram/i.test(navigator.userAgent);
}

// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navBar.classList.toggle('active');
}


//scrol sections
if (isTelegramBrowser()) {
  // Если Telegram — сразу активируем анимации и убираем запрет скрола
  document.querySelectorAll('section').forEach(sec => {
    sec.classList.add('show-animate');
    document.querySelector('body').classList.remove('scroll-off');
  });

} else {
  window.onscroll = () => {
  const top = document.documentElement.scrollTop;

  sections.forEach(sec => {
    const offset = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      // Добавляем активный класс ссылке меню
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.navbar__link[href*="${id}"]`);
      if (activeLink) activeLink.classList.add('active');

      // Анимация секции
      sec.classList.add('show-animate');
    } else {
      sec.classList.remove('show-animate');
    }
  });

  // Липкий хедер
  header.classList.toggle('sticky', top > 100);

  // Скрыть мобильное меню при скролле
  menuIcon.classList.remove('bx-x');
  navBar.classList.remove('active');

  // Анимация футера
  const footer = document.querySelector('footer');
  footer.classList.toggle('show-animate', window.innerHeight + top >= document.scrollingElement.scrollHeight);

  // Удаляем #id из адресной строки
  history.replaceState(null, '', window.location.pathname);
};

}

// Обработка кликов по навигации
document.querySelectorAll('.navbar__link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });

      // Удаляем #id из адреса
      history.replaceState(null, '', window.location.pathname);
    }

    // Закрываем мобильное меню после клика
    menuIcon.classList.remove('bx-x');
    navBar.classList.remove('active');
  });
});


const skillEl = document.querySelector('.skills');
const progressItems = document.querySelectorAll('.progress');
const targets = [95, 80, 65, 75, 90, 67, 85, 60]; // Проценты для каждого блока

function animateProgress(barEl, textEl, from, to, duration = 1000) {
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const current = from + (to - from) * progress;

    barEl.style.width = current + '%';
    textEl.textContent = Math.round(current) + '%';

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function percentageFill() {
  progressItems.forEach((item, i) => {
    const barSpan = item.querySelector('.progress__bar span');
    const textSpan = item.querySelector('.progress__title span');
    const target = targets[i] || 0;

    setTimeout(() => {
      animateProgress(barSpan, textSpan, 0, target, 2000);
    }, 400); // можно изменить задержку
  });
}

const observer = new MutationObserver(() => {
  if (skillEl.classList.contains('show-animate')) {
    percentageFill();
    observer.disconnect(); // Только один раз
  }
});

observer.observe(skillEl, {
  attributes: true,
  attributeFilter: ['class']
});

