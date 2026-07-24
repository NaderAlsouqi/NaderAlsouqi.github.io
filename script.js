/* ==========================================================================
   Recto / Verso — behaviour
   Plain ES2019. No frameworks, no build step.

   The English copy is already in index.html, so the page is complete with
   JavaScript disabled. This file adds: the Arabic/English swap, the theme,
   the scroll reveals, and a handful of small interactions.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var C = window.CONTENT || {};
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* FIRST, before anything that could throw. The reveal styles start at
     opacity 0 and only the .is-in class brings them back, so this pair is
     what guarantees the page can never be left blank by a later error. */
  var allSections = document.querySelectorAll('main > section');
  var heroSection = document.getElementById('hero');
  if (heroSection) heroSection.classList.add('is-in');
  setTimeout(function () {
    for (var i = 0; i < allSections.length; i++) allSections[i].classList.add('is-in');
  }, 3000);

  /* ---------------------------------------------------------------- utils */

  function get(path) {
    var parts = String(path).split('.');
    var cur = C;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return null;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function str(path, lang) {
    var v = get(path);
    if (v == null) return '';
    return typeof v === 'string' ? v : (v[lang] || v.en || '');
  }

  function escapeHTML(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* Runs of the *other* script inside a string need bidi isolation, or the
     neutrals around them reorder: ".NET Core" renders as "NET Core." and
     "C#" as "#C" inside an Arabic paragraph. <bdi> isolates without forcing
     a direction, which is what we want. */
  var LATIN_RUN = /\.?[A-Za-z0-9][A-Za-z0-9.+#&/_'’-]*(?:[  ]+\.?[A-Za-z0-9][A-Za-z0-9.+#&/_'’-]*)*/g;
  var ARABIC_RUN = /[؀-ۿݐ-ݿ][؀-ۿݐ-ݿ،؛؟\s]*[؀-ۿݐ-ݿ]|[؀-ۿݐ-ݿ]/g;

  function isolate(text, lang) {
    var re = lang === 'ar' ? LATIN_RUN : ARABIC_RUN;
    var out = '';
    var last = 0;
    text.replace(re, function (match, offset) {
      out += escapeHTML(text.slice(last, offset));
      out += '<bdi>' + escapeHTML(match) + '</bdi>';
      last = offset + match.length;
      return match;
    });
    out += escapeHTML(text.slice(last));
    return out;
  }

  function needsIsolation(text, lang) {
    return lang === 'ar' ? /[A-Za-z0-9]/.test(text) : /[؀-ۿ]/.test(text);
  }

  /* ------------------------------------------------------------ rendering */

  function renderStrings(lang) {
    var nodes = document.querySelectorAll('[data-t]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var text = str(el.getAttribute('data-t'), lang);
      if (!text) continue;
      if (needsIsolation(text, lang)) el.innerHTML = isolate(text, lang);
      else el.textContent = text;
    }

    var attrNodes = document.querySelectorAll('[data-t-attr]');
    for (var j = 0; j < attrNodes.length; j++) {
      var node = attrNodes[j];
      var pairs = node.getAttribute('data-t-attr').split(';');
      for (var k = 0; k < pairs.length; k++) {
        var bits = pairs[k].split(':');
        if (bits.length < 2) continue;
        var value = str(bits[1].trim(), lang);
        if (value) node.setAttribute(bits[0].trim(), value);
      }
    }

    document.title = str('meta.title', lang);
    setMeta('name', 'description', str('meta.description', lang));
    setMeta('property', 'og:title', str('meta.title', lang));
    setMeta('property', 'og:description', str('meta.ogDescription', lang));
    setMeta('property', 'og:locale', lang === 'ar' ? 'ar_JO' : 'en_US');
    setMeta('property', 'og:locale:alternate', lang === 'ar' ? 'en_US' : 'ar_JO');
    setMeta('name', 'twitter:title', str('meta.title', lang));
    setMeta('name', 'twitter:description', str('meta.ogDescription', lang));
  }

  function setMeta(attr, key, value) {
    var el = document.querySelector('meta[' + attr + '="' + key + '"]');
    if (el && value) el.setAttribute('content', value);
  }

  /* ------------------------------------------------------------- language */

  var langBtn = document.getElementById('langBtn');
  var arInjected = root.lang === 'ar';

  function ensureArabicFonts() {
    if (arInjected) return Promise.resolve();
    arInjected = true;
    return new Promise(function (resolve) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.id = 'ar-fonts';
      link.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=Reem+Kufi:wght@400..700&display=swap';
      link.onload = link.onerror = resolve;
      document.head.appendChild(link);
      setTimeout(resolve, 400);
    });
  }

  function applyLang(next) {
    root.lang = next;
    root.dir = next === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('lang', next); } catch (e) { /* private mode */ }

    renderStrings(next);

    if (langBtn) langBtn.setAttribute('lang', next === 'ar' ? 'en' : 'ar');

    /* Reveals must not replay when only the text changed. */
    var seen = document.querySelectorAll('.is-in');
    for (var i = 0; i < seen.length; i++) seen[i].classList.add('no-replay');
  }

  function nearestSectionInView() {
    var sections = document.querySelectorAll('main > section');
    var best = null;
    var bestTop = Infinity;
    for (var i = 0; i < sections.length; i++) {
      var top = sections[i].getBoundingClientRect().top;
      if (top < 120 && Math.abs(top) < Math.abs(bestTop)) { best = sections[i]; bestTop = top; }
      else if (best === null && top >= 0 && top < bestTop) { best = sections[i]; bestTop = top; }
    }
    return best ? { el: best, top: bestTop } : null;
  }

  function restoreAnchor(anchor) {
    if (!anchor) return;
    var now = anchor.el.getBoundingClientRect().top;
    window.scrollBy(0, now - anchor.top);
  }

  function switchLang(next) {
    ensureArabicFonts().then(function () {
      var anchor = nearestSectionInView();
      var apply = function () { applyLang(next); restoreAnchor(anchor); };

      /* Note: apply() is called directly in the else branch. Defining the
         mutation only inside the transition callback is the classic bug that
         leaves the language stuck in browsers without View Transitions. */
      if (!document.startViewTransition || reduced.matches) {
        document.body.classList.add('is-swapping');
        setTimeout(function () {
          apply();
          document.body.classList.remove('is-swapping');
        }, reduced.matches ? 0 : 180);
        return;
      }
      document.startViewTransition(apply);
    });
  }

  if (langBtn) {
    var warm = function () { ensureArabicFonts(); };
    langBtn.addEventListener('pointerenter', warm, { once: true });
    langBtn.addEventListener('focus', warm, { once: true });
    langBtn.addEventListener('click', function () {
      switchLang(root.lang === 'ar' ? 'en' : 'ar');
    });
  }

  /* Re-render on load so any string that drifted from the static HTML is
     corrected, and so Arabic is applied when it was restored from storage. */
  renderStrings(root.lang === 'ar' ? 'ar' : 'en');

  /* ---------------------------------------------------------------- theme */

  var themeBtn = document.getElementById('themeBtn');

  function applyTheme(next) {
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
    if (themeBtn) themeBtn.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
  }

  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* -------------------------------------------------------------- reveals */

  var sections = allSections;

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    /* The hero is above the fold and was revealed at the top of this file. */
    for (var s = 0; s < sections.length; s++) {
      if (sections[s] !== heroSection) io.observe(sections[s]);
    }
  } else {
    for (var s2 = 0; s2 < sections.length; s2++) sections[s2].classList.add('is-in');
  }

  /* ------------------------------------------------- nav + ledger tracking */

  var navLinks = document.querySelectorAll('.nav__link');

  function markActive(id) {
    for (var i = 0; i < navLinks.length; i++) {
      var match = navLinks[i].getAttribute('href') === '#' + id;
      if (match) navLinks[i].setAttribute('aria-current', 'true');
      else navLinks[i].removeAttribute('aria-current');
    }
  }

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) markActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    for (var t = 0; t < sections.length; t++) {
      if (sections[t].id && sections[t].id !== 'hero') spy.observe(sections[t]);
    }

    var roles = document.querySelectorAll('.role');
    var rail = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('is-inview', entry.isIntersecting);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    for (var r = 0; r < roles.length; r++) rail.observe(roles[r]);
  }

  /* ------------------------------------------------- masthead + fore-edge */

  var masthead = document.querySelector('.masthead');
  var foreedge = document.querySelector('.foreedge');
  var needsProgressJS = !(window.CSS && CSS.supports && CSS.supports('animation-timeline', 'scroll()'));
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (masthead) masthead.classList.toggle('is-condensed', y > 200);
      if (needsProgressJS && foreedge) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        root.style.setProperty('--progress', max > 0 ? String(Math.min(1, y / max)) : '0');
      }
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------- portrait */

  var portrait = document.getElementById('portrait');
  var plate = document.querySelector('.plate');

  if (portrait) {
    portrait.addEventListener('error', function () {
      var inner = portrait.parentNode;
      portrait.remove();
      var mono = document.createElement('span');
      mono.className = 'plate__monogram';
      mono.setAttribute('aria-hidden', 'true');
      mono.textContent = 'N.S';
      inner.appendChild(mono);
      inner.classList.add('is-fallback');
    });
  }

  if (plate && !reduced.matches && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var pending = false;
    var px = 0;
    var py = 0;
    plate.addEventListener('pointermove', function (ev) {
      var rect = plate.getBoundingClientRect();
      px = ((ev.clientX - rect.left) / rect.width) * 100;
      py = ((ev.clientY - rect.top) / rect.height) * 100;
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        plate.style.setProperty('--mx', px.toFixed(2) + '%');
        plate.style.setProperty('--my', py.toFixed(2) + '%');
        pending = false;
      });
    });
  }

  /* ----------------------------------------------------------- copy email */

  var copyBtn = document.getElementById('copyBtn');
  var copyStatus = document.getElementById('copyStatus');
  var copyTimer = null;

  function say(key) {
    if (!copyStatus) return;
    copyStatus.textContent = str('ui.' + key, root.lang === 'ar' ? 'ar' : 'en');
    clearTimeout(copyTimer);
    copyTimer = setTimeout(function () { copyStatus.textContent = ''; }, 2500);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-email');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () { say('copied'); },
                                                  function () { say('copyFailed'); });
        return;
      }
      try {
        var ta = document.createElement('textarea');
        ta.value = email;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        say('copied');
      } catch (e) {
        say('copyFailed');
      }
    });
  }

  /* ------------------------------------------------------------ the year */

  var yearNodes = document.querySelectorAll('[data-year]');
  var year = String(new Date().getFullYear());
  for (var y2 = 0; y2 < yearNodes.length; y2++) yearNodes[y2].textContent = year;
})();
