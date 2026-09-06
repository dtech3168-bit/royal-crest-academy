import { Menu, X } from 'lucide-react'
import { useState } from 'react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">

        <a href="/" className="brand">
          <span className="brand-mark">RC</span>

          <div className="brand-text">
            <strong>Royal Crest</strong>
            <span>Academy</span>
          </div>
        </a>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#academics" onClick={() => setMenuOpen(false)}>Academics</a>
          <a href="#admissions" onClick={() => setMenuOpen(false)}>Admissions</a>
          <a href="#campus" onClick={() => setMenuOpen(false)}>Campus Life</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

          <a
            href="/admissions"
            className="nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Apply Now
          </a>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

      </div>
    </header>
  )
}

export default Navbar