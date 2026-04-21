'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Wiki.module.css';

const categories = [
  {
    id: 'einstieg',
    icon: '🚀',
    title: 'Einstieg',
    color: 'green',
    articles: [
      { id: 'erste-schritte', title: 'Erste Schritte', desc: 'Wie du dem Server beitrittst und loslegst.' },
      { id: 'regeln', title: 'Serverregeln', desc: 'Die wichtigsten Regeln auf SigmaSMP.' },
      { id: 'befehle', title: 'Wichtige Befehle', desc: 'Alle grundlegenden Commands auf einen Blick.' },
    ],
  },
  {
    id: 'economy',
    icon: '💰',
    title: 'Economy',
    color: 'gold',
    articles: [
      { id: 'geld', title: 'Geld & Währung', desc: 'Wie die Server-Economy funktioniert.' },
      { id: 'shops', title: 'Shops erstellen', desc: 'Eigene Chest-Shops aufbauen und betreiben.' },
      { id: 'jobs', title: 'Jobs & Verdienst', desc: 'Mit Jobs Geld verdienen und aufsteigen.' },
    ],
  },
  {
    id: 'raenge',
    icon: '⭐',
    title: 'Ränge',
    color: 'purple',
    articles: [
      { id: 'rang-uebersicht', title: 'Rang-Übersicht', desc: 'Alle Ränge und ihre Vorteile.' },
      { id: 'rang-aufstieg', title: 'Rang aufsteigen', desc: 'Wie du einen höheren Rang erreichst.' },
      { id: 'donator', title: 'Donator-Ränge', desc: 'Exklusive Vorteile für Unterstützer.' },
    ],
  },
  {
    id: 'plugins',
    icon: '🔧',
    title: 'Plugins',
    color: 'cyan',
    articles: [
      { id: 'sigma-plugin', title: 'SigmaPlugin', desc: 'Unser Custom-Plugin und seine Features.' },
      { id: 'clans', title: 'Clans & Teams', desc: 'Clans erstellen und verwalten.' },
      { id: 'claims', title: 'Land Claims', desc: 'Dein Gelände sichern und schützen.' },
    ],
  },
  {
    id: 'events',
    icon: '🎉',
    title: 'Events',
    color: 'green',
    articles: [
      { id: 'pvp', title: 'PvP-Arena', desc: 'Regeln und Strategien für die PvP-Arena.' },
      { id: 'dungeons', title: 'Dungeons', desc: 'Dungeons erkunden und Beute sammeln.' },
    ],
  },
  {
    id: 'faq',
    icon: '❓',
    title: 'FAQ',
    color: 'cyan',
    articles: [
      { id: 'faq-allgemein', title: 'Häufige Fragen', desc: 'Antworten auf die häufigsten Fragen.' },
      { id: 'support', title: 'Support erhalten', desc: 'Wie du Hilfe vom Team bekommst.' },
    ],
  },
];

const allArticles = categories.flatMap(cat =>
  cat.articles.map(a => ({ ...a, categoryId: cat.id, categoryTitle: cat.title }))
);

export default function WikiPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = search.length > 1
    ? allArticles.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.desc.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  const displayCategories = activeCategory
    ? categories.filter(c => c.id === activeCategory)
    : categories;

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="page-hero">
          <div className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            Dokumentation
          </div>
          <h1 className="section-title">Server <span className="highlight">Wiki</span></h1>
          <p>Alles was du wissen musst, übersichtlich dokumentiert.</p>

          {/* Search */}
          <div className={styles.searchBox}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.searchIcon}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              id="wiki-search"
              type="text"
              placeholder="Wiki durchsuchen..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarTitle}>Kategorien</div>
            <nav className={styles.sidebarNav}>
              <button
                className={`${styles.sidebarItem} ${activeCategory === null ? styles.sidebarActive : ''}`}
                onClick={() => setActiveCategory(null)}
                id="wiki-cat-all"
              >
                🗂️ Alle Kategorien
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`${styles.sidebarItem} ${activeCategory === cat.id ? styles.sidebarActive : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  id={`wiki-cat-${cat.id}`}
                >
                  {cat.icon} {cat.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className={styles.content}>
            {filtered ? (
              <>
                <div className={styles.searchResultsLabel}>
                  {filtered.length} Ergebnis{filtered.length !== 1 ? 'se' : ''} für &ldquo;{search}&rdquo;
                </div>
                <div className={styles.searchResults}>
                  {filtered.length === 0 ? (
                    <div className={styles.noResults}>
                      <p>Keine Artikel gefunden. Versuche einen anderen Suchbegriff.</p>
                    </div>
                  ) : (
                    filtered.map(article => (
                      <Link key={article.id} href={`/wiki/${article.categoryId}/${article.id}`} className={styles.searchResultCard} id={`wiki-search-${article.id}`}>
                        <span className={styles.searchResultCat}>{article.categoryTitle}</span>
                        <div className={styles.searchResultTitle}>{article.title}</div>
                        <div className={styles.searchResultDesc}>{article.desc}</div>
                      </Link>
                    ))
                  )}
                </div>
              </>
            ) : (
              displayCategories.map(cat => (
                <div key={cat.id} className={styles.category} id={`wiki-section-${cat.id}`}>
                  <div className={styles.categoryHeader}>
                    <span className={styles.categoryIcon}>{cat.icon}</span>
                    <h2 className={styles.categoryTitle}>{cat.title}</h2>
                    <span className={styles.categoryCount}>{cat.articles.length} Artikel</span>
                  </div>
                  <div className={styles.articleGrid}>
                    {cat.articles.map(article => (
                      <Link key={article.id} href={`/wiki/${cat.id}/${article.id}`} className={styles.articleCard} id={`wiki-article-${article.id}`}>
                        <div className={styles.articleTitle}>{article.title}</div>
                        <div className={styles.articleDesc}>{article.desc}</div>
                        <div className={styles.articleArrow}>→</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
