// Detect language
const IS_EN = document.documentElement.lang === 'en';

// ========================================
// Translations Helper
// ========================================
const TRANSLATIONS = {
  it: {
    months: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
    msgSent: 'Messaggio Inviato!',
    msgError: 'Errore. Riprova.',
    watch: 'Guarda',
    guestPastor: 'Past. Ospite',
    loading: 'Caricamento...',
    cookieTitle: 'Informativa sui Cookie',
    cookieText: 'Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Continuando la navigazione, accetti il nostro utilizzo dei cookie.',
    cookieAccept: 'Accetto',
    cookieDecline: 'Rifiuta'
  },
  en: {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    msgSent: 'Message Sent!',
    msgError: 'Error. Retry.',
    watch: 'Watch',
    guestPastor: 'Guest Pastor',
    loading: 'Loading...',
    cookieTitle: 'Cookie Policy',
    cookieText: 'We use cookies to improve your experience on our site. By continuing to browse, you accept our use of cookies.',
    cookieAccept: 'Accept',
    cookieDecline: 'Decline'
  }
};

const T = IS_EN ? TRANSLATIONS.en : TRANSLATIONS.it;

// Cinematic Preloader
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // 2.0s allows the complete cinematic reveal (text slide + line draw) to display smoothly
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 2000);
  }
});

document.addEventListener('DOMContentLoaded', function () {

  // ========================================
  // Language Switch Preference Handler
  // ========================================
  document.querySelectorAll('.lang-switch, .lang-switch-mobile').forEach(function (btn) {
    btn.addEventListener('click', function () {
      try {
        var targetLang = IS_EN ? 'it' : 'en';
        localStorage.setItem('user_lang_choice', targetLang);
      } catch (e) {}
    });
  });

  // ========================================
  // Header Scroll Effect
  // ========================================
  const header = document.querySelector('.header');
  const headerScrollThreshold = 50;

  function handleHeaderScroll() {
    if (window.scrollY > headerScrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Check on page load

  // ========================================
  // Mobile Navigation Toggle
  // ========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-link'); /* Updated selector */

  if (menuToggle && mobileNav) {
    const mobileClose = document.querySelector('.menu-close');

    function toggleMenu() {
      const isActive = menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      document.body.style.overflow = isActive ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);

    if (mobileClose) {
      mobileClose.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    }

    // Close mobile nav when clicking a link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // Immersive Animation Engine
  // ========================================

  // --- Scroll Progress Indicator ---
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.prepend(progressBar);

  // --- Scroll-to-Top Button ---
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.setAttribute('aria-label', 'Torna in cima');
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollTopBtn);

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function updateScrollUI() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + '%';

    // Show/hide scroll-to-top button after 400px
    if (scrollTop > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', updateScrollUI, { passive: true });

  // --- Enhanced Scroll Reveal Observer (supports all animation types) ---
  const revealElements = document.querySelectorAll('.fade-in-up, .fade-in-scale, .slide-in-left, .slide-in-right, .stagger');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // --- Divider Reveal Observer ---
  const dividers = document.querySelectorAll('.divider');
  const dividerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        dividerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  dividers.forEach(d => dividerObserver.observe(d));

  // --- Hero Background Slider (Continuous Smooth Crossfade) ---
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicator');
    let currentIndex = 0;
    let slideInterval = null;
    const intervalTime = 6000;

    function goToSlide(index) {
      if (slides.length <= 1) return;
      const prevIndex = currentIndex;
      currentIndex = (index + slides.length) % slides.length;

      // Keep previous slide visible underneath (prev-slide) during crossfade
      slides.forEach((s, i) => {
        if (i === prevIndex) {
          s.classList.remove('active');
          s.classList.add('prev-slide');
        } else if (i === currentIndex) {
          s.classList.add('active');
          s.classList.remove('prev-slide');
        } else {
          s.classList.remove('active', 'prev-slide');
        }
      });

      // Update indicators if present
      if (indicators.length > 0) {
        indicators.forEach((ind, i) => {
          ind.classList.toggle('active', i === currentIndex);
        });
      }

      // Remove prev-slide after crossfade completes (1.8s)
      setTimeout(() => {
        if (slides[prevIndex] && prevIndex !== currentIndex) {
          slides[prevIndex].classList.remove('prev-slide');
        }
      }, 1900);
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function startSlider() {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopSlider() {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    }

    if (indicators.length > 0) {
      indicators.forEach((indicator, idx) => {
        indicator.addEventListener('click', () => {
          goToSlide(idx);
          startSlider();
        });
      });
    }

    // Only pause when tab is hidden, NOT on mouseenter (ensures continuous smooth background transitions)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopSlider();
      } else {
        startSlider();
      }
    });

    startSlider();
  }

  // --- Magnetic Card Tilt Effect (desktop only) ---
  if (window.innerWidth > 768) {
    const cards = document.querySelectorAll('.card, .donation-card, .value-item');

    cards.forEach(card => {
      card.classList.add('magnetic-tilt');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // ========================================
  // Active Navigation Highlighting
  // ========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightActiveNav() {
    const scrollPosition = window.scrollY + header.offsetHeight + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav);

  // ========================================
  // Parallax Effect for Hero (Desktop Only, RAF Throttled)
  // ========================================
  const heroSection = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg');

  if (heroSection && heroBg && window.innerWidth > 768) {
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          if (scrolled <= heroSection.offsetHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.25}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ========================================
  // Year in Copyright
  // ========================================
  const yearSpan = document.querySelector('.current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ========================================
  // Dynamic Years of Ministry (Since 2011)
  // ========================================
  const ministryYearsEls = document.querySelectorAll('.years-of-ministry');
  if (ministryYearsEls.length > 0) {
    const foundedYear = 2011;
    const currentYear = new Date().getFullYear();
    const ministryYears = Math.max(1, currentYear - foundedYear);
    ministryYearsEls.forEach(el => {
      el.textContent = ministryYears + '+';
    });
  }

  // ========================================
  // Lazy Loading Images
  // ========================================
  const lazyImages = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }

  // ========================================
  // Form Handling (Contact Form)
  // ========================================
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = T.loading;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://formsubmit.co/ajax/giuseppejulia@libero.it', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        const result = await response.json().catch(() => ({}));

        if (response.ok && result.success !== 'false') {
          submitBtn.textContent = T.msgSent;
          submitBtn.style.color = '#10b981';
          contactForm.reset();
        } else {
          throw new Error(result.message || 'Form submission failed');
        }
      } catch (err) {
        console.error('Form submission error:', err);
        submitBtn.textContent = T.msgError;
        submitBtn.style.color = '#ef4444';
      }

      setTimeout(() => {
        submitBtn.innerHTML = originalHtml;
        submitBtn.style.color = '';
        submitBtn.disabled = false;
      }, 4000);
    });
  }

  // ========================================
  // Cookie Banner Logic
  // ========================================
  function initCookieBanner() {
    const cookieConsent = localStorage.getItem('impact_cookie_consent');
    if (cookieConsent) return;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-content">
        <p><strong>${T.cookieTitle}:</strong> ${T.cookieText}</p>
      </div>
      <div class="cookie-actions">
        <button class="btn btn-sm btn-outline" id="cookie-decline">${T.cookieDecline}</button>
        <button class="btn btn-sm btn-primary" id="cookie-accept">${T.cookieAccept}</button>
      </div>
    `;

    document.body.appendChild(banner);

    // Trigger reveal
    setTimeout(() => banner.classList.add('visible'), 1000);

    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('impact_cookie_consent', 'accepted');
      banner.classList.remove('visible');
      setTimeout(() => banner.remove(), 600);
    });

    declineBtn.addEventListener('click', () => {
      localStorage.setItem('impact_cookie_consent', 'declined');
      banner.classList.remove('visible');
      setTimeout(() => banner.remove(), 600);
    });
  }

  initCookieBanner();

  // ========================================
  // Language Switcher - Removed Alert
  // ========================================
});

// ========================================
// YouTube Live Fetching (live.html)
// ========================================
const YOUTUBE_CHANNEL_ID = 'UCIH_ja-vJqeMaAbtCplORdQ';
const CLOUDFLARE_WORKER_API = 'https://youtube-feed.iltrita.workers.dev';
const FALLBACK_FEED_API = `https://feed2json.org/convert?url=${encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=' + YOUTUBE_CHANNEL_ID)}`;

// Hardcoded fallback with recent live sermons (October 2026)
const STATIC_FALLBACK_SERMONS = [
  {
    title: 'Credere o non credere, questo è il problema! - Past. Giuseppe Capuano (18/10/2026)',
    link: 'https://www.youtube.com/watch?v=lhOe3DRYBxY',
    pubDate: '2026-10-18T22:54:07+00:00',
    thumbnail: 'https://img.youtube.com/vi/lhOe3DRYBxY/maxresdefault.jpg',
    description: 'Guarda l\'ultima predicazione di Impact Church Italia.'
  },
  {
    title: 'Fedeltà ed onore - Past. Giuseppe Capuano (11/10/2026)',
    link: 'https://www.youtube.com/watch?v=-GsxtQmMado',
    pubDate: '2026-10-11T22:35:03+00:00',
    thumbnail: 'https://img.youtube.com/vi/-GsxtQmMado/hqdefault.jpg'
  },
  {
    title: 'Unshakable - New Wine Conference // Sessione 4 (04/10/2026)',
    link: 'https://www.youtube.com/watch?v=dnjBAyMAYOI',
    pubDate: '2026-10-05T00:02:48+00:00',
    thumbnail: 'https://img.youtube.com/vi/dnjBAyMAYOI/hqdefault.jpg'
  },
  {
    title: 'Unshakable - New Wine Conference // Sessione 3 (03/10/2026)',
    link: 'https://www.youtube.com/watch?v=rMuRiZC3o9o',
    pubDate: '2026-10-04T05:52:29+00:00',
    thumbnail: 'https://img.youtube.com/vi/rMuRiZC3o9o/hqdefault.jpg'
  },
  {
    title: 'Unshakable - New Wine Conference // Sessione 2 (03/10/2026)',
    link: 'https://www.youtube.com/watch?v=gA5V5GlTW-A',
    pubDate: '2026-10-04T04:07:21+00:00',
    thumbnail: 'https://img.youtube.com/vi/gA5V5GlTW-A/hqdefault.jpg'
  },
  {
    title: 'Unshakable - New Wine Conference // Sessione 1 (03/10/2026)',
    link: 'https://www.youtube.com/watch?v=lXSAyfmYVDE',
    pubDate: '2026-10-04T02:52:07+00:00',
    thumbnail: 'https://img.youtube.com/vi/lXSAyfmYVDE/hqdefault.jpg'
  },
  {
    title: 'Reazioni e destini - Past. Giuseppe Capuano (27/09/2026)',
    link: 'https://www.youtube.com/watch?v=td6jp4_hTe8',
    pubDate: '2026-09-27T22:46:13+00:00',
    thumbnail: 'https://img.youtube.com/vi/td6jp4_hTe8/hqdefault.jpg'
  }
];

/**
 * Robust fetch for YouTube videos with Cloudflare Worker and fallbacks
 */
async function fetchYouTubeVideos() {
  // 1. Primary: Dedicated Cloudflare Worker
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(CLOUDFLARE_WORKER_API, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        return data.items;
      }
    }
  } catch (err) {
    console.warn('Cloudflare Worker fetch error, trying fallback...', err);
  }

  // 2. Secondary fallback: feed2json proxy
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(FALLBACK_FEED_API, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data.items) && data.items.length > 0) {
        return data.items.map(item => {
          const rawId = (item.guid || '').replace('yt:video:', '');
          return {
            title: item.title,
            link: item.url || `https://www.youtube.com/watch?v=${rawId}`,
            guid: rawId,
            pubDate: item.date_published || item.date_modified,
            thumbnail: `https://img.youtube.com/vi/${rawId}/hqdefault.jpg`,
            description: item.summary || ''
          };
        });
      }
    }
  } catch (err) {
    console.warn('Fallback proxy error, using static fallback...', err);
  }

  // 3. Guaranteed static fallback
  return STATIC_FALLBACK_SERMONS;
}

/**
 * Formats a date string to Localized format
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = T.months[date.getMonth()];
  const year = date.getFullYear();

  return IS_EN ? `${month} ${day}, ${year}` : `${day} ${month} ${year}`;
}

/**
 * Extracts YouTube video ID from a YouTube URL
 */
function extractVideoId(url) {
  const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
  return match ? match[1] : null;
}

/**
 * Speaker configuration for known pastors
 */
const KNOWN_SPEAKERS = {
  'giuseppe': {
    name: 'Giuseppe Capuano',
    avatar: IS_EN ? '../images/pastor-giuseppe.webp' : 'images/pastor-giuseppe.webp'
  },
  'gioele': {
    name: 'Gioele Capuano',
    avatar: IS_EN ? '../images/gioele-capuano.webp' : 'images/gioele-capuano.webp'
  },
  'julia': {
    name: 'Julia Fleming',
    avatar: IS_EN ? '../images/julia-fleming.webp' : 'images/julia-fleming.webp'
  }
};

/**
 * Parses a video title to extract the clean title and speaker info
 */
function parseVideoTitle(rawTitle) {
  let cleanTitle = rawTitle;
  let speakerName = null;
  let speakerAvatar = null;
  let isGuest = false;

  // Remove date patterns like (25/01/26), (25-01-26), (25.01.26), (25/01/2026)
  cleanTitle = cleanTitle.replace(/\s*\(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\)\s*/g, '');

  // Extract speaker info
  const pastorMatch = rawTitle.match(/[-–—]?\s*(?:Past\.?|Pastor\.?)\s+([A-Za-zÀ-ÿ\s]+?)(?:\s*\(|$)/i);
  const dashNameMatch = rawTitle.match(/\s+[-–—]\s+([A-Za-zÀ-ÿ\s]+?)(?:\s*\(|$)/i);

  let extractedName = null;
  let hasPastorTitle = false;

  if (pastorMatch) {
    extractedName = pastorMatch[1].trim();
    hasPastorTitle = true;
    cleanTitle = cleanTitle.replace(/\s*[-–—]?\s*(?:Past\.?|Pastor\.?)\s+[A-Za-zÀ-ÿ\s]+/i, '').trim();
  } else if (dashNameMatch) {
    extractedName = dashNameMatch[1].trim();
    hasPastorTitle = false;
    cleanTitle = cleanTitle.replace(/\s+[-–—]\s+[A-Za-zÀ-ÿ\s]+(?:\s*\(|$)/i, '').trim();
  }

  if (extractedName) {
    const lowerName = extractedName.toLowerCase();

    if (lowerName.includes('giuseppe')) {
      speakerName = KNOWN_SPEAKERS.giuseppe.name;
      speakerAvatar = KNOWN_SPEAKERS.giuseppe.avatar;
    } else if (lowerName.includes('gioele')) {
      speakerName = KNOWN_SPEAKERS.gioele.name;
      speakerAvatar = KNOWN_SPEAKERS.gioele.avatar;
    } else if (lowerName.includes('julia')) {
      speakerName = KNOWN_SPEAKERS.julia.name;
      speakerAvatar = KNOWN_SPEAKERS.julia.avatar;
    } else {
      // Unknown speaker
      speakerName = hasPastorTitle ? `${T.guestPastor} - ${extractedName}` : extractedName;
      speakerAvatar = null;
      isGuest = true;
    }
  }

  cleanTitle = cleanTitle.replace(/^\s*[-–—]\s*|\s*[-–—]\s*$/g, '').trim();

  return {
    cleanTitle: cleanTitle || rawTitle,
    speaker: speakerName ? {
      name: speakerName,
      avatar: speakerAvatar,
      isGuest: isGuest
    } : null
  };
}

/**
 * Creates a sermon card HTML for the grid
 */
function createSermonCard(video) {
  const videoId = extractVideoId(video.link) || video.guid || '';
  const thumbnail = video.thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const formattedDate = formatDate(video.pubDate);
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  // Parse the title
  const { cleanTitle, speaker } = parseVideoTitle(video.title);

  // Build speaker HTML
  const speakerAvatarHtml = speaker && speaker.avatar
    ? `<img src="${speaker.avatar}" alt="${speaker.name}" class="sermon-speaker-avatar">`
    : `<div class="sermon-speaker-avatar placeholder"><i class="fas fa-user"></i></div>`;

  const speakerHtml = speaker ? `
    <div class="sermon-speaker">
      ${speakerAvatarHtml}
      <span class="sermon-speaker-name">${speaker.name}</span>
    </div>
  ` : '';

  return `
    <div class="sermon-card">
      <div class="sermon-thumbnail">
        <img src="${thumbnail}" alt="${cleanTitle}">
        <a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" class="sermon-play-btn" aria-label="Guarda ${cleanTitle}">
          <i class="fas fa-play" style="margin-left: 4px;"></i>
        </a>
      </div>
      <div class="sermon-content">
        <div class="sermon-meta">
          <span><i class="fas fa-calendar-alt"></i> ${formattedDate}</span>
        </div>
        <h4 class="sermon-title">${cleanTitle}</h4>
        ${speakerHtml}
        <div class="sermon-actions">
          <a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" class="btn-watch">
            <i class="fas fa-video"></i> ${T.watch}
          </a>
        </div>
      </div>
    </div>
  `;
}

/**
 * Initializes the sermon section with YouTube data
 */
async function initSermons() {
  const featuredTitle = document.getElementById('featured-title');
  if (!featuredTitle) return;

  try {
    const videos = await fetchYouTubeVideos();
    if (!videos || videos.length === 0) return;

    const latestVideo = videos[0];
    const latestVideoId = extractVideoId(latestVideo.link) || latestVideo.guid;
    const latestThumbnail = `https://img.youtube.com/vi/${latestVideoId}/maxresdefault.jpg`;

    const { cleanTitle, speaker } = parseVideoTitle(latestVideo.title);

    const featImg = document.getElementById('featured-video-img');
    if (featImg) featImg.src = latestThumbnail;
    
    document.getElementById('featured-title').textContent = cleanTitle;
    document.getElementById('featured-date').innerHTML = `<i class="fas fa-calendar-alt"></i> ${formatDate(latestVideo.pubDate)}`;

    const desc = latestVideo.description || '';
    const shortDesc = desc.length > 150 ? desc.substring(0, 150) + '...' : desc;
    document.getElementById('featured-desc').textContent = shortDesc || (IS_EN ? 'Watch the latest live from our church.' : 'Guarda l\'ultima live della nostra chiesa.');

    if (speaker) {
      const avatarEl = document.getElementById('featured-speaker-avatar');
      if (avatarEl) {
        if (speaker.avatar) {
          avatarEl.src = speaker.avatar;
          avatarEl.style.display = '';
        } else {
          avatarEl.style.display = 'none';
        }
      }
      const speakerNameEl = document.getElementById('featured-speaker-name');
      if (speakerNameEl) speakerNameEl.textContent = speaker.name;
    }

    const youtubeUrl = `https://www.youtube.com/watch?v=${latestVideoId}`;
    const playBtn = document.getElementById('featured-play-btn');
    if (playBtn) playBtn.href = youtubeUrl;
    
    const watchBtn = document.getElementById('featured-watch-btn');
    if (watchBtn) watchBtn.href = youtubeUrl;

    const gridContainer = document.getElementById('sermon-grid-container');
    if (gridContainer && videos.length > 1) {
      const gridVideos = videos.slice(1, 7);
      gridContainer.innerHTML = gridVideos.map(createSermonCard).join('');
    }

  } catch (error) {
    console.error('Error updating live sermon section:', error);
  }
}

/**
 * Initialize Homepage Live Section
 */
async function initHomeLive() {
  const homeCard = document.getElementById('home-live-card');
  if (!homeCard) return;

  try {
    const videos = await fetchYouTubeVideos();
    if (!videos || videos.length === 0) return;

    const latestVideo = videos[0];
    const latestVideoId = extractVideoId(latestVideo.link) || latestVideo.guid;
    const latestThumbnail = `https://img.youtube.com/vi/${latestVideoId}/maxresdefault.jpg`;

    const { cleanTitle } = parseVideoTitle(latestVideo.title);

    const titleEl = document.getElementById('home-live-title');
    if (titleEl) titleEl.textContent = cleanTitle;

    const dateEl = document.getElementById('home-live-date');
    if (dateEl) dateEl.textContent = formatDate(latestVideo.pubDate);

    const imgEl = document.getElementById('home-live-img');
    if (imgEl) imgEl.src = latestThumbnail;

    const linkEl = document.getElementById('home-live-link');
    if (linkEl) linkEl.href = `https://www.youtube.com/watch?v=${latestVideoId}`;

    homeCard.style.display = 'grid';

  } catch (error) {
    console.error('Error updating Home live:', error);
  }
}

/**
 * Initialize Interactive Map
 */
function initMap() {
  const mapElement = document.getElementById('contact-map');
  if (!mapElement || typeof L === 'undefined') return;

  // Exact coordinates for Impact Church Italia
  const lat = 42.9623;
  const lng = 11.9976;

  const map = L.map('contact-map', {
    scrollWheelZoom: false,
    dragging: false,
    tap: false
  }).setView([lat, lng], 17);

  let lockTimer;

  const reLockMap = () => {
    map.dragging.disable();
    if (map.tap) map.tap.disable();
    mapElement.classList.remove('map-active');
  };

  const unlockMap = () => {
    map.dragging.enable();
    if (map.tap) map.tap.enable();
    mapElement.classList.add('map-active');

    // Clear any existing timer and start a new 5s countdown
    clearTimeout(lockTimer);
    lockTimer = setTimeout(reLockMap, 5000);
  };

  // Enable on click/tap
  map.on('click', unlockMap);

  // Reset timer on interaction so it doesn't lock while being used
  map.on('movestart dragstart zoomstart', () => {
    clearTimeout(lockTimer);
  });

  map.on('moveend dragend zoomend', () => {
    clearTimeout(lockTimer);
    lockTimer = setTimeout(reLockMap, 5000);
  });

  // Esri World Street Map Tiles (Free, no watermark, fast, sharp)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.esri.com/" target="_blank" rel="noopener">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);

  // Custom Gold Marker
  const goldIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color: #b58b5a; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);'></div>",
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(map);

  if (IS_EN) {
    marker.bindPopup(`<b>Impact Church Italia</b><br>Via Gino Bombagli, snc<br><a href="${googleMapsUrl}" target="_blank" style="color: #b58b5a; text-decoration: underline; font-weight: bold; display: inline-block; margin-top: 5px;">Get Directions <i class="fas fa-external-link-alt"></i></a>`).openPopup();
  } else {
    marker.bindPopup(`<b>Impact Church Italia</b><br>Via Gino Bombagli, snc<br><a href="${googleMapsUrl}" target="_blank" style="color: #b58b5a; text-decoration: underline; font-weight: bold; display: inline-block; margin-top: 5px;">Ottieni Indicazioni <i class="fas fa-external-link-alt"></i></a>`).openPopup();
  }

  // Ensure map fills the container correctly
  setTimeout(() => {
    map.invalidateSize();
  }, 200);
}

document.addEventListener('DOMContentLoaded', () => {
  initSermons();
  initHomeLive();
  initMap();

  // --- IBAN Copy to Clipboard (Giving Page) ---
  const copyBtn = document.getElementById('copy-iban-btn');
  const ibanText = document.getElementById('iban-text');
  if (copyBtn && ibanText) {
    copyBtn.addEventListener('click', () => {
      const iban = ibanText.textContent.replace(/\s/g, '');
      navigator.clipboard.writeText(iban).then(() => {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> ' + (IS_EN ? 'Copied!' : 'Copiato!');
        copyBtn.style.borderColor = 'var(--color-success)';
        copyBtn.style.color = 'var(--color-success)';
        setTimeout(() => {
          copyBtn.innerHTML = originalHTML;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2000);
      }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = iban;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> ' + (IS_EN ? 'Copied!' : 'Copiato!');
        setTimeout(() => { copyBtn.innerHTML = originalHTML; }, 2000);
      });
    });
  }
});
