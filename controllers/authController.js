const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

function showLogin(req, res) {
  res.render('auth/login', { title: 'Accedi', user: req.session.user, error: null });
}

function showRegister(req, res) {
  res.render('auth/register', { title: 'Registrati', user: req.session.user, error: null });
}

function login(req, res) {
  const { username, password } = req.body;
  const user = userModel.findByUsername(username);

  if (!user || !userModel.validatePassword(password, user.password)) {
    return res.render('auth/login', { title: 'Accedi', user: null, error: 'Credenziali non valide' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || 'nutriworld_secret_key_2025',
    { expiresIn: '24h' }
  );
  req.session.user = { id: user.id, username: user.username };
  req.session.token = token;

  res.redirect('/');
}

function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('auth/register', { title: 'Registrati', user: null, error: 'Compila tutti i campi' });
  }

  if (userModel.findByUsername(username)) {
    return res.render('auth/register', { title: 'Registrati', user: null, error: 'Username già in uso' });
  }

  userModel.create(username, password);
  res.redirect('/auth/login');
}

function logout(req, res) {
  req.session.destroy();
  res.redirect('/');
}

module.exports = { showLogin, showRegister, login, register, logout };
