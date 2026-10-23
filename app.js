const $ = s => document.querySelector(s);
let db = null, savedOnly = false, lang = localStorage.getItem('gu-lang') || 'en';

const TRANSLATIONS = {
  en: {
    online: "● You're online",
    offline: "● Offline · use saved resources",
    demoPill: "DEMO EXPERIENCE",
    statusSlogan: "Light on data. Built for everyday progress.",
    savedGuides: "Saved guides",
    showAll: "· Show all",
    noSavedGuides: "No saved guides yet. Choose “Save offline” on a guide below.",
    minRead: "min read",
    savedRemove: "✓ Saved · remove",
    saveOffline: "Save offline ↓",
    guideSavedToast: "Guide saved on this device.",
    guideRemovedToast: "Guide removed from saved list.",
    allCategories: "All categories",
    searchPlaceholder: "Search businesses or districts…",
    searchAria: "Search businesses or districts",
    categoryAria: "Filter by category",
    noBusinesses: "No businesses match. Try a different search.",
    storageUnavailable: "Device storage is unavailable or full.",
    couldNotLoadResources: "Could not load resources. Connect to the internet and reload.",
    offlineCacheError: "Offline caching could not be enabled in this browser.",
    requestCountText: count => `${count} demo request(s) stored on this device.`,
    formSavedStatus: id => `Saved on this device: ${id}. Demo only; no support team has been contacted.`,
    formErrorStatus: "Backend unavailable. Your form is still here; reconnect and try again.",
    confirmDeleteRequests: "Delete all demo requests saved on this device?",
    requestsDeleted: "Saved requests deleted.",
    unitCostLabel: cost => `Cost per unit: ${cost}`,
    enterValidValues: "Enter valid positive values.",
    langSwitchToast: "English selected. All content is displayed in English.",
    cats: {
      "Food & farming": "Food & farming",
      "Handicrafts": "Handicrafts",
      "Textiles": "Textiles"
    },
    districts: {
      "Pune": "Pune",
      "Nashik": "Nashik",
      "Palghar": "Palghar",
      "Ratnagiri": "Ratnagiri",
      "Other": "Other"
    },
    topics: {
      "Internet connectivity": "Internet connectivity",
      "Device access": "Device access",
      "Power backup": "Power backup",
      "Digital skills": "Digital skills",
      "Business planning": "Business planning"
    },
    namePlaceholder: "What should we call you?",
    messagePlaceholder: "Tell us a little about what you need…",
    dialogEyebrow: "PRACTICAL GUIDE",
    dialogMicro: "General educational content, not professional advice.",
    dialogCloseAria: "Close guide"
  },
  mr: {
    online: "● तुम्ही ऑनलाइन आहात",
    offline: "● ऑफलाइन · सेव्ह केलेली साधने वापरा",
    demoPill: "डेमो अनुभव",
    statusSlogan: "कमी डेटावर चालणारे. रोजच्या प्रगतीसाठी बनवलेले.",
    savedGuides: "सेव्ह केलेले मार्गदर्शक",
    showAll: "· सर्व दाखवा",
    noSavedGuides: "अद्याप कोणतेही मार्गदर्शक सेव्ह केलेले नाही. खालील मार्गदर्शकावर “ऑफलाइन सेव्ह करा” निवडा.",
    minRead: "मिनिट वाचन",
    savedRemove: "✓ सेव्ह केले · काढा",
    saveOffline: "ऑफलाइन सेव्ह करा ↓",
    guideSavedToast: "मार्गदर्शक या डिव्हाइसवर सेव्ह झाला आहे.",
    guideRemovedToast: "मार्गदर्शक सेव्ह केलेल्या यादीतून काढला आहे.",
    allCategories: "सर्व प्रकार",
    searchPlaceholder: "व्यवसाय किंवा जिल्हा शोधा…",
    searchAria: "व्यवसाय किंवा जिल्हा शोधा",
    categoryAria: "प्रकारानुसार निवडा",
    noBusinesses: "कोणतेही व्यवसाय जुळत नाहीत. दुसरा शोध घेऊन पहा.",
    storageUnavailable: "डिव्हाइस स्टोरेज उपलब्ध नाही किंवा भरले आहे.",
    couldNotLoadResources: "माहिती लोड करता आली नाही. इंटरनेटशी कनेक्ट करून पुन्हा लोड करा.",
    offlineCacheError: "या ब्राउझरमध्ये ऑफलाइन कॅशिंग सक्षम करता आले नाही.",
    requestCountText: count => `या डिव्हाइसवर ${count} डेमो विनंती/विनंत्या सेव्ह आहेत.`,
    formSavedStatus: id => `या डिव्हाइसवर सेव्ह केले: ${id}. फक्त डेमो; कोणत्याही सपोर्ट टीमशी संपर्क साधलेला नाही.`,
    formErrorStatus: "बॅकएंड अनुपलब्ध आहे. तुमचा फॉर्म इथेच आहे; पुन्हा कनेक्ट करून प्रयत्न करा.",
    confirmDeleteRequests: "या डिव्हाइसवर सेव्ह केलेल्या सर्व डेमो विनंत्या हटवायच्या का?",
    requestsDeleted: "सेव्ह केलेल्या विनंत्या हटवल्या गेल्या आहेत.",
    unitCostLabel: cost => `प्रति नग खर्च: ${cost}`,
    enterValidValues: "कृपया योग्य धन संख्या प्रविष्ट करा.",
    langSwitchToast: "मराठी भाषा निवडली आहे. सर्व माहिती आता मराठीमध्ये उपलब्ध आहे.",
    cats: {
      "Food & farming": "अन्न आणि शेती",
      "Handicrafts": "हस्तकला",
      "Textiles": "वस्त्रोद्योग"
    },
    districts: {
      "Pune": "पुणे",
      "Nashik": "नाशिक",
      "Palghar": "पालघर",
      "Ratnagiri": "रत्नागिरी",
      "Other": "इतर"
    },
    topics: {
      "Internet connectivity": "इंटरनेट कनेक्टिव्हिटी",
      "Device access": "डिव्हाइस उपलब्धता",
      "Power backup": "वीज बॅकअप",
      "Digital skills": "डिजिटल कौशल्ये",
      "Business planning": "व्यवसाय नियोजन"
    },
    namePlaceholder: "आम्ही आपल्याला कोणत्या नावाने संबोधावे?",
    messagePlaceholder: "आपल्या समस्येबद्दल किंवा गरजेबद्दल थोडक्यात सांगा…",
    dialogEyebrow: "मार्गदर्शक",
    dialogMicro: "सामान्य शैक्षणिक माहिती, व्यावसायिक सल्ला नाही.",
    dialogCloseAria: "मार्गदर्शक बंद करा"
  }
};

function get(k, d) {
  try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d }
}
function put(k, v) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
    return true;
  } catch {
    toast(TRANSLATIONS[lang].storageUnavailable);
    return false;
  }
}

function toast(s) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = s;
  t.style.display = 'block';
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => t.style.display = 'none', 4000);
}

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

function renderResources() {
  if (!$('#resources')) return;
  const t = TRANSLATIONS[lang];
  const box = $('#resources');
  box.replaceChildren();
  const saved = get('gu-guides', []);
  const filterBtn = $('#saved-filter');
  if (filterBtn) {
    filterBtn.textContent = `${t.savedGuides} (${saved.length}) ${savedOnly ? t.showAll : '↗'}`;
    filterBtn.setAttribute('aria-pressed', savedOnly);
  }
  if (!db || !db.resources) return;

  const list = db.resources.filter(x => !savedOnly || saved.includes(x.id));
  const emptyP = $('#empty-resources');
  if (emptyP) {
    emptyP.hidden = list.length > 0;
    emptyP.textContent = t.noSavedGuides;
  }

  const ICONS = [
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>'
  ];

  list.forEach((x, i) => {
    const card = el('article', 'resource-card');
    const symEl = el('div', 'symbol');
    symEl.innerHTML = ICONS[i % ICONS.length];
    card.append(symEl);
    const catName = lang === 'mr' ? (x.category_mr || x.category) : x.category;
    card.append(el('p', 'category', catName));

    const titleText = lang === 'mr' ? (x.title_mr || x.title) : x.title;
    const bodyText = lang === 'mr' ? (x.body_mr || x.body) : x.body;

    const read = el('button', 'read-guide');
    read.append(el('h3', '', titleText));
    read.onclick = () => {
      $('#guide-title').textContent = titleText;
      $('#guide-body').textContent = bodyText;
      const dialogEyebrow = $('#guide-dialog .eyebrow');
      if (dialogEyebrow) dialogEyebrow.textContent = t.dialogEyebrow;
      const dialogMicro = $('#guide-dialog .micro');
      if (dialogMicro) dialogMicro.textContent = t.dialogMicro;
      $('#guide-dialog').showModal();
    };
    card.append(read);

    const bottom = el('div', 'bottom');
    bottom.append(el('span', '', `${x.minutes} ${t.minRead}`));
    const isSaved = saved.includes(x.id);
    const save = el('button', '', isSaved ? t.savedRemove : t.saveOffline);
    save.onclick = () => {
      let a = get('gu-guides', []);
      a = a.includes(x.id) ? a.filter(id => id !== x.id) : [...a, x.id];
      if (put('gu-guides', a)) {
        toast(a.includes(x.id) ? t.guideSavedToast : t.guideRemovedToast);
        renderResources();
      }
    };
    bottom.append(save);
    card.append(bottom);
    box.append(card);
  });
}

function directory() {
  if (!$('#directory')) return;
  const t = TRANSLATIONS[lang];
  const box = $('#directory');
  box.replaceChildren();
  if (!db || !db.businesses) return;

  const searchInput = $('#search');
  const catInput = $('#category');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedCat = catInput ? catInput.value : '';

  const list = db.businesses.filter(x => {
    const name = lang === 'mr' ? (x.name_mr || x.name) : x.name;
    const dist = lang === 'mr' ? (x.district_mr || x.district) : x.district;
    const cat = lang === 'mr' ? (x.category_mr || x.category) : x.category;
    const desc = lang === 'mr' ? (x.description_mr || x.description) : x.description;

    const matchesCat = !selectedCat || x.category === selectedCat || cat === selectedCat;
    const matchesQuery = !query || [x.name, x.name_mr, x.district, x.district_mr, x.category, x.category_mr, x.description, x.description_mr]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(query);

    return matchesCat && matchesQuery;
  });

  if (!list.length) {
    box.append(el('p', '', t.noBusinesses));
    return;
  }

  list.forEach(x => {
    const card = el('article', 'business-card');
    const artText = lang === 'mr' ? (x.initial_mr || x.initial) : x.initial;
    const art = el('div', 'business-art', artText);
    art.style.background = x.color;

    const distText = lang === 'mr' ? (x.district_mr || x.district) : x.district;
    const catText = lang === 'mr' ? (x.category_mr || x.category) : x.category;
    const nameText = lang === 'mr' ? (x.name_mr || x.name) : x.name;
    const descText = lang === 'mr' ? (x.description_mr || x.description) : x.description;
    const ownerText = lang === 'mr' ? (x.owner_mr || x.owner) : x.owner;

    card.append(
      art,
      el('div', 'district', `${distText.toUpperCase()} · ${catText}`),
      el('h3', '', nameText),
      el('p', '', descText),
      el('small', '', ownerText)
    );
    box.append(card);
  });
}

function renderHubs() {
  const box = $('#hubs');
  if (!box || !db || !db.hubs) return;
  box.replaceChildren();
  db.hubs.forEach(x => {
    const a = el('article', 'hub');
    const name = lang === 'mr' ? (x.name_mr || x.name) : x.name;
    const desc = lang === 'mr' ? (x.description_mr || x.description) : x.description;
    a.append(el('h3', '', name + ' ↗'), el('p', '', desc));
    box.append(a);
  });
}

function render() {
  renderResources();
  directory();
  renderHubs();
}

function connection() {
  const t = TRANSLATIONS[lang];
  const conn = $('#connection');
  if (conn) conn.textContent = navigator.onLine ? t.online : t.offline;
}
addEventListener('online', connection);
addEventListener('offline', connection);

function calc() {
  if (!$('#calculator')) return;
  const t = TRANSLATIONS[lang];
  const c = Number($('#cost').value), u = Number($('#units').value), m = Number($('#margin').value);
  const valid = $('#calculator').checkValidity() && Number.isFinite(c + u + m) && u > 0;
  const locale = lang === 'mr' ? 'mr-IN' : 'en-IN';
  $('#price').textContent = valid ? (c / u * (1 + m / 100)).toLocaleString(locale, { style: 'currency', currency: 'INR' }) : '—';
  $('#unit-cost').textContent = valid
    ? t.unitCostLabel((c / u).toLocaleString(locale, { style: 'currency', currency: 'INR' }))
    : t.enterValidValues;
}

function requestCount() {
  if (!$('#request-count')) return;
  const count = get('gu-requests', []).length;
  $('#request-count').textContent = TRANSLATIONS[lang].requestCountText(count);
}

function applyLanguage(newLang) {
  lang = newLang;
  localStorage.setItem('gu-lang', lang);
  document.documentElement.lang = lang;
  const t = TRANSLATIONS[lang];

  // Update elements with data-en / data-mr
  document.querySelectorAll('[data-en]').forEach(x => {
    const value = x.dataset[lang] || x.dataset.en;
    x.replaceChildren();
    value.split('<br>').forEach((part, i) => {
      if (i) x.append(document.createElement('br'));
      x.append(document.createTextNode(part));
    });
    // Hide element if Marathi mode and no Marathi translation provided
    if (lang === 'mr' && !x.dataset.mr) {
      x.style.display = 'none';
    } else {
      x.style.display = '';
    }
  });

  // Update elements with data-placeholder-en / data-placeholder-mr
  document.querySelectorAll('[data-placeholder-en]').forEach(x => {
    const val = x.dataset[`placeholder${lang.charAt(0).toUpperCase() + lang.slice(1)}`];
    if (val) x.placeholder = val;
  });

  // Update language toggle button text (indicates current or alternate)
  const langBtn = $('#language');
  if (langBtn) {
    langBtn.textContent = lang === 'en' ? 'मराठी' : 'English';
    // Ensure button is always visible
    langBtn.style.display = '';
  }

  // Update category dropdown options
  const catSelect = $('#category');
  if (catSelect) {
    const curVal = catSelect.value;
    catSelect.options[0].textContent = t.allCategories;
    for (let i = 1; i < catSelect.options.length; i++) {
      const opt = catSelect.options[i];
      const origKey = opt.dataset.key || opt.value;
      opt.dataset.key = origKey;
      opt.textContent = t.cats[origKey] || origKey;
    }
  }

  // Update district select in support form
  const distSelect = $('select[name="district"]');
  if (distSelect) {
    for (let i = 0; i < distSelect.options.length; i++) {
      const opt = distSelect.options[i];
      const origKey = opt.dataset.key || opt.value;
      opt.dataset.key = origKey;
      opt.textContent = t.districts[origKey] || origKey;
    }
  }

  // Update topic select in support form
  const topicSelect = $('select[name="topic"]');
  if (topicSelect) {
    for (let i = 0; i < topicSelect.options.length; i++) {
      const opt = topicSelect.options[i];
      const origKey = opt.dataset.key || opt.value;
      opt.dataset.key = origKey;
      opt.textContent = t.topics[origKey] || origKey;
    }
  }

  // Update search input
  const searchInput = $('#search');
  if (searchInput) {
    searchInput.placeholder = t.searchPlaceholder;
    searchInput.setAttribute('aria-label', t.searchAria);
  }

  // Update statusbar pill & slogan
  const demoPill = $('.demo-pill');
  if (demoPill) demoPill.textContent = t.demoPill;
  const statusSlogan = $('.statusbar span:nth-child(2)');
  if (statusSlogan) statusSlogan.textContent = t.statusSlogan;

  // Dialog close button aria
  const closeBtn = $('#close-dialog');
  if (closeBtn) closeBtn.setAttribute('aria-label', t.dialogCloseAria);

  connection();
  calc();
  requestCount();
  render();
}

// Initialise page events
if ($('#saved-filter')) $('#saved-filter').onclick = () => { savedOnly = !savedOnly; renderResources(); };
if ($('#close-dialog')) $('#close-dialog').onclick = () => $('#guide-dialog').close();
if ($('#search')) $('#search').oninput = directory;
if ($('#category')) $('#category').onchange = directory;

const langBtn = $('#language');
if (langBtn) {
  langBtn.onclick = () => {
    const nextLang = lang === 'en' ? 'mr' : 'en';
    applyLanguage(nextLang);
    toast(TRANSLATIONS[lang].langSwitchToast);
  };
}

if ($('#calculator')) {
  $('#calculator').oninput = calc;
  $('#calculator').onsubmit = e => e.preventDefault();
}

requestCount();

if ($('#support-form')) {
  $('#support-form').onsubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget, button = form.querySelector('[type=submit]'), body = Object.fromEntries(new FormData(form));
    button.disabled = true;
    let record = { ...body, id: 'LOCAL-' + Date.now(), createdAt: new Date().toISOString(), mode: 'offline' };
    try {
      if (navigator.onLine && location.protocol.startsWith('http')) {
        const res = await fetch('./api/support', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error('Backend validation failed');
        const data = await res.json();
        record.id = data.id;
        record.mode = 'backend-validated';
      }
      if (put('gu-requests', [...get('gu-requests', []), record])) {
        $('#form-status').textContent = TRANSLATIONS[lang].formSavedStatus(record.id);
        form.reset();
        requestCount();
      }
    } catch {
      $('#form-status').textContent = TRANSLATIONS[lang].formErrorStatus;
    } finally {
      button.disabled = false;
    }
  };
}

if ($('#export')) {
  $('#export').onclick = () => {
    const a = document.createElement('a');
    const url = URL.createObjectURL(new Blob([JSON.stringify(get('gu-requests', []), null, 2)], { type: 'application/json' }));
    a.href = url;
    a.download = 'gramin-udyam-demo-requests.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
}

if ($('#clear-requests')) {
  $('#clear-requests').onclick = () => {
    if (confirm(TRANSLATIONS[lang].confirmDeleteRequests)) {
      localStorage.removeItem('gu-requests');
      requestCount();
      $('#form-status').textContent = TRANSLATIONS[lang].requestsDeleted;
    }
  };
}

(async () => {
  // If window.FALLBACK_DB is pre-loaded via data.js, seed as fallback
  if (typeof FALLBACK_DB !== 'undefined' && FALLBACK_DB) {
    db = FALLBACK_DB;
  }
  // Try local cached data
  const cachedDb = get('gu-data', null);
  if (cachedDb) db = cachedDb;

  // Attempt fetch if running on http/https
  if (location.protocol.startsWith('http')) {
    try {
      const res = await fetch('./api/data');
      if (res.ok) {
        db = await res.json();
        put('gu-data', db);
      }
    } catch {
      // keep fallback / cached
    }
  }

  applyLanguage(lang);

  if (!db && $('#resources')) {
    $('#resources').append(el('p', '', TRANSLATIONS[lang].couldNotLoadResources));
  }
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('./sw.js').catch(() => toast(TRANSLATIONS[lang].offlineCacheError));
  }
})();