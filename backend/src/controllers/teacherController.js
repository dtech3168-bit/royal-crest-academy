const bcrypt = require('bcryptjs')
const db = require('../config/database')

// GET ALL TEACHERS
async function getTeachers(req, res) {
  try {
    const [teachers] = await db.execute(`
      SELECT
        u.id,
        u.name,
        u.email,
        u.created_at,
        tp.staff_number,
        tp.phone,
        tp.qualification,
        tp.specialization,
        tp.employment_date,
        tp.employment_status
      FROM users u
      INNER JOIN teacher_profiles tp
        ON tp.user_id = u.id
      WHERE u.role = 'teacher'
      ORDER BY u.created_at DESC
    `)

    return res.json({
      success: true,
      teachers,
      total: teachers.length,
    })
  } catch (error) {
    console.error('Get teachers error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to load teachers.',
    })
  }
}


// REGISTER A TEACHER
async function createTeacher(req, res) {
  const connection = await db.getConnection()

  try {
    const {
      name,
      email,
      password,
      staffNumber,
      phone,
      qualification,
      specialization,
      employmentDate,
    } = req.body

    // Required field validation
    if (
      !name?.trim() ||
      !email?.trim() ||
      !password ||
      !staffNumber?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, password and staff number are required.',
      })
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain at least 8 characters.',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const [existing] = await connection.execute(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [normalizedEmail]
    )

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await connection.beginTransaction()

    // Create login account
    const [userResult] = await connection.execute(
      `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, 'teacher')
      `,
      [
        name.trim(),
        normalizedEmail,
        hashedPassword,
      ]
    )

    const userId = userResult.insertId

    // Create teacher profile
    await connection.execute(
      `
      INSERT INTO teacher_profiles (
        user_id,
        staff_number,
        phone,
        qualification,
        specialization,
        employment_date
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        staffNumber.trim(),
        phone?.trim() || null,
        qualification?.trim() || null,
        specialization?.trim() || null,
        employmentDate || null,
      ]
    )

    await connection.commit()

    return res.status(201).json({
      success: true,
      message: 'Teacher registered successfully.',
      teacher: {
        id: userId,
        name: name.trim(),
        email: normalizedEmail,
        staff_number: staffNumber.trim(),
      },
    })

  } catch (error) {
    await connection.rollback()

    console.error('Create teacher error:', error)

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'This email or staff number is already registered.',
      })
    }

    return res.status(500).json({
      success: false,
      message: 'Unable to register teacher.',
    })

  } finally {
    connection.release()
  }
}

module.exports = {
  getTeachers,
  createTeacher,
}