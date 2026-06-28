import { useEffect, useState, useCallback } from 'react'
import ProgressCard from '../components/ProgressCard'
import LogForm from '../components/LogForm'

const TARGETS = { pushUps: 100, sitUps: 100, squats: 100, runKm: 10, planks: 5 }

const CARDS = [
  { key: 'pushUps', label: 'Push-ups', icon: '💪', unit: 'reps' },
  { key: 'sitUps', label: 'Sit-ups', icon: '🤸', unit: 'reps' },
  { key: 'squats', label: 'Squats', icon: '🦵', unit: 'reps' },
  { key: 'runKm', label: 'Running', icon: '🏃', unit: 'km' },
  { key: 'planks', label: 'Planks', icon: '🧘', unit: 'min' },
]

export default function Today() {
  const [log, setLog] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchToday = useCallback(async () => {
    try {
      const res = await fetch('/api/logs/today')
      const data = await res.json()
      setLog(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchToday() }, [fetchToday])

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const allDone = log && CARDS.every(({ key }) => log[key] >= TARGETS[key])

  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-400 text-sm">{today}</p>
        <h2 className="text-2xl font-bold mt-0.5">
          {allDone ? '🎉 All targets hit!' : "Today's Progress"}
        </h2>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CARDS.map(({ key, label, icon, unit }) => (
            <ProgressCard
              key={key}
              label={label}
              icon={icon}
              current={log ? (['runKm', 'planks'].includes(key) ? parseFloat(log[key].toFixed(1)) : log[key]) : 0}
              target={TARGETS[key]}
              unit={unit}
            />
          ))}
        </div>
      )}

      <LogForm onLogged={fetchToday} />
    </div>
  )
}
