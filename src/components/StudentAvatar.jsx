import { UserRound } from 'lucide-react'

function StudentAvatar({
  photo,
  gender,
  name,
  size = 'medium',
}) {
  const normalizedGender = gender?.toLowerCase()

  // 1. Real passport photo
  if (photo) {
    return (
      <div className={`student-avatar student-avatar-${size}`}>
        <img
          src={`http://localhost:5000/${photo}`}
          alt={name || 'Student'}
        />
      </div>
    )
  }

  // 2. Gender fallback
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

  // 3. Initials fallback
  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : '?'

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