/**
 * topics-loader.js
 * Lädt content/index.json und baut die Artikelübersicht.
 */

(function () {
  'use strict';

  const container = document.getElementById('topics-list');
  const filterContainer = document.getElementById('topics-filters');

  if (!container) return;

  fetch('../content/index.json')
    .then(res => res.json())
    .then(data => {
      renderFilters(data.posts);
      renderPosts(data.posts);
      initFilters(data.posts);
    })
    .catch(() => {
      container.innerHTML = '<p class="topics-error">Inhalte konnten nicht geladen werden.</p>';
    });


  // ── ARTIKEL-KARTEN RENDERN ───────────────────────────
  function renderPosts(posts) {
    container.innerHTML = posts.map(post => `
      <article class="topic-card" data-tags='${JSON.stringify(post.tags)}'>
        <div class="topic-card-inner">
          <div class="topic-card-date">
            <time datetime="${post.date}">${formatDate(post.date)}</time>
            <span class="topic-card-reading">${post.readingTime}</span>
          </div>
          <h2 class="topic-card-title">
            <a href="article.html?post=${post.slug}">${post.title}</a>
          </h2>
          <p class="topic-card-excerpt">${post.excerpt}</p>
          <div class="topic-card-tags">
            ${post.tags.map(t => `<span class="topic-tag">${t}</span>`).join('')}
          </div>
        </div>
      </article>
    `).join('');
  }


  // ── TAG-FILTER RENDERN ───────────────────────────────
  function renderFilters(posts) {
    if (!filterContainer) return;

    // Alle einzigartigen Tags sammeln
    const allTags = [...new Set(posts.flatMap(p => p.tags))].sort();

    filterContainer.innerHTML = `
      <button class="filter-btn active" data-filter="all">Alle</button>
      ${allTags.map(tag => `
        <button class="filter-btn" data-filter="${tag}">${tag}</button>
      `).join('')}
    `;
  }


  // ── FILTER-LOGIK ─────────────────────────────────────
  function initFilters(posts) {
    if (!filterContainer) return;

    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      // Active-State umschalten
      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Karten filtern
      document.querySelectorAll('.topic-card').forEach(card => {
        if (filter === 'all') {
          card.style.display = '';
          return;
        }
        const tags = JSON.parse(card.dataset.tags);
        card.style.display = tags.includes(filter) ? '' : 'none';
      });
    });
  }


  // ── HILFSFUNKTION ────────────────────────────────────
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

})();
