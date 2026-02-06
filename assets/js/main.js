document.addEventListener('DOMContentLoaded', () => {
  // =========================
  // СЛАЙДЕР ПРОМО — УЛУЧШЕННАЯ АНИМАЦИЯ
  // =========================
  const slider = document.getElementById('promo-slider');
  if (slider) {
    const slides = document.querySelectorAll('.slider-slide');
    const dotsContainer = document.getElementById('slider-dots');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentIndex = 0;

    // Создаём точки
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    const goToSlide = (index) => {
      // Убираем активность с текущей
      slides[currentIndex].classList.remove('active');
      dots[currentIndex].classList.remove('active');

      // Добавляем плавное исчезновение старой карточки
      slides[currentIndex].style.opacity = '0';
      slides[currentIndex].style.transform = 'translateX(-40px) rotateY(10deg)';
      slides[currentIndex].style.filter = 'blur(3px)';

      // Через 700ms — показываем новую
      setTimeout(() => {
        currentIndex = index;
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');

        // Восстанавливаем новую карточку
        slides[currentIndex].style.opacity = '1';
        slides[currentIndex].style.transform = 'translateX(0) rotateY(0)';
        slides[currentIndex].style.filter = 'blur(0)';
      }, 700);
    };

    prevBtn?.addEventListener('click', () => {
      const newIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(newIndex);
    });

    nextBtn?.addEventListener('click', () => {
      const newIndex = (currentIndex + 1) % slides.length;
      goToSlide(newIndex);
    });
  }

  // =========================
  // МОБИЛЬНОЕ МЕНЮ
  // =========================
  const toggle = document.getElementById('navbar-toggle');
  const mobileMenu = document.getElementById('navbar-mobile');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.navbar-mobile a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  }

  // =========================
  // ПЛАВНАЯ ПРОКРУТКА ЯКОРЕЙ
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // =========================
  // ЭФФЕКТ СКРОЛЛА НАВБАРА
  // =========================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // =========================
  // АНИМАЦИИ ПОЯВЛЕНИЯ
  // =========================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});


