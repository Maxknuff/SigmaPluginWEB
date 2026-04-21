import styles from './Leaderboard.module.css';

const players = [
  { rank: 1, name: 'Maxknuff', playtime: '312h', kills: 1247, money: 482000, deaths: 23 },
  { rank: 2, name: 'ShadowKnight', playtime: '289h', kills: 1103, money: 367000, deaths: 45 },
  { rank: 3, name: 'BuildMaster99', playtime: '241h', kills: 234, money: 891000, deaths: 12 },
  { rank: 4, name: 'CreeperHunter', playtime: '198h', kills: 987, money: 234000, deaths: 67 },
  { rank: 5, name: 'DiamondQueen', playtime: '187h', kills: 445, money: 543000, deaths: 34 },
  { rank: 6, name: 'RedstoneKing', playtime: '165h', kills: 123, money: 712000, deaths: 8 },
  { rank: 7, name: 'StealthArcher', playtime: '143h', kills: 876, money: 156000, deaths: 89 },
  { rank: 8, name: 'CraftingPro', playtime: '132h', kills: 67, money: 634000, deaths: 15 },
  { rank: 9, name: 'PvPGod2026', playtime: '121h', kills: 1089, money: 89000, deaths: 102 },
  { rank: 10, name: 'FarmingQueen', playtime: '118h', kills: 34, money: 945000, deaths: 6 },
];

const rankColors = ['gold', 'silver', 'bronze'];
const rankEmojis = ['🥇', '🥈', '🥉'];

function formatMoney(num: number) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
}

export const metadata = {
  title: 'Leaderboard',
  description: 'Die besten Spieler auf SigmaSMP – Rangliste nach Spielzeit, Kills und Reichtum.',
};

export default function LeaderboardPage() {
  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="page-hero">
          <div className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Rangliste
          </div>
          <h1 className="section-title">Top <span className="highlight">Spieler</span></h1>
          <p>Die aktivsten und stärksten Spieler auf SigmaSMP.</p>
        </div>

        {/* Top 3 Podium */}
        <div className={styles.podium}>
          {/* 2nd place */}
          <div className={`${styles.podiumCard} ${styles.podiumSilver}`} id="leaderboard-rank-2">
            <div className={styles.podiumRank}>🥈</div>
            <img
              src={`https://crafatar.com/avatars/${players[1].name}?size=64&overlay`}
              alt={players[1].name}
              className={styles.podiumAvatar}
              width={64}
              height={64}
            />
            <div className={styles.podiumName}>{players[1].name}</div>
            <div className={styles.podiumStat}>{players[1].playtime} Spielzeit</div>
          </div>

          {/* 1st place */}
          <div className={`${styles.podiumCard} ${styles.podiumGold} ${styles.podiumFirst}`} id="leaderboard-rank-1">
            <div className={styles.podiumCrown}>👑</div>
            <div className={styles.podiumRank}>🥇</div>
            <img
              src={`https://crafatar.com/avatars/${players[0].name}?size=80&overlay`}
              alt={players[0].name}
              className={styles.podiumAvatar}
              width={80}
              height={80}
            />
            <div className={styles.podiumName}>{players[0].name}</div>
            <div className={styles.podiumStat}>{players[0].playtime} Spielzeit</div>
          </div>

          {/* 3rd place */}
          <div className={`${styles.podiumCard} ${styles.podiumBronze}`} id="leaderboard-rank-3">
            <div className={styles.podiumRank}>🥉</div>
            <img
              src={`https://crafatar.com/avatars/${players[2].name}?size=64&overlay`}
              alt={players[2].name}
              className={styles.podiumAvatar}
              width={64}
              height={64}
            />
            <div className={styles.podiumName}>{players[2].name}</div>
            <div className={styles.podiumStat}>{players[2].playtime} Spielzeit</div>
          </div>
        </div>

        {/* Full Table */}
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <span className={styles.tableTitle}>Vollständige Rangliste</span>
            <span className={styles.tableSubtitle}>Nach Spielzeit sortiert · Letzte Aktualisierung: Heute</span>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>#</th>
                <th className={styles.th}>Spieler</th>
                <th className={styles.th}>Spielzeit</th>
                <th className={styles.th}>Kills</th>
                <th className={styles.th}>Tode</th>
                <th className={styles.th}>K/D</th>
                <th className={styles.th}>Vermögen</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr
                  key={player.rank}
                  className={`${styles.tr} ${player.rank <= 3 ? styles.trHighlighted : ''}`}
                  id={`leaderboard-player-${player.rank}`}
                >
                  <td className={styles.td}>
                    {player.rank <= 3 ? (
                      <span className={styles.rankEmoji}>{rankEmojis[player.rank - 1]}</span>
                    ) : (
                      <span className={styles.rankNum}>{player.rank}</span>
                    )}
                  </td>
                  <td className={styles.td}>
                    <div className={styles.playerCell}>
                      <img
                        src={`https://crafatar.com/avatars/${player.name}?size=32&overlay`}
                        alt={player.name}
                        className={styles.playerAvatar}
                        width={32}
                        height={32}
                      />
                      <span className={`${styles.playerName} ${player.rank <= 3 ? styles[`playerName${rankColors[player.rank - 1].charAt(0).toUpperCase() + rankColors[player.rank - 1].slice(1)}`] : ''}`}>
                        {player.name}
                      </span>
                    </div>
                  </td>
                  <td className={styles.td}><span className={styles.statValue}>{player.playtime}</span></td>
                  <td className={styles.td}><span className={styles.statValue}>{player.kills.toLocaleString()}</span></td>
                  <td className={styles.td}><span className={styles.statMuted}>{player.deaths}</span></td>
                  <td className={styles.td}>
                    <span className={styles.kdValue}>
                      {(player.kills / Math.max(player.deaths, 1)).toFixed(2)}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.moneyValue}>🪙 {formatMoney(player.money)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
