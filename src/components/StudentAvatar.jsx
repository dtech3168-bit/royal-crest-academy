import { useState } from 'react'
import { UserRound } from 'lucide-react'

function StudentAvatar({
  photo,
  gender,
  name,
  size = 'medium',
}) {
  const [imgError, setImgError] = useState(false)
  const normalizedGender = gender?.toLowerCase()

  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : '?'

  const getImageSrc = () => {
    if (!photo) return null
    if (photo.startsWith('http')) return photo
    const base = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    const cleaned = photo.replace(/^\/+/, '')
    return `${base}/${cleaned}`
  }

  const imgSrc = getImageSrc()

  // Debugging aid: log the computed image URL
  try {
    // eslint-disable-next-line no-console
    console.debug('StudentAvatar imgSrc:', imgSrc, 'photo:', photo)
  } catch (e) {
    // ignore
  }

  // 1. Passport photo (try to load; on error fall back)
  if (photo && !imgError) {
    return (
      <div className={`student-avatar student-avatar-${size}`}>
        <img
          src={imgSrc}
          alt={name || 'Student'}
          onError={(e) => {
            // eslint-disable-next-line no-console
            console.error('StudentAvatar image load error:', imgSrc, e?.nativeEvent?.type)
            setImgError(true)
          }}
        />
      </div>
    )
  }

  // 2. Initials fallback (prefer name abbreviation)
  if (name) {
    return (
      <div
        className={`student-avatar student-avatar-${size} avatar-initials`}
        aria-label={name}
      >
        {initials}
      </div>
    )
  }

  // 3. Male / female icon fallbacks
  if (normalizedGender === 'male') {
    return (
      <div
        className={`student-avatar student-avatar-${size} avatar-male`}
        aria-label={`${name || 'Student'} male avatar`}
      >
        <UserRound size={22} />
      </div>
    )
  }

  if (normalizedGender === 'female') {
    return (
      <div
        className={`student-avatar student-avatar-${size} avatar-female`}
        aria-label={`${name || 'Student'} female avatar`}
      >
        <UserRound size={22} />
      </div>
    )
  }

  // 4. Generic unknown fallback
  return (
    <div
      className={`student-avatar student-avatar-${size} avatar-initials`}
      aria-label={name || 'Student'}
    >
      {initials}
    </div>
  )
}

export default StudentAvatar