import {
  CalendarDays,
  CookingPot,
  House,
  PackageOpen,
  Settings,
  ShoppingCart,
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const navigation = [
  { to: '/', label: 'Home', icon: House, end: true },
  { to: '/planner', label: 'Planner', icon: CalendarDays },
  { to: '/shopping', label: 'Shopping', icon: ShoppingCart },
  { to: '/pantry', label: 'Pantry', icon: PackageOpen },
  { to: '/recipes', label: 'Recipes', icon: CookingPot },
]

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <div>
          <p className="eyebrow">One less decision today</p>
          <h1>MealBridge SA</h1>
        </div>

        <NavLink
          aria-label="Settings"
          className="icon-button"
          to="/settings"
        >
          <Settings size={22} />
        </NavLink>
      </header>

      <main className="page-content">
        <Outlet />
      </main>

      <nav className="bottom-navigation" aria-label="Primary navigation">
        {navigation.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              isActive ? 'nav-item nav-item-active' : 'nav-item'
            }
          >
            <Icon size={21} strokeWidth={2.1} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
