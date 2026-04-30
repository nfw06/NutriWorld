const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/', requireAuth, diaryController.showDiary);
router.post('/add', requireAuth, diaryController.addEntry);
router.post('/delete/:id', requireAuth, diaryController.deleteEntry);

module.exports = router;
