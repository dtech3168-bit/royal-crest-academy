const express = require('express')

const {
  authenticate,
  authorize,
} = require('../middleware/authMiddleware')

const {
  getDashboardStats,
  getRecentAdmissions,
} = require('../controllers/dashboardController')

const router = express.Router()


router.get(
  '/principal',
  authenticate,
  authorize('principal'),
  (req, res) => {
    res.json({
      success: true,
      message: 'Welcome to the Principal Dashboard.',
      user: req.user,
    })
  }
)


router.get(
  '/stats',
  authenticate,
  authorize('principal'),
  getDashboardStats
)

router.get(
  '/recent-admissions',
  authenticate,
  authorize('principal'),
  getRecentAdmissions
)

module.exports = router