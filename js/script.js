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



(function () {
  const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

  const skills = {
    Swift:      [, 0, 75, 20, 15, 98, 100],
    HTML:       [, , 0, 30, 80, 90, 98],
    CSS:        [, , 0, 10, 75, 85, 96],
    JavaScript: [, , 0, 20, 60, 80, 90],
    Python:     [0, 50, 10, 13, 25, 45, 85],
    PineScript: [,  , , 0, 45, 10, 70]
  };

  const colors = {
      Swift: "#ff3b3b",       // red
      HTML: "#ff7f00",        // orange
      CSS: "#7851A9",         // violette
      JavaScript: "#ffd500",  // yellow
      Python: "#4B8BBE",      // deep blue
      PineScript: "#34c759"   // green
  };

  const lineWidth = 3; // толщина линий
  const padding = 30;  // отступ от краёв

  const canvas = document.getElementById("skillsChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  function drawChart() {
    ctx.clearRect(0, 0, w, h);

    // Оси
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, h - padding);
    ctx.lineTo(w - padding, h - padding); // X-axis
    ctx.moveTo(padding, h - padding);
    ctx.lineTo(padding, padding); // Y-axis
    ctx.stroke();

    // Подписи лет по оси X
    years.forEach((year, i) => {
      const x = padding + (i * (w - 2 * padding)) / (years.length - 1);
      ctx.fillStyle = "#fff";
      ctx.font = "11px Arial";
      ctx.fillText(year, x - 12, h - padding + 15);
    });

    // Линии
    for (let skill in skills) {
      const data = skills[skill];
      ctx.beginPath();
      ctx.strokeStyle = colors[skill];
      ctx.lineWidth = lineWidth;

      data.forEach((value, i) => {
        const x = padding + (i * (w - 2 * padding)) / (years.length - 1);
        const y = h - padding - (value / 100) * (h - 2 * padding);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.stroke();
    }
  }

  drawChart();
})();
