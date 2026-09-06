import { useEffect, useState } from 'react'


import {
  Users,
  GraduationCap,
  UserPlus,
  BookOpen,
  FileText,
} from 'lucide-react'

import StatCard from '../components/StatCard'

import StudentAvatar from '../../components/StudentAvatar'

function Dashboard({ user }) {

  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    applications: 0,
  })

  const [loading, setLoading] = useState(true)

  const [recentAdmissions, setRecentAdmissions] = useState([])
  const [admissionsLoading, setAdmissionsLoading] = useState(true)

  useEffect(() => {

  async function loadDashboard() {

    const token = localStorage.getItem('token')

    console.log('Dashboard token:', token)

    try {

      const [statsResponse, admissionsResponse] = await Promise.all([

        fetch(
          'http://localhost:5000/api/dashboard/stats',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),

        fetch(
          'http://localhost:5000/api/dashboard/recent-admissions',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),

      ])


      const statsData = await statsResponse.json()
      console.log('Dashboard stats:', statsData)
        const admissionsData = await admissionsResponse.json()


        if (!statsResponse.ok || !statsData.success) {
          throw new Error(
            statsData.message ||
            'Unable to load dashboard statistics.'
          )
        }


        if (!admissionsResponse.ok || !admissionsData.success) {
          throw new Error(
            admissionsData.message ||
            'Unable to load recent admissions.'
          )
        }


        setStats(statsData.stats)

        setRecentAdmissions(
          admissionsData.applications
        )


      } catch (error) {

        console.error(
          'Dashboard loading error:',
          error
        )

      } finally {

        setLoading(false)
        setAdmissionsLoading(false)

      }

    }


    loadDashboard()

  }, [])

    return (

    <div className="dashboard-page">

      {/* Header */}
      <div className="dashboard-page-header">

        <div>
          <span className="dashboard-eyebrow">
            PRINCIPAL DASHBOARD
          </span>

          <h1>
            Good morning, {user?.name?.split(' ')[0] || 'Principal'}
          </h1>

          <p>
            Here's an overview of Royal Crest Academy.
          </p>
        </div>

        <div className="dashboard-date">
          Today
        </div>

      </div>


      {/* Statistics */}
      <section className="dashboard-stats">

            <StatCard
      title="Students"
      value={loading ? '—' : stats.students}
      description="Active students"
      icon={Users}
    />

    <StatCard
      title="Teachers"
      value={loading ? '—' : stats.teachers}
      description="Teaching staff"
      icon={GraduationCap}
    />

    <StatCard
      title="Applications"
      value={loading ? '—' : stats.applications}
      description="Admission applications"
      icon={UserPlus}
    />

    <StatCard
  title="Classes"
  value={loading ? '—' : stats.classes}
  description="School classes"
  icon={BookOpen}
/>
      </section>


      <section className="dashboard-lower-grid">

  {/* Attendance */}
  <article className="dashboard-card attendance-card">

    <div className="dashboard-card-header">

      <div>
        <span className="card-eyebrow">
          ATTENDANCE
        </span>

        <h2>
          Attendance Overview
        </h2>

        <p>
          Average student attendance this week
        </p>
      </div>

      <button className="card-menu-button">
        •••
      </button>

    </div>


    <div className="attendance-summary">

      <strong>
        94.8%
      </strong>

      <span>
        +2.4% this week
      </span>

    </div>


    <div className="attendance-chart">

      <svg
        viewBox="0 0 700 220"
        preserveAspectRatio="none"
        role="img"
        aria-label="Weekly attendance chart"
      >

        {/* Grid lines */}

        <line
          x1="0"
          y1="35"
          x2="700"
          y2="35"
          className="chart-grid-line"
        />

        <line
          x1="0"
          y1="85"
          x2="700"
          y2="85"
          className="chart-grid-line"
        />

        <line
          x1="0"
          y1="135"
          x2="700"
          y2="135"
          className="chart-grid-line"
        />

        <line
          x1="0"
          y1="185"
          x2="700"
          y2="185"
          className="chart-grid-line"
        />


        {/* Area */}

        <path
          d="
            M 0 120
            C 80 105, 90 130, 150 95
            C 210 60, 240 100, 300 82
            C 360 65, 390 75, 450 48
            C 510 25, 550 60, 610 42
            C 650 30, 675 45, 700 25
            L 700 220
            L 0 220
            Z
          "
          className="chart-area"
        />


        {/* Main line */}

        <path
          d="
            M 0 120
            C 80 105, 90 130, 150 95
            C 210 60, 240 100, 300 82
            C 360 65, 390 75, 450 48
            C 510 25, 550 60, 610 42
            C 650 30, 675 45, 700 25
          "
          className="chart-line"
        />


        {/* Current point */}

        <circle
          cx="700"
          cy="25"
          r="5"
          className="chart-point"
        />

      </svg>

    </div>


    <div className="chart-labels">

      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>

    </div>

  </article>


  {/* Today's Activity */}

  <article className="dashboard-card activity-card">

    <div className="dashboard-card-header">

      <div>
        <span className="card-eyebrow">
          TODAY
        </span>

        <h2>
          School Activity
        </h2>

        <p>
          What's happening today
        </p>
      </div>

      <button className="card-menu-button">
        •••
      </button>

    </div>


    <div className="activity-list">

      <div className="activity-row">

        <span className="activity-time">
          08:00
        </span>

        <div className="activity-indicator"></div>

        <div className="activity-details">
          <strong>
            Morning Assembly
          </strong>

          <span>
            Main courtyard
          </span>
        </div>

      </div>


      <div className="activity-row">

        <span className="activity-time">
          10:30
        </span>

        <div className="activity-indicator"></div>

        <div className="activity-details">
          <strong>
            Parent Meeting
          </strong>

          <span>
            Administration block
          </span>
        </div>

      </div>


      <div className="activity-row">

        <span className="activity-time">
          12:00
        </span>

        <div className="activity-indicator"></div>

        <div className="activity-details">
          <strong>
            Lunch Break
          </strong>

          <span>
            School cafeteria
          </span>
        </div>

      </div>


      <div className="activity-row">

        <span className="activity-time">
          14:00
        </span>

        <div className="activity-indicator"></div>

        <div className="activity-details">
          <strong>
            Staff Meeting
          </strong>

          <span>
            Conference room
          </span>
        </div>

      </div>

    </div>


    <button className="activity-link">
      View full schedule →
    </button>

  </article>

</section>




{/* Quick Actions */}

<section className="quick-actions-section">

  <div className="quick-actions-heading">
    <div>
      <span className="card-eyebrow">
        QUICK ACCESS
      </span>

      <h2>
        Common Actions
      </h2>
    </div>
  </div>


  <div className="quick-actions-grid">

    <button className="quick-action-card">

      <div className="quick-action-icon">
        <UserPlus size={20} />
      </div>

      <div>
        <strong>
          Add Student
        </strong>

        <span>
          Register a new student
        </span>
      </div>

      <span className="quick-action-arrow">
        →
      </span>

    </button>


    <button className="quick-action-card">

      <div className="quick-action-icon">
        <GraduationCap size={20} />
      </div>

      <div>
        <strong>
          Add Teacher
        </strong>

        <span>
          Create a staff account
        </span>
      </div>

      <span className="quick-action-arrow">
        →
      </span>

    </button>


    <button className="quick-action-card">

      <div className="quick-action-icon">
        <BookOpen size={20} />
      </div>

      <div>
        <strong>
          Manage Classes
        </strong>

        <span>
          View school classes
        </span>
      </div>

      <span className="quick-action-arrow">
        →
      </span>

    </button>


    <button className="quick-action-card">

      <div className="quick-action-icon">
        <FileText size={20} />
      </div>

      <div>
        <strong>
          View Reports
        </strong>

        <span>
          School performance reports
        </span>
      </div>

      <span className="quick-action-arrow">
        →
      </span>

    </button>

  </div>

</section>



<section className="recent-admissions-card">

  <div className="dashboard-card-header">

    <div>
      <span className="card-eyebrow">
        ADMISSIONS
      </span>

      <h2>
        Recent Applications
      </h2>

      <p>
        Latest student admission requests
      </p>
    </div>

    <button className="view-all-button">
      View all →
    </button>

  </div>


  <div className="admissions-table">

    <div className="admissions-table-header">
      <span>STUDENT</span>
      <span>CLASS</span>
      <span>DATE</span>
      <span>STATUS</span>
    </div>


    {admissionsLoading ? (

  <div className="admissions-empty">
    Loading recent applications...
  </div>

) : recentAdmissions.length === 0 ? (

  <div className="admissions-empty">
    No admission applications yet.
  </div>

) : (

  recentAdmissions.map((application) => {

    const initials = application.applicant_name
      .split(' ')
      .map((name) => name.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase()


    return (

      <div
        className="admission-row"
        key={application.id}
      >

        <div className="student-info">

          <StudentAvatar
      photo={application.passport_photo}
      gender={application.gender}
      name={application.applicant_name}
      size="small"
    />

          <div>

            <strong>
              {application.applicant_name}
            </strong>

           <span>
              {application.parent_email || 'No email provided'}
          </span>

          </div>

        </div>


        <span>
          {application.desired_class}
        </span>


        <span>
          {new Date(
            application.created_at
          ).toLocaleDateString()}
        </span>


        <span
          className={`admission-status ${application.status}`}
        >
          {application.status}
        </span>

      </div>

    )

  })

)}
  </div>
</section>

    </div>
  )
}

export default Dashboard