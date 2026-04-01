// Public API Finder - Core Application Logic

let allApis = [];
let filteredApis = [];
let currentCategory = 'All';
let searchQuery = '';
let favorites = JSON.parse(localStorage.getItem('paf_favorites') || '[]');
let showingFavorites = false;
let randomHistory = [];
let debounceTimer = null;
let visibleCount = 30;

// Load API data
async function loadApis() {
  try {
    const res = await fetch('data/apis.json');
    allApis = await res.json();
    renderApp();
    initVisitorCounter();
  } catch (e) {
    console.error('Failed to load API data:', e);
    document.getElementById('api-grid').innerHTML = '<p class="text-center text-red-500 col-span-full py-10">Failed to load API data. Please refresh the page.</p>';
  }
}

// Get unique categories with counts
function getCategories() {
  const cats = {};
  allApis.forEach(api => {
    cats[api.category] = (cats[api.category] || 0) + 1;
  });
  return Object.entries(cats).sort((a, b) => a[0].localeCompare(b[0]));
}

// Filter APIs
function filterApis() {
  let apis = [...allApis];

  if (showingFavorites) {
    apis = apis.filter(a => favorites.includes(a.name));
  } else if (currentCategory !== 'All') {
    apis = apis.filter(a => a.category === currentCategory);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    apis = apis.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
    );
  }

  filteredApis = apis;
  return apis;
}

// Render category sidebar
function renderCategories() {
  const container = document.getElementById('category-list');
  if (!container) return;

  const cats = getCategories();
  let html = '';

  // All button
  const allActive = !showingFavorites && currentCategory === 'All';
  html += `<button onclick="selectCategory('All')" class="category-btn w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 flex justify-between items-center ${allActive ? 'bg-[#5B6ABF] text-white shadow-md' : 'hover:bg-[#5B6ABF]/10 text-[#2D2D2D]'}" aria-label="${t('all')} APIs">
    <span>${t('all')}</span>
    <span class="text-xs ${allActive ? 'bg-white/20' : 'bg-[#E5E2DC]'} px-2 py-0.5 rounded-full">${allApis.length}</span>
  </button>`;

  // Favorites button
  const favActive = showingFavorites;
  html += `<button onclick="toggleFavorites()" class="category-btn w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 flex justify-between items-center ${favActive ? 'bg-[#F5C542] text-[#2D2D2D] shadow-md' : 'hover:bg-[#F5C542]/10 text-[#2D2D2D]'}" aria-label="${t('favorites')}">
    <span class="flex items-center gap-2">
      <svg class="w-4 h-4" fill="${favActive ? '#2D2D2D' : '#D9534F'}" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      ${t('favorites')}
    </span>
    <span class="text-xs ${favActive ? 'bg-white/40' : 'bg-[#E5E2DC]'} px-2 py-0.5 rounded-full" id="fav-count">${favorites.length}</span>
  </button>`;

  // Category buttons
  cats.forEach(([cat, count]) => {
    const active = !showingFavorites && currentCategory === cat;
    html += `<button onclick="selectCategory('${cat.replace(/'/g, "\\'")}')" class="category-btn w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 flex justify-between items-center ${active ? 'bg-[#5B6ABF] text-white shadow-md' : 'hover:bg-[#5B6ABF]/10 text-[#2D2D2D]'}" aria-label="${cat}">
      <span>${cat}</span>
      <span class="text-xs ${active ? 'bg-white/20' : 'bg-[#E5E2DC]'} px-2 py-0.5 rounded-full">${count}</span>
    </button>`;
  });

  container.innerHTML = html;
}

// Render mobile category tabs
function renderMobileTabs() {
  const container = document.getElementById('mobile-tabs');
  if (!container) return;

  const cats = getCategories();
  let html = '';

  const allActive = !showingFavorites && currentCategory === 'All';
  html += `<button onclick="selectCategory('All')" class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${allActive ? 'bg-[#5B6ABF] text-white shadow' : 'bg-white text-[#2D2D2D] border border-[#E5E2DC]'}">${t('all')} (${allApis.length})</button>`;

  const favActive = showingFavorites;
  html += `<button onclick="toggleFavorites()" class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${favActive ? 'bg-[#F5C542] text-[#2D2D2D] shadow' : 'bg-white text-[#2D2D2D] border border-[#E5E2DC]'}">
    <svg class="w-3.5 h-3.5" fill="#D9534F" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    ${favorites.length}
  </button>`;

  cats.forEach(([cat, count]) => {
    const active = !showingFavorites && currentCategory === cat;
    html += `<button onclick="selectCategory('${cat.replace(/'/g, "\\'")}')" class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${active ? 'bg-[#5B6ABF] text-white shadow' : 'bg-white text-[#2D2D2D] border border-[#E5E2DC]'}">${cat} (${count})</button>`;
  });

  container.innerHTML = html;
}

// Render API cards
function renderCards() {
  const grid = document.getElementById('api-grid');
  if (!grid) return;

  const apis = filterApis();
  const countEl = document.getElementById('result-count');
  if (countEl) {
    countEl.textContent = `${t('showing')} ${Math.min(visibleCount, apis.length)} ${t('of')} ${apis.length} ${t('apis')}`;
  }

  if (apis.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center py-16">
      <svg class="w-16 h-16 mx-auto mb-4 text-[#E5E2DC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      <p class="text-[#6B7280] text-lg">${showingFavorites ? t('no_favorites') : t('no_results')}</p>
    </div>`;
    return;
  }

  let html = '';
  const visible = apis.slice(0, visibleCount);

  visible.forEach((api, idx) => {
    // Insert native ad every 12 cards
    if (shouldInsertNativeAd(idx)) {
      html += `<div class="api-card bg-white/90 rounded-xl shadow-sm border border-[#E5E2DC] p-5 flex flex-col justify-center items-center animate-fadeIn">
        <div class="text-[#9ca3af] text-xs mb-2">Sponsored</div>
        <div style="min-height:120px;width:100%;display:flex;align-items:center;justify-content:center;background:#f0ede8;border-radius:8px;color:#9ca3af;font-size:0.8rem;" data-adsterra-key="YOUR_ADSTERRA_NATIVE">
          <span>Advertisement</span>
        </div>
      </div>`;
    }

    const isFav = favorites.includes(api.name);
    const authColor = api.auth === 'none' ? 'bg-[#5CB85C]/15 text-[#5CB85C]' : api.auth === 'apiKey' ? 'bg-[#F5C542]/15 text-[#b8940f]' : 'bg-[#D9534F]/15 text-[#D9534F]';
    const authLabel = api.auth === 'none' ? t('none') : api.auth === 'apiKey' ? 'API Key' : 'OAuth';
    const httpsIcon = api.https ? '<svg class="w-3.5 h-3.5 text-[#5CB85C]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>' : '<svg class="w-3.5 h-3.5 text-[#D9534F]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';
    const corsText = api.cors === 'yes' ? t('yes') : api.cors === 'no' ? t('no') : t('unknown');
    const corsColor = api.cors === 'yes' ? 'text-[#5CB85C]' : api.cors === 'no' ? 'text-[#D9534F]' : 'text-[#6B7280]';

    html += `<article class="api-card bg-white/90 rounded-xl shadow-sm border border-[#E5E2DC] p-5 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fadeIn" style="animation-delay:${Math.min(idx * 30, 300)}ms">
      <div class="flex justify-between items-start mb-3">
        <h3 class="font-semibold text-[#2D2D2D] text-lg leading-snug pr-2">${api.name}</h3>
        <div class="flex items-center gap-1.5 flex-shrink-0">
          <button onclick="shareApi('${api.name.replace(/'/g, "\\'")}', '${api.link.replace(/'/g, "\\'")}')" class="p-1.5 rounded-lg hover:bg-[#E5E2DC] transition-colors" aria-label="${t('share')} ${api.name}" title="${t('share')}">
            <svg class="w-4 h-4 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
          </button>
          <button onclick="toggleFavorite('${api.name.replace(/'/g, "\\'")}')" class="p-1.5 rounded-lg hover:bg-[#E5E2DC] transition-colors" aria-label="Favorite ${api.name}">
            <svg class="w-5 h-5 transition-colors ${isFav ? 'text-[#D9534F]' : 'text-[#E5E2DC] hover:text-[#D9534F]/50'}" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>
        </div>
      </div>
      <p class="text-[#6B7280] text-sm mb-4 line-clamp-2 flex-grow">${api.description}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        <span class="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${authColor}">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/></svg>
          ${authLabel}
        </span>
        <span class="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium bg-[#5B6ABF]/10 text-[#5B6ABF]">
          ${httpsIcon} HTTPS
        </span>
        <span class="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 ${corsColor}">
          CORS: ${corsText}
        </span>
      </div>
      <div class="flex items-center justify-between mt-auto pt-3 border-t border-[#E5E2DC]">
        <span class="text-xs text-[#6B7280] bg-[#E5E2DC]/50 px-2.5 py-1 rounded-full">${api.category}</span>
        <a href="${api.link}" target="_blank" rel="noopener noreferrer" onclick="logClick('${api.name.replace(/'/g, "\\'")}')" class="inline-flex items-center gap-1.5 text-sm font-medium text-[#5B6ABF] hover:text-[#4A58A5] transition-colors">
          ${t('visit_api')}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
      </div>
    </article>`;
  });

  // Show more button
  if (apis.length > visibleCount) {
    html += `<div class="col-span-full text-center py-6">
      <button onclick="loadMore()" class="px-8 py-3 bg-[#5B6ABF] text-white rounded-xl font-medium hover:bg-[#4A58A5] transition-colors shadow-md hover:shadow-lg">
        Load More (${apis.length - visibleCount} remaining)
      </button>
    </div>`;
  }

  grid.innerHTML = html;
}

function loadMore() {
  visibleCount += 30;
  renderCards();
}

// Select category
function selectCategory(cat) {
  currentCategory = cat;
  showingFavorites = false;
  visibleCount = 30;
  renderApp();
}

// Toggle favorites view
function toggleFavorites() {
  showingFavorites = !showingFavorites;
  if (!showingFavorites) currentCategory = 'All';
  visibleCount = 30;
  renderApp();
}

// Toggle single favorite
function toggleFavorite(name) {
  const idx = favorites.indexOf(name);
  if (idx > -1) {
    favorites.splice(idx, 1);
  } else {
    favorites.push(name);
    logFavorite(name);
  }
  localStorage.setItem('paf_favorites', JSON.stringify(favorites));
  renderApp();
}

// Export favorites
function exportFavorites() {
  const favApis = allApis.filter(a => favorites.includes(a.name));
  const blob = new Blob([JSON.stringify(favApis, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'public-api-finder-favorites.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Clear favorites
function clearFavorites() {
  if (confirm(t('confirm_clear'))) {
    favorites = [];
    localStorage.setItem('paf_favorites', JSON.stringify(favorites));
    renderApp();
  }
}

// Search handler
function handleSearch(e) {
  const val = e.target.value;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    searchQuery = val;
    visibleCount = 30;
    logSearch(val);
    renderCards();
    const countEl = document.getElementById('result-count');
    if (countEl) countEl.classList.toggle('hidden', false);
  }, 200);
}

function clearSearch() {
  const input = document.getElementById('search-input');
  if (input) input.value = '';
  searchQuery = '';
  visibleCount = 30;
  renderCards();
}

// Random API
function showRandomApi() {
  if (allApis.length === 0) return;

  let api;
  let attempts = 0;
  do {
    api = allApis[Math.floor(Math.random() * allApis.length)];
    attempts++;
  } while (randomHistory.includes(api.name) && attempts < 50);

  randomHistory.push(api.name);
  if (randomHistory.length > allApis.length / 2) randomHistory = randomHistory.slice(-10);

  const isFav = favorites.includes(api.name);
  const authLabel = api.auth === 'none' ? t('none') : api.auth === 'apiKey' ? 'API Key' : 'OAuth';

  const modal = document.getElementById('random-modal');
  const content = document.getElementById('random-content');

  content.innerHTML = `
    <div class="text-center mb-6">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-[#F5C542]/20 rounded-2xl mb-4">
        <svg class="w-8 h-8 text-[#F5C542]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
      </div>
      <h3 class="text-2xl font-bold text-[#2D2D2D] mb-2">${api.name}</h3>
      <span class="text-sm text-[#6B7280] bg-[#E5E2DC]/50 px-3 py-1 rounded-full">${api.category}</span>
    </div>
    <p class="text-[#6B7280] text-center mb-6">${api.description}</p>
    <div class="flex justify-center gap-3 mb-6 flex-wrap">
      <span class="text-xs px-3 py-1.5 rounded-full font-medium bg-[#5B6ABF]/10 text-[#5B6ABF]">${t('auth')}: ${authLabel}</span>
      <span class="text-xs px-3 py-1.5 rounded-full font-medium ${api.https ? 'bg-[#5CB85C]/15 text-[#5CB85C]' : 'bg-[#D9534F]/15 text-[#D9534F]'}">HTTPS: ${api.https ? t('yes') : t('no')}</span>
      <span class="text-xs px-3 py-1.5 rounded-full font-medium bg-gray-100 text-[#6B7280]">CORS: ${api.cors === 'yes' ? t('yes') : api.cors === 'no' ? t('no') : t('unknown')}</span>
    </div>
    <div class="flex gap-3 justify-center flex-wrap">
      <a href="${api.link}" target="_blank" rel="noopener noreferrer" onclick="logClick('${api.name.replace(/'/g, "\\'")}')" class="px-6 py-2.5 bg-[#5B6ABF] text-white rounded-xl font-medium hover:bg-[#4A58A5] transition-colors inline-flex items-center gap-2">
        ${t('visit_api')}
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
      </a>
      <button onclick="toggleFavorite('${api.name.replace(/'/g, "\\'")}')" class="px-6 py-2.5 ${isFav ? 'bg-[#D9534F] text-white' : 'bg-[#D9534F]/10 text-[#D9534F]'} rounded-xl font-medium hover:bg-[#D9534F] hover:text-white transition-colors inline-flex items-center gap-2">
        <svg class="w-4 h-4" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        ${t('favorites')}
      </button>
      <button onclick="showRandomApi()" class="px-6 py-2.5 bg-[#F5C542]/20 text-[#b8940f] rounded-xl font-medium hover:bg-[#F5C542]/30 transition-colors">
        ${t('roll_again')}
      </button>
    </div>`;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeRandomModal() {
  const modal = document.getElementById('random-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// Share API
function shareApi(name, link) {
  const text = `Check out ${name} on Public API Finder!`;
  const url = link;

  const shareModal = document.getElementById('share-modal');
  const shareContent = document.getElementById('share-content');

  shareContent.innerHTML = `
    <h3 class="text-lg font-bold text-[#2D2D2D] mb-4 text-center">${t('share')} ${name}</h3>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}" target="_blank" rel="noopener" class="flex items-center gap-2 px-4 py-3 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-xl hover:bg-[#1DA1F2]/20 transition-colors font-medium text-sm">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        X / Twitter
      </a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" rel="noopener" class="flex items-center gap-2 px-4 py-3 bg-[#4267B2]/10 text-[#4267B2] rounded-xl hover:bg-[#4267B2]/20 transition-colors font-medium text-sm">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        Facebook
      </a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" target="_blank" rel="noopener" class="flex items-center gap-2 px-4 py-3 bg-[#0077B5]/10 text-[#0077B5] rounded-xl hover:bg-[#0077B5]/20 transition-colors font-medium text-sm">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        LinkedIn
      </a>
      <a href="https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}" target="_blank" rel="noopener" class="flex items-center gap-2 px-4 py-3 bg-[#FF4500]/10 text-[#FF4500] rounded-xl hover:bg-[#FF4500]/20 transition-colors font-medium text-sm">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
        Reddit
      </a>
      <button onclick="copyToClipboard('${url}')" class="flex items-center gap-2 px-4 py-3 bg-[#6B7280]/10 text-[#6B7280] rounded-xl hover:bg-[#6B7280]/20 transition-colors font-medium text-sm">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
        ${t('copy_link')}
      </button>
    </div>`;

  shareModal.classList.remove('hidden');
  shareModal.classList.add('flex');
}

function closeShareModal() {
  const modal = document.getElementById('share-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const btn = event.target.closest('button');
    const orig = btn.innerHTML;
    btn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> ${t('copied')}`;
    setTimeout(() => { btn.innerHTML = orig; }, 2000);
  });
}

// Language dropdown
function renderLanguageDropdown() {
  const container = document.getElementById('lang-dropdown');
  if (!container) return;

  container.innerHTML = `
    <select onchange="setLanguage(this.value)" class="bg-transparent border border-[#E5E2DC] rounded-lg px-3 py-1.5 text-sm text-[#2D2D2D] cursor-pointer focus:ring-2 focus:ring-[#5B6ABF] focus:outline-none" aria-label="${t('language')}">
      ${supportedLangs.map(l => `<option value="${l}" ${l === currentLang ? 'selected' : ''}>${langNames[l]}</option>`).join('')}
    </select>`;
}

// Favorites toolbar
function renderFavoritesToolbar() {
  const toolbar = document.getElementById('favorites-toolbar');
  if (!toolbar) return;

  if (showingFavorites && favorites.length > 0) {
    toolbar.classList.remove('hidden');
    toolbar.innerHTML = `
      <div class="flex gap-3 flex-wrap">
        <button onclick="exportFavorites()" class="px-4 py-2 bg-[#5B6ABF]/10 text-[#5B6ABF] rounded-lg text-sm font-medium hover:bg-[#5B6ABF]/20 transition-colors inline-flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          ${t('export_json')}
        </button>
        <button onclick="clearFavorites()" class="px-4 py-2 bg-[#D9534F]/10 text-[#D9534F] rounded-lg text-sm font-medium hover:bg-[#D9534F]/20 transition-colors inline-flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          ${t('clear_all')}
        </button>
      </div>`;
  } else {
    toolbar.classList.add('hidden');
  }
}

// Mobile sidebar toggle
function toggleMobileSidebar() {
  const sidebar = document.getElementById('mobile-sidebar');
  sidebar.classList.toggle('hidden');
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('mobile-sidebar');
  sidebar.classList.add('hidden');
}

// Main render function
function renderApp() {
  renderCategories();
  renderMobileTabs();
  renderCards();
  renderLanguageDropdown();
  renderFavoritesToolbar();
  applyTranslations();
  initVisitorCounter();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadApis();

  // Close modals on backdrop click
  document.getElementById('random-modal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeRandomModal();
  });
  document.getElementById('share-modal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeShareModal();
  });

  // Keyboard shortcut: Escape to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeRandomModal();
      closeShareModal();
    }
  });
});
