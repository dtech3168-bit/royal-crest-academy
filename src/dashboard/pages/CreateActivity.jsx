import { useState } from 'react'
import { ArrowLeft, CalendarDays, Clock, MapPin, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import Popup from '../../components/Popup'

function CreateActivity() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    activityDate: '',
    startTime: '',
    endTime: '',
    location: '',
  })

  const [loading, setLoading] = useState(false)

  const [popup, setPopup] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
  })

  function showPopup(type, title, message) {
    setPopup({
      isOpen: true,
      type,
      title,
      message,
    })
  }

  function closePopup() {
    setPopup((previous) => ({
      ...previous,
      isOpen: false,
    }))
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setLoading(true)

    try {
      const token = localStorage.getItem('token')

      const response = await fetch(
        'http://localhost:5000/api/activities',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Unable to create activity.'
        )
      }

      showPopup(
        'success',
        'Activity Created',
        'The school activity has been successfully scheduled.'
      )

      setFormData({
        title: '',
        description: '',
        activityDate: '',
        startTime: '',
        endTime: '',
        location: '',
      })

    } catch (error) {
      console.error('Create activity error:', error)

      showPopup(
        'error',
        'Creation Failed',
        error.message
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="activity-page">

      <div className="activity-page-header">

        <button
          type="button"
          className="activity-back-button"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

        <div>
          <span className="dashboard-eyebrow">
            SCHOOL MANAGEMENT
          </span>

          <h1>
            Create School Activity
          </h1>

          <p>
            Schedule an activity for the school calendar.
          </p>
        </div>

      </div>


      <form
        className="activity-form"
        onSubmit={handleSubmit}
      >

        <section className="activity-form-section">

          <div className="activity-section-heading">
            <span>01</span>

            <div>
              <h2>
                Activity Information
              </h2>

              <p>
                Provide the basic details of the activity.
              </p>
            </div>
          </div>


          <div className="activity-form-grid">

            <label className="activity-form-full">
              Activity Title *

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Morning Assembly"
                required
              />
            </label>


            <label className="activity-form-full">
              Description

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Briefly describe this activity..."
                rows="4"
              />
            </label>

          </div>

        </section>


        <section className="activity-form-section">

          <div className="activity-section-heading">
            <span>02</span>

            <div>
              <h2>
                Schedule
              </h2>

              <p>
                Choose when the activity will take place.
              </p>
            </div>
          </div>


          <div className="activity-form-grid">

            <label>
              <span className="activity-input-label">
                <CalendarDays size={15} />
                Activity Date *
              </span>

              <input
                type="date"
                name="activityDate"
                value={formData.activityDate}
                onChange={handleChange}
                required
              />
            </label>


            <label>
              <span className="activity-input-label">
                <Clock size={15} />
                Start Time *
              </span>

              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </label>


            <label>
              <span className="activity-input-label">
                <Clock size={15} />
                End Time
              </span>

              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
            </label>


            <label>
              <span className="activity-input-label">
                <MapPin size={15} />
                Location
              </span>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Main Courtyard"
              />
            </label>

          </div>

        </section>


        <div className="activity-form-actions">

          <button
            type="button"
            className="activity-cancel-button"
            onClick={() => navigate('/dashboard')}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="activity-submit-button"
            disabled={loading}
          >
            {loading ? (
              'Creating Activity...'
            ) : (
              <>
                Create Activity
                <Send size={16} />
              </>
            )}
          </button>

        </div>

      </form>


      <Popup
        isOpen={popup.isOpen}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        onClose={closePopup}
      />

    </div>
  )
}

export default CreateActivity