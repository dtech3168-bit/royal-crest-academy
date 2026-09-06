import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Navbar from './components/Navbar'
import About from './components/About'
import Academics from './components/Academics'
import CampusLife from './components/CampusLife'
import SchoolStats from './components/SchoolStats'
import Admissions from './pages/Admissions'
import CreateActivity from './pages/CreateActivity'

import Login from './pages/Login'

import DashboardLayout from './dashboard/DashboardLayout'
import Dashboard from './dashboard/pages/Dashboard'

import './App.css'
import './Login.css'
import './apply.css'


function PublicHome() {
  return (
    <>
      <Navbar />

      <main>

        {/* =========================
            HERO
        ========================= */}

        <section className="hero">

          <div className="hero-background">
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2000&q=90"
              alt="Students at Royal Crest Academy"
            />
          </div>

          <div className="hero-overlay"></div>

          <div className="container hero-inner">

            <div className="hero-content">

              <span className="eyebrow">
                EST. 1998 · EXCELLENCE IN EDUCATION
              </span>

              <h1>
                Where Young Minds Become
                <span> Future Leaders.</span>
              </h1>

              <p>
                We nurture curious minds, build strong character, and inspire
                students to make a meaningful impact on the world around them.
              </p>

              <div className="hero-actions">

                <a
                  href="#about"
                  className="btn btn-primary"
                >
                  Explore Our School
                </a>

                <a
                  href="/admissions"
                  className="btn btn-light"
                >
                  Admissions
                </a>

              </div>

            </div>

            <div className="hero-stats">

              <div className="hero-stat">
                <strong>1,200+</strong>
                <span>Students</span>
              </div>

              <div className="stat-divider"></div>

              <div className="hero-stat">
                <strong>25+</strong>
                <span>Years of Excellence</span>
              </div>

            </div>

          </div>

          <div className="hero-scroll">
            <span>Scroll to explore</span>
            <div className="scroll-line"></div>
          </div>

        </section>


        {/* =========================
            HOME SECTIONS
        ========================= */}

        <About />

        <Academics />

        <CampusLife />

        <SchoolStats />

        <Admissions />

      </main>
    </>
  )
}


function App() {

  const [user, setUser] = useState(() => {

    const savedUser = localStorage.getItem('user')

    if (!savedUser) {
      return null
    }

    try {
      return JSON.parse(savedUser)
    } catch {
      localStorage.removeItem('user')
      return null
    }

  })


  function handleLogin(loginUser) {

    setUser(loginUser)

  }


  function handleLogout() {

    setUser(null)

    localStorage.removeItem('token')
    localStorage.removeItem('user')

  }


  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            PUBLIC WEBSITE
        ========================= */}

        <Route
          path="/"
          element={<PublicHome />}
        />


    <Route
      path="/admissions"
      element={<Admissions />}
    />

        {/* =========================
            LOGIN
        ========================= */}

        <Route
          path="/login"
          element={
            user ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Login
                onLogin={handleLogin}
              />
            )
          }
        />


        {/* =========================
            DASHBOARD
        ========================= */}

        <Route
          path="/dashboard/*"
          element={
            user ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <Routes>

                  <Route
                    index
                    element={
                      <Dashboard
                        user={user}
                      />
                    }
                  />

                </Routes>
              </DashboardLayout>
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />


        {/* =========================
            FALLBACK
        ========================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App