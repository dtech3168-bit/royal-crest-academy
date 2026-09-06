const db = require('../config/database')

async function getDashboardStats(req, res) {
  try {
    const [
      [studentResult],
      [teacherResult],
      [classResult],
      [applicationResult],
    ] = await Promise.all([
      db.execute(`
        SELECT COUNT(*) AS total
        FROM students
        WHERE status = 'active'
      `),

      db.execute(`
        SELECT COUNT(*) AS total
        FROM users
        WHERE role = 'teacher'
      `),

      db.execute(`
        SELECT COUNT(*) AS total
        FROM classes
      `),

      db.execute(`
        SELECT COUNT(*) AS total
        FROM admission_applications
      `),
    ])

    res.json({
      success: true,
      stats: {
        students: studentResult[0].total,
        teachers: teacherResult[0].total,
        classes: classResult[0].total,
        applications: applicationResult[0].total,
      },
    })

  } catch (error) {
    console.error('Dashboard stats error:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to load dashboard statistics.',
    })
  }
}

async function getRecentAdmissions(req, res) {
  try {

    const [rows] = await db.execute(`
      SELECT
        id,
        application_number,

        passport_photo,

        CONCAT(
          first_name,
          ' ',
          COALESCE(CONCAT(other_name, ' '), ''),
          last_name
        ) AS applicant_name,

        gender,

        parent_email,
        desired_class,
        status,
        created_at

      FROM admission_applications

      ORDER BY created_at DESC

      LIMIT 5
    `)


    res.json({
      success: true,
      applications: rows,
    })

  } catch (error) {

    console.error(
      'Recent admissions error:',
      error
    )

    res.status(500).json({
      success: false,
      message: 'Unable to load recent admissions.',
    })

  }
}

module.exports = {
  getDashboardStats,
  getRecentAdmissions,
}