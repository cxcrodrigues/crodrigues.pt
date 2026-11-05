import { renderPage } from './render.js';
import { createWorld } from './world.js';
import content from './content.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const easeOut = (t) => 1 - Math.pow(1 - t, 4);
const easeIO = (t) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2);

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const pinnable = matchMedia('(min-width: 900px) and (min-height: 640px)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

// ---- locale ---------------------------------------------------------------
const codes = content.locales.map((l) => l.code);
function initialLocale() {
  try { const s = localStorage.getItem('locale'); if (codes.includes(s)) return s; } catch {}
  const n = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return codes.includes(n) ? n : 'en';
}
let locale = initialLocale();

// ---- world ----------------------------------------------------------------
const world = createWorld($('#world'), { still: reduced.matches });
if (!world) root.classList.add('no-world');

// ---- per-render references --------------------------------------------------
let refs = {};
let revealObserver;
let sections = [];

function mount() {
  $('#root').innerHTML = renderPage(locale);
  root.lang = locale;
  const hero = $('.hero');
  refs = {
    hero,
    lineA: $('.name .a'),
    lineB: $('.name .b'),
    header: $('.header'),
    bar: $('.progress i'),
    bio: $('[data-words]'),
    words: $$('[data-words] .w'),
    lit: -1,
    projects: $$('[data-project]').map((el) => ({ el, name: $('.kline', el), inner: $('.project-in', el) })),
    kinetic: $$('[data-kinetic]').map((el) => ({
      el,
      fit: el.dataset.fit,
      lines: $$('.kline', el),
      letters: $$('.l:not(.sp)', el).map((n) => ({ n, cx: 0, w: 100, g: 760 })),
      visible: false,
    })),
    track: $('.band-track'),
    trackX: 0,
    clock: $('[data-clock]'),
    hudIdx: $('[data-hud-idx]'),
    hudLabel: $('[data-hud-label]'),
    navs: $$('.nav [data-nav]'),
    jobs: $$('.job'),
  };
  sections = $$('[data-world]');
  observeReveals();
  fit();
  tickClock();
  countUp();
}

const GLYPHS = '01<>/\\_#+:=*[]';
function scramble(el) {
  if (reduced.matches || el.dataset.busy) return;
  const text = el.dataset.text || el.textContent;
  el.dataset.text = text;
  el.dataset.busy = '1';
  const begin = performance.now();
  const dur = 650 + text.length * 16;
  const step = (now) => {
    const p = clamp((now - begin) / dur);
    const solved = Math.floor(easeOut(p) * text.length);
    let out = text.slice(0, solved);
    for (let i = solved; i < text.length; i++) out += text[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    el.textContent = out;
    if (p < 1) requestAnimationFrame(step);
    else { el.textContent = text; delete el.dataset.busy; }
  };
  requestAnimationFrame(step);
}

function streamStatement(instant) {
  const host = $('[data-stream]');
  if (!host) return;
  const tks = $$('.tk', host);
  if (instant || reduced.matches) { tks.forEach((t) => t.classList.add('on')); return; }
  host.classList.add('streaming');
  tks.forEach((t, i) => setTimeout(() => {
    t.classList.add('on');
    if (i === tks.length - 1) setTimeout(() => host.classList.remove('streaming'), 1600);
  }, 380 + i * 42 + Math.random() * 22));
}

function observeReveals() {
  revealObserver?.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObserver.unobserve(e.target);
      (e.target.matches('[data-scramble]') ? [e.target] : $$('[data-scramble]', e.target)).forEach(scramble);
    }
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.02 });
  $$('.reveal, .project').forEach((el) => revealObserver.observe(el));
}

// ---- kinetic type -------------------------------------------------------------
// Sizes display lines so they span the column at neutral width, leaving headroom
// for the letters to breathe without the line ever overflowing.
function fit() {
  const vw = document.documentElement.clientWidth;
  const gutter = parseFloat(getComputedStyle(refs.hero).paddingLeft) || 24;
  const avail = vw - gutter * 2;
  for (const k of refs.kinetic) {
    k.letters.forEach((l) => { l.n.style.fontVariationSettings = '"wdth" 100, "wght" 760'; });
    if (!k.fit) continue;
    k.el.style.fontSize = '100px';
    const widest = Math.max(...k.lines.map((n) => {
      const r = document.createRange();
      r.selectNodeContents(n);
      return r.getBoundingClientRect().width;
    }));
    let size = (avail * 0.965 / widest) * 100;
    if (k.fit === 'last' && vw >= 760) {
      const hero = refs.hero;
      const pad = parseFloat(getComputedStyle(hero).paddingTop) + parseFloat(getComputedStyle(hero).paddingBottom);
      const left = innerHeight - pad - $('.hero-top', hero).offsetHeight - $('.hud', hero).offsetHeight - 16;
      // Ratio is measured, not assumed, so it stays true for any font metrics.
      const ratio = k.el.offsetHeight / 100;
      size = Math.min(size, Math.max(left / ratio, vw * 0.1));
    }
    k.el.style.fontSize = `${size.toFixed(2)}px`;
  }
  // Project names only ever shrink to fit, keeping room for their horizontal drift.
  for (const p of refs.projects) {
    if (!p.name) continue;
    const host = p.name.parentElement.closest('h3');
    host.style.fontSize = '';
    const r = document.createRange();
    r.selectNodeContents(p.name);
    const width = r.getBoundingClientRect().width;
    const room = avail * (pinnable.matches ? 0.9 : 1);
    if (width > room) host.style.fontSize = `${(parseFloat(getComputedStyle(host).fontSize) * room / width).toFixed(2)}px`;
  }
  for (const k of refs.kinetic) for (const l of k.letters) {
    const r = l.n.getBoundingClientRect();
    l.cx = r.left + r.width / 2;
  }
  world?.resize();
}

const pointer = { x: -1e4, y: -1e4, nx: 0, ny: 0, active: false };
let introAmp = 1;

function animateKinetic(time, dt) {
  const still = reduced.matches;
  const k1 = 1 - Math.exp(-dt * 9);
  const k2 = 1 - Math.exp(-dt * 7);
  for (const k of refs.kinetic) {
    const box = k.el.getBoundingClientRect();
    k.visible = box.bottom > -40 && box.top < innerHeight + 40;
    if (!k.visible) continue;
    const near = pointer.active && pointer.y > box.top - 120 && pointer.y < box.bottom + 120;
    const reach = box.width * 0.15;
    for (let i = 0; i < k.letters.length; i++) {
      const l = k.letters[i];
      let tw = 96, tg = 760, wire = 0;
      if (!still) {
        // A slow carrier wave travels through the word even with no input.
        tw += Math.sin(time * 1.15 - i * 0.62) * 5;
        // A scan passes through the word every few seconds, turning letters to wireframe.
        if (k.fit === 'last') wire = Math.pow(Math.max(0, Math.sin(time * 0.33 - i * 0.16)), 90);
        if (near) {
          const d = (pointer.x - l.cx) / reach;
          const g = Math.exp(-d * d);
          tw = tw * (1 - g) + 125 * g - 7 * (1 - g);
          tg = 760 + g * 140;
          wire = Math.max(wire, g);
        }
        tw = 62 + (tw - 62) * introAmp;
      }
      l.w += (tw - l.w) * k1;
      l.g += (tg - l.g) * k2;
      l.v = (l.v || 0) + (wire - (l.v || 0)) * k1;
      if (Math.abs(l.v - (l.pv ?? -1)) > 0.01) { l.n.style.setProperty('--v', l.v.toFixed(2)); l.pv = l.v; }
      if (Math.abs(l.w - l.pw) > 0.05 || Math.abs(l.g - l.pg) > 0.5 || l.pw === undefined) {
        l.n.style.fontVariationSettings = `"wdth" ${l.w.toFixed(1)}, "wght" ${l.g.toFixed(0)}`;
        l.pw = l.w; l.pg = l.g;
      }
    }
  }
}

// ---- scroll choreography --------------------------------------------------------
let sy = scrollY;
let vel = 0;
let lastMode = -1;

function applyScroll(dt) {
  const still = reduced.matches;
  const prev = sy;
  sy = still ? scrollY : sy + (scrollY - sy) * (1 - Math.exp(-dt * 14));
  vel += ((sy - prev) / Math.max(dt, 1 / 240) - vel) * (1 - Math.exp(-dt * 8));
  const vh = innerHeight;
  const max = Math.max(1, document.documentElement.scrollHeight - vh);
  refs.bar.style.transform = `scaleX(${clamp(sy / max).toFixed(4)})`;
  root.classList.toggle('scrolled', sy > 40);

  // Hero: the name splits apart as you leave.
  if (!still && refs.hero) {
    const p = clamp(sy / refs.hero.offsetHeight);
    const e = p * p;
    refs.lineA.style.transform = `translate3d(${(-e * 34).toFixed(2)}vw,0,0)`;
    refs.lineB.style.transform = `translate3d(${(e * 34).toFixed(2)}vw,0,0)`;
  }

  // About: the paragraph is read into existence.
  if (refs.bio && !still) {
    const r = refs.bio.getBoundingClientRect();
    if (r.top < vh && r.bottom > 0) {
      const p = clamp((vh * 0.9 - r.top) / (r.height * 0.85));
      const lit = Math.round(p * refs.words.length);
      if (lit !== refs.lit) {
        const a = Math.min(lit, refs.lit < 0 ? 0 : refs.lit);
        const b = Math.max(lit, refs.lit < 0 ? refs.words.length : refs.lit);
        for (let i = a; i < b; i++) refs.words[i].classList.toggle('on', i < lit);
        refs.lit = lit;
      }
    }
  }

  // Projects: pinned shots with an entrance, a hold and an exit.
  if (pinnable.matches && !still) {
    for (const p of refs.projects) {
      const r = p.el.getBoundingClientRect();
      if (r.bottom < -vh * 0.2 || r.top > vh * 1.2) continue;
      const t = (vh - r.top) / (r.height + vh);
      const s = p.el.style;
      s.setProperty('--in', smooth(0.1, 0.34, t).toFixed(3));
      s.setProperty('--out', smooth(0.76, 0.93, t).toFixed(3));
      s.setProperty('--drift', ((t - 0.5) * -9).toFixed(2));
    }
  }

  // Skills band runs on scroll velocity.
  if (refs.track && !still) {
    const r = refs.track.getBoundingClientRect();
    if (r.bottom > -100 && r.top < vh + 100) {
      const half = refs.track.scrollWidth / 2;
      refs.trackX -= (34 + Math.abs(vel) * 0.42) * dt * (vel < -2 ? -1 : 1);
      if (refs.trackX < -half) refs.trackX += half;
      if (refs.trackX > 0) refs.trackX -= half;
      refs.track.style.transform = `translate3d(${refs.trackX.toFixed(1)}px,0,0) skewX(${clamp(vel * -0.006, -9, 9).toFixed(2)}deg)`;
    }
  }

  // Which mode does the world show? Whichever section holds the optical centre.
  let mode = 0;
  let active = null;
  for (const el of sections) {
    const r = el.getBoundingClientRect();
    if (r.top <= vh * 0.55 && r.bottom >= vh * 0.45) { mode = +el.dataset.world; active = el; }
  }
  if (mode !== lastMode) { world?.setMode(mode); lastMode = mode; if (world?.still) needsStillFrames = 40; }

  // HUD + nav
  const id = active?.closest('section[id]')?.id || null;
  if (id !== refs.activeId) {
    refs.activeId = id;
    refs.navs.forEach((a) => {
      const on = a.dataset.nav === id;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    const link = refs.navs.find((a) => a.dataset.nav === id);
    root.classList.toggle('hud-on', !!link && id !== 'contact');
    if (link) {
      refs.hudIdx.textContent = $('.idx', link).textContent;
      refs.hudLabel.textContent = link.lastElementChild.textContent;
    }
  }
}

// ---- counters + clock -------------------------------------------------------------
function countUp() {
  if (reduced.matches) return;
  for (const el of $$('[data-count]')) {
    const m = el.dataset.count.match(/^(\d+)(.*)$/);
    if (!m) continue;
    const target = +m[1], suffix = m[2];
    const begin = performance.now() + (introPlaying ? 1500 : 500);
    const dur = 1300;
    el.textContent = `0${suffix}`;
    const step = (now) => {
      const p = clamp((now - begin) / dur);
      el.textContent = `${Math.round(easeOut(p) * target)}${suffix}`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}

function tickClock() {
  if (!refs.clock) return;
  const now = new Date();
  const text = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Europe/Berlin', timeZoneName: 'short' }).format(now);
  refs.clock.textContent = text;
}
setInterval(tickClock, 1000);

// ---- intro: an instrument sweep, once per session -----------------------------------
let introPlaying = false;
function runIntro() {
  const intro = $('.intro');
  const fast = () => { root.classList.remove('booting', 'intro-on'); root.classList.add('ready'); introAmp = 1; world?.setMaster(1); streamStatement(true); };
  let seen = false;
  try { seen = sessionStorage.getItem('intro') === '1'; sessionStorage.setItem('intro', '1'); } catch {}
  if (reduced.matches || scrollY > 10 || location.hash) { fast(); return; }

  introPlaying = true;
  const sweep = seen ? 0 : 950;
  root.classList.add('intro-on');
  root.classList.remove('booting');
  introAmp = 0;
  const count = $('.intro-count');
  const line = $('.intro-line');
  const start = performance.now();
  const step = (now) => {
    const t = now - start;
    const p = sweep ? clamp(t / sweep) : 1;
    const e = easeIO(p);
    count.textContent = String(Math.round(e * 100)).padStart(3, '0');
    line.style.transform = `scaleX(${e.toFixed(4)})`;
    if (t >= sweep) {
      root.classList.add('ready');
      root.classList.remove('intro-on');
      intro.classList.add('done');
      world?.setMaster(1);
      streamStatement(false);
      const a0 = now;
      const grow = (n) => {
        introAmp = easeOut(clamp((n - a0) / 1500));
        if (introAmp < 1) requestAnimationFrame(grow);
        else introPlaying = false;
      };
      requestAnimationFrame(grow);
      return;
    }
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ---- main loop -----------------------------------------------------------------------
let last = performance.now();
let needsStillFrames = 60;
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if (!document.hidden) {
    applyScroll(dt);
    animateKinetic(now / 1000, dt);
    moveRing(dt);
    if (world) {
      if (!world.still) world.draw(dt);
      else if (needsStillFrames > 0) { world.draw(0.05); needsStillFrames--; }
    }
  }
  requestAnimationFrame(frame);
}

// A trailing ring: it lags the pointer slightly and opens up over anything you can act on.
const ring = { el: $('.ring'), x: -100, y: -100, s: 1, hot: false };
function moveRing(dt) {
  if (!root.classList.contains('ring-on')) return;
  const k = 1 - Math.exp(-dt * 16);
  ring.x += (pointer.x - ring.x) * k;
  ring.y += (pointer.y - ring.y) * k;
  ring.s += ((ring.hot ? 2.1 : 1) - ring.s) * (1 - Math.exp(-dt * 10));
  ring.el.style.transform = `translate3d(${ring.x.toFixed(1)}px,${ring.y.toFixed(1)}px,0) scale(${ring.s.toFixed(3)})`;
}

// ---- interactions ----------------------------------------------------------------------
function setTheme(next, origin) {
  const apply = () => {
    root.dataset.theme = next;
    world?.setTheme(next, !!document.startViewTransition);
    needsStillFrames = 40;
    if (world) world.draw(0.016);
    try { localStorage.setItem('theme', next); } catch {}
  };
  if (document.startViewTransition && !reduced.matches && origin) {
    const r = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
    root.style.setProperty('--vt-x', `${origin.x}px`);
    root.style.setProperty('--vt-y', `${origin.y}px`);
    root.style.setProperty('--vt-r', `${r}px`);
    document.startViewTransition(apply);
  } else apply();
}

function setLocale(next) {
  if (next === locale) return;
  try { localStorage.setItem('locale', next); } catch {}
  const swap = () => {
    const ratio = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const open = $$('.job[open]').map((d) => d.id);
    locale = next;
    mount();
    $$('.job').forEach((d) => { d.open = open.includes(d.id); });
    $$('.reveal, .project').forEach((el) => el.classList.add('in'));
    streamStatement(true);
    scrollTo({ top: ratio * (document.documentElement.scrollHeight - innerHeight), behavior: 'instant' });
    sy = scrollY;
  };
  if (reduced.matches) { swap(); return; }
  const c = $('.curtain');
  c.classList.remove('out');
  c.classList.add('cover');
  setTimeout(() => {
    swap();
    c.classList.add('out');
    setTimeout(() => c.classList.remove('cover', 'out'), 620);
  }, 560);
}

function setMenu(open) {
  root.classList.toggle('menu-open', open);
  const btn = $('[data-menu]');
  btn?.setAttribute('aria-expanded', String(open));
  const menu = $('.menu');
  if (menu) menu.inert = !open;
}

document.addEventListener('click', (e) => {
  const t = e.target.closest('button, a');
  if (!t) return;
  if (t.dataset.locale) setLocale(t.dataset.locale);
  else if ('themeToggle' in t.dataset) {
    const r = t.getBoundingClientRect();
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  } else if ('menu' in t.dataset) setMenu(!root.classList.contains('menu-open'));
  else if ('print' in t.dataset) window.print();
  else if (t.dataset.copy) copy(t);
  else if (t.closest('.menu')) setMenu(false);

  const bar = t.closest('.bar');
  if (bar) { const job = $(bar.getAttribute('href')); if (job) job.open = true; }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

async function copy(btn) {
  const span = btn.firstElementChild;
  const label = span.textContent;
  try { await navigator.clipboard.writeText(btn.dataset.copy); span.textContent = btn.dataset.copied; btn.classList.add('ok'); }
  catch { location.href = `mailto:${btn.dataset.copy}`; return; }
  setTimeout(() => { span.textContent = label; btn.classList.remove('ok'); }, 1800);
}

addEventListener('pointermove', (e) => {
  pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true;
  if (finePointer.matches && !reduced.matches) {
    root.classList.add('ring-on');
    ring.hot = !!e.target.closest?.('a, button, summary, [data-kinetic]');
  }
  if (finePointer.matches && !reduced.matches && world) {
    world.setPointer((e.clientX / innerWidth) * 2 - 1, 1 - (e.clientY / innerHeight) * 2, true);
  }
  const m = e.target.closest?.('[data-magnetic]');
  if (activeMagnet && activeMagnet !== m) { activeMagnet.style.transform = ''; activeMagnet = null; }
  if (m && finePointer.matches && !reduced.matches) {
    const r = m.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2 - (m._mx || 0));
    const dy = e.clientY - (r.top + r.height / 2 - (m._my || 0));
    m._mx = dx * 0.22; m._my = dy * 0.32;
    m.style.transform = `translate(${m._mx.toFixed(1)}px, ${m._my.toFixed(1)}px)`;
    activeMagnet = m;
  }
}, { passive: true });
let activeMagnet = null;
document.addEventListener('pointerleave', () => { pointer.active = false; world?.setPointer(0, 0, false); });

// Hide the header going down, bring it back going up.
let lastY = scrollY;
addEventListener('scroll', () => {
  const y = scrollY;
  if (Math.abs(y - lastY) > 6) { root.classList.toggle('head-hidden', y > lastY && y > innerHeight * 0.6 && !root.classList.contains('menu-open')); lastY = y; }
}, { passive: true });

let resizeT;
addEventListener('resize', () => { clearTimeout(resizeT); resizeT = setTimeout(fit, 120); });

// CV: every role expanded for paper, restored afterwards.
let openBefore = null;
addEventListener('beforeprint', () => { openBefore = $$('.job').map((d) => d.open); $$('.job').forEach((d) => { d.open = true; }); });
addEventListener('afterprint', () => { if (openBefore) $$('.job').forEach((d, i) => { d.open = openBefore[i]; }); });

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch {}
  if (!saved) setTheme(e.matches ? 'dark' : 'light');
});

// ---- boot --------------------------------------------------------------------------------
window.__crBooted = true;
world?.setTheme(root.dataset.theme, true);
introPlaying = !(reduced.matches || scrollY > 10 || location.hash);
mount();
setMenu(false);
if (location.hash) { $(location.hash)?.scrollIntoView(); sy = scrollY; }
document.fonts?.ready.then(fit);
document.fonts?.load('760 100px Archivo').then(fit);
runIntro();
requestAnimationFrame(frame);
