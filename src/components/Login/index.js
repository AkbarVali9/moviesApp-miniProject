import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {BiShow, BiHide} from 'react-icons/bi'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value, showErrorMsg: false})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, showErrorMsg: false})
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userData = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <>
        <label className="label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          onChange={this.onChangeUsername}
          value={username}
          placeholder="Username"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password, showPassword} = this.state
    const inputType = showPassword ? 'text' : 'password'

    return (
      <>
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <div className="input-icons-container">
          <input
            type={inputType}
            id="password"
            className="input-field"
            onChange={this.onChangePassword}
            value={password}
            placeholder="Password"
          />
          <div className="icons-container">
            {showPassword ? (
              <BiHide
                size={32}
                style={{color: '#ffffff'}}
                onClick={this.onShowPassword}
                className="icon"
              />
            ) : (
              <BiShow
                size={32}
                style={{color: '#ffffff'}}
                onClick={this.onShowPassword}
                className="icon"
              />
            )}
          </div>
        </div>
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-bg-container">
        <div className="website-logo-image-container">
          <img
            src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1669787785/Movies%20App/Movies_Logo_nu3gsl.png"
            alt="login website logo"
            className="website-logo"
          />
        </div>
        <form className="login-form-container" onSubmit={this.submitForm}>
          <h1 className="login-title">Login</h1>
          {this.renderUsername()}
          {this.renderPassword()}
          {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
          <button type="submit" className="sign-in-btn">
            Sign in
          </button>
        </form>
      </div>
    )
  }
}

export default Login
