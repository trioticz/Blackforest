const express = require('express');
const router = express.Router();
const {
  getStats,
  getAuditLogs
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/stats', protect, authorize('superadmin', 'admin', 'editor'), getStats);
router.get('/audit-logs', protect, authorize('superadmin', 'admin', 'editor'), getAuditLogs);

module.exports = router;
