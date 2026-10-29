# Проект-архив: Сателлит «MetaTrader 5 Download Deutschland»

**Дата создания:** 13 августа 2026
**Целевая страница:** https://libertex.com/platforms/metatrader5
**Домен (placeholder):** mt5-download-de.com
**Язык:** Deutsch (de-DE)
**Тип сайта:** Коммерческая landing page (сателлит), 1 страница

---

## 1. Файловая структура проекта

```
/
├── index.html          — единственная HTML-страница (9 блоков)
├── style.css           — дизайн-система "Liquid Velocity", все стили
├── script.js           — весь JS: live-курс, конвертер, FAQ-аккордеон, счётчики
├── robots.txt          — настройки для ботов (включая GPTBot, ClaudeBot, PerplexityBot)
├── sitemap.xml          — карта сайта, lastmod 2026-08-13
├── llms.txt             — LLM-описание сайта (plain text)
├── content.md           — чистая markdown-версия контента страницы
├── favicon.svg          — SVG-иконка "M" в стиле дизайна
└── ARCHIVE.md            — этот файл (техдокументация проекта)
```

Все файлы находятся в: `/home/claude/mt5-satellite/`

---

## 2. Ссылочная структура (актуальная)

### CTA-кнопки (10 шт.) → якорь на скачивание
```
https://libertex.com/platforms/metatrader5#downloadmt5
```
Расположение:
1. Header — «MT5 herunterladen»
2. Hero — «MT5 Kostenlos Herunterladen» (Primary)
3. Hero — «WebTrader Starten» (Secondary)
4. Download Cards — Windows «Download .exe»
5. Download Cards — macOS «Download .dmg»
6. Download Cards — iOS & Android «Mobile App holen»
7. Download Cards — WebTerminal «WebTrader öffnen»
8. WebTrader-блок — «WebTrader starten»
9. Currency Converter — «Jetzt mit MT5 handeln»
10. Final CTA Banner — «MT5 Kostenlos Herunterladen»

Все ссылки: `target="_blank" rel="nofollow noopener"`

### Контекстная ссылка (1 шт.) → базовый URL платформы
```
https://libertex.com/platforms/metatrader5
```
Расположение: Блок 3 (MT4 vs MT5 Vergleich), в закрывающем абзаце.
Анкор-текст: «MetaTrader 5 als Handelsplattform» (дескриптивный, не exact-match).

**История изменений ссылок:**
- Изначально: `https://www.j2t.com/de/metatrader-5` (по исходному ТЗ)
- Обновлено на: `https://libertex.com/platforms/metatrader5#downloadmt5` (CTA) и `https://libertex.com/platforms/metatrader5` (контекстный анкор)
- Проверено: 0 упоминаний j2t.com в финальной версии

---

## 3. Дизайн-система "Liquid Velocity"

| Параметр | Значение |
|---|---|
| Фон | `#111318` (bg), `#0c0e12` (bg-low) |
| Primary | `#a9c7ff` |
| Secondary/Accent | `#00f4fe` (cyan) |
| Risk-box фон | `#1A0B0B`, border-left `#ff4b89` |
| Заголовки | Montserrat (600/700) |
| Текст | Inter (400/500/600) |
| Карточки | glassmorphism, `backdrop-filter: blur(20px)` |
| Радиус кнопок | 24px (pill) |
| Иконки | Feather Icons (CDN), без эмодзи |

---

## 4. Структура страницы (9 блоков)

| # | Блок | Anchor-id | Функционал |
|---|---|---|---|
| 0 | Header | — | Sticky-навигация, лого, CTA #1, hamburger на мобильных |
| 1 | Hero | — | H1, sub, 2 CTA, live-курс EUR/USD, SVG-инфографика экосистемы, risk-box |
| 2 | Platform Download Cards | `#download` | 4 карточки (Windows/macOS/Mobile/Web), 4 CTA |
| 3 | MT4 vs MT5 Vergleich | — | SVG-инфографика + анимированные счётчики + HTML-таблица + контекстная ссылка |
| 4 | Systemanforderungen & Installation | `#systemanforderungen` | Таблица требований + 4-шаговый stepper |
| 5 | WebTrader & Konto einrichten | `#webtrader` | 2 карточки (WebTerminal / Broker-Konto), мини-SVG-схема, risk-box, 1 CTA |
| 6 | Währungsrechner | — | Рабочий конвертер 6 валют (EUR/USD/GBP/JPY/CHF/AUD), 1 CTA |
| 7 | FAQ | `#faq` | 6 вопросов, vanilla JS аккордеон, поддержка FAQPage schema |
| 8 | Final CTA Banner | — | Mesh-gradient фон, крупный CTA, platform chips, risk-box |
| 9 | Footer | — | Копирайт 2026, ссылки, risk-warning строка |

---

## 5. Технические функции (JS)

| Функция | API / механизм | Обновление |
|---|---|---|
| Live-курс EUR/USD в Hero | `api.frankfurter.app/latest?from=EUR&to=USD` | Каждые 60 сек, кэш в sessionStorage |
| Währungsrechner (конвертер) | `api.frankfurter.app/latest?from={X}&to={...}` | Real-time при вводе, 6 валют, swap-кнопка |
| FAQ-аккордеон | Vanilla JS, `max-height` transition | Один открыт одновременно |
| Анимированные счётчики MT4/MT5 | `IntersectionObserver` | Триггер при скролле до блока |
| Мобильное меню | Toggle класс `.open` | Hamburger-иконка (Feather `menu`) |
| `prefers-reduced-motion` | CSS media query | Отключает все анимации/transitions |

---

## 6. SEO / Schema.org

- **3 JSON-LD блока** в `<head>`: Organization, WebPage, FAQPage
- **Meta title** ≠ **H1** (разные тексты, оба содержат целевой ключ + год 2026)
- **Canonical:** `https://mt5-download-de.com/de/metatrader-5-download`
- **Open Graph:** title, description, type, locale (de_DE)
- **Favicon:** `/favicon.svg`, стилизованная "M", неоново-синий на тёмном фоне

---

## 7. Чек-лист выполнения ТЗ

- [x] index.html — валидный HTML5, UTF-8
- [x] title ≠ H1
- [x] canonical присутствует
- [x] favicon.svg создан и подключён
- [x] 3 JSON-LD блока (Organization, WebPage, FAQPage)
- [x] Динамический курс EUR/USD в Hero
- [x] Конвертер валют (6 валют) работает
- [x] FAQ-аккордеон работает
- [x] Анимированные счётчики MT4/MT5 при скролле
- [x] 10 CTA-ссылок на целевую страницу (мин. 9 по ТЗ)
- [x] 1 контекстная ссылка с дескриптивным анкором
- [x] Feather Icons вместо эмодзи везде
- [x] Risk disclaimer в Hero, Блоке 5, Final CTA, Footer
- [x] robots.txt создан (с правилами для GPTBot/ClaudeBot/PerplexityBot)
- [x] sitemap.xml создан с датой 2026-08-13
- [x] llms.txt создан
- [x] content.md создан (чистый Markdown)
- [x] Мобильное меню работает
- [x] `@media (prefers-reduced-motion)` обработан
- [x] Нет упоминаний брокеров/агентств/клиентов по имени
- [x] Год 2026 проставлен везде (footer, schema, sitemap, meta)
- [x] style.css — все стили вынесены отдельно
- [x] script.js — весь JS в одном файле

---

## 8. Что нужно сделать перед деплоем

1. Зарегистрировать реальный домен (заменить `mt5-download-de.com` во всех файлах: canonical, JSON-LD, sitemap.xml, robots.txt, llms.txt, og:url).
2. Проверить работоспособность API `frankfurter.app` в продакшн-окружении (CORS, лимиты запросов).
3. Проверить корректность подключения Feather Icons через CDN на целевом хостинге.
4. При необходимости — добавить реальные страницы Datenschutz / Impressum (сейчас placeholder-ссылки `#`).
5. Прогнать Lighthouse/PageSpeed после деплоя — проверить LCP из-за blur-эффектов и Google Fonts.
