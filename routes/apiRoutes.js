const express = require('express');
const router = express.Router();
const { requireJWT } = require('../middleware/authMiddleware');
const whoService = require('../services/whoService');
const openFoodService = require('../services/openFoodService');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// POST /api/auth/token — ottieni token JWT
router.post('/auth/token', (req, res) => {
  const { username, password } = req.body;
  const user = userModel.findByUsername(username);
  const { validatePassword } = require('../models/userModel');
  if (!user || !validatePassword(password, user.password)) {
    return res.status(401).json({ error: 'Credenziali non valide' });
  }
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || 'nutriworld_secret_key_2025',
    { expiresIn: '24h' }
  );
  res.json({ token });
});

// GET /api/health — stato del server
router.get('/health', (req, res) => {
  res.json({ status: 'ok', project: 'NutriWorld', version: '1.0.0' });
});

// GET /api/countries — lista paesi con dati salute (richiede JWT)
router.get('/countries', requireJWT, (req, res) => {
  res.json(whoService.getAllCountries());
});

// GET /api/countries/:code — dati singolo paese (richiede JWT)
router.get('/countries/:code', requireJWT, (req, res) => {
  const country = whoService.getCountryByCode(req.params.code);
  if (!country) return res.status(404).json({ error: 'Paese non trovato' });
  res.json(country);
});

// GET /api/stats — statistiche globali (richiede JWT)
router.get('/stats', requireJWT, (req, res) => {
  res.json(whoService.getGlobalStats());
});

// GET /api/food/search?q=query — ricerca alimenti (richiede JWT)
router.get('/food/search', requireJWT, async (req, res) => {
  try {
    const foods = await openFoodService.searchFood(req.query.q || '');
    res.json(foods);
  } catch {
    res.status(500).json({ error: 'Errore nella ricerca' });
  }
});

module.exports = router;
