const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Pug come template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'nutriworld_secret',
  resave: false,
  saveUninitialized: false
}));

// Routes
const authRoutes   = require('./routes/authRoutes');
const foodRoutes   = require('./routes/foodRoutes');
const globalRoutes = require('./routes/globalRoutes');
const diaryRoutes  = require('./routes/diaryRoutes');
const apiRoutes    = require('./routes/apiRoutes');

app.use('/auth', authRoutes);
app.use('/food', foodRoutes);
app.use('/global', globalRoutes);
app.use('/diary', diaryRoutes);
app.use('/api', apiRoutes);

// Home
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', user: req.session.user });
});

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Pagina non trovata', user: req.session.user });
});

app.listen(PORT, () => {
  console.log(`NutriWorld in ascolto su http://localhost:${PORT}`);
});

module.exports = app;
