(function() {
  // default lang
  let currentLang = localStorage.getItem('lang') || 'en';
  const langSelect = document.getElementById('langSelect');

  if (!langSelect) return;

  langSelect.value = currentLang;

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = translations?.[currentLang]?.[key];

      if (!text) return;

      const tag = el.tagName.toLowerCase();

      if (tag === 'input' || tag === 'textarea') {
        if (el.hasAttribute('placeholder')) {
          el.setAttribute('placeholder', text);
        } else {
          el.value = text;
        }
      } else if (el.tagName.toLowerCase() === 'a' && el.classList.contains('btn') && el.href) {
        el.textContent = text;
      } else {
        if (/<[a-z][\s\S]*>/i.test(text)) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    const contactEl = document.querySelector('[data-i18n="contact_desc"]');
    if (contactEl) {
      const base = translations?.[currentLang]?.['contact_desc'] || '';
      const strong = contactEl.querySelector('strong');
      const emailText = strong ? strong.textContent : 'doctorinternet@icloud.com';
      contactEl.innerHTML = base + ' <strong>' + emailText + '</strong>';
    }
  }

  langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('lang', currentLang);
    applyTranslations();
  });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.addEventListener('DOMContentLoaded', () => {
    if (typeof translations === 'undefined') {
      console.error('translations не найден. Убедитесь, что translations.js подключён перед script.js и путь верный.');
      return;
    }
    applyTranslations();
  });

})();
