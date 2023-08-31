import React from "react"

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null
  return (
    <div className='modal'>
      <div className='modal-content'>
        <span
          className='close'
          onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Modal
