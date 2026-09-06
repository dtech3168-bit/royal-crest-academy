function StatCard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <div className="dashboard-stat-card">

      <div className="stat-card-top">

        <div className="stat-card-icon">
          <Icon size={20} />
        </div>

        <span className="stat-card-arrow">
          ↗
        </span>

      </div>

      <strong className="stat-card-value">
        {value}
      </strong>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

    </div>
  )
}

export default StatCard