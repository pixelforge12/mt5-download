/* ============================================
   MT5 Portal DE — script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  initFeatherIcons();
  initMobileMenu();
  initFaqAccordion();
  initCounters();
  initLiveRate();
  initConverter();
});

/* ---------- Feather Icons ---------- */
function initFeatherIcons() {
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
}

/* ---------- Mobile menu ---------- */
function initMobileMenu() {
  var btn = document.getElementById('hamburgerBtn');
  var menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
    });
  });
}

/* ---------- FAQ Accordion ---------- */
function initFaqAccordion() {
  var items = document.querySelectorAll('.faq-item');

  items.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');

    if (item.classList.contains('open')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      items.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  window.addEventListener('resize', function () {
    var openItem = document.querySelector('.faq-item.open');
    if (openItem) {
      var a = openItem.querySelector('.faq-answer');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
}

/* ---------- Animated counters (MT4 vs MT5) ---------- */
function initCounters() {
  var infographic = document.getElementById('compareInfographic');
  if (!infographic) return;

  var counters = infographic.querySelectorAll('.counter');
  var animated = false;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCounters() {
    if (animated) return;
    animated = true;

    counters.forEach(function (counter) {
      var target = parseInt(counter.getAttribute('data-target'), 10);

      if (reduceMotion) {
        counter.textContent = target;
        return;
      }

      var current = 0;
      var duration = 900;
      var stepTime = 20;
      var steps = duration / stepTime;
      var increment = target / steps;

      var interval = setInterval(function () {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(interval);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(infographic);
  } else {
    animateCounters();
  }
}

/* ---------- Live EUR/USD rate in Hero ---------- */
var lastRateValue = null;

function initLiveRate() {
  fetchLiveRate();
  setInterval(fetchLiveRate, 60000);
}

function fetchLiveRate() {
  var rateValueEl = document.getElementById('rateValue');
  var rateDeltaEl = document.getElementById('rateDelta');
  var rateTimestampEl = document.getElementById('rateTimestamp');

  if (!rateValueEl) return;

  fetch('https://api.frankfurter.app/latest?from=EUR&to=USD')
    .then(function (res) {
      if (!res.ok) throw new Error('API error');
      return res.json();
    })
    .then(function (data) {
      var rate = data.rates && data.rates.USD;
      if (!rate) throw new Error('No rate');

      var formatted = rate.toFixed(4);
      rateValueEl.textContent = formatted;

      if (lastRateValue !== null) {
        var diff = rate - lastRateValue;
        if (Math.abs(diff) > 0.00001) {
          var isUp = diff > 0;
          rateDeltaEl.textContent = (isUp ? '▲ ' : '▼ ') + Math.abs(diff).toFixed(4);
          rateDeltaEl.className = 'rate-delta ' + (isUp ? 'up' : 'down');
        }
      }

      lastRateValue = rate;
      sessionStorage.setItem('hero_eur_usd_cache', JSON.stringify({ rate: rate, time: Date.now() }));

      var now = new Date();
      rateTimestampEl.textContent = 'Letzte Aktualisierung: ' + formatTime(now);
    })
    .catch(function () {
      var cached = sessionStorage.getItem('hero_eur_usd_cache');
      if (cached) {
        try {
          var parsed = JSON.parse(cached);
          rateValueEl.textContent = parsed.rate.toFixed(4);
        } catch (e) {}
      }
      rateTimestampEl.textContent = 'Daten verzögert — letzter verfügbarer Stand';
    });
}

function formatTime(date) {
  var hh = String(date.getHours()).padStart(2, '0');
  var mm = String(date.getMinutes()).padStart(2, '0');
  return hh + ':' + mm + ' Uhr';
}

/* ---------- Currency Converter ---------- */
var CONVERTER_CURRENCIES = ['EUR', 'USD', 'GBP', 'JPY', 'CHF', 'AUD'];
var converterRatesCache = null;

function initConverter() {
  var amountFrom = document.getElementById('amountFrom');
  var amountTo = document.getElementById('amountTo');
  var currencyFrom = document.getElementById('currencyFrom');
  var currencyTo = document.getElementById('currencyTo');
  var swapBtn = document.getElementById('swapBtn');

  if (!amountFrom) return;

  loadConverterRates(function () {
    calculateConversion();
  });

  amountFrom.addEventListener('input', calculateConversion);
  currencyFrom.addEventListener('change', function () {
    loadConverterRates(calculateConversion);
  });
  currencyTo.addEventListener('change', calculateConversion);

  swapBtn.addEventListener('click', function () {
    var tempCurrency = currencyFrom.value;
    currencyFrom.value = currencyTo.value;
    currencyTo.value = tempCurrency;
    loadConverterRates(calculateConversion);
  });
}

function loadConverterRates(callback) {
  var currencyFrom = document.getElementById('currencyFrom');
  var base = currencyFrom.value;
  var targets = CONVERTER_CURRENCIES.filter(function (c) { return c !== base; }).join(',');

  var cacheKey = 'fx_rates_cache';
  var statusEl = document.getElementById('converterStatus');
  var iconEl = document.getElementById('converterIcon');

  if (iconEl) iconEl.classList.add('spinning');

  fetch('https://api.frankfurter.app/latest?from=' + base + '&to=' + targets)
    .then(function (res) {
      if (!res.ok) throw new Error('API error');
      return res.json();
    })
    .then(function (data) {
      converterRatesCache = { base: base, rates: data.rates, date: data.date, time: Date.now() };
      sessionStorage.setItem(cacheKey, JSON.stringify(converterRatesCache));
      if (statusEl) statusEl.classList.remove('show');
      if (callback) callback();
    })
    .catch(function () {
      var cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        try {
          var parsed = JSON.parse(cached);
          if (parsed.base === base) {
            converterRatesCache = parsed;
          }
        } catch (e) {}
      }
      if (statusEl) statusEl.classList.add('show');
      if (callback) callback();
    })
    .finally(function () {
      if (iconEl) iconEl.classList.remove('spinning');
    });
}

function calculateConversion() {
  var amountFrom = document.getElementById('amountFrom');
  var amountTo = document.getElementById('amountTo');
  var currencyFrom = document.getElementById('currencyFrom');
  var currencyTo = document.getElementById('currencyTo');
  var rateLineEl = document.getElementById('converterRateLine');
  var timestampEl = document.getElementById('converterTimestamp');

  if (!converterRatesCache) {
    rateLineEl.textContent = 'Kurs wird geladen…';
    return;
  }

  var from = currencyFrom.value;
  var to = currencyTo.value;
  var amount = parseFloat(amountFrom.value) || 0;

  var rate;
  if (from === to) {
    rate = 1;
  } else if (converterRatesCache.base === from && converterRatesCache.rates[to] !== undefined) {
    rate = converterRatesCache.rates[to];
  } else {
    rate = null;
  }

  if (rate === null) {
    rateLineEl.textContent = 'Kurs momentan nicht verfügbar';
    return;
  }

  var result = amount * rate;
  amountTo.value = result.toFixed(result >= 100 ? 2 : 4);

  rateLineEl.textContent = 'Kurs: 1 ' + from + ' = ' + rate.toFixed(4) + ' ' + to;

  var now = new Date();
  var dateStr = now.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
  var timeStr = formatTime(now).replace(' Uhr', '');
  timestampEl.textContent = 'Stand: ' + dateStr + ' · ' + timeStr + ' CEST';
}
