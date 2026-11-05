// One renderer, used at build time (prerendered English) and in the browser (language switching).
import content from './content.js';

const { i18n, locales, site, stats, timeline, projects, skills } = content;

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = (n) => String(n).padStart(2, '0');

const letters = (text) => [...text].map((c, i) => c === ' '
  ? '<span class="l sp"> </span>'
  : `<span class="l" style="--i:${i}"><span class="li">${esc(c)}</span></span>`).join('');

const kinetic = (text, cls = '') => `<span class="kline ${cls}" aria-hidden="true">${letters(text)}</span>`;

const months = (s) => { const [y, m] = s.split('-').map(Number); return y * 12 + (m - 1); };

function chart(t, now) {
  const start = months('2015-01');
  const end = now.getFullYear() * 12 + now.getMonth() + 4;
  const x = (m) => ((m - start) / (end - start)) * 100;
  const nowM = now.getFullYear() * 12 + now.getMonth();
  const ticks = [];
  for (let y = 2015; y * 12 < end; y++) ticks.push(`<span class="tick${y % 2 ? ' odd' : ''}" style="left:${x(y * 12).toFixed(2)}%"><i>${y}</i></span>`);
  const rows = t.experience.jobs.map((job, i) => {
    const d = timeline[job.id];
    const a = months(d.start);
    const b = d.end ? months(d.end) + 1 : nowM + 1;
    const state = d.end ? 'past' : d.commitment === 'full' ? 'full' : 'part';
    return `<li class="lane" data-job="${job.id}" style="--i:${i}">
      <span class="lane-name">${esc(job.company)}</span>
      <span class="lane-track"><a class="bar ${state}" href="#job-${job.id}" style="left:${x(a).toFixed(2)}%;width:${(x(b) - x(a)).toFixed(2)}%">
        <span class="tip"><b>${esc(job.role)}</b> ${esc(job.period)}</span><span class="sr-only">${esc(job.company)}, ${esc(job.role)}, ${esc(job.period)}</span>
      </a></span></li>`;
  }).join('');
  const tl = t.experience.timeline;
  return `<figure class="chart reveal">
    <figcaption class="chart-head"><span class="mono">${esc(tl.title)}</span>
      <span class="legend mono"><span><i class="sw full"></i>${esc(tl.currentFull)}</span><span><i class="sw part"></i>${esc(tl.currentPart)}</span><span><i class="sw past"></i>${esc(tl.past)}</span></span>
    </figcaption>
    <div class="plot"><ol class="lanes">${rows}</ol>
      <div class="axis" aria-hidden="true"><div class="axis-inner">${ticks.join('')}<span class="now" style="left:${x(nowM + 1).toFixed(2)}%"></span></div></div>
    </div></figure>`;
}

export function renderPage(locale, now = new Date()) {
  const t = i18n[locale];
  const up = (s) => s.toLocaleUpperCase(locale);
  const [first, ...rest] = site.name.split(' ');
  const nav = ['about', 'work', 'experience', 'skills', 'contact'];
  const links = nav.map((k, i) => `<a href="#${k}" data-nav="${k}"><span class="mono idx">${pad(i + 1)}</span><span>${esc(t.nav[k])}</span></a>`).join('');
  const current = t.experience.jobs
    .filter((j) => timeline[j.id].end === null)
    .sort((a, b) => Number(timeline[a.id].commitment === 'part') - Number(timeline[b.id].commitment === 'part'));
  const allSkills = Object.values(skills).flat();
  const words = t.about.bio.split(' ').map((w) => `<span class="w">${esc(w)}</span>`).join(' ');
  const tokens = t.hero.statement.split(' ').map((w) => `<span class="tk">${esc(w)}</span>`).join(' ');

  return `
<a class="skip" href="#about">${esc(t.skip)}</a>
<div class="progress" aria-hidden="true"><i></i></div>
<header class="header">
  <a class="mark" href="#top" aria-label="${esc(site.name)}">CR<i></i></a>
  <nav class="nav" aria-label="Primary">${links}</nav>
  <div class="controls">
    <div class="locales" role="group" aria-label="${esc(t.language)}">
      ${locales.map((l) => `<button type="button" data-locale="${l.code}" lang="${l.code}" aria-label="${esc(l.name)}" aria-pressed="${l.code === locale}">${l.label}</button>`).join('')}
    </div>
    <button class="theme" type="button" data-theme-toggle aria-label="${esc(t.theme)}" title="${esc(t.theme)}"><i></i></button>
    <button class="menu-btn" type="button" data-menu aria-expanded="false" aria-controls="menu" aria-label="Menu"><i></i><i></i></button>
  </div>
</header>
<div class="menu" id="menu"><nav aria-label="Menu">${links}</nav></div>

<main id="top">
  <section class="hero" data-world="0">
    <div class="hero-top">
      <div class="hero-intro">
        <p class="role mono reveal" data-scramble>${esc(t.hero.title)}</p>
        <p class="statement reveal" style="--d:1" data-stream>${tokens}</p>
        <p class="based reveal" style="--d:2">${esc(t.hero.based)}</p>
        <div class="actions reveal" style="--d:3">
          <a class="btn primary" data-magnetic href="mailto:${esc(site.email)}"><span>${esc(t.hero.email)}</span></a>
          <button class="btn" data-magnetic type="button" data-print><span>${esc(t.hero.cv)}</span></button>
          <a class="btn" data-magnetic href="${esc(site.github)}" target="_blank" rel="noopener noreferrer"><span>GitHub</span></a>
        </div>
      </div>
      <aside class="current reveal" style="--d:2" aria-label="${esc(t.hero.current)}">
        <h2 class="mono"><i class="pulse"></i>${esc(t.hero.current)}</h2>
        <ul>${current.map((j) => `<li><b>${esc(j.company)}</b><span>${esc(j.role)}</span><span class="mono">${esc(t.experience.commitment[timeline[j.id].commitment])}</span></li>`).join('')}</ul>
      </aside>
    </div>
    <h1 class="name" data-kinetic data-fit="last"><span class="sr-only">${esc(site.name)}, ${esc(t.hero.title)}</span>${kinetic(up(first), 'a')}${kinetic(up(rest.join(' ')), 'b')}</h1>
    <div class="hud reveal" style="--d:4">
      <dl class="stats">${stats.map((s) => `<div><dt class="mono">${esc(t.about.stats[s.key])}</dt><dd data-count="${esc(s.value)}">${esc(s.value)}</dd></div>`).join('')}</dl>
      <p class="geo mono"><span>Kaiserslautern, DE</span><span>49.44°N 7.77°E</span><time data-clock></time></p>
    </div>
  </section>

  <section class="about section" id="about" data-world="5">
    <header class="section-head reveal"><span class="mono">01</span><h2 class="mono" data-scramble>${esc(t.about.heading)}</h2></header>
    <p class="bio" data-words>${words}</p>
    <div class="langs reveal">
      <h3 class="mono">${esc(t.about.langTitle)}</h3>
      <ul>${t.about.languages.map((l) => `<li><span>${esc(l.name)}</span><span class="mono">${esc(l.level)}</span></li>`).join('')}</ul>
    </div>
  </section>

  <section class="work" id="work">
    <header class="section-head section-pad reveal" data-world="5"><span class="mono">02</span><h2 class="mono" data-scramble>${esc(t.work.heading)}</h2></header>
    ${projects.map((p, i) => {
      const item = t.work.items[p.id];
      const name = p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer"><span class="sr-only">${esc(p.name)}</span>${kinetic(p.name)}</a>` : `<span class="sr-only">${esc(p.name)}</span>${kinetic(p.name)}`;
      return `<article class="project" data-project data-world="${i + 1}">
        <div class="project-in">
          <div class="p-top mono"><span>${pad(i + 1)} / ${pad(projects.length)}</span><span>${esc(item.kind)}</span></div>
          <h3 class="p-name" data-kinetic>${name}</h3>
          <div class="p-body">
            <p class="p-summary">${esc(item.summary)}</p>
            <dl class="p-stack">${p.stack.map(([k, v], n) => `<div style="--n:${n}"><dt class="mono">${esc(t.work.layers[k])}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
          </div>
        </div>
      </article>`;
    }).join('')}
  </section>

  <section class="experience section" id="experience" data-world="5">
    <header class="section-head reveal"><span class="mono">03</span><h2 class="mono" data-scramble>${esc(t.experience.heading)}</h2></header>
    ${chart(t, now)}
    <div class="jobs">${t.experience.jobs.map((j, i) => {
      const d = timeline[j.id];
      const commit = d.commitment ? `<span class="tag mono">${esc(t.experience.commitment[d.commitment])}</span>` : '';
      return `<details class="job reveal" id="job-${j.id}"${i === 0 ? ' open' : ''}>
        <summary><span class="job-co">${esc(j.company)}</span><span class="job-role">${esc(j.role)}</span><span class="job-when mono">${esc(j.period)}</span><span class="job-where mono">${esc(j.location)}</span><i class="plus" aria-hidden="true"></i></summary>
        <div class="job-body">${commit}<ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div>
      </details>`;
    }).join('')}</div>
  </section>

  <div class="band" aria-hidden="true" data-world="2"><div class="band-track">${[0, 1, 2, 3].map(() => `<span>${allSkills.map((s) => `${esc(s)}<i></i>`).join('')}</span>`).join('')}</div></div>

  <section class="skills section" id="skills" data-world="2">
    <header class="section-head reveal"><span class="mono">04</span><h2 class="mono" data-scramble>${esc(t.skills.heading)}</h2></header>
    ${Object.entries(skills).map(([cat, list]) => `<div class="skill-group reveal"><h3 class="mono" data-scramble>${esc(t.skills.categories[cat])}</h3>
      <ul>${list.map((s, i) => `<li style="--i:${i}">${esc(s)}</li>`).join('')}</ul></div>`).join('')}
  </section>

  <section class="contact" id="contact" data-world="6">
    <header class="section-head section-pad reveal"><span class="mono">05</span><h2 class="mono" data-scramble>${esc(t.contact.heading)}</h2></header>
    <p class="contact-text reveal">${esc(t.contact.text)}</p>
    <a class="hello" data-kinetic data-fit="all" href="mailto:${esc(site.email)}"><span class="sr-only">${esc(t.contact.button)}</span>${kinetic(up(t.contact.button))}</a>
    <div class="contact-row">
      <a class="mail" href="mailto:${esc(site.email)}">${esc(site.email)}</a>
      <button class="btn" type="button" data-copy="${esc(site.email)}" data-copied="${esc(t.contact.copied)}" aria-live="polite"><span>${esc(t.contact.copy)}</span></button>
      <a class="btn" href="${esc(site.github)}" target="_blank" rel="noopener noreferrer"><span>GitHub</span></a>
    </div>
    <footer class="footer mono"><span>© ${now.getFullYear()} ${esc(site.name)}</span><span>${esc(site.website)}</span></footer>
  </section>
</main>
<div class="hud-section mono" aria-hidden="true"><span data-hud-idx>00</span><i></i><span data-hud-label></span></div>
<div class="print-contact mono">${esc(site.email)} · ${esc(site.website)} · ${esc(site.githubLabel)}</div>`;
}
