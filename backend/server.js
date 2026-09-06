const express = require('express')
const path = require('path')

const app = require('./src/app')

const PORT = process.env.PORT || 5000


app.use(
  '/uploads',
  express.static(
    path.join(__dirname, '../uploads')
  )
)


app.listen(PORT, () => {
  console.log(
    `School API running on http://localhost:${PORT}`
  )
})