'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/news', label: 'News' },
  { href: '/wiki', label: 'Wiki' },
  { href: '/shop', label: 'Shop' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/staff', label: 'Team' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="8" height="8" rx="1" fill="#4ade80"/>
              <rect x="13" y="3" width="8" height="8" rx="1" fill="#22d3ee" opacity="0.7"/>
              <rect x="3" y="13" width="8" height="8" rx="1" fill="#22d3ee" opacity="0.7"/>
              <rect x="13" y="13" width="8" height="8" rx="1" fill="#4ade80" opacity="0.5"/>
            </svg>
          </div>
          <span className={styles.logoText}>Sigma<span className={styles.logoAccent}>SMP</span></span>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.link} ${pathname === href || (href !== '/' && pathname.startsWith(href)) ? styles.active : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className={styles.actions}>
          <a
            href="https://discord.gg/sigma"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.discordBtn}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.079.111 18.1.127 18.114a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            Discord
          </a>
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü öffnen"
            id="navbar-hamburger"
          >
            <span className={mobileOpen ? styles.barOpen : ''}></span>
            <span className={mobileOpen ? styles.barOpen : ''}></span>
            <span className={mobileOpen ? styles.barOpen : ''}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ''}`}>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.mobileLink} ${pathname === href || (href !== '/' && pathname.startsWith(href)) ? styles.mobileLinkActive : ''}`}
          >
            {label}
          </Link>
        ))}
        <a
          href="https://discord.gg/sigma"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mobileDiscord}
        >
          Discord beitreten
        </a>
      </div>
    </nav>
  );
}
