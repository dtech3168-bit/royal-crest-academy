import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react'


function Popup({
  isOpen,
  type = 'success',
  title,
  message,
  onClose,
}) {

  if (!isOpen) {
    return null
  }


  const popupIcons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  }


  const Icon = popupIcons[type] || Info


  return (
    <div
      className="popup-backdrop"
      onClick={onClose}
    >

      <div
        className={`popup popup-${type}`}
        onClick={(event) => event.stopPropagation()}
      >

        <button
          className="popup-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={17} />
        </button>


        <div className="popup-icon">
          <Icon size={25} />
        </div>


        <div className="popup-content">

          <h3>
            {title}
          </h3>

          <p>
            {message}
          </p>

        </div>


        <button
          className="popup-button"
          onClick={onClose}
        >
          Continue
        </button>

      </div>

    </div>
  )
}


export default Popup