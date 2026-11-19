/*
 * Единый каталог фирменных материалов.
 * Этот объект используется интерактивным разделом «Фирменный стиль».
 * Не добавляйте сюда файлы, которых нет в проекте.
 */
window.SKAZKA_BRAND_ASSETS = {
  meta: {
    version: '1.8',
    updated: 'auto',
    status: 'рабочая версия на согласовании'
  },
  logo: {
    backgrounds: [
      { id: 'pale', label: 'Светло-голубой', color: '#E6F4FD', logoTone: 'blue' },
      { id: 'blue', label: 'Фирменный голубой', color: '#39C2EA', logoTone: 'white' },
      { id: 'white', label: 'Белый', color: '#FFFFFF', logoTone: 'black' },
      { id: 'dark', label: 'Тёмный', color: '#222222', logoTone: 'white' }
    ],
    guidelines: [
      {
        type: 'clearspace',
        title: 'Охранное поле',
        text: 'Свободная зона со всех сторон равна высоте буквы «А» из логотипа. Внутрь неё не заходят текст, графика и края макета.',
        image: 'assets/brand/guidelines/logo-clearspace-clean.png',
        alt: 'Утверждённая схема охранного поля логотипа «Сказка»'
      },
      {
        type: 'min-size',
        title: 'Минимальный размер',
        text: 'Полная версия: 96 px базовая высота, 19 px минимальная. Сокращённая: 68 px базовая, 13 px минимальная.',
        examples: [
          {
            label: 'Полная версия',
            baseValue: 96,
            minValue: 19,
            baseImage: 'assets/brand/guidelines/logo-size-full-base.png',
            image: 'assets/brand/logo/png/skazka-logo-01.png',
            alt: 'Полная версия логотипа «Сказка»'
          },
          {
            label: 'Сокращённая версия',
            baseValue: 68,
            minValue: 13,
            baseImage: 'assets/brand/guidelines/logo-size-short-base.png',
            image: 'assets/brand/logo/png/skazka-logo-05.png',
            alt: 'Сокращённая версия логотипа «Сказка»'
          }
        ]
      },
      {
        type: 'prohibited',
        title: 'Недопустимое использование',
        text: 'Логотип используется только в утверждённых цветах, композиции и пропорциях.',
        image: 'assets/brand/logo/png/skazka-logo-01.png',
        alt: 'Полный голубой логотип «Сказка»',
        examples: [
          { kind: 'transparent-color', label: 'Нельзя перекрашивать название в нефирменные цвета или менять степень прозрачности логотипа.' },
          { kind: 'nonbrand-color', label: 'Нельзя перекрашивать логотип в нефирменные цвета.' },
          { kind: 'distorted', label: 'Нельзя менять размер логотипа, не сохраняя его пропорции.' },
          { kind: 'enlarged-letter', image: 'assets/brand/logo/examples/enlarged-both-k-transparent.png', label: 'Нельзя менять или дополнять логотип чем-либо без предусмотренного ребрендинга.' },
          { kind: 'outlined', label: 'Нельзя добавлять к логотипу обводку.' },
          { kind: 'shifted', label: 'Нельзя сдвигать шрифтовую или символьную часть способом, не предусмотренным в брендбуке.' }
        ]
      }
    ],
    variants: [
      {
        id: 'full-blue',
        label: 'Полный · голубой',
        status: 'Основной',
        preview: 'assets/brand/logo/png/skazka-logo-01.png',
        download: 'assets/brand/logo/png/skazka-logo-01.png',
        downloadPackage: 'assets/brand/logo/downloads/skazka-logo-01-png.zip',
        vectors: [
          { label: 'RGB · PDF', path: 'assets/brand/logo/vector/rgb/skazka-logo-full-blue-rgb.pdf' },
          { label: 'CMYK · PDF', path: 'assets/brand/logo/vector/cmyk/skazka-logo-full-blue-cmyk.pdf' }
        ],
        alt: 'Голубой логотип «Сказка» с подписью «Парк развлечений»',
        usage: 'Основная версия для белого и очень светлого фона.'
      },
      {
        id: 'full-white',
        label: 'Полный · белый',
        status: 'Инверсия',
        preview: 'assets/brand/logo/png/skazka-logo-04.png',
        download: 'assets/brand/logo/png/skazka-logo-04.png',
        downloadPackage: 'assets/brand/logo/downloads/skazka-logo-04-png.zip',
        vectors: [
          { label: 'RGB · PDF', path: 'assets/brand/logo/vector/rgb/skazka-logo-full-white-rgb.pdf' },
          { label: 'CMYK · PDF', path: 'assets/brand/logo/vector/cmyk/skazka-logo-full-white-cmyk.pdf' }
        ],
        alt: 'Белый логотип «Сказка» с подписью «Парк развлечений»',
        usage: 'Инверсия для фирменного голубого и ровного тёмного фона.'
      },
      {
        id: 'full-black',
        label: 'Полный · чёрный',
        status: 'Монохром',
        preview: 'assets/brand/logo/png/skazka-logo-03.png',
        download: 'assets/brand/logo/png/skazka-logo-03.png',
        downloadPackage: 'assets/brand/logo/downloads/skazka-logo-03-png.zip',
        vectors: [
          { label: 'RGB · PDF', path: 'assets/brand/logo/vector/rgb/skazka-logo-full-black-rgb.pdf' },
          { label: 'CMYK · PDF', path: 'assets/brand/logo/vector/cmyk/skazka-logo-full-black-cmyk.pdf' }
        ],
        alt: 'Чёрный логотип «Сказка» с подписью «Парк развлечений»',
        usage: 'Одноцветная версия для технической и чёрно-белой печати.'
      },
      {
        id: 'short-blue',
        label: 'Короткий · голубой',
        status: 'Дополнительный',
        preview: 'assets/brand/logo/png/skazka-logo-05.png',
        download: 'assets/brand/logo/png/skazka-logo-05.png',
        downloadPackage: 'assets/brand/logo/downloads/skazka-logo-05-png.zip',
        vectors: [
          { label: 'RGB · PDF', path: 'assets/brand/logo/vector/rgb/skazka-logo-short-blue-rgb.pdf' },
          { label: 'CMYK · PDF', path: 'assets/brand/logo/vector/cmyk/skazka-logo-short-blue-cmyk.pdf' }
        ],
        alt: 'Сокращённый голубой логотип «Сказка» без подписи',
        usage: 'Редкое исключение для небольшого нанесения, где подпись не читается.'
      },
      {
        id: 'short-white',
        label: 'Короткий · белый',
        status: 'Дополнительный',
        preview: 'assets/brand/logo/png/skazka-logo-08.png',
        download: 'assets/brand/logo/png/skazka-logo-08.png',
        downloadPackage: 'assets/brand/logo/downloads/skazka-logo-08-png.zip',
        vectors: [
          { label: 'RGB · PDF', path: 'assets/brand/logo/vector/rgb/skazka-logo-short-white-rgb.pdf' },
          { label: 'CMYK · PDF', path: 'assets/brand/logo/vector/cmyk/skazka-logo-short-white-cmyk.pdf' }
        ],
        alt: 'Сокращённый белый логотип «Сказка» без подписи',
        usage: 'Редкое исключение для малых одноцветных нанесений на тёмном фоне.'
      },
      {
        id: 'short-black',
        label: 'Короткий · чёрный',
        status: 'Дополнительный',
        preview: 'assets/brand/logo/png/skazka-logo-07.png',
        download: 'assets/brand/logo/png/skazka-logo-07.png',
        downloadPackage: 'assets/brand/logo/downloads/skazka-logo-07-png.zip',
        vectors: [
          { label: 'RGB · PDF', path: 'assets/brand/logo/vector/rgb/skazka-logo-short-black-rgb.pdf' },
          { label: 'CMYK · PDF', path: 'assets/brand/logo/vector/cmyk/skazka-logo-short-black-cmyk.pdf' }
        ],
        alt: 'Сокращённый чёрный логотип «Сказка» без подписи',
        usage: 'Одноцветная короткая версия для небольшого технического нанесения.'
      }
    ]
  },
  colors: {
    primary: [
      { name: 'Основной', hex: '#39C2EA', rgb: '63 · 191 · 231', cmyk: '66 · 0 · 6 · 0', share: '50%' },
      { name: 'Поддерживающий', hex: '#34B4E8', rgb: '52 · 179 · 232', cmyk: '69 · 8 · 0 · 0', share: '20%' },
      { name: 'Светлый', hex: '#9CD6EE', rgb: '156 · 214 · 238', cmyk: '42 · 1 · 5 · 0', share: '10%' },
      { name: 'Текстовый', hex: '#222222', rgb: '33 · 33 · 33', cmyk: '74 · 64 · 60 · 78', share: '10%', dark: true },
      { name: 'Фоновый', hex: '#E6F4FD', rgb: '230 · 244 · 253', cmyk: '12 · 0 · 0 · 0', share: '10%' }
    ],
    themes: [
      {
        name: 'Ярко-розовый акцент',
        featured: true,
        colors: [
          { name: 'Telemagenta', hex: '#D32D6B', rgb: '211 · 45 · 107', cmyk: '13 · 96 · 37 · 0', dark: true }
        ]
      },
      {
        name: 'Благотворительная программа',
        colors: [
          { name: 'Основной', hex: '#EEE8FF', rgb: '238 · 232 · 255', cmyk: 'Требует подтверждения' },
          { name: 'Акцентный', hex: '#745ED0', rgb: '116 · 94 · 208', cmyk: 'Требует подтверждения', dark: true },
          { name: 'Акцентный', hex: '#F5BD4C', rgb: '245 · 189 · 76', cmyk: 'Требует подтверждения' },
          { name: 'Текстовый', hex: '#5243A5', rgb: '82 · 67 · 165', cmyk: 'Требует подтверждения', dark: true },
          { name: 'Текстовый', hex: '#222222', rgb: '33 · 33 · 33', cmyk: '74 · 64 · 60 · 78', dark: true }
        ]
      },
      {
        name: 'Сердце Сказки · зима',
        colors: [
          { name: 'Porcelain', hex: '#FFFBF6', rgb: '255 · 251 · 246', cmyk: '0 · 1 · 2 · 0' },
          { name: 'Ice Blue', hex: '#9CD4EE', rgb: '156 · 212 · 238', cmyk: '36 · 3 · 2 · 0' },
          { name: 'Blush Pink', hex: '#FFB9E9', rgb: '255 · 185 · 233', cmyk: '2 · 33 · 0 · 0' },
          { name: 'Telemagenta', hex: '#D32D6B', rgb: '211 · 45 · 107', cmyk: '13 · 96 · 37 · 0', dark: true },
          { name: 'Carmine', hex: '#B31E31', rgb: '179 · 30 · 49', cmyk: '21 · 100 · 86 · 12', dark: true }
        ]
      }
    ],
    sources: [
      'ПАЛИТРА/ФИРМЕННЫЙ_цвет_парка.pdf'
    ]
  },
  fonts: [
    {
      id: 'bebas',
      name: 'Bebas Neue Bold',
      role: 'Заголовки и крупные цифры',
      family: "'Bebas Neue', Arial, sans-serif",
      sample: 'МНОГООБРАЗИЕ ВПЕЧАТЛЕНИЙ'
    },
    {
      id: 'pt-root',
      name: 'PT Root UI',
      role: 'Основной текст и интерфейс',
      family: "'PT Root UI', Arial, sans-serif",
      sample: '«Сказка» объединяет разные форматы отдыха для детей и взрослых.'
    }
  ],
  graphics: {
    seasonal: {
      name: 'Сердце Сказки + логотип',
      label: 'Зимнее сочетание',
      composition: 'assets/brand/seasonal/compositions/heart-logo-telemagenta.png',
      background: '#FFFBF6',
      guide: 'assets/brand/seasonal/heart-logobook.pdf',
      variants: [
        { name: 'Telemagenta', color: '#D32D6B', composition: 'assets/brand/seasonal/compositions/heart-logo-telemagenta.png', background: '#FFFBF6' },
        { name: 'Porcelain', color: '#FFFBF6', composition: 'assets/brand/seasonal/compositions/heart-logo-porcelain.png', background: '#9CD4EE' },
        { name: 'Carmine', color: '#B31E31', composition: 'assets/brand/seasonal/compositions/heart-logo-carmine.png', background: '#FFB9E9' },
        { name: 'Blush Pink', color: '#FFB9E9', composition: 'assets/brand/seasonal/compositions/heart-logo-blush-pink.png', background: '#B31E31' }
      ],
      winterMark: {
        name: 'Зимняя Сказка',
        label: 'Сезонная графика',
        guide: 'assets/brand/seasonal/heart-logobook.pdf',
        variants: [
          { name: 'Розовый', color: '#D32D6B', background: '#FFFBF6', path: 'assets/brand/seasonal/winter-skazka-magenta.png' },
          { name: 'Голубой', color: '#5EA5DF', background: '#FFFBF6', path: 'assets/brand/seasonal/winter-skazka-ice-blue.png' }
        ]
      },
      alt: 'Горизонтальное зимнее сочетание «Сердце Сказки» и логотипа парка одного цвета',
      note: 'В зимней коммуникации сердце и логотип используются в одной горизонтальной композиции. Цвет логотипа всегда совпадает с цветом сердца.',
      rule: 'Для сердца: охранное поле — ½ высоты знака; минимальный размер — 15 мм / 45 px.'
    },
    shapes: {
      name: 'Фирменные формы',
      alt: 'Утверждённые цветные округлые формы из основного брендбука',
      source: 'ФИРМЕННАЯ ГРАФИКА/ГРАФИКА_shapes.eps',
      items: [
        { name: 'Форма 01', path: 'assets/brand/graphics/shapes/shape-01.png', background: '#E6F4FD' },
        { name: 'Форма 02', path: 'assets/brand/graphics/shapes/shape-02.png', background: '#FFB9E9' },
        { name: 'Форма 03', path: 'assets/brand/graphics/shapes/shape-03.png', background: '#EEE8FF' },
        { name: 'Форма 04', path: 'assets/brand/graphics/shapes/shape-04.png', background: '#EEE8FF' },
        { name: 'Форма 05', path: 'assets/brand/graphics/shapes/shape-05.png', background: '#FFFBF6' },
        { name: 'Форма 06', path: 'assets/brand/graphics/shapes/shape-06.png', background: '#E6F4FD' }
      ]
    }
  }
};
