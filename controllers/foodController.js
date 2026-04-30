const openFoodService = require('../services/openFoodService');

async function showSearch(req, res) {
  res.render('food/search', { title: 'Cerca Alimento', user: req.session.user, foods: [], query: '' });
}

async function search(req, res) {
  const { q } = req.query;
  try {
    const foods = await openFoodService.searchFood(q);
    res.render('food/search', { title: 'Cerca Alimento', user: req.session.user, foods, query: q });
  } catch (err) {
    res.render('food/search', { title: 'Cerca Alimento', user: req.session.user, foods: [], query: q, error: 'Errore nella ricerca' });
  }
}

async function detail(req, res) {
  try {
    const food = await openFoodService.getFoodById(req.params.id);
    if (!food) return res.redirect('/food');
    res.render('food/detail', { title: food.name, user: req.session.user, food });
  } catch (err) {
    res.redirect('/food');
  }
}

module.exports = { showSearch, search, detail };
