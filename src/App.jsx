import { Routes, Route, NavLink } from 'react-router-dom'
import Today from './pages/Today'
import History from './pages/History'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">Fitness Tracker</h1>
          <nav className="flex gap-4 text-sm font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'text-green-400' : 'text-gray-400 hover:text-white'
              }
            >
              Today
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? 'text-green-400' : 'text-gray-400 hover:text-white'
              }
            >
              History
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </div>
  )
}
