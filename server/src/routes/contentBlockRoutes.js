const express = require('express');
const router = express.Router();
const contentBlockController = require('../controllers/contentBlockController');
const { protect } = require('../middleware/auth');

router.get('/', contentBlockController.getAllBlocks);
router.get('/:idOrKey', contentBlockController.getBlock);

router.put('/:idOrKey/draft', protect, contentBlockController.saveDraft);
router.post('/:idOrKey/publish', protect, contentBlockController.publishBlock);
router.post('/publish-all', protect, contentBlockController.publishAllDrafts);
router.post('/:idOrKey/discard-draft', protect, contentBlockController.discardDraft);

module.exports = router;
