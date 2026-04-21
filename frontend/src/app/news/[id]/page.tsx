import Link from 'next/link';
import styles from './NewsArticle.module.css';

// Static data (später Backend)
const articles: Record<string, { title: string; content: string; category: string; author: string; date: string }> = {
  '1': {
    title: 'Server Update auf 1.21.4',
    category: 'Update',
    author: 'Admin',
    date: '2026-04-20',
    content: `
# Server Update auf 1.21.4

Wir haben den Server erfolgreich auf **Minecraft 1.21.4** aktualisiert!

## Was hat sich geändert?

- ✅ Alle Plugins wurden auf Kompatibilität geprüft
- ✅ Performance-Verbesserungen durch neue Paper-Version
- ✅ Neue 1.21-Blöcke und Items ab sofort verfügbar
- ✅ Chunk-Loading wurde optimiert

## Bekannte Probleme

Derzeit sind uns keine kritischen Fehler bekannt. Falls ihr Bugs findet, meldet sie bitte im Discord.

## Nächste Schritte

Wir arbeiten aktuell an einem neuen Dungeon-System das in den nächsten Wochen released wird.
    `,
  },
  '2': {
    title: 'Build-Event: Frühlingsmarkt',
    category: 'Event',
    author: 'Moderator',
    date: '2026-04-18',
    content: `
# Build-Event: Frühlingsmarkt 🌸

Vom **20. bis 27. April** findet unser großes Frühlingsmarkt-Build-Event statt!

## Regeln

1. Baut einen Stand oder eine Dekoration mit Frühlingsthema
2. Maximale Größe: 20x20 Blöcke
3. Keine Mods erlaubt

## Preise

| Platz | Preis |
|-------|-------|
| 🥇 1. Platz | VIP-Rang + 10.000 Coins |
| 🥈 2. Platz | 5.000 Coins |
| 🥉 3. Platz | 2.500 Coins |

Viel Erfolg an alle Teilnehmer! 🎉
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map(id => ({ id }));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

// Simple markdown renderer (ohne externe deps für SSR-Sicherheit)
function renderMarkdown(content: string) {
  const lines = content.trim().split('\n');
  const html: string[] = [];
  let inList = false;

  for (const line of lines) {
    if (line.startsWith('# ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h1>${line.slice(2)}</h1>`);
    } else if (line.startsWith('## ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h2>${line.slice(3)}</h2>`);
    } else if (line.startsWith('### ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h3>${line.slice(4)}</h3>`);
    } else if (line.startsWith('- ') || line.startsWith('✅ ') || line.startsWith('🥇 ') || line.startsWith('🥈 ') || line.startsWith('🥉 ')) {
      if (!inList) { html.push('<ul>'); inList = true; }
      const text = line.replace(/^[-✅🥇🥈🥉]\s/, '');
      html.push(`<li>${text}</li>`);
    } else if (line.match(/^\d+\./)) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<p>${line}</p>`);
    } else if (line.startsWith('|')) {
      // table row – simplified
      if (inList) { html.push('</ul>'); inList = false; }
      const cells = line.split('|').filter(c => c.trim() && c.trim() !== '---');
      if (cells.length > 0) {
        html.push(`<tr>${cells.map(c => `<td>${c.trim()}</td>`).join('')}</tr>`);
      }
    } else if (line.trim() === '') {
      if (inList) { html.push('</ul>'); inList = false; }
    } else if (line.trim()) {
      const processed = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
      html.push(`<p>${processed}</p>`);
    }
  }
  if (inList) html.push('</ul>');
  return html.join('\n');
}

export default function NewsArticlePage({ params }: { params: { id: string } }) {
  const article = articles[params.id];

  if (!article) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className={styles.notFound}>
            <h1>Artikel nicht gefunden</h1>
            <Link href="/news" className="btn btn-secondary">← Zurück zu News</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className={styles.article}>
          <div className={styles.articleBack}>
            <Link href="/news" className={styles.backLink}>← Alle News</Link>
          </div>
          <div className={styles.articleHeader}>
            <div className={styles.articleMeta}>
              <span className="badge badge-cyan">{article.category}</span>
              <span className={styles.articleDate}>{formatDate(article.date)}</span>
              <span className={styles.articleAuthor}>von {article.author}</span>
            </div>
            <h1 className={styles.articleTitle}>{article.title}</h1>
          </div>
          <div
            className={`${styles.articleBody} prose`}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
          />
        </div>
      </div>
    </div>
  );
}
