'use client';

import styles from './Staff.module.css';

const team = [
  {
    name: 'Maxknuff',
    role: 'Owner',
    rank: 'owner',
    description: 'Gründer und Hauptentwickler von SigmaSMP. Zuständig für alles.',
    joined: 'Jan 2024',
    socials: { discord: 'Maxknuff#0001' },
  },
  {
    name: 'ShadowAdmin',
    role: 'Co-Owner',
    rank: 'coowner',
    description: 'Co-Owner und verantwortlich für Community-Events und Discord.',
    joined: 'Feb 2024',
    socials: { discord: 'ShadowAdmin#1234' },
  },
  {
    name: 'BuildMaster',
    role: 'Admin',
    rank: 'admin',
    description: 'Build-Admin und Chef-Terraformer. Gestaltet alle öffentlichen Bereiche.',
    joined: 'Mar 2024',
    socials: { discord: 'BuildMaster#5678' },
  },
  {
    name: 'CreeperHunter',
    role: 'Admin',
    rank: 'admin',
    description: 'Plugin-Admin und zuständig für technische Probleme auf dem Server.',
    joined: 'Mar 2024',
    socials: { discord: 'CreeperHunter#9012' },
  },
  {
    name: 'DiamondMod',
    role: 'Moderator',
    rank: 'moderator',
    description: 'Aktiver Moderator mit Fokus auf Regel-Durchsetzung und Spieler-Support.',
    joined: 'Apr 2024',
    socials: { discord: 'DiamondMod#3456' },
  },
  {
    name: 'RedstoneHelper',
    role: 'Moderator',
    rank: 'moderator',
    description: 'Moderator und Redstone-Experte. Hilft gerne bei technischen Fragen.',
    joined: 'May 2024',
    socials: { discord: 'RedstoneHelper#7890' },
  },
  {
    name: 'StealthSupport',
    role: 'Supporter',
    rank: 'supporter',
    description: 'Freundlicher Supporter der neuen Spielern den Einstieg erleichtert.',
    joined: 'Jun 2024',
    socials: { discord: 'StealthSupport#1111' },
  },
  {
    name: 'CraftingHelper',
    role: 'Supporter',
    rank: 'supporter',
    description: 'Supporterin mit viel Erfahrung im Minecraft-Survival-Bereich.',
    joined: 'Jul 2024',
    socials: { discord: 'CraftingHelper#2222' },
  },
];

const rankConfig = {
  owner: { label: 'Owner', className: 'badge-red', color: '#f87171' },
  coowner: { label: 'Co-Owner', className: 'badge-purple', color: '#a78bfa' },
  admin: { label: 'Admin', className: 'badge-gold', color: '#fbbf24' },
  moderator: { label: 'Moderator', className: 'badge-cyan', color: '#22d3ee' },
  supporter: { label: 'Supporter', className: 'badge-green', color: '#4ade80' },
};

export default function StaffPage() {
  const grouped = {
    owner: team.filter(m => m.rank === 'owner' || m.rank === 'coowner'),
    admin: team.filter(m => m.rank === 'admin'),
    moderator: team.filter(m => m.rank === 'moderator'),
    supporter: team.filter(m => m.rank === 'supporter'),
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="page-hero">
          <div className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Crew
          </div>
          <h1 className="section-title">Unser <span className="highlight">Team</span></h1>
          <p>Diese engagierten Personen halten SigmaSMP am Laufen.</p>
        </div>

        {/* Leadership */}
        <div className={styles.section}>
          <div className={styles.sectionLabel}>
            <span>👑</span> Führung
          </div>
          <div className={styles.leadershipGrid}>
            {grouped.owner.map(member => (
              <MemberCard key={member.name} member={member} large />
            ))}
          </div>
        </div>

        {/* Admins */}
        {grouped.admin.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionLabel}>
              <span>⚡</span> Administratoren
            </div>
            <div className={styles.grid}>
              {grouped.admin.map(member => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Mods */}
        {grouped.moderator.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionLabel}>
              <span>🛡️</span> Moderatoren
            </div>
            <div className={styles.grid}>
              {grouped.moderator.map(member => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Supporters */}
        {grouped.supporter.length > 0 && (
          <div className={styles.section} style={{ marginBottom: 80 }}>
            <div className={styles.sectionLabel}>
              <span>💚</span> Supporter
            </div>
            <div className={styles.grid}>
              {grouped.supporter.map(member => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Apply CTA */}
        <div className={styles.applyCta}>
          <div className={styles.applyContent}>
            <h2 className={styles.applyTitle}>Teil des Teams werden?</h2>
            <p className={styles.applyDesc}>Wir suchen immer nach engagierten Spielern die dem Team beitreten möchten.</p>
            <a href="https://discord.gg/sigma" target="_blank" rel="noopener noreferrer" className="btn btn-primary" id="staff-apply-btn">
              Auf Discord bewerben →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function MemberCard({ member, large }: { member: typeof team[0]; large?: boolean }) {
  const rank = rankConfig[member.rank as keyof typeof rankConfig];
  return (
    <div className={`${styles.card} ${large ? styles.cardLarge : ''}`} id={`staff-${member.name.toLowerCase()}`}>
      <div className={styles.cardAvatar}>
        <img
          src={`https://crafatar.com/renders/body/${member.name}?size=128&overlay`}
          alt={member.name}
          className={styles.skinRender}
          width={large ? 96 : 72}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = `https://crafatar.com/avatars/${member.name}?size=64&overlay`;
            img.style.width = large ? '64px' : '48px';
          }}
        />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <span className={`badge ${rank.className}`}>{rank.label}</span>
          <span className={styles.joined}>Dabei seit {member.joined}</span>
        </div>
        <h3 className={styles.cardName}>{member.name}</h3>
        <p className={styles.cardRole}>{member.role}</p>
        <p className={styles.cardDesc}>{member.description}</p>
        {member.socials.discord && (
          <div className={styles.cardDiscord}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.079.111 18.1.127 18.114a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            {member.socials.discord}
          </div>
        )}
      </div>
    </div>
  );
}
