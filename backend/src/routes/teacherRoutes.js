const express = require('express')

const {
  getTeachers,
  createTeacher,
} = require('../controllers/teacherController')

const {
  authenticate,
  authorize,
} = require('../middleware/authMiddleware')

const router = express.Router()

// Only principals can manage teaching staff.
router.get(
  '/',
  authenticate,
  authorize('principal'),
  getTeachers
)

router.post(
  '/',
  authenticate,
  authorize('principal'),
  createTeacher
)

module.exports = router