const diaryModel = require('../models/diaryModel');

function showDiary(req, res) {
  const entries = diaryModel.getByUser(req.session.user.id);
  const totals = entries.reduce((acc, e) => {
    acc.calories += e.calories;
    acc.proteins += e.proteins;
    acc.carbs += e.carbs;
    acc.fats += e.fats;
    return acc;
  }, { calories: 0, proteins: 0, carbs: 0, fats: 0 });

  res.render('diary/index', { title: 'Il mio Diario', user: req.session.user, entries, totals });
}

function addEntry(req, res) {
  const { name, calories, proteins, carbs, fats } = req.body;
  diaryModel.addEntry(req.session.user.id, {
    name,
    calories: parseFloat(calories) || 0,
    proteins: parseFloat(proteins) || 0,
    carbs: parseFloat(carbs) || 0,
    fats: parseFloat(fats) || 0
  });
  res.redirect('/diary');
}

function deleteEntry(req, res) {
  diaryModel.deleteEntry(req.params.id, req.session.user.id);
  res.redirect('/diary');
}

module.exports = { showDiary, addEntry, deleteEntry };
