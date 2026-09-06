const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../config/database')

async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      })
    }

    const [users] = await db.execute(
      `
      SELECT id, name, email, password, role
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [email]
    )

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    const user = users[0]

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '60s',
      }
    )

    return res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to login at this time.',
    })
  }
}

module.exports = {
  login,
}


async function refresh(req, res) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      })
    }

    const token = authHeader.split(' ')[1]

    // Verify signature but ignore expiration so we can issue a new token
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET, {
        ignoreExpiration: true,
      })
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.',
      })
    }

    // Ensure user still exists
    const [users] = await db.execute(
      `SELECT id, name, email, role FROM users WHERE id = ? LIMIT 1`,
      [decoded.id]
    )

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'User not found.',
      })
    }

    const user = users[0]

    const newToken = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '60s',
      }
    )

    return res.json({
      success: true,
      message: 'Token refreshed.',
      token: newToken,
    })
  } catch (error) {
    console.error('Refresh token error:', error)
    return res.status(500).json({
      success: false,
      message: 'Unable to refresh token.',
    })
  }
}

module.exports = {
  login,
  refresh,
}