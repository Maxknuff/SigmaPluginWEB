const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://sigmasmp.vercel.app',
  ],
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB error:', err));
}

// ===== MODELS =====
const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['update', 'event', 'hotfix', 'ankuendigung'], default: 'update' },
  author: { type: String, required: true },
  pinned: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
}, { timestamps: true });

const WikiSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const ShopItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['rank', 'extra'], default: 'rank' },
  price: { type: Number, required: true },
  description: String,
  features: [String],
  popular: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const PlayerSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  playtimeMinutes: { type: Number, default: 0 },
  kills: { type: Number, default: 0 },
  deaths: { type: Number, default: 0 },
  money: { type: Number, default: 0 },
  firstJoin: { type: Date, default: Date.now },
  lastSeen: { type: Date, default: Date.now },
}, { timestamps: true });

const News = mongoose.model('News', NewsSchema);
const WikiArticle = mongoose.model('WikiArticle', WikiSchema);
const ShopItem = mongoose.model('ShopItem', ShopItemSchema);
const Player = mongoose.model('Player', PlayerSchema);

// ===== AUTH MIDDLEWARE =====
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ===== ROUTES =====

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'SigmaSMP API', version: '1.0.0' });
});

// Auth
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPass = process.env.ADMIN_PASS || 'changeme';
  if (username === adminUser && password === adminPass) {
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '7d' }
    );
    res.json({ token, username });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Minecraft Server Status (proxy)
app.get('/api/server-status', async (req, res) => {
  try {
    const serverIp = process.env.SERVER_IP || 'play.sigmasmp.de';
    const response = await fetch(`https://api.mcsrvstat.us/3/${serverIp}`);
    const data = await response.json();
    res.json(data);
  } catch {
    res.json({ online: false });
  }
});

// NEWS
app.get('/api/news', async (req, res) => {
  try {
    const { limit = 20, category } = req.query;
    const query = { published: true };
    if (category) query.category = category;
    const news = await News.find(query)
      .sort({ pinned: -1, createdAt: -1 })
      .limit(Number(limit));
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/news/:id', async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/news', authMiddleware, async (req, res) => {
  try {
    const article = new News(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/news/:id', authMiddleware, async (req, res) => {
  try {
    const article = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/news/:id', authMiddleware, async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// WIKI
app.get('/api/wiki', async (req, res) => {
  try {
    const articles = await WikiArticle.find().sort({ category: 1, order: 1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/wiki/:category/:slug', async (req, res) => {
  try {
    const article = await WikiArticle.findOne({ category: req.params.category, slug: req.params.slug });
    if (!article) return res.status(404).json({ error: 'Not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/wiki', authMiddleware, async (req, res) => {
  try {
    const article = new WikiArticle(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/wiki/:id', authMiddleware, async (req, res) => {
  try {
    const article = await WikiArticle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// SHOP
app.get('/api/shop', async (req, res) => {
  try {
    const items = await ShopItem.find({ active: true }).sort({ price: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/shop', authMiddleware, async (req, res) => {
  try {
    const item = new ShopItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PLAYERS
app.get('/api/players', async (req, res) => {
  try {
    const { sort = 'playtimeMinutes', limit = 20 } = req.query;
    const validSorts = ['playtimeMinutes', 'kills', 'money'];
    const sortField = validSorts.includes(sort) ? sort : 'playtimeMinutes';
    const players = await Player.find().sort({ [sortField]: -1 }).limit(Number(limit));
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/players/:uuid', async (req, res) => {
  try {
    const player = await Player.findOne({ uuid: req.params.uuid });
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// WEBHOOK (from Minecraft Plugin)
app.post('/api/webhook/player-event', async (req, res) => {
  const { event, player, uuid, stats } = req.body;

  // Authorization Check
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();

  if (token !== process.env.WEBHOOK_SECRET) {
    return res.status(401).send(); // Unauthorized
  }

  try {
    if (uuid && player) {
      const update = { name: player, lastSeen: new Date() };

      // Update stats if provided (important for stats_update or player_quit)
      if (stats) {
        if (stats.playtimeMinutes !== undefined) update.playtimeMinutes = stats.playtimeMinutes;
        if (stats.kills !== undefined) update.kills = stats.kills;
        if (stats.deaths !== undefined) update.deaths = stats.deaths;
        if (stats.money !== undefined) update.money = stats.money;
      }

      // Create new document or update existing one
      await Player.findOneAndUpdate({ uuid }, update, { upsert: true, new: true });
    }

    console.log(`📡 Webhook: ${event} - ${player} (${uuid})`);
    
    // Send 204 No Content to inform the Java Plugin that everything was processed successfully
    res.status(204).send();
  } catch (err) {
    console.error('❌ Webhook error:', err);
    res.status(500).send();
  }
});

app.listen(PORT, () => {
  console.log(`🚀 SigmaSMP API running on port ${PORT}`);
});

module.exports = app;
