const express = require('express')
const cors = require('cors')
require('dotenv').config()

require('./config/database')

const admissionRoutes = require('./routes/admissionRoutes')
const authRoutes = require('./routes/authRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const teacherRoutes = require('./routes/teacherRoutes')
const app = express()

app.use(cors())
app.use(express.json())


app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Royal Crest School API is running',
  })
})

app.use('/api/admissions', admissionRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/teachers', teacherRoutes)

module.exports = app