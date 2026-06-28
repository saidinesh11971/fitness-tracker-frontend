import { useEffect, useState } from 'react'

const TARGETS = { pushUps: 100, sitUps: 100, squats: 100, runKm: 10, planks: 5 }

function Badge({ hit }) {
  return hit ? (
    <span className="text-xs font-semibold text-green-400 bg-green-900 px-2 py-0.5 rounded-full">✓</span>
  ) : (
    <span className="text-xs font-semibold text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">—</span>
  )
}

function Cell({ value, target, unit }) {
  const hit = value >= target
  return (
    <td className={`px-4 py-3 text-sm text-right ${hit ? 'text-green-400' : 'text-gray-300'}`}>
      {['km', 'min'].includes(unit) ? parseFloat(value.toFixed(1)) : value}
      <span className="text-gray-600 text-xs ml-1">/{target}</span>
    </td>
  )
}

export default function History() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/logs/history')
      .then(r => r.json())
      .then(data => { setLogs(data); setLoading(false) })
  }, [])

  if (loading) return <p className="text-gray-500 text-sm">Loading...</p>
  if (!logs.length) return <p className="text-gray-500 text-sm">No history yet. Log your first workout!</p>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">History</h2>
      <div className="overflow-x-auto rounded-2xl border border-gray-800">
        <table className="w-full text-left">
          <thead className="bg-gray-900 text-xs text-gray-400 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Push-ups</th>
              <th className="px-4 py-3 text-right">Sit-ups</th>
              <th className="px-4 py-3 text-right">Squats</th>
              <th className="px-4 py-3 text-right">Run</th>
              <th className="px-4 py-3 text-right">Planks</th>
              <th className="px-4 py-3 text-center">All Done</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-gray-950">
            {logs.map(log => {
              const allDone = log.pushUps >= TARGETS.pushUps && log.sitUps >= TARGETS.sitUps &&
                log.squats >= TARGETS.squats && log.runKm >= TARGETS.runKm && log.planks >= TARGETS.planks
              const dateLabel = new Date(log.date + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'short', month: 'short', day: 'numeric'
              })
              return (
                <tr key={log.id} className="hover:bg-gray-900 transition">
                  <td className="px-4 py-3 text-sm font-medium text-gray-200">{dateLabel}</td>
                  <Cell value={log.pushUps} target={TARGETS.pushUps} />
                  <Cell value={log.sitUps} target={TARGETS.sitUps} />
                  <Cell value={log.squats} target={TARGETS.squats} />
                  <Cell value={log.runKm} target={TARGETS.runKm} unit="km" />
                  <Cell value={log.planks} target={TARGETS.planks} unit="min" />
                  <td className="px-4 py-3 text-center"><Badge hit={allDone} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
