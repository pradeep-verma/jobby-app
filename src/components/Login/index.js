import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  usernameInput = () => {
    const {username} = this.state

    return (
      <div className="login-input-container">
        <label htmlFor="username" className="login-label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsernameInput}
        />
      </div>
    )
  }

  passwordInput = () => {
    const {password} = this.state

    return (
      <div className="login-input-container">
        <label htmlFor="password" className="login-label">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={this.onChangePasswordInput}
        />
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-website-logo"
          />
          <form className="login-form" onSubmit={this.onSubmitForm}>
            {this.usernameInput()}
            {this.passwordInput()}
            <button type="submit" className="login-btn">
              Login
            </button>
            {errorMsg !== '' && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
