const express = require('express')

const {
  createActivity,
  getTodayActivities,
} = require('../controllers/activityController')

const {
  authenticate,
  authorize,
} = require('../middleware/authMiddleware')

const router = express.Router()


router.post(
  '/',
  authenticate,
  authorize('principal'),
  createActivity
)


router.get(
  '/today',
  authenticate,
  getTodayActivities
)


module.exports = router