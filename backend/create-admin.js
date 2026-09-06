const bcrypt = require('bcryptjs')
const db = require('./src/config/database')

async function createPrincipal() {
  try {
    const name = 'Royal Crest Principal'
    const email = 'principal@royalcrest.edu'
    const password = 'Admin@12345'
    const role = 'principal'

    const hashedPassword = await bcrypt.hash(password, 12)

    await db.execute(
      `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
      `,
      [name, email, hashedPassword, role]
    )

    console.log('Principal account created successfully.')
    console.log(`Email: ${email}`)
    console.log(`Password: ${password}`)

  } catch (error) {
    console.error('Failed to create principal:', error.message)
  } finally {
    await db.end()
  }
}

createPrincipal()