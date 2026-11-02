function StatCard({
  title,
  value,
  description,
  icon: Icon,
  onClick,
}) {
  return (
    <div
      className={`dashboard-stat-card ${onClick ? 'stat-card-clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(event) => {
        if (onClick && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          onClick()
        }
      }}
    >
      <div className="stat-card-top">
        <div className="stat-card-icon">
          <Icon size={20} />
        </div>

        <span className="stat-card-arrow">↗</span>
      </div>

      <strong className="stat-card-value">{value}</strong>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  )
}

export default StatCard