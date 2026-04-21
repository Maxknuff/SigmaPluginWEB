# SigmaSMP – Minecraft Server Website

Vollständige Website für den SigmaSMP Minecraft Server mit Wiki, News, Shop, Leaderboard und Team-Seite.

## 🏗️ Projektstruktur

```
SigmaPluginWEB/
├── frontend/    → Next.js 16 (deployed auf Vercel)
└── backend/     → Express.js + MongoDB (deployed auf Render)
```

## 🚀 Lokale Entwicklung

### Frontend starten

```bash
cd frontend
cp .env.local.example .env.local
# .env.local anpassen
npm run dev
# → http://localhost:3000
```

### Backend starten

```bash
cd backend
cp .env.example .env
# .env mit MongoDB URI etc. befüllen
npm install
npm run dev
# → http://localhost:3001
```

## 📦 Features

| Seite | Beschreibung |
|-------|-------------|
| 🏠 **Home** | Hero, Live-Server-Status Widget, Features, CTA |
| 📰 **News** | Artikel, Kategorien (Update/Event/Hotfix/Ankündigung) |
| 📖 **Wiki** | Suche, Kategorien, Sidebar-Navigation, Artikel |
| 🛒 **Shop** | Donator-Ränge (VIP, VIP+, Elite) + Extras |
| 🏆 **Leaderboard** | Podium + Vollständige Rangliste mit Minecraft-Skins |
| 👥 **Team** | Grppierte Team-Mitglieder mit Skin-Renders |
| ⚙️ **Backend API** | REST API für alle Daten + Webhook vom Plugin |

## 🌐 Deployment

### Vercel (Frontend)

1. GitHub-Repo mit Vercel verbinden
2. Root Directory: `frontend`
3. Environment Variables setzen:
   - `NEXT_PUBLIC_SERVER_IP` = deine Server-IP
   - `NEXT_PUBLIC_BACKEND_URL` = deine Render-URL

### Render (Backend)

1. GitHub-Repo mit Render verbinden
2. Root Directory: `backend`
3. Build: `npm install`, Start: `npm start`
4. Environment Variables setzen (siehe `.env.example`)

### MongoDB Atlas

1. Kostenlosen Account auf [mongodb.com/atlas](https://www.mongodb.com/atlas) erstellen
2. Cluster erstellen → Connection String kopieren
3. In Render als `MONGODB_URI` eintragen

## 🎮 Minecraft Plugin Webhook

Das Backend akzeptiert Webhook-Requests vom Minecraft-Server unter:
```
POST /api/webhook/player-event
Authorization: Bearer <WEBHOOK_SECRET>
```

Payload:
```json
{
  "event": "stats_update",
  "player": "Maxknuff",
  "uuid": "...",
  "stats": {
    "playtimeMinutes": 1200,
    "kills": 45,
    "deaths": 3,
    "money": 50000
  }
}
```

## 🔑 Admin Panel

Das Admin-Panel ist unter `/admin` erreichbar (in Entwicklung). Login über:
- **Username**: `ADMIN_USER` aus `.env`
- **Password**: `ADMIN_PASS` aus `.env`

## ⚙️ Tech Stack

- **Frontend**: Next.js 16, TypeScript, CSS Modules
- **Backend**: Express.js, Node.js, Mongoose
- **Datenbank**: MongoDB Atlas
- **Auth**: JWT
- **MC Status**: mcsrvstat.us API
- **MC Skins**: Crafatar API
- **Hosting**: Vercel (Frontend) + Render (Backend)
