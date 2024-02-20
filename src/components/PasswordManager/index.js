import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordManagerItems from '../PasswordManagerItems'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'yellow',
  'orange',
  'red',
  'emerald',
  'green',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    userInput: '',
    passwordInput: '',
    passwordsList: [],
    isTicked: false,
    searchInput: '',
  }

  onDeletePasswordItem = id => {
    const {passwordsList} = this.state
    const updatedPasswordsList = passwordsList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({passwordsList: updatedPasswordsList})
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onToggleIcon = () => {
    const {isTicked} = this.state
    this.setState({isTicked: !isTicked})
  }

  onAddButton = event => {
    event.preventDefault()

    const {websiteInput, userInput, passwordInput} = this.state

    const initialContainerBackgroundClassName = `${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newPasswordList = {
      id: uuidv4(),
      websiteInput,
      userInput,
      passwordInput,
      initialClassName: initialContainerBackgroundClassName,
      letter: websiteInput.slice(0, 1),
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordList],
      websiteInput: '',
      userInput: '',
      passwordInput: '',
    }))
  }

  render() {
    const {
      websiteInput,
      userInput,
      passwordInput,
      searchInput,
      passwordsList,
      isTicked,
    } = this.state

    const searchResult = passwordsList.filter(eachItem =>
      eachItem.websiteInput.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const count = searchResult.length
    let isListEmpty

    if (count === 0) {
      isListEmpty = true
    } else {
      isListEmpty = false
    }

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager"
          />
          <form className="form-element" onSubmit={this.onAddButton}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <div className="img-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                  alt="website"
                  className="img-icon"
                />
              </div>

              <input
                value={websiteInput}
                type="text"
                className="input-element"
                placeholder="Enter Website"
                onChange={this.onChangeWebsiteInput}
              />
            </div>
            <div className="input-container">
              <div className="img-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                  alt="username"
                  className="img-icon"
                />
              </div>
              <input
                value={userInput}
                type="text"
                className="input-element"
                placeholder="Enter Username"
                onChange={this.onChangeUserInput}
              />
            </div>
            <div className="input-container">
              <div className="img-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                  className="img-icon"
                />
              </div>
              <input
                value={passwordInput}
                type="password"
                className="input-element"
                placeholder="Enter Password"
                onChange={this.onChangePasswordInput}
              />
            </div>

            <br />
            <div className="btn-container">
              <button className="button" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="bottom-card-container">
          <div className="label-container">
            <div className="passwordsCount-container">
              <h1 className="yourPassword">Your Passwords</h1>
              <div className="style">
                <p>{count}</p>
              </div>
            </div>

            <div className="search-container">
              <div className="img-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                  alt="search"
                  className="img-icon"
                />
              </div>
              <input
                value={searchInput}
                type="search"
                className="input-element"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox-element"
              onChange={this.onToggleIcon}
              id="show"
            />
            {/*   <p className="showPasswords">Show passwords</p> */}
            <label htmlFor="show" className="showPasswords">
              Show passwords
            </label>
          </div>
          {isListEmpty && (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password"
              />
              <p className="no-password-style">No Passwords</p>
            </div>
          )}

          <ul className="unOrderListContainer">
            {searchResult.map(eachItem => (
              <PasswordManagerItems
                passwordDetails={eachItem}
                key={eachItem.id}
                onDeletePasswordItem={this.onDeletePasswordItem}
                isTicked={isTicked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default PasswordManager
