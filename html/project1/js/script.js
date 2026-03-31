<<<<<<< HEAD
/* ══════════════════════════════════════════
   Swiggy — script.js
══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  const section1  = document.querySelector('main > section:first-child');
  const section2  = document.querySelector('main > section:last-child');
  const tagline   = section1.querySelector('p');
  const select    = section1.querySelector('select');
  const textInput = section1.querySelector('input[type="text"]');

  /* ══════════════════════════════════════
     1. LOGO — with text fallback
  ══════════════════════════════════════ */
  const logoDiv = document.querySelector('.logo');
  const logoImg = logoDiv && logoDiv.querySelector('img');

  // Inject the text fallback span (hidden by default, shown if img fails)
  if (logoDiv) {
    const logoText = document.createElement('span');
    logoText.className = 'logo-text';
    logoText.innerHTML =
      '<span class="logo-s">S</span>' +
      '<span class="logo-wi">wi</span>' +
      '<span class="logo-gg">gg</span>' +
      '<span class="logo-y">y</span>';
    logoDiv.appendChild(logoText);

    if (logoImg) {
      logoImg.onerror = () => {
        logoDiv.classList.add('img-failed'); // CSS hides img, shows .logo-text
      };
      // If already broken (cached error)
      if (logoImg.complete && logoImg.naturalWidth === 0) {
        logoDiv.classList.add('img-failed');
      }
    }
  }

  /* ══════════════════════════════════════
     2. VEGGIE SIDE IMAGE — with emoji fallback
  ══════════════════════════════════════ */
  const veggie = document.createElement('img');
  veggie.src       = 'images/Veegies.png';
  veggie.alt       = 'Fresh Veggies';
  veggie.className = 'hero-veggie';

  veggie.onerror = () => {
    veggie.remove();
    // Show emoji bunch as fallback
    const fallback = document.createElement('div');
    fallback.className   = 'hero-veggie-fallback';
    fallback.textContent = '🥗';
    section1.appendChild(fallback);
  };

  section1.appendChild(veggie);

  /* ══════════════════════════════════════
     3. TAGLINE highlight
  ══════════════════════════════════════ */
  if (tagline) {
    tagline.innerHTML = tagline.textContent
      .replace('SWiggy it!', '<em style="font-style:italic;opacity:0.88">Swiggy it!</em>');
  }

  /* ══════════════════════════════════════
     4. BUILD SEARCH ROW — two pills
  ══════════════════════════════════════ */
  const searchRow = document.createElement('div');
  searchRow.className = 'search-row';

  // Pill 1: Location
  const pillLoc = document.createElement('div');
  pillLoc.className = 'pill-location';
  const chevron = document.createElement('span');
  chevron.className   = 'pill-chevron';
  chevron.textContent = '▼';
  pillLoc.appendChild(select);
  pillLoc.appendChild(chevron);

  // Pill 2: Search
  const pillSearch = document.createElement('div');
  pillSearch.className = 'pill-search';

  const searchBtn = document.createElement('button');
  searchBtn.className = 'search-btn';
  searchBtn.setAttribute('aria-label', 'Search');
  searchBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`;

  const suggestBox = document.createElement('div');
  suggestBox.className = 'suggestions';

  pillSearch.appendChild(textInput);
  pillSearch.appendChild(searchBtn);
  pillSearch.appendChild(suggestBox);

  searchRow.appendChild(pillLoc);
  searchRow.appendChild(pillSearch);

  // Insert after tagline
  tagline.insertAdjacentElement('afterend', searchRow);

  /* ══════════════════════════════════════
     5. FOOD TAG CHIPS
  ══════════════════════════════════════ */
  const tags = ['🍕 Pizza', '🍔 Burger', '🍜 Biryani', '🥗 Salads', '🍩 Desserts', '🍣 Sushi', '🌮 Tacos'];
  const tagsRow = document.createElement('div');
  tagsRow.className = 'food-tags';

  tags.forEach((t, i) => {
    const chip = document.createElement('span');
    chip.className   = 'food-tag';
    chip.textContent = t;
    chip.style.opacity   = '0';
    chip.style.transform = 'translateY(10px)';

    chip.addEventListener('click', () => {
      textInput.value = t.slice(3);
      textInput.focus();
      chip.style.background  = 'white';
      chip.style.color        = 'var(--orange)';
      chip.style.borderColor  = 'white';
      setTimeout(() => {
        chip.style.background = '';
        chip.style.color      = '';
        chip.style.borderColor = '';
      }, 700);
    });

    tagsRow.appendChild(chip);

    // Stagger entrance
    setTimeout(() => {
      chip.style.transition = 'opacity 0.35s ease, transform 0.35s ease, background 0.2s, color 0.2s, border-color 0.2s';
      chip.style.opacity    = '1';
      chip.style.transform  = 'translateY(0)';
    }, 650 + i * 75);
  });

  searchRow.insertAdjacentElement('afterend', tagsRow);

  /* ══════════════════════════════════════
     6. SEARCH SUGGESTIONS
  ══════════════════════════════════════ */
  const restaurants = [
    { icon: '🍕', name: 'Pizza Hut' },
    { icon: '🍔', name: "McDonald's" },
    { icon: '🍜', name: 'Biryani Blues' },
    { icon: '🌮', name: 'Taco Bell' },
    { icon: '🥗', name: 'Salad Days' },
    { icon: '🍣', name: 'Sushi Garden' },
    { icon: '🍩', name: 'Krispy Kreme' },
    { icon: '🍗', name: 'KFC' },
    { icon: '🥪', name: 'Subway' },
    { icon: '🍛', name: "Haldiram's" },
  ];

  function renderSuggestions(query) {
    suggestBox.innerHTML = '';
    if (!query.trim()) {
      suggestBox.classList.remove('active');
      pillSearch.classList.remove('open');
      return;
    }
    const hits = restaurants.filter(r =>
      r.name.toLowerCase().includes(query.toLowerCase())
    );
    if (!hits.length) {
      suggestBox.classList.remove('active');
      pillSearch.classList.remove('open');
      return;
    }
    hits.forEach(r => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.innerHTML = `<span class="s-icon">${r.icon}</span>${r.name}`;
      item.addEventListener('click', () => {
        textInput.value = r.name;
        suggestBox.classList.remove('active');
        pillSearch.classList.remove('open');
      });
      suggestBox.appendChild(item);
    });
    suggestBox.classList.add('active');
    pillSearch.classList.add('open');
  }

  textInput.addEventListener('input',  e  => renderSuggestions(e.target.value));
  textInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      suggestBox.classList.remove('active');
      pillSearch.classList.remove('open');
    }
    if (e.key === 'Enter') searchBtn.click();
  });

  document.addEventListener('click', e => {
    if (!pillSearch.contains(e.target)) {
      suggestBox.classList.remove('active');
      pillSearch.classList.remove('open');
    }
  });

  /* ══════════════════════════════════════
     7. SEARCH BUTTON ACTION
  ══════════════════════════════════════ */
  searchBtn.addEventListener('click', () => {
    const val = textInput.value.trim();
    if (val) {
      searchRow.style.transform = 'scale(0.98)';
      setTimeout(() => { searchRow.style.transform = ''; }, 160);
      console.log('🔍 Searching for:', val);
    } else {
      textInput.focus();
    }
  });

  /* ══════════════════════════════════════
     8. GEOLOCATION
  ══════════════════════════════════════ */
  select.addEventListener('change', () => {
    if (select.value === 'use my current loaction' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          const opt = select.querySelector('option[value="use my current loaction"]');
          if (opt) opt.textContent = '📍 Location found';
        },
        () => {
          const opt = select.querySelector('option[value="use my current loaction"]');
          if (opt) opt.textContent = '📍 Unavailable';
        }
      );
    }
  });

  /* ══════════════════════════════════════
     9. HEADER SCROLL SHADOW
  ══════════════════════════════════════ */
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ══════════════════════════════════════
     10. SECTION 2 — CATEGORY CARDS
  ══════════════════════════════════════ */
  const categories = [
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '🍔', name: 'Burgers' },
    { emoji: '🍜', name: 'Biryani' },
    { emoji: '🥗', name: 'Healthy' },
    { emoji: '🍩', name: 'Desserts' },
    { emoji: '🍣', name: 'Sushi' },
    { emoji: '🌮', name: 'Tacos' },
    { emoji: '🍗', name: 'Chicken' },
  ];

  const secTitle = document.createElement('h2');
  secTitle.className   = 'section-title';
  secTitle.innerHTML   = 'What are you <span>craving?</span>';

  const grid = document.createElement('div');
  grid.className = 'category-grid';

  categories.forEach(c => {
    const card = document.createElement('div');
    card.className = 'cat-card';
    card.innerHTML = `<span class="cat-emoji">${c.emoji}</span><span class="cat-name">${c.name}</span>`;
    card.addEventListener('click', () => {
      textInput.value = c.name;
      section1.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => textInput.focus(), 600);
    });
    grid.appendChild(card);
  });

  section2.appendChild(secTitle);
  section2.appendChild(grid);

=======
/* ══════════════════════════════════════════
   Swiggy — script.js
══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  const section1  = document.querySelector('main > section:first-child');
  const section2  = document.querySelector('main > section:last-child');
  const tagline   = section1.querySelector('p');
  const select    = section1.querySelector('select');
  const textInput = section1.querySelector('input[type="text"]');

  /* ══════════════════════════════════════
     1. LOGO — with text fallback
  ══════════════════════════════════════ */
  const logoDiv = document.querySelector('.logo');
  const logoImg = logoDiv && logoDiv.querySelector('img');

  // Inject the text fallback span (hidden by default, shown if img fails)
  if (logoDiv) {
    const logoText = document.createElement('span');
    logoText.className = 'logo-text';
    logoText.innerHTML =
      '<span class="logo-s">S</span>' +
      '<span class="logo-wi">wi</span>' +
      '<span class="logo-gg">gg</span>' +
      '<span class="logo-y">y</span>';
    logoDiv.appendChild(logoText);

    if (logoImg) {
      logoImg.onerror = () => {
        logoDiv.classList.add('img-failed'); // CSS hides img, shows .logo-text
      };
      // If already broken (cached error)
      if (logoImg.complete && logoImg.naturalWidth === 0) {
        logoDiv.classList.add('img-failed');
      }
    }
  }

  /* ══════════════════════════════════════
     2. VEGGIE SIDE IMAGE — with emoji fallback
  ══════════════════════════════════════ */
  const veggie = document.createElement('img');
  veggie.src       = 'images/Veegies.png';
  veggie.alt       = 'Fresh Veggies';
  veggie.className = 'hero-veggie';

  veggie.onerror = () => {
    veggie.remove();
    // Show emoji bunch as fallback
    const fallback = document.createElement('div');
    fallback.className   = 'hero-veggie-fallback';
    fallback.textContent = '🥗';
    section1.appendChild(fallback);
  };

  section1.appendChild(veggie);

  /* ══════════════════════════════════════
     3. TAGLINE highlight
  ══════════════════════════════════════ */
  if (tagline) {
    tagline.innerHTML = tagline.textContent
      .replace('SWiggy it!', '<em style="font-style:italic;opacity:0.88">Swiggy it!</em>');
  }

  /* ══════════════════════════════════════
     4. BUILD SEARCH ROW — two pills
  ══════════════════════════════════════ */
  const searchRow = document.createElement('div');
  searchRow.className = 'search-row';

  // Pill 1: Location
  const pillLoc = document.createElement('div');
  pillLoc.className = 'pill-location';
  const chevron = document.createElement('span');
  chevron.className   = 'pill-chevron';
  chevron.textContent = '▼';
  pillLoc.appendChild(select);
  pillLoc.appendChild(chevron);

  // Pill 2: Search
  const pillSearch = document.createElement('div');
  pillSearch.className = 'pill-search';

  const searchBtn = document.createElement('button');
  searchBtn.className = 'search-btn';
  searchBtn.setAttribute('aria-label', 'Search');
  searchBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`;

  const suggestBox = document.createElement('div');
  suggestBox.className = 'suggestions';

  pillSearch.appendChild(textInput);
  pillSearch.appendChild(searchBtn);
  pillSearch.appendChild(suggestBox);

  searchRow.appendChild(pillLoc);
  searchRow.appendChild(pillSearch);

  // Insert after tagline
  tagline.insertAdjacentElement('afterend', searchRow);

  /* ══════════════════════════════════════
     5. FOOD TAG CHIPS
  ══════════════════════════════════════ */
  const tags = ['🍕 Pizza', '🍔 Burger', '🍜 Biryani', '🥗 Salads', '🍩 Desserts', '🍣 Sushi', '🌮 Tacos'];
  const tagsRow = document.createElement('div');
  tagsRow.className = 'food-tags';

  tags.forEach((t, i) => {
    const chip = document.createElement('span');
    chip.className   = 'food-tag';
    chip.textContent = t;
    chip.style.opacity   = '0';
    chip.style.transform = 'translateY(10px)';

    chip.addEventListener('click', () => {
      textInput.value = t.slice(3);
      textInput.focus();
      chip.style.background  = 'white';
      chip.style.color        = 'var(--orange)';
      chip.style.borderColor  = 'white';
      setTimeout(() => {
        chip.style.background = '';
        chip.style.color      = '';
        chip.style.borderColor = '';
      }, 700);
    });

    tagsRow.appendChild(chip);

    // Stagger entrance
    setTimeout(() => {
      chip.style.transition = 'opacity 0.35s ease, transform 0.35s ease, background 0.2s, color 0.2s, border-color 0.2s';
      chip.style.opacity    = '1';
      chip.style.transform  = 'translateY(0)';
    }, 650 + i * 75);
  });

  searchRow.insertAdjacentElement('afterend', tagsRow);

  /* ══════════════════════════════════════
     6. SEARCH SUGGESTIONS
  ══════════════════════════════════════ */
  const restaurants = [
    { icon: '🍕', name: 'Pizza Hut' },
    { icon: '🍔', name: "McDonald's" },
    { icon: '🍜', name: 'Biryani Blues' },
    { icon: '🌮', name: 'Taco Bell' },
    { icon: '🥗', name: 'Salad Days' },
    { icon: '🍣', name: 'Sushi Garden' },
    { icon: '🍩', name: 'Krispy Kreme' },
    { icon: '🍗', name: 'KFC' },
    { icon: '🥪', name: 'Subway' },
    { icon: '🍛', name: "Haldiram's" },
  ];

  function renderSuggestions(query) {
    suggestBox.innerHTML = '';
    if (!query.trim()) {
      suggestBox.classList.remove('active');
      pillSearch.classList.remove('open');
      return;
    }
    const hits = restaurants.filter(r =>
      r.name.toLowerCase().includes(query.toLowerCase())
    );
    if (!hits.length) {
      suggestBox.classList.remove('active');
      pillSearch.classList.remove('open');
      return;
    }
    hits.forEach(r => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.innerHTML = `<span class="s-icon">${r.icon}</span>${r.name}`;
      item.addEventListener('click', () => {
        textInput.value = r.name;
        suggestBox.classList.remove('active');
        pillSearch.classList.remove('open');
      });
      suggestBox.appendChild(item);
    });
    suggestBox.classList.add('active');
    pillSearch.classList.add('open');
  }

  textInput.addEventListener('input',  e  => renderSuggestions(e.target.value));
  textInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      suggestBox.classList.remove('active');
      pillSearch.classList.remove('open');
    }
    if (e.key === 'Enter') searchBtn.click();
  });

  document.addEventListener('click', e => {
    if (!pillSearch.contains(e.target)) {
      suggestBox.classList.remove('active');
      pillSearch.classList.remove('open');
    }
  });

  /* ══════════════════════════════════════
     7. SEARCH BUTTON ACTION
  ══════════════════════════════════════ */
  searchBtn.addEventListener('click', () => {
    const val = textInput.value.trim();
    if (val) {
      searchRow.style.transform = 'scale(0.98)';
      setTimeout(() => { searchRow.style.transform = ''; }, 160);
      console.log('🔍 Searching for:', val);
    } else {
      textInput.focus();
    }
  });

  /* ══════════════════════════════════════
     8. GEOLOCATION
  ══════════════════════════════════════ */
  select.addEventListener('change', () => {
    if (select.value === 'use my current loaction' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          const opt = select.querySelector('option[value="use my current loaction"]');
          if (opt) opt.textContent = '📍 Location found';
        },
        () => {
          const opt = select.querySelector('option[value="use my current loaction"]');
          if (opt) opt.textContent = '📍 Unavailable';
        }
      );
    }
  });

  /* ══════════════════════════════════════
     9. HEADER SCROLL SHADOW
  ══════════════════════════════════════ */
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ══════════════════════════════════════
     10. SECTION 2 — CATEGORY CARDS
  ══════════════════════════════════════ */
  const categories = [
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '🍔', name: 'Burgers' },
    { emoji: '🍜', name: 'Biryani' },
    { emoji: '🥗', name: 'Healthy' },
    { emoji: '🍩', name: 'Desserts' },
    { emoji: '🍣', name: 'Sushi' },
    { emoji: '🌮', name: 'Tacos' },
    { emoji: '🍗', name: 'Chicken' },
  ];

  const secTitle = document.createElement('h2');
  secTitle.className   = 'section-title';
  secTitle.innerHTML   = 'What are you <span>craving?</span>';

  const grid = document.createElement('div');
  grid.className = 'category-grid';

  categories.forEach(c => {
    const card = document.createElement('div');
    card.className = 'cat-card';
    card.innerHTML = `<span class="cat-emoji">${c.emoji}</span><span class="cat-name">${c.name}</span>`;
    card.addEventListener('click', () => {
      textInput.value = c.name;
      section1.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => textInput.focus(), 600);
    });
    grid.appendChild(card);
  });

  section2.appendChild(secTitle);
  section2.appendChild(grid);

>>>>>>> 82a027a298deea976ef090d118d88b0e49b19eac
});