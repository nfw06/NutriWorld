const express = require('express');
const router = express.Router();
const globalController = require('../controllers/globalController');

router.get('/', globalController.showGlobal);
router.get('/:code', globalController.countryDetail);

module.exports = router;
