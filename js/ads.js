// Ad Integration Module - Adsterra + Google AdSense

function initAds() {
  // Adsterra banner placeholder - top
  const topBanner = document.getElementById('ad-banner-top');
  if (topBanner) {
    topBanner.innerHTML = `
      <div class="ad-placeholder" data-adsterra-key="YOUR_ADSTERRA_KEY_BANNER"
           style="min-height:90px;display:flex;align-items:center;justify-content:center;background:#f0ede8;border-radius:8px;color:#9ca3af;font-size:0.8rem;">
        <span>Advertisement</span>
      </div>`;
  }

  // Adsterra sidebar ad
  const sidebarAd = document.getElementById('ad-sidebar');
  if (sidebarAd) {
    sidebarAd.innerHTML = `
      <div class="ad-placeholder" data-adsterra-key="YOUR_ADSTERRA_KEY_SIDEBAR"
           style="min-height:250px;display:flex;align-items:center;justify-content:center;background:#f0ede8;border-radius:8px;color:#9ca3af;font-size:0.8rem;">
        <span>Advertisement</span>
      </div>`;
  }

  // Adsterra footer banner
  const footerBanner = document.getElementById('ad-banner-footer');
  if (footerBanner) {
    footerBanner.innerHTML = `
      <div class="ad-placeholder" data-adsterra-key="YOUR_ADSTERRA_KEY_FOOTER"
           style="min-height:90px;display:flex;align-items:center;justify-content:center;background:#f0ede8;border-radius:8px;color:#9ca3af;font-size:0.8rem;">
        <span>Advertisement</span>
      </div>`;
  }
}

// Insert native ad every 12th card
function shouldInsertNativeAd(index) {
  return index > 0 && index % 12 === 0;
}

function createNativeAdCard() {
  const div = document.createElement('div');
  div.className = 'api-card bg-white/90 rounded-xl shadow-sm border border-[#E5E2DC] p-5 flex flex-col justify-center items-center';
  div.setAttribute('data-adsterra-key', 'YOUR_ADSTERRA_KEY_NATIVE');
  div.innerHTML = `
    <div class="text-[#9ca3af] text-xs mb-2">Sponsored</div>
    <div class="ad-placeholder" style="min-height:150px;width:100%;display:flex;align-items:center;justify-content:center;background:#f0ede8;border-radius:8px;color:#9ca3af;font-size:0.8rem;">
      <span>Advertisement</span>
    </div>`;
  return div;
}

document.addEventListener('DOMContentLoaded', initAds);
