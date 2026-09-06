const db = require('../config/database')

function generateApplicationNumber() {
  const year = new Date().getFullYear()
  const random = Math.floor(100000 + Math.random() * 900000)

  return `APP-${year}-${random}`
}

async function submitApplication(req, res) {
  console.log('Admission body:', req.body)

  try {
    const {
      firstName,
      lastName,
      otherName,
      dateOfBirth,
      gender,
      desiredClass,
      previousSchool,
      parentName,
      parentPhone,
      parentEmail,
      parentRelationship,
      address,
    } = req.body

    const passportPhoto = req.file
      ? `uploads/students/${req.file.filename}`
      : null

    // Basic validation
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !gender ||
      !desiredClass ||
      !parentName ||
      !parentPhone ||
      !parentRelationship ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields.',
      })
    }

    const applicationNumber = generateApplicationNumber()

    const sql = `
      INSERT INTO admission_applications (
        application_number,
        first_name,
        last_name,
        other_name,
        date_of_birth,
        gender,
        desired_class,
        previous_school,
        parent_name,
        parent_phone,
        parent_email,
        parent_relationship,
        address,
        passport_photo
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const values = [
      applicationNumber,
      firstName,
      lastName,
      otherName || null,
      dateOfBirth,
      gender,
      desiredClass,
      previousSchool || null,
      parentName,
      parentPhone,
      parentEmail || null,
      parentRelationship,
      address,
      passportPhoto,
    ]

    const [result] = await db.execute(sql, values)

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully.',
      applicationNumber,
      applicationId: result.insertId,
    })

  } catch (error) {
    console.error(
      'Admission application error:',
      error
    )

    return res.status(500).json({
      success: false,
      message: 'Unable to submit application at this time.',
    })
  }
}

module.exports = {
  submitApplication,
}