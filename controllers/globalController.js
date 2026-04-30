const whoService = require('../services/whoService');

function showGlobal(req, res) {
  const countries = whoService.getAllCountries();
  const stats = whoService.getGlobalStats();
  res.render('global/index', { title: 'Salute Globale', user: req.session.user, countries, stats });
}

function countryDetail(req, res) {
  const country = whoService.getCountryByCode(req.params.code);
  if (!country) return res.redirect('/global');
  res.render('global/detail', { title: country.country, user: req.session.user, country });
}

module.exports = { showGlobal, countryDetail };
