const express = require('express')

const {
  submitApplication,
} = require('../controllers/admissionController')

const {
  uploadStudentPhoto,
} = require('../middleware/uploadMiddleware')


const router = express.Router()


router.post(
  '/apply',
  uploadStudentPhoto.single('passportPhoto'),
  submitApplication
)


module.exports = router