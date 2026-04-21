import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="8" height="8" rx="1" fill="#4ade80"/>
                  <rect x="13" y="3" width="8" height="8" rx="1" fill="#22d3ee" opacity="0.7"/>
                  <rect x="3" y="13" width="8" height="8" rx="1" fill="#22d3ee" opacity="0.7"/>
                  <rect x="13" y="13" width="8" height="8" rx="1" fill="#4ade80" opacity="0.5"/>
                </svg>
              </div>
              <span className={styles.logoText}>Sigma<span className={styles.logoAccent}>SMP</span></span>
            </div>
            <p className={styles.tagline}>
              Der beste Minecraft Server. Joine uns noch heute und werde Teil der Community.
            </p>
            <div className={styles.socials}>
              <a href="https://discord.gg/sigma" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Discord" id="footer-discord">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.079.111 18.1.127 18.114a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
              </a>
              <a href="https://github.com/sigma" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="GitHub" id="footer-github">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className={styles.columns}>
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Server</h4>
              <ul className={styles.colLinks}>
                <li><Link href="/news">News</Link></li>
                <li><Link href="/wiki">Wiki</Link></li>
                <li><Link href="/shop">Shop</Link></li>
                <li><Link href="/leaderboard">Leaderboard</Link></li>
              </ul>
            </div>
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Community</h4>
              <ul className={styles.colLinks}>
                <li><Link href="/staff">Team</Link></li>
                <li><a href="https://discord.gg/sigma" target="_blank" rel="noopener noreferrer">Discord</a></li>
              </ul>
            </div>
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Verbinden</h4>
              <div className={styles.serverIp}>
                <span className={styles.ipLabel}>Server IP</span>
                <code className={styles.ipCode}>play.sigmasmp.de</code>
              </div>
              <div className={styles.serverIp} style={{ marginTop: '8px' }}>
                <span className={styles.ipLabel}>Version</span>
                <code className={styles.ipCode}>1.21.x</code>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© {currentYear} SigmaSMP. Alle Rechte vorbehalten.</p>
          <p className={styles.disclaimer}>Nicht mit Mojang AB oder Microsoft assoziiert.</p>
        </div>
      </div>
    </footer>
  );
}
