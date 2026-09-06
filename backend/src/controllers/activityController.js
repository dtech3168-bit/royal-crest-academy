const db = require('../config/database')

async function createActivity(req, res) {
  try {
    const {
      title,
      description,
      activityDate,
      startTime,
      endTime,
      location,
    } = req.body

    if (!title || !activityDate || !startTime) {
      return res.status(400).json({
        success: false,
        message: 'Title, date and start time are required.',
      })
    }

    const createdBy = req.user.id

    const sql = `
      INSERT INTO school_activities (
        title,
        description,
        activity_date,
        start_time,
        end_time,
        location,
        created_by
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    const values = [
      title.trim(),
      description?.trim() || null,
      activityDate,
      startTime,
      endTime || null,
      location?.trim() || null,
      createdBy,
    ]

    const [result] = await db.execute(sql, values)

    return res.status(201).json({
      success: true,
      message: 'School activity created successfully.',
      activityId: result.insertId,
    })

  } catch (error) {
    console.error('Create activity error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to create school activity.',
    })
  }
}


async function getTodayActivities(req, res) {
  try {
    const sql = `
      SELECT
        id,
        title,
        description,
        activity_date,
        start_time,
        end_time,
        location,
        created_by,
        created_at
      FROM school_activities
      WHERE activity_date = CURDATE()
      ORDER BY start_time ASC
    `

    const [activities] = await db.execute(sql)

    return res.json({
      success: true,
      activities,
    })

  } catch (error) {
    console.error('Get today activities error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to load school activities.',
    })
  }
}


module.exports = {
  createActivity,
  getTodayActivities,
}