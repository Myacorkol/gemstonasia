let header = document.querySelector('header');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar__link');


// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navBar.classList.toggle('active');
}
//scrol sections
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            //active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.navbar__link[href*=' + id + ']').classList.add('active');
            })
            //active sections for animation on scroll
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    })
    //sticky header
    header.classList.toggle('sticky', window.scrollY > 100);
    //remove navbar and nav links toggle when click the link
    menuIcon.classList.remove('bx-x');
    navBar.classList.remove('active');
    //animation footer on Scroll
    let footer = document.querySelector('footer');
    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}


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
