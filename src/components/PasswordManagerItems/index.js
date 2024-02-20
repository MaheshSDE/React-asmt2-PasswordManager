import './index.css'

const PasswordManagerItems = props => {
  const {passwordDetails, onDeletePasswordItem, isTicked} = props
  const {
    id,
    websiteInput,
    userInput,
    passwordInput,
    initialClassName,
    letter,
  } = passwordDetails

  const onDelete = () => {
    onDeletePasswordItem(id)
  }

  return (
    <li className="list-item-container">
      <div className="result-container">
        <div className={initialClassName}>{letter}</div>
        <div className="input-details-container">
          <p className="website-name">{websiteInput}</p>
          <p className="user-name">{userInput}</p>
          {isTicked && <p className="user-name">{passwordInput}</p>}
          {!isTicked && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars-icon"
            />
          )}
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordManagerItems
