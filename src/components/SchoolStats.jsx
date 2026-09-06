import { useEffect, useRef } from 'react'

function SchoolStats() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('stats-visible')
          observer.unobserve(section)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="container">

        <div className="stats-heading">
          <span className="section-label">
            THE ROYAL CREST DIFFERENCE
          </span>

          <h2>
            Numbers that tell
            <span>our story.</span>
          </h2>
        </div>

        <div className="stats-grid">

          <div className="school-stat">
            <strong>1,200<span>+</span></strong>
            <p>Students</p>
          </div>

          <div className="school-stat">
            <strong>25<span>+</span></strong>
            <p>Years of Excellence</p>
          </div>

          <div className="school-stat">
            <strong>98<span>%</span></strong>
            <p>University Success</p>
          </div>

          <div className="school-stat">
            <strong>15<span>:</span>1</strong>
            <p>Student–Teacher Ratio</p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default SchoolStats