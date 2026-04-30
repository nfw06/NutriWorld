const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.get('/', foodController.showSearch);
router.get('/search', foodController.search);
router.get('/:id', foodController.detail);

module.exports = router;
