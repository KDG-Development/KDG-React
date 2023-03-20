import React from 'react'

const Loader = () => {
  return (
    <div
      className={ 'd-flex align-items-center justify-content-center flex-column my-3' }
      >
      <div
        className="spinner-border ms-auto"
        style={{marginRight:'auto'}}
        role="status"
        aria-hidden="true"></div>
    </div>
  )
}

export default Loader