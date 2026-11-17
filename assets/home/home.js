(function () {
  'use strict';

  const content = window.SKAZKA_HOME_CONTENT;
  const root = document.getElementById('page-home');
  const hero = document.getElementById('home-hero');
  if (!content || !root || !hero) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const slidesRoot = hero.querySelector('[data-hero-slides]');
  const indicatorsRoot = hero.querySelector('[data-hero-indicators]');
  const currentLabel = hero.querySelector('[data-current-slide]');
  const totalLabel = hero.querySelector('[data-total-slides]');
  const eyebrow = hero.querySelector('[data-hero-eyebrow]');
  const title = hero.querySelector('[data-hero-title]');
  const cta = hero.querySelector('[data-hero-cta]');
  const slides = content.hero.slides || [];
  let activeIndex = 0;
  let autoplayTimer = null;

  eyebrow.textContent = content.hero.eyebrow;
  title.replaceChildren(...content.hero.title.map((line) => {
    const span = document.createElement('span');
    span.textContent = line;
    return span;
  }));
  cta.textContent = content.hero.cta;
  totalLabel.textContent = String(slides.length).padStart(2, '0');

  const slideElements = slides.map((slide, index) => {
    const figure = document.createElement('figure');
    figure.className = `portal-slide${index === 0 ? ' is-active' : ''}`;
    figure.setAttribute('aria-hidden', String(index !== 0));
    const image = document.createElement('img');
    image.src = slide.src;
    image.alt = slide.alt;
    image.style.objectPosition = slide.position || 'center';
    image.decoding = 'async';
    image.loading = index === 0 ? 'eager' : 'lazy';
    if (index === 0) image.fetchPriority = 'high';
    figure.append(image);
    slidesRoot.append(figure);
    return figure;
  });

  const indicatorButtons = slides.map((slide, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = index === 0 ? 'is-active' : '';
    button.setAttribute('aria-label', `Показать слайд ${index + 1}`);
    button.setAttribute('aria-current', index === 0 ? 'true' : 'false');
    button.addEventListener('click', () => {
      showSlide(index);
      restartAutoplay();
    });
    indicatorsRoot.append(button);
    return button;
  });

  function showSlide(nextIndex) {
    if (!slideElements.length) return;
    activeIndex = (nextIndex + slideElements.length) % slideElements.length;
    slideElements.forEach((slide, index) => {
      const active = index === activeIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      indicatorButtons[index].classList.toggle('is-active', active);
      indicatorButtons[index].setAttribute('aria-current', String(active));
    });
    currentLabel.textContent = String(activeIndex + 1).padStart(2, '0');
  }

  function stopAutoplay() {
    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  function startAutoplay() {
    stopAutoplay();
    if (reducedMotion.matches || slides.length < 2 || document.hidden) return;
    autoplayTimer = window.setInterval(
      () => showSlide(activeIndex + 1),
      Number(content.hero.autoplayDelay) || 6500
    );
  }

  function restartAutoplay() {
    startAutoplay();
  }

  hero.querySelector('[data-slide-prev]').addEventListener('click', () => {
    showSlide(activeIndex - 1);
    restartAutoplay();
  });
  hero.querySelector('[data-slide-next]').addEventListener('click', () => {
    showSlide(activeIndex + 1);
    restartAutoplay();
  });
  document.addEventListener('visibilitychange', startAutoplay);
  reducedMotion.addEventListener?.('change', startAutoplay);
  startAutoplay();

  const about = content.about;
  const aboutSection = document.getElementById('home-about');

  function renderParagraphs(target, paragraphs) {
    if (!target) return;
    target.replaceChildren(...paragraphs.map((content) => {
      const paragraph = document.createElement('p');
      if (typeof content === 'string') {
        paragraph.textContent = content;
      } else {
        paragraph.className = content.className || '';
        (content.parts || []).forEach((part) => {
          if (!part.emphasis) {
            paragraph.append(document.createTextNode(part.text));
            return;
          }
          const emphasis = document.createElement('strong');
          emphasis.textContent = part.text;
          paragraph.append(emphasis);
        });
      }
      return paragraph;
    }));
  }

  if (about && aboutSection) {
    aboutSection.querySelector('[data-about-main-title]').textContent = about.title;
    renderParagraphs(aboutSection.querySelector('[data-about-copy]'), about.paragraphs);

    const statsList = aboutSection.querySelector('[data-stats-list]');
    about.stats.items.forEach((item) => {
      const stat = document.createElement('div');
      stat.className = 'about-stat';
      const value = document.createElement('dt');
      const label = document.createElement('dd');
      value.textContent = item.value;
      label.textContent = item.label;
      stat.append(value, label);
      statsList.append(stat);
    });

    const leisureGallery = aboutSection.querySelector('[data-leisure-gallery]');
    about.leisure.forEach((item) => {
      const article = document.createElement('article');
      article.className = 'about-leisure-item';
      const media = document.createElement('div');
      const heading = document.createElement('h4');
      const description = document.createElement('p');
      media.className = 'about-leisure-media';
      media.setAttribute('role', 'img');
      media.setAttribute('aria-label', item.placeholder);
      media.textContent = item.placeholder;
      heading.textContent = item.title;
      description.textContent = item.text;
      article.append(media, heading, description);
      leisureGallery.append(article);
    });

    const development = about.development;
    aboutSection.querySelector('[data-development-title-base]').textContent = development.titleBase;
    aboutSection.querySelector('[data-development-title-accent]').textContent = development.titleAccent;
    renderParagraphs(aboutSection.querySelector('[data-development-copy]'), development.paragraphs);
    const extremeStat = aboutSection.querySelector('[data-extreme-stat]');
    const extremeValue = document.createElement('strong');
    const extremeLabel = document.createElement('span');
    const extremeNote = document.createElement('small');
    const extremeTarget = Number.parseInt(development.extreme.value, 10);
    extremeValue.textContent = reducedMotion.matches ? development.extreme.value : '1';
    extremeLabel.textContent = development.extreme.label;
    extremeNote.textContent = development.extreme.note;
    extremeStat.append(extremeValue, extremeLabel, extremeNote);

    const finishExtremeCounter = () => {
      extremeValue.textContent = development.extreme.value;
    };

    let counterRun = 0;
    const animateExtremeCounter = () => {
      if (!Number.isFinite(extremeTarget)) return;
      const currentRun = ++counterRun;
      const startValue = 1;
      const duration = 600;
      let startedAt;
      extremeValue.textContent = String(startValue);

      const updateCounter = (timestamp) => {
        if (currentRun !== counterRun) return;
        startedAt ??= timestamp;
        const progress = Math.min((timestamp - startedAt) / duration, 1);
        const currentValue = Math.min(
          extremeTarget,
          startValue + Math.round((extremeTarget - startValue) * progress)
        );
        extremeValue.textContent = String(currentValue);
        if (progress < 1) requestAnimationFrame(updateCounter);
        else finishExtremeCounter();
      };

      requestAnimationFrame(updateCounter);
    };

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      finishExtremeCounter();
    } else {
      let counterIsVisible = false;
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const isVisibleEnough = entry.isIntersecting && entry.intersectionRatio >= 0.35;
          if (isVisibleEnough && !counterIsVisible) {
            counterIsVisible = true;
            animateExtremeCounter();
          } else if (!isVisibleEnough && counterIsVisible) {
            counterIsVisible = false;
            counterRun += 1;
            extremeValue.textContent = '1';
          }
        });
      }, { threshold: 0.35 });
      counterObserver.observe(extremeStat);
    }

    const developmentMedia = aboutSection.querySelector('[data-development-media]');
    developmentMedia.setAttribute('aria-label', development.placeholder);
    developmentMedia.textContent = development.placeholder;

    aboutSection.classList.add('is-enhanced');
    const revealItems = [...aboutSection.querySelectorAll('.about-reveal')];
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    } else {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
      revealItems.forEach((item) => revealObserver.observe(item));
    }
  }

  const nav = document.getElementById('portal-nav');
  const menuButton = document.getElementById('portal-menu-button');
  const menuPanel = document.getElementById('portal-menu-panel');
  let menuOpen = false;
  let lastFocused = null;

  function setMenu(open) {
    menuOpen = open;
    document.body.classList.toggle('portal-menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    menuPanel.setAttribute('aria-hidden', String(!open));
    if (open) {
      lastFocused = document.activeElement;
      window.requestAnimationFrame(() => menuPanel.querySelector('a')?.focus());
    } else if (lastFocused instanceof HTMLElement) {
      lastFocused.focus();
    }
  }

  menuButton.addEventListener('click', () => setMenu(!menuOpen));
  menuPanel.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (!menuOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setMenu(false);
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [menuButton, ...menuPanel.querySelectorAll('a')];
    const current = focusable.indexOf(document.activeElement);
    const next = event.shiftKey
      ? (current <= 0 ? focusable.length - 1 : current - 1)
      : (current === focusable.length - 1 ? 0 : current + 1);
    event.preventDefault();
    focusable[next].focus();
  });

  function updateNav() {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
})();
