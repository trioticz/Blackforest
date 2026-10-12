const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const {
  getAllImages,
  getImageByKey,
  uploadWebsiteImage,
  updateImageDraft,
  publishImage,
  publishAllDrafts,
  discardDraft,
  restoreOriginal,
  createImage,
  deleteImage
} = require('../controllers/websiteImageController');

// Public read endpoints for dynamic frontend image loading
router.get('/', getAllImages);
router.get('/:key', getImageByKey);

// Protected admin management endpoints
router.post('/upload', protect, authorize('superadmin', 'admin', 'editor'), upload.single('file'), uploadWebsiteImage);
router.post('/publish-all', protect, authorize('superadmin', 'admin', 'editor'), publishAllDrafts);
router.patch('/:id', protect, authorize('superadmin', 'admin', 'editor'), updateImageDraft);
router.post('/:id/publish', protect, authorize('superadmin', 'admin', 'editor'), publishImage);
router.post('/:id/discard-draft', protect, authorize('superadmin', 'admin', 'editor'), discardDraft);
router.post('/:id/restore-original', protect, authorize('superadmin', 'admin', 'editor'), restoreOriginal);
router.post('/', protect, authorize('superadmin', 'admin', 'editor'), createImage);
router.delete('/:id', protect, authorize('superadmin', 'admin'), deleteImage);

module.exports = router;
