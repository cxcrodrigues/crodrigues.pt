// Runs before first paint: theme, motion hooks, and a failsafe so content can never stay hidden.
(function () {
  var root = document.documentElement, saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  var dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'dark' : 'light';
  root.classList.add('js', 'booting');
  setTimeout(function () { if (!window.__crBooted) root.classList.remove('js', 'booting'); }, 4000);
})();
