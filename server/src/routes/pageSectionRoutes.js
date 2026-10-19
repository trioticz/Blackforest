const express = require('express');
const router = express.Router();
const pageSectionController = require('../controllers/pageSectionController');
const { protect } = require('../middleware/auth');

// Public & Preview section retrieval
router.get('/', pageSectionController.getAllSections);
router.get('/:idOrKey', pageSectionController.getSection);

// Admin-protected mutations
router.put('/:idOrKey/draft', protect, pageSectionController.saveDraft);
router.post('/:idOrKey/publish', protect, pageSectionController.publishSection);
router.post('/publish-all', protect, pageSectionController.publishAllDrafts);
router.post('/:idOrKey/discard-draft', protect, pageSectionController.discardDraft);
router.post('/:idOrKey/restore-original', protect, pageSectionController.restoreOriginal);
router.post('/reorder', protect, pageSectionController.reorderSections);
router.post('/:idOrKey/toggle-visibility', protect, pageSectionController.toggleVisibility);

module.exports = router;
