export default function ProgressCard({ label, icon, current, target, unit }) {
  const pct = Math.min(100, Math.round((current / target) * 100))

  const stage =
    pct >= 100 ? 'done' :
    pct >= 50  ? 'half' :
                 'low'

  const styles = {
    done: {
      card:   'border-green-500 bg-green-950',
      bar:    'bg-green-500',
      badge:  'text-green-400 bg-green-900',
      label:  'Done!',
    },
    half: {
      card:   'border-orange-500 bg-orange-950',
      bar:    'bg-orange-500',
      badge:  'text-orange-400 bg-orange-900',
      label:  'Halfway!',
    },
    low: {
      card:   'border-red-800 bg-red-950',
      bar:    'bg-red-500',
      badge:  null,
      label:  null,
    },
  }

  const s = styles[stage]

  return (
    <div className={`rounded-2xl p-5 border ${s.card}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <span className="font-semibold text-gray-200">{label}</span>
        </div>
        {s.badge && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.badge}`}>
            {s.label}
          </span>
        )}
      </div>

      <div className="flex items-end gap-1 mb-3">
        <span className="text-3xl font-bold text-white">{current}</span>
        <span className="text-gray-400 text-sm mb-1">/ {target} {unit}</span>
      </div>

      <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${s.bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-right text-xs text-gray-500 mt-1">{pct}%</p>
    </div>
  )
}
