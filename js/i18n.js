(function () {
  var STORAGE_KEY = 'kidsyard_lang';

  function getSiteBase() {
    var script = document.querySelector('script[src*="i18n.js"]');
    if (!script || !script.src) {
      return new URL('./', window.location.href).href;
    }
    try {
      var u = new URL(script.src);
      var path = decodeURIComponent(u.pathname || '');
      var marker = '/js/i18n.js';
      var idx = path.lastIndexOf(marker);
      if (idx === -1) {
        return new URL('./', window.location.href).href;
      }
      return u.origin + path.slice(0, idx) + '/';
    } catch (e) {
      return new URL('./', window.location.href).href;
    }
  }

  function normalizeLng(lng) {
    return String(lng || 'ar').replace('_', '-').split('-')[0];
  }

  function setLangAttributes(lng) {
    var code = normalizeLng(lng);
    var rtl = code === 'ar';
    document.documentElement.lang = code;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    if (document.body) {
      document.body.dir = rtl ? 'rtl' : 'ltr';
    }
  }

  function syncLangButtons() {
    if (typeof i18next === 'undefined' || !i18next.language) return;
    var lng = normalizeLng(i18next.language);
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      var v = btn.getAttribute('data-set-lang');
      btn.classList.toggle('active', v === lng);
    });
  }

  function applyCtaSvg() {
    if (typeof i18next === 'undefined' || !i18next.isInitialized) return;
    var lng = normalizeLng(i18next.language);
    var showEn = lng === 'en';
    document.querySelectorAll('[data-cta-svg="ar"]').forEach(function (el) {
      el.classList.toggle('d-none', showEn);
    });
    document.querySelectorAll('[data-cta-svg="en"]').forEach(function (el) {
      el.classList.toggle('d-none', !showEn);
    });
  }

  function applyLocaleImages() {
    if (typeof i18next === 'undefined' || !i18next.isInitialized) return;
    var lng = normalizeLng(i18next.language);
    document.querySelectorAll('[data-src-ar][data-src-en]').forEach(function (el) {
      var ar = el.getAttribute('data-src-ar');
      var en = el.getAttribute('data-src-en');
      if (!ar || !en) return;
      var next = lng === 'en' ? en : ar;
      if (el.getAttribute('src') !== next) {
        el.setAttribute('src', next);
      }
    });
  }

  function applyReadMoreButtons() {
    if (typeof i18next === 'undefined' || !i18next.isInitialized) return;
    document.querySelectorAll('.read-more-btn').forEach(function (btn) {
      var textEl = btn.previousElementSibling;
      if (textEl && textEl.classList.contains('read-more-text')) {
        btn.textContent = textEl.classList.contains('expanded')
          ? i18next.t('common.readLess')
          : i18next.t('common.readMore');
      }
    });
  }

  function applyTranslations() {
    if (typeof i18next === 'undefined' || !i18next.isInitialized) return;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = i18next.t(key);
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        el.setAttribute('placeholder', i18next.t(key));
      }
    });

    document.title = i18next.t('meta.title');
    syncLangButtons();
    applyReadMoreButtons();
    applyCtaSvg();
    applyLocaleImages();
    if (typeof window.renderKidsYardDiagram === 'function') {
      try {
        window.renderKidsYardDiagram();
      } catch (e) {
        console.warn('Kids Yard diagram:', e);
      }
    }
    if (typeof window.initKidsyardTestimonialsSwiper === 'function') {
      try {
        window.initKidsyardTestimonialsSwiper();
      } catch (e) {
        console.warn('Kids Yard testimonials swiper:', e);
      }
    }
  }

  function bindLangControls() {
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lng = btn.getAttribute('data-set-lang');
        if (!lng) return;
        i18next.changeLanguage(lng).then(function () {
          try {
            localStorage.setItem(STORAGE_KEY, lng);
          } catch (e) {}
          setLangAttributes(lng);
          applyTranslations();
          window.dispatchEvent(
            new CustomEvent('kidsyard:i18n-language-changed', { detail: { lng: lng } })
          );
        });
      });
    });
  }

  function init() {
    if (typeof i18next === 'undefined' || typeof i18nextHttpBackend === 'undefined') {
      return;
    }

    var stored = 'ar';
    try {
      stored = localStorage.getItem(STORAGE_KEY) || 'ar';
    } catch (e) {}

    var base = getSiteBase();

    i18next
      .use(i18nextHttpBackend)
      .init(
        {
          lng: stored,
          fallbackLng: 'ar',
          supportedLngs: ['ar', 'en'],
          backend: {
            loadPath: base + 'locales/{{lng}}.json',
          },
          interpolation: { escapeValue: false },
        },
        function (err) {
          if (err) {
            console.warn('Kids Yard i18n:', err);
          }
          setLangAttributes(i18next.language || 'ar');
          applyTranslations();
          bindLangControls();
        }
      );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
