function StatCard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <article className="dashboard-stat-card">

      <div className="stat-card-icon">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      <div className="stat-card-info">

        <span className="stat-card-title">
          {title}
        </span>

        <strong className="stat-card-value">
          {value}
        </strong>

        <span className="stat-card-description">
          {description}
        </span>

      </div>

      <div className="stat-card-arrow">
        ↗
      </div>

    </article>
  )
}

export default StatCard