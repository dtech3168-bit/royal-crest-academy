import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

function DashboardLayout({ user, children, onLogout }) {
  return (
    <div className="dashboard-layout">

      <Sidebar
        user={user}
        onLogout={onLogout}
      />

      <div className="dashboard-main">

        <Topbar user={user} />

        <main className="dashboard-content">
          {children}
        </main>

      </div>

    </div>
  )
}

export default DashboardLayout