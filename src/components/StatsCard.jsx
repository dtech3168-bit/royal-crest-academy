function StatCard({
  title,
  value,
  description,
  icon: Icon,
  onClick,
}) {
  return (
    <button
      type="button"
      className="dashboard-stat-card"
      onClick={onClick}
      disabled={!onClick}
    >
      <div className="stat-card-top">
        <div className="stat-card-icon">
          <Icon size={20} />
        </div>

        <span className="stat-card-arrow">↗</span>
      </div>

      <strong className="stat-card-value">
        {value}
      </strong>

      <h3>{title}</h3>

      <p>{description}</p>
    </button>
  )
}

export default StatCard