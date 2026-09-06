import { useState } from 'react'
import { Send, CheckCircle, ArrowLeft, UploadCloud } from 'lucide-react'
import { Link } from 'react-router-dom'

import Popup from '../components/Popup'

function Admissions() {

  const [passportPhoto, setPassportPhoto] = useState(null)

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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    otherName: '',
    dateOfBirth: '',
    gender: '',
    desiredClass: '',
    previousSchool: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    parentRelationship: '',
    address: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [applicationNumber, setApplicationNumber] = useState('')


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
  setSuccess(false)

  try {
    const submissionData = new FormData()

    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value)
    })

    if (passportPhoto) {
      submissionData.append('passportPhoto', passportPhoto)
    }

    console.log('Selected passport photo:', passportPhoto)
    console.log(
      'FormData passport photo:',
      submissionData.get('passportPhoto')
    )

    const response = await fetch(
      'http://localhost:5000/api/admissions/apply',
      {
        method: 'POST',
        body: submissionData,
      }
    )

    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || 'Unable to submit application.'
      )
    }

    setApplicationNumber(data.applicationNumber)
    setSuccess(true)

    setFormData({
      firstName: '',
      lastName: '',
      otherName: '',
      dateOfBirth: '',
      gender: '',
      desiredClass: '',
      previousSchool: '',
      parentName: '',
      parentPhone: '',
      parentEmail: '',
      parentRelationship: '',
      address: '',
    })

    setPassportPhoto(null)

  } catch (error) {
    console.error(
      'Application submission error:',
      error
    )

    showPopup(
      'error',
      'Application Failed',
      error.message
    )

  } finally {
    setLoading(false)
  }
}


  if (success) {

    return (
      <div className="admission-page">

        <div className="admission-success-card">

          <CheckCircle
            size={55}
            className="success-icon"
          />

          <span className="card-eyebrow">
            APPLICATION RECEIVED
          </span>

          <h1>
            Thank you for applying!
          </h1>

          <p>
            Your admission application has been
            successfully submitted to Royal Crest Academy.
          </p>

          <div className="application-number">

            <span>
              APPLICATION NUMBER
            </span>

            <strong>
              {applicationNumber}
            </strong>

          </div>

          <Link
            to="/"
            className="admission-back-button"
          >
            <ArrowLeft size={16} />
            Back to School Website
          </Link>

        </div>

      </div>
    )

  }


  return (
    <div className="admission-page">

      <div className="admission-container">

        <div className="admission-heading">

          <span className="dashboard-eyebrow">
            ROYAL CREST ACADEMY
          </span>

          <h1>
            Admission Application
          </h1>

          <p>
            Begin your child's journey with Royal Crest Academy.
            Please provide accurate information below.
          </p>

        </div>


        <form
          className="admission-form"
          onSubmit={handleSubmit}
        >

          {/* Student Information */}

          <section className="admission-form-section">

            <div className="form-section-heading">

              <span>
                01
              </span>

              <div>
                <h2>
                  Student Information
                </h2>

                <p>
                  Tell us about the student applying for admission.
                </p>
              </div>

            </div>


            <div className="form-grid">

              <label>
                First Name *
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </label>


              <label>
                Last Name *
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </label>


              <label>
                Other Name
                <input
                  type="text"
                  name="otherName"
                  value={formData.otherName}
                  onChange={handleChange}
                />
              </label>


              <label>
                Date of Birth *
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </label>


              <label>
                Gender *
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select gender
                  </option>

                  <option value="male">
                    Male
                  </option>

                  <option value="female">
                    Female
                  </option>
                </select>
              </label>


              <label>
                Desired Class *
                <select
                  name="desiredClass"
                  value={formData.desiredClass}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select class
                  </option>

                  <option value="Primary 1">
                    Primary 1
                  </option>

                  <option value="Primary 2">
                    Primary 2
                  </option>

                  <option value="Primary 3">
                    Primary 3
                  </option>

                  <option value="Primary 4">
                    Primary 4
                  </option>

                  <option value="Primary 5">
                    Primary 5
                  </option>

                  <option value="Primary 6">
                    Primary 6
                  </option>

                  <option value="JSS 1">
                    JSS 1
                  </option>

                  <option value="JSS 2">
                    JSS 2
                  </option>

                  <option value="JSS 3">
                    JSS 3
                  </option>

                  <option value="SS 1">
                    SS 1
                  </option>

                  <option value="SS 2">
                    SS 2
                  </option>

                  <option value="SS 3">
                    SS 3
                  </option>

                </select>
              </label>


              <label className="form-full">
                Previous School
                <input
                  type="text"
                  name="previousSchool"
                  value={formData.previousSchool}
                  onChange={handleChange}
                />
              </label>

            </div>

          </section>


          {/* Parent Information */}

          <section className="admission-form-section">

            <div className="form-section-heading">

              <span>
                02
              </span>

              <div>
                <h2>
                  Parent / Guardian
                </h2>

                <p>
                  Provide the primary contact information.
                </p>
              </div>

            </div>


            <div className="form-grid">

              <label>
                Parent / Guardian Name *
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                />
              </label>


              <label>
                Phone Number *
                <input
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  required
                />
              </label>


              <label>
                Email Address
                <input
                  type="email"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleChange}
                />
              </label>


              <label>
                Relationship *
                <select
                  name="parentRelationship"
                  value={formData.parentRelationship}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select relationship
                  </option>

                  <option value="Father">
                    Father
                  </option>

                  <option value="Mother">
                    Mother
                  </option>

                  <option value="Guardian">
                    Guardian
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </label>


              <label className="form-full">
                Address *
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </label>

            </div>

            <div className="form-group form-full">
  <label htmlFor="passportPhoto" className="admission-upload-label">
    Passport Photograph
  </label>

  <div
    className={`admission-upload-field ${passportPhoto ? 'has-file' : ''}`}
  >
    <label htmlFor="passportPhoto" className="admission-upload-trigger">
      <UploadCloud size={16} />
      <span>
        {passportPhoto ? passportPhoto.name : 'Upload passport photo'}
      </span>
    </label>

    <input
      id="passportPhoto"
      className="admission-file-input"
      type="file"
      name="passportPhoto"
      accept="image/jpeg,image/png,image/webp"
      onChange={(event) => {
        setPassportPhoto(
          event.target.files[0] || null
        )
      }}
    />
  </div>

  <small>
    JPG, PNG or WEBP · Maximum 2MB
  </small>
</div>

          </section>


          <div className="admission-submit-area">

            <p>
              By submitting this application, you confirm
              that the information provided is accurate.
            </p>

            <button
              type="submit"
              className="admission-submit-button"
              disabled={loading}
            >

              {loading ? (
                'Submitting Application...'
              ) : (
                <>
                  Submit Application
                  <Send size={16} />
                </>
              )}

            </button>

          </div>

        </form>

      </div>
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

export default Admissions