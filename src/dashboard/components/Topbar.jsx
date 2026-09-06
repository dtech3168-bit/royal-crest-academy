import {
  Search,
  Bell,
  ChevronDown,
} from 'lucide-react'

function Topbar({ user }) {
  const initials = user?.name
    ? user.name.trim().split(/\s+/).slice(0, 2).map(n => n[0]).join('').toUpperCase()
    : 'P'

  return (
    <header className="dashboard-topbar">

      <div className="dashboard-brand">

        <strong>
          Royal Crest
        </strong>

        <span>
          Academy
        </span>

      </div>


      <nav className="dashboard-top-nav">

        <a className="active" href="/dashboard">
          Dashboard
        </a>

        <a href="/dashboard/reports">
          Reports
        </a>

        <a href="/dashboard/documents">
          Documents
        </a>

        <a href="/dashboard/history">
          History
        </a>

      </nav>


      <div className="dashboard-top-actions">

        <button>
          <Search size={18} />
        </button>

        <button>
          <Bell size={18} />
        </button>

        <div className="dashboard-profile">

          <div className="dashboard-avatar">
            {initials}
          </div>

          <ChevronDown size={14} />

        </div>

      </div>

    </header>
  )
}

export default Topbar