import { useEffect, useRef } from 'react'

function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('about-visible')
          observer.unobserve(section)
        }
      },
      {
        threshold: 0.15,
      }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="about-section"
      id="about"
      ref={sectionRef}
    >
      <div className="container about-grid">

        <div className="about-image-wrapper about-reveal-image">
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85"
            alt="Students learning together"
          />

          <div className="about-experience">
            <strong>25+</strong>

            <span>
              Years of
              <br />
              Excellence
            </span>
          </div>
        </div>

        <div className="about-content about-reveal-content">

          <span className="section-label">
            WHO WE ARE
          </span>

          <h2>
            More than a school.
            <span>A place to become.</span>
          </h2>

          <p className="about-intro">
            At Royal Crest Academy, we believe education should do more
            than prepare students for examinations. It should prepare them
            for life.
          </p>

          <p>
            From the early years through secondary school, we provide a
            supportive environment where students are challenged to think
            independently, discover their strengths, and develop the
            confidence to lead.
          </p>

          <div className="about-values">

            <div className="about-value">
              <span>01</span>

              <div>
                <h3>Academic Excellence</h3>

                <p>
                  High standards, engaging teaching, and a culture of
                  continuous learning.
                </p>
              </div>
            </div>

            <div className="about-value">
              <span>02</span>

              <div>
                <h3>Character & Leadership</h3>

                <p>
                  We develop responsible, confident students prepared to
                  make a difference.
                </p>
              </div>
            </div>

            <div className="about-value">
              <span>03</span>

              <div>
                <h3>Beyond the Classroom</h3>

                <p>
                  Sports, creativity, technology, and community help students
                  discover who they can become.
                </p>
              </div>
            </div>

          </div>

          <a href="#academics" className="about-link">
            Discover Our Approach
            <span>→</span>
          </a>

        </div>

      </div>
    </section>
  )
}

export default About