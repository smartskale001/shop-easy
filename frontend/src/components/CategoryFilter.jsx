export default function CategoryFilter({ categories, active, onChange }) {
  const all = ['All', ...categories]
  return (
    <div className="flex flex-wrap gap-2">
      {all.map((category) => {
        const isActive = category === active
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={
              'rounded-full px-4 py-1.5 text-sm font-medium transition ' +
              (isActive
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-600 border border-slate-300 hover:border-indigo-400 hover:text-indigo-600')
            }
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
