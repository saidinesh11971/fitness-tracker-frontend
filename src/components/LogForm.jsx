import { useState } from 'react'

const FIELDS = [
  { key: 'pushUps', label: 'Push-ups', icon: '💪', placeholder: '0' },
  { key: 'sitUps', label: 'Sit-ups', icon: '🤸', placeholder: '0' },
  { key: 'squats', label: 'Squats', icon: '🦵', placeholder: '0' },
  { key: 'runKm', label: 'Run (km)', icon: '🏃', placeholder: '0.0', step: '0.1' },
  { key: 'planks', label: 'Planks (min)', icon: '🧘', placeholder: '0.0', step: '0.1' },
]

export default function LogForm({ onLogged }) {
  const [values, setValues] = useState({ pushUps: '', sitUps: '', squats: '', runKm: '', planks: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(key, val) {
    setValues(prev => ({ ...prev, [key]: val }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = {
      pushUps: Number(values.pushUps) || 0,
      sitUps: Number(values.sitUps) || 0,
      squats: Number(values.squats) || 0,
      runKm: Number(values.runKm) || 0,
      planks: Number(values.planks) || 0,
    }
    if (Object.values(payload).every(v => v === 0)) return

    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/logs/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to log')
      setValues({ pushUps: '', sitUps: '', squats: '', runKm: '', planks: '' })
      onLogged()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <h2 className="font-semibold text-gray-200 mb-4">Log Activity</h2>
      <div className="grid grid-cols-2 gap-3">
        {FIELDS.map(({ key, label, icon, placeholder, step }) => (
          <div key={key}>
            <label className="block text-xs text-gray-400 mb-1">{icon} {label}</label>
            <input
              type="number"
              min="0"
              step={step || '1'}
              placeholder={placeholder}
              value={values[key]}
              onChange={e => handleChange(key, e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
      </div>
      {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition"
      >
        {loading ? 'Saving...' : 'Add to Today'}
      </button>
    </form>
  )
}
