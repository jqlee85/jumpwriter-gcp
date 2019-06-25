import React from 'react'
import './Button.scss'

const Button = (props) => {
  
  const {type,size,text,onClick,className,circle,status,itemID} = props

  let buttonClass = 'jw-button'
  if (className) buttonClass += ' ' + className
  if (size === 'large' ) buttonClass += ' large'
  else if (size === 'small' ) buttonClass += ' small'
  if (circle) buttonClass += ' circle-button'
  if (status === 'inactive') buttonClass += ' inactive'
  if (type === 'delete') buttonClass += 'delete-button'

  const onButtonClick = () => {
    if (onClick) onClick(itemID)
  }

  return (
    <button className={buttonClass} onClick={onButtonClick} dataitemid={itemID}>
      {text &&
        <span className="button-text">{text}</span>
      }
      <div className="button-icon">
        <svg 
          aria-hidden="true" 
          focusable="false" 
          className="save-icon" 
          role="img" 
          viewBox="0 0 448 512"
        >
          <path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"></path>
        </svg>
      </div>
    </button>
  )
}

export default Button
