import { useEffect, useState } from 'react'
import {
  Users,
  UserPlus,
  Search,
  ArrowLeft,
  GraduationCap,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './Teachers.css'

const API_URL = 'http://localhost:5000/api'

function Teachers() {
  const navigate = useNavigate()

  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    staffNumber: '',
    phone: '',
    qualification: '',
    specialization: '',
    employmentDate: '',
  })

  async function refreshToken(token) {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (!response.ok || !data.success || !data.token) {
      throw new Error('Session expired. Please sign in again.')
    }

    localStorage.setItem('token', data.token)
    return data.token
  }

  async function requestWithAuth(url, options = {}) {
    let token = localStorage.getItem('token')

    if (!token) {
      throw new Error('Session expired. Please sign in again.')
    }

    let response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 401) {
      token = await refreshToken(token)
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      })
    }

    return response
  }

  function handleAuthenticationError(error) {
    if (error.message === 'Session expired. Please sign in again.') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/login', { replace: true })
    }

    setMessage(error.message)
  }

  async function fetchTeachers() {
    try {
      const response = await requestWithAuth(`${API_URL}/teachers`)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to load teachers.')
      }

      setTeachers(data.teachers || [])
    } catch (error) {
      handleAuthenticationError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeachers()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const response = await requestWithAuth(`${API_URL}/teachers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Teacher registration failed.')
      }

      setMessage('Teacher registered successfully!')

      setForm({
        name: '',
        email: '',
        password: '',
        staffNumber: '',
        phone: '',
        qualification: '',
        specialization: '',
        employmentDate: '',
      })

      setShowForm(false)

      await fetchTeachers()
    } catch (error) {
      handleAuthenticationError(error)
    } finally {
      setSaving(false)
    }
  }

  const filteredTeachers = teachers.filter((teacher) => {
    const searchText = search.toLowerCase()

    return (
      teacher.name?.toLowerCase().includes(searchText) ||
      teacher.email?.toLowerCase().includes(searchText) ||
      teacher.staff_number?.toLowerCase().includes(searchText)
    )
  })

  return (
    <div className="teachers-page">

      <div className="teachers-page-header">
        <div>
          <span className="dashboard-eyebrow">
            STAFF MANAGEMENT
          </span>

          <h1>Teachers</h1>

          <p>Manage Royal Crest Academy teaching staff.</p>
        </div>

        <button
          type="button"
          className="teacher-primary-button"
          onClick={() => {
            setShowForm(!showForm)
            setMessage('')
          }}
        >
          <UserPlus size={18} />
          {showForm ? 'Close Form' : 'Add New Teacher'}
        </button>
      </div>

      {message && (
        <div className="teacher-message" role="status">
          {message}
        </div>
      )}

      <div className="teachers-summary-grid">
        <div className="teacher-summary-card">
          <div className="teacher-summary-icon">
            <Users size={22} />
          </div>

          <div>
            <span>Total Teachers</span>
            <strong>{loading ? '—' : teachers.length}</strong>
          </div>
        </div>

        <div className="teacher-summary-card">
          <div className="teacher-summary-icon">
            <GraduationCap size={22} />
          </div>

          <div>
            <span>Active Teachers</span>
            <strong>
              {loading
                ? '—'
                : teachers.filter(
                    (teacher) => teacher.employment_status === 'active'
                  ).length}
            </strong>
          </div>
        </div>
      </div>

      {showForm && (
        <section className="teacher-form-card">

          <div className="teacher-form-heading">
            <div>
              <span className="dashboard-eyebrow">
                NEW STAFF ACCOUNT
              </span>
              <h2>Register Teacher</h2>
              <p>Create a login account and professional profile.</p>
            </div>

            <button
              type="button"
              className="teacher-back-button"
              onClick={() => setShowForm(false)}
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="teacher-form-grid">

              <label>
                Full Name *
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. John Okafor"
                  required
                />
              </label>

              <label>
                Email Address *
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="teacher@example.com"
                  required
                />
              </label>

              <label>
                Temporary Password *
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                />
              </label>

              <label>
                Staff Number *
                <input
                  name="staffNumber"
                  value={form.staffNumber}
                  onChange={handleChange}
                  placeholder="RCA-TCH-001"
                  required
                />
              </label>

              <label>
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="080..."
                />
              </label>

              <label>
                Qualification
                <input
                  name="qualification"
                  value={form.qualification}
                  onChange={handleChange}
                  placeholder="e.g. B.Ed Mathematics"
                />
              </label>

              <label>
                Specialization
                <input
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  placeholder="e.g. Mathematics"
                />
              </label>

              <label>
                Employment Date
                <input
                  type="date"
                  name="employmentDate"
                  value={form.employmentDate}
                  onChange={handleChange}
                />
              </label>

            </div>

            <div className="teacher-form-actions">
              <button
                type="button"
                className="teacher-cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="teacher-primary-button"
                disabled={saving}
              >
                {saving ? 'Registering...' : 'Register Teacher'}
              </button>
            </div>

          </form>
        </section>
      )}

      <section className="teachers-table-card">

        <div className="teachers-table-heading">
          <div>
            <h2>Teaching Staff</h2>
            <p>Registered teachers and their details.</p>
          </div>

          <div className="teacher-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search teachers..."
            />
          </div>
        </div>

        {loading ? (
          <div className="teacher-table-empty">
            Loading teachers...
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="teacher-table-empty">
            {search
              ? 'No teachers match your search.'
              : 'No teachers registered yet. Add your first teacher.'}
          </div>
        ) : (
          <div className="teachers-table-scroll">
            <table className="teachers-table">
              <thead>
                <tr>
                  <th>TEACHER</th>
                  <th>STAFF NUMBER</th>
                  <th>PHONE</th>
                  <th>QUALIFICATION</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>
                      <div className="teacher-name-cell">
                        <div className="teacher-avatar">
                          {teacher.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <strong>{teacher.name}</strong>
                          <span>{teacher.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>{teacher.staff_number}</td>
                    <td>{teacher.phone || '—'}</td>
                    <td>{teacher.qualification || '—'}</td>

                    <td>
                      <span className={`teacher-status ${teacher.employment_status}`}>
                        {teacher.employment_status || 'active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </section>
    </div>
  )
}

export default Teachers