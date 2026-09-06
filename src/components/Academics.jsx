function Academics() {
  return (
    <section className="academics-section" id="academics">
      <div className="container">

        <div className="academics-heading">

          <div>
            <span className="section-label">
              ACADEMICS
            </span>

            <h2>
              Learning that prepares
              <span>students for tomorrow.</span>
            </h2>
          </div>

          <p>
            Our academic programme combines strong foundations with
            practical learning, critical thinking, creativity, and
            leadership development.
          </p>

        </div>

        <div className="academic-list">

          <article className="academic-item">
            <div className="academic-number">01</div>

            <div className="academic-main">
              <span className="academic-level">
                FOUNDATIONAL YEARS
              </span>

              <h3>Primary School</h3>

              <p>
                Building strong academic foundations while helping
                children develop confidence, curiosity, and a love
                for learning.
              </p>
            </div>

            <div className="academic-arrow">
              →
            </div>
          </article>

          <article className="academic-item">
            <div className="academic-number">02</div>

            <div className="academic-main">
              <span className="academic-level">
                GROWTH & DEVELOPMENT
              </span>

              <h3>Secondary School</h3>

              <p>
                Developing independent thinkers through rigorous
                academics, technology, leadership, and real-world
                experiences.
              </p>
            </div>

            <div className="academic-arrow">
              →
            </div>
          </article>

          <article className="academic-item">
            <div className="academic-number">03</div>

            <div className="academic-main">
              <span className="academic-level">
                FUTURE READY
              </span>

              <h3>Advanced Learning</h3>

              <p>
                Preparing students for university and future careers
                through deeper learning, research, innovation, and
                personal development.
              </p>
            </div>

            <div className="academic-arrow">
              →
            </div>
          </article>

        </div>

        <div className="academics-bottom">
          <span>
            Discover our curriculum
          </span>

          <a href="#admissions">
            View Academic Programmes
            <span>↗</span>
          </a>
        </div>

      </div>
    </section>
  )
}

export default Academics