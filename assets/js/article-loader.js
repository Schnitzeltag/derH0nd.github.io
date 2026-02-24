/**
 * article-loader.js
 * Lädt einen einzelnen Artikel aus /content/posts/{slug}.json
 * und rendert ihn in die article.html Template-Seite.
 */

(function () {
  'use strict';

  // ── SLUG AUS DER URL LESEN ──────────────────────────
  // Aufruf: article.html?post=das-stille-web
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('post');

  // Ziel-Container
  const articleContainer = document.getElementById('article-content');
  const articleMeta = document.getElementById('article-meta');

  if (!slug) {
    showError('Kein Artikel angegeben.');
    return;
  }

  // ── ARTIKEL LADEN ────────────────────────────────────
  fetch(`../content/posts/${slug}.json`)
    .then(response => {
      if (!response.ok) throw new Error('Artikel nicht gefunden');
      return response.json();
    })
    .then(data => {
      renderMeta(data.meta);
      renderContent(data.content);
      document.title = `${data.meta.title} – DerH0nd`;
    })
    .catch(err => {
      showError(err.message);
    });


  // ── META RENDERN ─────────────────────────────────────
  function renderMeta(meta) {
    const tagsHTML = meta.tags
      .map(tag => `<span class="article-tag">${tag}</span>`)
      .join('');

    articleMeta.innerHTML = `
      <h1 class="article-title">${meta.title}</h1>
      <div class="article-info">
        <time datetime="${meta.date}">${formatDate(meta.date)}</time>
        <span class="article-reading-time">${meta.readingTime}</span>
      </div>
      <div class="article-tags">${tagsHTML}</div>
    `;
  }


  // ── CONTENT RENDERN ──────────────────────────────────
  function renderContent(blocks) {
    const html = blocks.map(block => {
      switch (block.type) {

        case 'paragraph':
          return `<p>${block.text}</p>`;

        case 'heading':
          const tag = `h${block.level}`;
          return `<${tag}>${block.text}</${tag}>`;

        case 'quote':
          const source = block.source
            ? `<cite>— ${block.source}</cite>`
            : '';
          return `
            <blockquote class="article-quote">
              <p>${block.text}</p>
              ${source}
            </blockquote>`;

        case 'list':
          const listTag = block.style === 'ordered' ? 'ol' : 'ul';
          const items = block.items
            .map(item => `<li>${item}</li>`)
            .join('');
          return `<${listTag}>${items}</${listTag}>`;

        case 'code':
          return `
            <div class="article-code-block">
              <span class="code-language">${block.language || ''}</span>
              <pre><code>${escapeHTML(block.text)}</code></pre>
            </div>`;

        case 'divider':
          return `<hr class="article-divider">`;

        case 'image':
          const caption = block.caption
            ? `<figcaption>${block.caption}</figcaption>`
            : '';
          return `
            <figure class="article-figure">
              <img src="${block.src}" alt="${block.alt || ''}" loading="lazy">
              ${caption}
            </figure>`;

        default:
          return `<!-- Unbekannter Block-Typ: ${block.type} -->`;
      }
    }).join('\n');

    articleContainer.innerHTML = html;
  }


  // ── HILFSFUNKTIONEN ──────────────────────────────────
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function showError(msg) {
    if (articleMeta) articleMeta.innerHTML = '';
    if (articleContainer) {
      articleContainer.innerHTML = `
        <div class="article-error">
          <p class="error-icon">⌀</p>
          <p>Artikel nicht gefunden.</p>
          <p class="error-detail">${msg}</p>
          <a href="../pages/topics.html" class="error-back">← Zurück zur Übersicht</a>
        </div>`;
    }
  }

})();
