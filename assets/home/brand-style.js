(function () {
  'use strict';

  const data = window.SKAZKA_BRAND_ASSETS;
  const section = document.getElementById('approved-materials');
  if (!data || !section) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const create = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  if (data.meta) {
    const formatFileDate = () => {
      const modified = new Date(document.lastModified);
      if (Number.isNaN(modified.getTime())) return '';
      const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
      ];
      return `${modified.getDate()} ${months[modified.getMonth()]} ${modified.getFullYear()} года`;
    };
    const updated = data.meta.updated === 'auto' ? formatFileDate() : data.meta.updated;
    document.querySelectorAll('[data-brand-version]').forEach((element) => {
      element.textContent = data.meta.version;
    });
    document.querySelectorAll('[data-brand-updated]').forEach((element) => {
      if (updated) element.textContent = updated;
    });
    document.querySelectorAll('[data-brand-status]').forEach((element) => {
      element.textContent = data.meta.status;
    });
  }

  const dialog = section.querySelector('[data-brand-style-dialog]');
  const dialogTitle = section.querySelector('[data-brand-style-dialog-title]');
  const dialogStage = section.querySelector('.brand-style-dialog-stage');
  const dialogLogo = section.querySelector('[data-brand-style-dialog-logo]');
  const dialogImage = section.querySelector('[data-brand-style-dialog-image]');
  const dialogContent = section.querySelector('[data-brand-style-dialog-content]');
  const dialogDownload = section.querySelector('[data-brand-style-dialog-download]');
  const dialogClose = section.querySelector('[data-brand-style-dialog-close]');

  function openPreview({ title, image, alt, download, companion, background }) {
    if (!image) return;
    dialogTitle.textContent = title;
    dialogContent.hidden = true;
    dialogContent.replaceChildren();
    dialogImage.hidden = false;
    dialogImage.src = image;
    dialogImage.alt = alt || title;
    dialogStage.style.background = background || '';
    dialogStage.classList.toggle('is-composition', Boolean(companion));
    dialogLogo.hidden = !companion;
    if (companion) {
      dialogLogo.src = companion;
      dialogLogo.alt = 'Логотип «Сказка»';
    } else {
      dialogLogo.removeAttribute('src');
      dialogLogo.alt = '';
    }
    if (download) {
      dialogDownload.href = download;
      dialogDownload.hidden = false;
    } else {
      dialogDownload.hidden = true;
      dialogDownload.removeAttribute('href');
    }
    dialog.showModal();
    dialogClose.focus();
  }

  function openContentPreview({ title, content }) {
    if (!content) return;
    dialogTitle.textContent = title;
    dialogImage.hidden = true;
    dialogImage.removeAttribute('src');
    dialogLogo.hidden = true;
    dialogLogo.removeAttribute('src');
    dialogDownload.hidden = true;
    dialogDownload.removeAttribute('href');
    dialogStage.style.background = '';
    dialogStage.classList.remove('is-composition');
    dialogStage.classList.add('is-guideline');
    dialogContent.replaceChildren(content.cloneNode(true));
    dialogContent.hidden = false;
    dialog.showModal();
    dialogClose.focus();
  }

  function closePreview() {
    if (dialog.open) dialog.close();
  }

  dialogClose.addEventListener('click', closePreview);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closePreview();
  });
  dialog.addEventListener('close', () => {
    dialogStage.classList.remove('is-composition', 'is-guideline');
    dialogLogo.removeAttribute('src');
    dialogLogo.alt = '';
    dialogImage.removeAttribute('src');
    dialogImage.alt = '';
    dialogImage.hidden = false;
    dialogContent.hidden = true;
    dialogContent.replaceChildren();
    dialogStage.style.background = '';
  });

  const logoCanvas = section.querySelector('[data-logo-canvas]');
  const logoPreview = section.querySelector('[data-logo-preview]');
  const logoMissing = section.querySelector('[data-logo-missing]');
  const logoVariants = section.querySelector('[data-logo-variants]');
  const logoVariantFull = section.querySelector('[data-logo-variant-full]');
  const logoVariantShort = section.querySelector('[data-logo-variant-short]');
  const logoLabel = section.querySelector('[data-logo-label]');
  const logoUsage = section.querySelector('[data-logo-usage]');
  const logoPng = section.querySelector('[data-logo-png]');
  const logoVectorDownloads = section.querySelector('[data-logo-vector-downloads]');
  const logoGuidelines = section.querySelector('[data-logo-guidelines]');
  const logoButtons = new Map();
  let activeLogo = data.logo.variants[0];
  let activeLogoBackground = data.logo.backgrounds[0];
  let logoRenderRequest = 0;

  function renderLogoVectors(variant) {
    logoVectorDownloads.replaceChildren();
    (variant.vectors || []).forEach((file) => {
      const link = create('a', 'logo-vector-link');
      link.href = file.path;
      link.download = '';
      link.textContent = file.label;
      link.title = `${variant.label} · ${file.label}`;
      logoVectorDownloads.append(link);
    });
  }

  function setLogoBackground(background, button) {
    if (!background) return;
    activeLogoBackground = background;
    logoCanvas.style.backgroundColor = background.color;
    section.querySelectorAll('[data-logo-background]').forEach((item) => {
      const active = item === button || item.dataset.logoBackground === background.id;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
  }

  function renderLogoPreview(variant) {
    const request = ++logoRenderRequest;
    const available = Boolean(variant.preview);
    logoMissing.hidden = available;
    if (!available) {
      logoPreview.hidden = true;
      logoPreview.removeAttribute('src');
      return;
    }

    logoPreview.hidden = true;
    const pendingImage = new Image();
    pendingImage.decoding = 'async';
    pendingImage.src = variant.preview;
    const commit = () => {
      if (request !== logoRenderRequest || activeLogo.id !== variant.id) return;
      logoPreview.src = variant.preview;
      logoPreview.alt = variant.alt;
      logoPreview.hidden = false;
    };
    if (pendingImage.complete) commit();
    else {
      pendingImage.addEventListener('load', commit, { once: true });
      pendingImage.addEventListener('error', commit, { once: true });
    }
  }

  function setLogo(variant, button, options = {}) {
    activeLogo = variant;
    logoVariants.querySelectorAll('button').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    logoLabel.textContent = variant.label;
    logoUsage.textContent = variant.usage;
    renderLogoVectors(variant);
    renderLogoPreview(variant);
    logoPng.hidden = !(variant.downloadPackage || variant.download);
    if (variant.downloadPackage || variant.download) {
      logoPng.href = variant.downloadPackage || variant.download;
      logoPng.download = '';
    }
    if (options.keepBackground) return;

    const tone = variant.id.split('-')[1];
    if (!activeLogoBackground || activeLogoBackground.logoTone !== tone) {
      const preferredBackground = data.logo.backgrounds.find((item) => item.logoTone === tone);
      if (preferredBackground) {
        const preferredButton = section.querySelector(`[data-logo-background="${preferredBackground.id}"]`);
        setLogoBackground(preferredBackground, preferredButton);
      }
    }
  }

  data.logo.variants.forEach((variant, index) => {
    const button = create('button', index === 0 ? 'is-active' : '');
    button.type = 'button';
    button.setAttribute('aria-pressed', String(index === 0));
    button.setAttribute('aria-label', variant.label);
    const tone = variant.label.split('·').at(-1).trim();
    const label = create('span', '', tone.charAt(0).toUpperCase() + tone.slice(1));
    button.append(label);
    button.addEventListener('click', () => setLogo(variant, button));
    logoButtons.set(variant.id, button);
    (variant.id.startsWith('full-') ? logoVariantFull : logoVariantShort).append(button);
  });
  renderLogoVectors(activeLogo);

  section.querySelectorAll('[data-logo-background]').forEach((button) => {
    button.addEventListener('click', () => {
      const background = data.logo.backgrounds.find((item) => item.id === button.dataset.logoBackground);
      if (!background) return;
      const format = activeLogo.id.startsWith('short-') ? 'short' : 'full';
      const pairedVariant = data.logo.variants.find((variant) => variant.id === `${format}-${background.logoTone}`);
      setLogoBackground(background, button);
      if (pairedVariant) setLogo(pairedVariant, logoButtons.get(pairedVariant.id), { keepBackground: true });
    });
  });

  function guidelineImage(source, alt, className = '') {
    const image = document.createElement('img');
    image.src = source;
    image.alt = alt;
    image.loading = 'lazy';
    if (className) image.className = className;
    return image;
  }

  function renderClearspace(rule) {
    const visual = create('div', 'guideline-visual clearspace-visual');
    visual.append(guidelineImage(rule.image, rule.alt, 'clearspace-diagram-image'));
    return visual;
  }

  function renderMinimumSize(rule) {
    const visual = create('div', 'guideline-visual min-size-visual');
    rule.examples.forEach((example) => {
      const figure = create('figure', 'min-size-example');
      const stage = create('div', 'min-size-stage');
      stage.style.setProperty('--min-logo-height', `${example.minValue}px`);
      const baseSample = create('div', 'min-size-base-sample');
      baseSample.append(guidelineImage(example.baseImage, `${example.label}: базовая высота ${example.baseValue} пикселей`));
      const minimumSample = create('div', 'min-size-minimum-sample');
      minimumSample.append(
        create('span', 'min-size-minimum-label', 'Минимальная высота'),
        guidelineImage(example.image, example.alt, 'min-size-minimum-logo'),
        create('strong', 'min-size-minimum-value', `${example.minValue} px`)
      );
      stage.append(baseSample, minimumSample);
      const caption = create('figcaption', 'min-size-caption');
      caption.append(create('strong', '', example.label));
      figure.append(stage, caption);
      visual.append(figure);
    });
    return visual;
  }

  function renderIncorrectLogo(rule, example) {
    const stage = create('div', `prohibited-stage is-${example.kind}`);
    if (example.image) {
      const exampleImage = guidelineImage(example.image, example.label, 'prohibited-example-image');
      exampleImage.loading = 'eager';
      stage.append(exampleImage);
    } else if (example.kind === 'transparent-color') {
      stage.append(
        guidelineImage(rule.image, rule.alt, 'prohibited-logo-layer is-mixed-base'),
        guidelineImage(rule.image, '', 'prohibited-logo-layer is-mixed-wordmark')
      );
    } else if (example.kind === 'enlarged-letter') {
      stage.append(
        guidelineImage(rule.image, rule.alt, 'prohibited-logo-layer is-enlarged-base'),
        guidelineImage(rule.image, '', 'prohibited-logo-layer is-enlarged-k is-k-first'),
        guidelineImage(rule.image, '', 'prohibited-logo-layer is-enlarged-k is-k-second')
      );
    } else if (example.kind === 'shifted') {
      stage.append(
        guidelineImage(rule.image, '', 'prohibited-logo-layer is-wordmark'),
        guidelineImage(rule.image, rule.alt, 'prohibited-logo-layer is-subtitle')
      );
    } else {
      stage.append(guidelineImage(rule.image, rule.alt, 'prohibited-logo'));
    }
    return stage;
  }

  function renderProhibited(rule) {
    const visual = create('div', 'guideline-visual prohibited-visual');
    [rule.examples.slice(0, 3), rule.examples.slice(3, 6)].forEach((examples) => {
      const column = create('div', 'prohibited-column');
      const marker = create('span', 'prohibited-column-marker', '×');
      marker.setAttribute('aria-hidden', 'true');
      column.append(marker);
      examples.forEach((example) => {
        const figure = create('figure', 'prohibited-example');
        figure.append(renderIncorrectLogo(rule, example), create('figcaption', '', example.label));
        column.append(figure);
      });
      visual.append(column);
    });
    return visual;
  }

  const guidelineRenderers = {
    clearspace: renderClearspace,
    'min-size': renderMinimumSize,
    prohibited: renderProhibited
  };

  data.logo.guidelines.forEach((rule) => {
    const article = create('article', `logo-guideline is-${rule.type}`);
    const copy = create('div', 'logo-guideline-copy');
    copy.append(create('h4', '', rule.title), create('p', '', rule.text));
    const renderer = guidelineRenderers[rule.type];
    if (renderer) {
      const visual = renderer(rule);
      visual.tabIndex = 0;
      visual.setAttribute('role', 'button');
      visual.setAttribute('aria-label', `Увеличить: ${rule.title}`);
      const showRule = () => openContentPreview({ title: rule.title, content: visual });
      visual.addEventListener('click', showRule);
      visual.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        showRule();
      });
      article.append(copy, visual);
    }
    logoGuidelines.append(article);
  });

  const primaryPalette = section.querySelector('[data-primary-palette]');
  const themePalettes = section.querySelector('[data-theme-palettes]');
  const colorChip = section.querySelector('[data-color-chip]');
  const colorGroup = section.querySelector('[data-color-group]');
  const colorName = section.querySelector('[data-color-name]');
  const colorHex = section.querySelector('[data-color-hex]');
  const colorRgb = section.querySelector('[data-color-rgb]');
  const colorCmyk = section.querySelector('[data-color-cmyk]');
  const copyColor = section.querySelector('[data-copy-color]');
  const copyToast = section.querySelector('[data-copy-toast]');
  let selectedHex = data.colors.primary[0].hex;
  let toastTimer;

  function setColor(color, group, button) {
    selectedHex = color.hex;
    colorChip.style.backgroundColor = color.hex;
    colorGroup.textContent = group;
    colorName.textContent = color.name;
    colorHex.textContent = color.hex;
    colorRgb.textContent = color.rgb;
    colorCmyk.textContent = color.cmyk;
    section.querySelectorAll('[data-color-button]').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
  }

  function makeColorButton(color, group, primary) {
    const button = create('button', `color-swatch${color.dark ? ' is-dark' : ''}${primary ? ' is-primary' : ''}`);
    button.type = 'button';
    button.dataset.colorButton = '';
    button.style.setProperty('--swatch', color.hex);
    button.setAttribute('aria-label', `${group}: ${color.name}, ${color.hex}`);
    button.setAttribute('aria-pressed', 'false');
    const top = create('span', 'color-swatch-top');
    top.append(create('b', '', color.name), create('em', '', color.share || color.hex));
    const value = create('strong', '', color.hex);
    button.append(top, value);
    button.addEventListener('click', () => setColor(color, group, button));
    return button;
  }

  data.colors.primary.forEach((color, index) => {
    const button = makeColorButton(color, 'Основная палитра', true);
    if (index === 0) {
      button.classList.add('is-active');
      button.setAttribute('aria-pressed', 'true');
    }
    primaryPalette.append(button);
  });

  data.colors.themes.forEach((theme) => {
    const themeClass = theme.name === 'Благотворительная программа'
      ? ' is-charity'
      : theme.name === 'Сердце Сказки · зима'
        ? ' is-winter'
        : '';
    const group = create('section', `theme-palette${theme.featured ? ' is-featured' : ''}${themeClass}`);
    const heading = create('h5', '', theme.name);
    const colors = create('div', 'theme-palette-colors');
    theme.colors.forEach((color) => {
      colors.append(makeColorButton(color, theme.name, false));
    });
    group.append(heading, colors);
    themePalettes.append(group);
  });
  colorChip.style.backgroundColor = selectedHex;

  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      const input = document.createElement('textarea');
      input.value = value;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.append(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
  }

  copyColor.addEventListener('click', async () => {
    await copyText(selectedHex);
    copyToast.textContent = `${selectedHex} скопирован`;
    copyToast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => copyToast.classList.remove('is-visible'), 1800);
  });

  const fontInput = section.querySelector('[data-font-input]');
  const fontRange = section.querySelector('[data-font-range]');
  const fontSize = section.querySelector('[data-font-size]');
  const fontPreviews = section.querySelector('[data-font-previews]');

  data.fonts.forEach((font) => {
    const article = create('article', `font-preview font-${font.id}`);
    const meta = create('div', 'font-preview-meta');
    meta.append(create('h4', '', font.name), create('p', '', font.role));
    const sample = create('p', 'font-preview-sample', font.sample);
    sample.dataset.fontSample = '';
    sample.style.fontFamily = font.family;
    article.append(meta, sample);
    fontPreviews.append(article);
  });

  function updateFontPreview() {
    const value = fontInput.value.trim();
    const size = Number(fontRange.value);
    fontSize.value = `${size} px`;
    fontPreviews.style.setProperty('--preview-size', `${size}px`);
    data.fonts.forEach((font, index) => {
      const sample = fontPreviews.querySelectorAll('[data-font-sample]')[index];
      sample.textContent = value || font.sample;
    });
  }
  fontInput.addEventListener('input', updateFontPreview);
  fontRange.addEventListener('input', updateFontPreview);
  updateFontPreview();

  const seasonalGraphic = section.querySelector('[data-seasonal-graphic]');
  if (seasonalGraphic && data.graphics.seasonal) {
    const seasonal = data.graphics.seasonal;
    let activeVariant = seasonal.variants[0];
    const preview = create('button', 'seasonal-graphic-preview');
    preview.type = 'button';
    preview.setAttribute('aria-label', `Увеличить сочетание «${seasonal.name}»`);
    const image = document.createElement('img');
    image.className = 'seasonal-composition';
    image.src = activeVariant.composition;
    image.alt = seasonal.alt;
    preview.style.background = activeVariant.background;
    preview.append(image);
    preview.addEventListener('click', () => openPreview({
      title: `${seasonal.name} · ${activeVariant.name}`,
      image: activeVariant.composition,
      alt: seasonal.alt,
      download: activeVariant.composition,
      background: activeVariant.background
    }));

    const copy = create('div', 'seasonal-graphic-copy');
    copy.append(
      create('small', '', seasonal.label),
      create('h4', '', seasonal.name),
      create('p', '', seasonal.note),
      create('p', 'seasonal-graphic-rule', seasonal.rule)
    );
    const switcher = create('div', 'seasonal-variant-switcher');
    const actions = create('div', 'seasonal-graphic-actions');
    const download = create('a', 'is-primary', 'Скачать PNG');
    download.href = activeVariant.composition;
    download.download = '';
    seasonal.variants.forEach((variant, index) => {
      const button = create('button', index === 0 ? 'is-active' : '', variant.name);
      button.type = 'button';
      button.style.setProperty('--variant-color', variant.color);
      button.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
      button.addEventListener('click', () => {
        activeVariant = variant;
        image.src = variant.composition;
        preview.style.background = variant.background;
        download.href = variant.composition;
        switcher.querySelectorAll('button').forEach((item) => {
          const isActive = item === button;
          item.classList.toggle('is-active', isActive);
          item.setAttribute('aria-pressed', String(isActive));
        });
      });
      switcher.append(button);
    });
    actions.append(download);
    copy.append(switcher, actions);
    seasonalGraphic.append(preview, copy);
  }

  const winterMarkRoot = section.querySelector('[data-winter-mark]');
  if (winterMarkRoot && data.graphics.seasonal.winterMark) {
    const mark = data.graphics.seasonal.winterMark;
    let activeMark = mark.variants[0];
    const preview = create('div', 'winter-mark-preview');
    const image = document.createElement('img');
    image.src = activeMark.path;
    image.alt = mark.name;
    image.loading = 'lazy';
    preview.style.background = activeMark.background;
    preview.append(image);
    const copy = create('div', 'winter-mark-copy');
    copy.append(create('small', '', mark.label), create('h4', '', mark.name));
    const switcher = create('div', 'winter-mark-controls');
    const actions = create('div', 'winter-mark-actions');
    const download = create('a', 'is-primary', 'Скачать PNG');
    download.href = activeMark.path;
    download.download = '';
    mark.variants.forEach((variant, index) => {
      const button = create('button', index === 0 ? 'is-active' : '', variant.name);
      button.type = 'button';
      button.style.setProperty('--mark-color', variant.color);
      button.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
      button.addEventListener('click', () => {
        activeMark = variant;
        image.src = variant.path;
        preview.style.background = variant.background;
        download.href = variant.path;
        switcher.querySelectorAll('button').forEach((item) => {
          const isActive = item === button;
          item.classList.toggle('is-active', isActive);
          item.setAttribute('aria-pressed', String(isActive));
        });
      });
      switcher.append(button);
    });
    actions.append(download);
    copy.append(switcher, actions);
    winterMarkRoot.append(preview, copy);
  }

  const brandShapes = section.querySelector('[data-brand-shapes]');
  if (brandShapes && data.graphics.shapes) {
    const shapes = data.graphics.shapes;
    const head = create('div', 'brand-shapes-head');
    const copy = create('div');
    copy.append(create('h4', '', shapes.name), create('p', '', 'Оригинальные формы из векторного набора. Цвета адаптированы к утверждённой палитре.'));
    const download = create('a', '', 'Скачать набор · EPS');
    download.href = shapes.source;
    download.download = '';
    head.append(copy, download);
    const gallery = create('div', 'brand-shapes-gallery');
    shapes.items.forEach((shape) => {
      const item = create('div', 'brand-shape-item');
      item.style.setProperty('--shape-background', shape.background);
      const image = document.createElement('img');
      image.src = shape.path;
      image.alt = `${shape.name}. ${shapes.alt}`;
      image.loading = 'lazy';
      item.append(image);
      gallery.append(item);
    });
    brandShapes.append(head, gallery);
  }

  const navLinks = [...section.querySelectorAll('.brand-style-nav a')];
  const chapters = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const chapterObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${visible.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-24% 0px -60% 0px', threshold: [0, .1, .35] });
    chapters.forEach((chapter) => chapterObserver.observe(chapter));
  }

  navLinks.forEach((link) => link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
  }));

  section.querySelectorAll('[data-style-back]').forEach((link) => link.addEventListener('click', (event) => {
    const sectionHead = section.querySelector('.brand-style-head');
    if (!sectionHead) return;
    event.preventDefault();
    sectionHead.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
  }));
})();
