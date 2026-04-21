import Link from 'next/link';
import styles from './News.module.css';

// Types
interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'update' | 'event' | 'hotfix' | 'ankuendigung';
  author: string;
  date: string;
  pinned?: boolean;
}

// Sample data (wird später durch Backend ersetzt)
const articles: NewsArticle[] = [
  {
    id: '1',
    title: 'Server Update auf 1.21.4',
    excerpt: 'Der Server wurde erfolgreich auf Minecraft 1.21.4 aktualisiert. Alle Plugins sind kompatibel.',
    content: '',
    category: 'update',
    author: 'Admin',
    date: '2026-04-20',
    pinned: true,
  },
  {
    id: '2',
    title: 'Build-Event: Frühlingsmarkt',
    excerpt: 'Nehmt am großen Frühlingsmarkt-Event teil! Die besten Builds gewinnen exklusive Preise.',
    content: '',
    category: 'event',
    author: 'Moderator',
    date: '2026-04-18',
  },
  {
    id: '3',
    title: 'Economy Reset angekündigt',
    excerpt: 'Am 1. Mai wird die Server-Economy zurückgesetzt. Alle Spieler erhalten einen Starter-Bonus.',
    content: '',
    category: 'ankuendigung',
    author: 'Admin',
    date: '2026-04-15',
  },
  {
    id: '4',
    title: 'Bugfix: Chest-Shop Fehler behoben',
    excerpt: 'Ein kritischer Fehler im Chest-Shop-Plugin wurde behoben. Käufe funktionieren wieder korrekt.',
    content: '',
    category: 'hotfix',
    author: 'Dev-Team',
    date: '2026-04-12',
  },
  {
    id: '5',
    title: 'Neues Ränge-System',
    excerpt: 'Wir führen ein komplett überarbeitetes Ranges-System ein. Alle Details im Wiki.',
    content: '',
    category: 'update',
    author: 'Admin',
    date: '2026-04-10',
  },
  {
    id: '6',
    title: 'PvP-Turnier nächsten Samstag',
    excerpt: 'Meldet euch jetzt an für das große PvP-Turnier am Samstag, 18 Uhr. Cash-Preise werden verteilt!',
    content: '',
    category: 'event',
    author: 'Moderator',
    date: '2026-04-08',
  },
];

const categoryConfig = {
  update: { label: 'Update', className: 'badge-cyan' },
  event: { label: 'Event', className: 'badge-green' },
  hotfix: { label: 'Hotfix', className: 'badge-red' },
  ankuendigung: { label: 'Ankündigung', className: 'badge-gold' },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

export const metadata = {
  title: 'News',
  description: 'Aktuelle News, Updates und Events von SigmaSMP.',
};

export default function NewsPage() {
  const pinned = articles.filter(a => a.pinned);
  const rest = articles.filter(a => !a.pinned);

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="page-hero">
          <div className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
            Aktuelles
          </div>
          <h1 className="section-title">Server <span className="highlight">News</span></h1>
          <p>Bleib auf dem Laufenden – Updates, Events, Ankündigungen.</p>
        </div>

        {/* Pinned */}
        {pinned.length > 0 && (
          <div className={styles.pinnedSection}>
            <div className={styles.sectionLabel}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Angepinnt
            </div>
            {pinned.map((article) => (
              <Link key={article.id} href={`/news/${article.id}`} className={styles.pinnedCard} id={`news-pinned-${article.id}`}>
                <div className={styles.pinnedLeft}>
                  <div className={styles.cardMeta}>
                    <span className={`badge ${categoryConfig[article.category].className}`}>
                      {categoryConfig[article.category].label}
                    </span>
                    <span className={styles.cardDate}>{formatDate(article.date)}</span>
                    <span className={styles.cardAuthor}>von {article.author}</span>
                  </div>
                  <h2 className={styles.pinnedTitle}>{article.title}</h2>
                  <p className={styles.cardExcerpt}>{article.excerpt}</p>
                </div>
                <div className={styles.pinnedArrow}>→</div>
              </Link>
            ))}
          </div>
        )}

        {/* Articles Grid */}
        <div className={styles.grid}>
          {rest.map((article) => (
            <Link key={article.id} href={`/news/${article.id}`} className={styles.card} id={`news-article-${article.id}`}>
              <div className={styles.cardTop}>
                <span className={`badge ${categoryConfig[article.category].className}`}>
                  {categoryConfig[article.category].label}
                </span>
                <span className={styles.cardDate}>{formatDate(article.date)}</span>
              </div>
              <h3 className={styles.cardTitle}>{article.title}</h3>
              <p className={styles.cardExcerpt}>{article.excerpt}</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardAuthor}>von {article.author}</span>
                <span className={styles.readMore}>Lesen →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
