function CampusLife() {
  const activities = [
    {
      number: '01',
      title: 'Sports & Athletics',
      text: 'Building teamwork, discipline, confidence, and healthy competition beyond the classroom.',
      image:
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=85',
    },
    {
      number: '02',
      title: 'Technology & Innovation',
      text: 'Giving students the tools and mindset to create, experiment, and solve real-world problems.',
      image:
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=85',
    },
    {
      number: '03',
      title: 'Arts & Creativity',
      text: 'Encouraging students to express themselves through music, art, drama, and creative projects.',
      image:
        'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=85',
    },
  ]

  return (
    <section className="campus-section" id="campus">

      <div className="container">

        <div className="campus-heading">

          <div>
            <span className="section-label">
              CAMPUS LIFE
            </span>

            <h2>
              Life beyond
              <span>the classroom.</span>
            </h2>
          </div>

          <p>
            Education doesn't stop when the lesson ends. Our students
            discover their passions, build friendships, and develop
            confidence through experiences beyond academics.
          </p>

        </div>

        <div className="campus-feature">

          <div className="campus-feature-image">
            <img
              src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1800&q=90"
              alt="Students enjoying campus life"
            />

            <div className="campus-feature-overlay">
              <span>ROYAL CREST EXPERIENCE</span>

              <h3>
                Discover your
                <em> potential.</em>
              </h3>
            </div>
          </div>

        </div>

        <div className="campus-activities">

          {activities.map((activity) => (
            <article
              className="campus-card"
              key={activity.number}
            >

              <div className="campus-card-image">
                <img
                  src={activity.image}
                  alt={activity.title}
                />
              </div>

              <div className="campus-card-content">

                <span className="campus-number">
                  {activity.number}
                </span>

                <h3>
                  {activity.title}
                </h3>

                <p>
                  {activity.text}
                </p>

                <a href="#contact">
                  Discover more
                  <span>↗</span>
                </a>

              </div>

            </article>
          ))}

        </div>

      </div>

    </section>
  )
}

export default CampusLife