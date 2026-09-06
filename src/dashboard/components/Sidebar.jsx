import {
  LayoutDashboard,
  Users,
  UserPlus,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  FileText,
  CreditCard,
  Settings,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

function Sidebar() {

  const navigation = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Students',
      path: '/dashboard/students',
      icon: Users,
    },
    {
      label: 'Admissions',
      path: '/dashboard/admissions',
      icon: UserPlus,
    },
    {
      label: 'Teachers',
      path: '/dashboard/teachers',
      icon: GraduationCap,
    },
    {
      label: 'Classes',
      path: '/dashboard/classes',
      icon: BookOpen,
    },
    {
      label: 'Attendance',
      path: '/dashboard/attendance',
      icon: ClipboardCheck,
    },
    {
      label: 'Results',
      path: '/dashboard/results',
      icon: FileText,
    },
    {
      label: 'Fees',
      path: '/dashboard/fees',
      icon: CreditCard,
    },
    {
      label: 'Settings',
      path: '/dashboard/settings',
      icon: Settings,
    },
  ]

  return (
    <aside className="dashboard-sidebar">

      <div className="dashboard-logo">
        RC
      </div>

      <nav className="dashboard-rail">

        {navigation.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={item.label}
              className={({ isActive }) =>
                isActive
                  ? 'dashboard-rail-link active'
                  : 'dashboard-rail-link'
              }
            >
              <Icon size={19} />
            </NavLink>
          )
        })}

      </nav>

      <button
        className="dashboard-settings"
        title="Settings"
      >
        <Settings size={19} />
      </button>

    </aside>
  )
}

export default Sidebar