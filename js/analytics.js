// Analytics Module - Google Sheets Webhook + Visitor Counter

const WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
let hasLoggedSearch = false;

function sendToSheet(action, detail) {
  try {
    const payload = {
      action: action,
      detail: detail || '',
      language: currentLang || 'EN',
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent.substring(0, 100)
    };
    fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});
  } catch (e) {}
}

function logSearch(query) {
  if (!hasLoggedSearch && query.length > 2) {
    hasLoggedSearch = true;
    sendToSheet('search', query);
  }
}

function logClick(apiName) {
  sendToSheet('click', apiName);
}

function logFavorite(apiName) {
  sendToSheet('favorite', apiName);
}

// Visitor Counter using localStorage simulation
function initVisitorCounter() {
  const todayKey = new Date().toISOString().split('T')[0];
  let stats = JSON.parse(localStorage.getItem('paf_visitor_stats') || '{}');

  if (!stats.total) stats.total = 0;
  if (!stats.daily) stats.daily = {};

  // Check if this is a new session
  const sessionKey = 'paf_session_' + todayKey;
  if (!sessionStorage.getItem(sessionKey)) {
    sessionStorage.setItem(sessionKey, '1');
    stats.total++;
    stats.daily[todayKey] = (stats.daily[todayKey] || 0) + 1;
    localStorage.setItem('paf_visitor_stats', JSON.stringify(stats));
  }

  const todayCount = stats.daily[todayKey] || 0;
  const totalCount = stats.total || 0;

  const counterEl = document.getElementById('visitor-counter');
  if (counterEl) {
    counterEl.textContent = `${t('today')}: ${todayCount} | ${t('total')}: ${totalCount}`;
  }
}

// Google Apps Script code for reference (deploy separately):
/*
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.action,
    data.detail,
    data.language,
    data.referrer,
    data.userAgent
  ]);
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
*/
