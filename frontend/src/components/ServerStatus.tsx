'use client';

import { useState, useEffect } from 'react';
import styles from './ServerStatus.module.css';

interface ServerStatusData {
  online: boolean;
  players?: { online: number; max: number; list?: string[] };
  motd?: { clean?: string[] };
  version?: string;
}

export default function ServerStatus() {
  const [status, setStatus] = useState<ServerStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const SERVER_IP = process.env.NEXT_PUBLIC_SERVER_IP || 'play.sigmasmp.de';

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/server-status`);
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setStatus(data);
      } catch {
        setStatus({ online: false });
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const copyIP = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <div className={styles.statusRow}>
          <span className={`status-dot ${loading ? '' : status?.online ? 'online' : 'offline'}`}></span>
          <span className={styles.statusLabel}>
            {loading ? 'Verbinde...' : status?.online ? 'Online' : 'Offline'}
          </span>
        </div>
        {!loading && status?.online && status.players && (
          <span className={styles.players}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            {status.players.online}/{status.players.max}
          </span>
        )}
      </div>

      <button className={styles.ipRow} onClick={copyIP} title="IP kopieren" id="server-ip-copy">
        <code className={styles.ip}>{SERVER_IP}</code>
        <span className={styles.copyIcon}>
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="2.5">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          )}
        </span>
      </button>

      {!loading && status?.online && status.players?.list && status.players.list.length > 0 && (
        <div className={styles.playerList}>
          <span className={styles.playerListLabel}>Online:</span>
          <div className={styles.playerNames}>
            {status.players.list.slice(0, 8).map((player) => (
              <span key={player} className={styles.playerName}>
                <img
                  src={`https://crafatar.com/avatars/${player}?size=16&overlay`}
                  alt={player}
                  width={16}
                  height={16}
                  className={styles.playerAvatar}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                {player}
              </span>
            ))}
            {status.players.list.length > 8 && (
              <span className={styles.more}>+{status.players.list.length - 8} mehr</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
