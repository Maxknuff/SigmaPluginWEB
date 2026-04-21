import Link from 'next/link';
import ServerStatus from '@/components/ServerStatus';
import styles from './Home.module.css';

const features = [
  {
    icon: '📖',
    title: 'Wiki',
    description: 'Alle Infos über Befehle, Ränge, Economy und Regeln auf einen Blick.',
    href: '/wiki',
    color: 'cyan',
  },
  {
    icon: '📰',
    title: 'News',
    description: 'Bleibe immer auf dem Laufenden mit den neuesten Updates und Events.',
    href: '/news',
    color: 'green',
  },
  {
    icon: '🛒',
    title: 'Shop',
    description: 'Hol dir Donator-Ränge und exklusive Features für deinen Account.',
    href: '/shop',
    color: 'gold',
  },
  {
    icon: '🏆',
    title: 'Leaderboard',
    description: 'Sieh wer die aktivsten und stärksten Spieler auf dem Server sind.',
    href: '/leaderboard',
    color: 'purple',
  },
  {
    icon: '👥',
    title: 'Team',
    description: 'Lerne unser Adminteam kennen – wir sind immer für euch da.',
    href: '/staff',
    color: 'green',
  },
  {
    icon: '💬',
    title: 'Discord',
    description: 'Tritt unserem Discord bei und vernetze dich mit der Community.',
    href: 'https://discord.gg/sigma',
    color: 'purple',
    external: true,
  },
];

const stats = [
  { value: '500+', label: 'Registrierte Spieler' },
  { value: '24/7', label: 'Online Uptime' },
  { value: '1.21', label: 'Minecraft Version' },
  { value: '0ms', label: 'Ø Ping (DE)' },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroGlow2} />
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.badgeDot}></span>
              Server ist live
            </div>
            <h1 className={styles.heroTitle}>
              Willkommen auf{' '}
              <span className={styles.heroAccent}>SigmaSMP</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Erlebe Minecraft auf einem ganz neuen Level. Survival, Economy, Custom-Plugins und eine aktive Community warten auf dich.
            </p>
            <div className={styles.heroActions}>
              <Link href="/wiki" className="btn btn-primary" id="hero-cta-wiki">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
                Wiki erkunden
              </Link>
              <a href="https://discord.gg/sigma" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" id="hero-cta-discord">
                Discord beitreten
              </a>
            </div>
          </div>

          <div className={styles.heroWidget}>
            <ServerStatus />
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Features
            </div>
            <h2 className="section-title">
              Alles was du brauchst,{' '}
              <span className="highlight">an einem Ort</span>
            </h2>
            <p className="section-description">
              Von Wiki bis Shop – unsere Website bietet dir alle Ressourcen rund um den Server.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature) => (
              feature.external ? (
                <a
                  key={feature.title}
                  href={feature.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.featureCard} ${styles[`featureCard${feature.color.charAt(0).toUpperCase() + feature.color.slice(1)}`]}`}
                  id={`feature-${feature.title.toLowerCase()}`}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.description}</p>
                  <div className={styles.featureArrow}>→</div>
                </a>
              ) : (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className={`${styles.featureCard} ${styles[`featureCard${feature.color.charAt(0).toUpperCase() + feature.color.slice(1)}`]}`}
                  id={`feature-${feature.title.toLowerCase()}`}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.description}</p>
                  <div className={styles.featureArrow}>→</div>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBanner}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Bereit zum Spielen?</h2>
              <p className={styles.ctaDesc}>
                Kopiere die Server-IP und tritt noch heute bei. Es ist kostenlos!
              </p>
              <div className={styles.ctaIpBox}>
                <code className={styles.ctaIp}>play.sigmasmp.de</code>
                <span className={styles.ctaVersion}>Java 1.21.x</span>
              </div>
              <div className={styles.ctaActions}>
                <Link href="/wiki" className="btn btn-primary" id="cta-wiki-btn">
                  Erste Schritte →
                </Link>
                <Link href="/shop" className="btn btn-outline" id="cta-shop-btn">
                  Shop ansehen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
