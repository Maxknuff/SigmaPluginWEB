import Link from 'next/link';
import styles from './WikiArticle.module.css';

// Wiki content database
const wikiContent: Record<string, Record<string, { title: string; content: string }>> = {
  einstieg: {
    'erste-schritte': {
      title: 'Erste Schritte',
      content: `
## Willkommen auf SigmaSMP!

Schön, dass du zu uns gefunden hast. Hier sind die ersten Schritte um loszulegen:

### Server beitreten

1. Öffne Minecraft Java Edition (Version 1.21.x)
2. Gehe zu **Multiplayer** → **Server hinzufügen**
3. Trage als Server-Adresse \`play.sigmasmp.de\` ein
4. Klicke auf **Fertig** und betritt den Server

### Ersten Start

Beim ersten Beitreten wirst du automatisch eingeloggt. Du landest auf dem Spawn-Point.

- Tippe \`/kit starter\` um dein Starter-Kit zu erhalten
- Mit \`/sethome\` setzt du deinen Spawn-Punkt
- Mit \`/spawn\` gelangst du jederzeit zurück

### Nächste Schritte

- Lies die **Serverregeln** um Bans zu vermeiden
- Schau dir die **Befehls-Liste** an
- Tritt unserem **Discord** bei
      `,
    },
    'regeln': {
      title: 'Serverregeln',
      content: `
## Serverregeln

Bitte halte dich an diese Regeln. Verstöße können zu einem temporären oder permanenten Bann führen.

### Allgemein

1. **Respektiere andere Spieler** – Beleidigungen, Rassismus und Diskriminierung sind verboten
2. **Kein Cheating** – Hacks, Cheats und Exploits sind strengstens verboten
3. **Kein Griefing** – Fremde Gebäude zerstören oder stehlen ist nicht erlaubt
4. **Kein Spammen** – Im Chat keine Wiederholungen oder sinnlose Nachrichten

### Economy

- Scam ist in klar beschrifteten Shops verboten
- Preisabsprachen gegen die Community sind nicht erlaubt

### Bauen

- Halte mindestens **50 Blöcke Abstand** zu anderen Spielern
- Keine obszönen oder beleidigenden Strukturen

### Konsequenzen

| Verstoß | Strafe |
|---------|--------|
| 1. Verwarnung | Mute 1 Stunde |
| 2. Verwarnung | Mute 24 Stunden |
| 3. Verwarnung | Ban 7 Tage |
| Schwerer Verstoß | Permanenter Ban |
      `,
    },
    'befehle': {
      title: 'Wichtige Befehle',
      content: `
## Wichtige Befehle

### Navigation

\`/spawn\` – Zurück zum Spawn
\`/sethome [name]\` – Zuhause setzen
\`/home [name]\` – Zu deinem Zuhause teleportieren
\`/warp [name]\` – Zu einem Warp-Punkt teleportieren

### Economy

\`/balance\` oder \`/bal\` – Dein Kontostand
\`/pay [Spieler] [Betrag]\` – Geld überweisen
\`/shop\` – Öffnet den Server-Shop

### Spieler

\`/msg [Spieler] [Nachricht]\` – Privatnachricht senden
\`/r [Nachricht]\` – Auf letzte Nachricht antworten
\`/ignore [Spieler]\` – Spieler blockieren

### Sonstiges

\`/kit [name]\` – Kit erhalten
\`/rules\` – Serverregeln anzeigen
\`/discord\` – Discord-Link erhalten
      `,
    },
  },
  economy: {
    'geld': {
      title: 'Geld & Währung',
      content: `
## Geld & Währung

Die Währung auf SigmaSMP heißt **Sigma Coins (SC)**.

### Geld verdienen

- **Verkaufen** – Items im Server-Shop verkaufen
- **Jobs** – Einem Job beitreten und regelmäßig verdienen
- **Spieler-Shops** – An andere Spieler verkaufen
- **Events** – Bei Events Geldpreise gewinnen

### Starten

Jeder neue Spieler erhält **500 SC** als Startkapital.

### Befehle

\`/bal\` – Kontostand anzeigen
\`/pay [Spieler] [Betrag]\` – Geld überweisen
\`/baltop\` – Reichste Spieler anzeigen
      `,
    },
    'shops': {
      title: 'Shops erstellen',
      content: `
## Chest-Shops erstellen

Mit dem Chest-Shop-System kannst du eigene Shops betreiben.

### Shop erstellen

1. Platziere eine **Kiste**
2. Halte das Item in der Hand das du verkaufen willst
3. Klicke auf die Kiste mit **Shift + Rechtsklick**
4. Gib den Preis ein

### Shop-Schild Format

\`\`\`
[Dein Name]
[Menge]
B [Kaufpreis] : V [Verkaufspreis]
[Item-Name]
\`\`\`

### Tipps

- Platziere deinen Shop an einem gut besuchten Ort im Market
- Halte deine Preise fair und wettbewerbsfähig
      `,
    },
    'jobs': {
      title: 'Jobs & Verdienst',
      content: `
## Jobs

Mit dem Jobs-System verdienst du automatisch Geld beim Spielen.

### Verfügbare Jobs

| Job | Aktionen | Verdienst/h |
|-----|----------|-------------|
| Miner | Abbauen | 200-500 SC |
| Builder | Bauen | 150-400 SC |
| Farmer | Ernten | 100-300 SC |
| Hunter | Mobs töten | 200-600 SC |

### Beitreten

\`/jobs browse\` – Alle Jobs anzeigen
\`/jobs join [job]\` – Job beitreten
\`/jobs leave [job]\` – Job verlassen
\`/jobs info\` – Deine Job-Statistiken
      `,
    },
  },
};

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  for (const [cat, articles] of Object.entries(wikiContent)) {
    for (const slug of Object.keys(articles)) {
      params.push({ category: cat, slug });
    }
  }
  return params;
}

export default function WikiArticlePage({ params }: { params: { category: string; slug: string } }) {
  const categoryArticles = wikiContent[params.category];
  const article = categoryArticles?.[params.slug];

  if (!article) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className={styles.notFound}>
            <h1>Artikel nicht gefunden</h1>
            <Link href="/wiki" className="btn btn-secondary">← Zurück zum Wiki</Link>
          </div>
        </div>
      </div>
    );
  }

  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);

  function renderContent(content: string) {
    const lines = content.trim().split('\n');
    const result: string[] = [];
    let inList = false;
    let inOl = false;
    let olNum = 0;
    let inPre = false;
    let preBuffer: string[] = [];

    for (const line of lines) {
      if (line.startsWith('```')) {
        if (!inPre) {
          if (inList) { result.push('</ul>'); inList = false; }
          if (inOl) { result.push('</ol>'); inOl = false; }
          inPre = true;
          preBuffer = [];
        } else {
          inPre = false;
          result.push(`<pre><code>${preBuffer.join('\n')}</code></pre>`);
        }
        continue;
      }
      if (inPre) { preBuffer.push(line); continue; }

      if (line.startsWith('## ')) {
        if (inList) { result.push('</ul>'); inList = false; }
        if (inOl) { result.push('</ol>'); inOl = false; }
        result.push(`<h2>${line.slice(3)}</h2>`);
      } else if (line.startsWith('### ')) {
        if (inList) { result.push('</ul>'); inList = false; }
        if (inOl) { result.push('</ol>'); inOl = false; }
        result.push(`<h3>${line.slice(4)}</h3>`);
      } else if (line.match(/^\d+\. /)) {
        if (!inOl) { if (inList) { result.push('</ul>'); inList = false; } result.push('<ol>'); inOl = true; olNum = 0; }
        olNum++;
        const text = line.replace(/^\d+\. /, '');
        result.push(`<li>${fmt(text)}</li>`);
      } else if (line.startsWith('- ')) {
        if (!inList) { if (inOl) { result.push('</ol>'); inOl = false; } result.push('<ul>'); inList = true; }
        result.push(`<li>${fmt(line.slice(2))}</li>`);
      } else if (line.startsWith('|')) {
        if (inList) { result.push('</ul>'); inList = false; }
        if (inOl) { result.push('</ol>'); inOl = false; }
        if (!line.includes('---')) {
          const cells = line.split('|').filter(c => c.trim());
          result.push(`<tr>${cells.map(c => `<td>${c.trim()}</td>`).join('')}</tr>`);
        }
      } else if (line.trim() === '') {
        if (inList) { result.push('</ul>'); inList = false; }
        if (inOl) { result.push('</ol>'); inOl = false; }
      } else if (line.trim()) {
        result.push(`<p>${fmt(line)}</p>`);
      }
    }
    if (inList) result.push('</ul>');
    if (inOl) result.push('</ol>');
    return result.join('\n');
  }

  function fmt(text: string) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>');
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.breadcrumb}>
            <Link href="/wiki" className={styles.breadcrumbLink}>Wiki</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link href={`/wiki#${params.category}`} className={styles.breadcrumbLink}>{categoryName}</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{article.title}</span>
          </div>

          <article className={styles.article}>
            <h1 className={styles.title}>{article.title}</h1>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: renderContent(article.content) }}
            />
          </article>

          <div className={styles.footer}>
            <Link href="/wiki" className="btn btn-secondary">← Zurück zum Wiki</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
