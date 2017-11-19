/**
 * Created by swpmr on 11/19/2017.
 */
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import PropTypes from 'prop-types'
import { FlatButton, TextField } from 'material-ui'

const customContentStyle = {
  width: '35%',
  maxWidth: 'none',
}

const buttonsStyle = {
  margin: 12,
}

class LoginComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      register: false,
      open: false,
      username: '',
      password: '',
      errorText: '',
      newUsername: '',
      newPassword: '',
      confirmPassword: ''
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleRequestLogin = this.handleRequestLogin.bind(this)
  }

  handleClickOpen = () => {
    this.setState({open: true})
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
      register: false
    })
  }

  requestLogin () {
    let user = this.props.users.filter(user => user.user === this.state.username)
    user[0] && user[0].password === this.state.password ? this.doLogin(user[0]) : this.setErrorMessage('Wrong username or password!')
  }

  doLogin (user) {
    this.props.logged()
    this.props.setLoggedUser(user)
    this.setState({open: false})
  }

  setErrorMessage (message) {
    this.setState({errorText: message})
  }

  handleRequestLogin = () => {
    this.state.username !== '' && this.state.password !== '' ? this.requestLogin() : this.setErrorMessage('Wrong username or password!')
  }

  handleChange = name => event => {
    this.setErrorMessage('')
    this.setState({
      [name]: event.target.value,
    })
  }

  render () {
    const actionLogin = [
      <FlatButton style={buttonsStyle} onClick={() => {this.setState({register: !this.state.register})}}
                  label='Register' primary/>,
      <RaisedButton style={buttonsStyle} onClick={this.handleRequestClose} secondary>
        Cancel
      </RaisedButton>,
      <RaisedButton style={buttonsStyle} onClick={this.handleRequestLogin} primary>
        Login
      </RaisedButton>
    ]
    const actionsRegister = [
      <RaisedButton style={buttonsStyle} onClick={this.handleRequestClose} secondary>
        Cancel
      </RaisedButton>,
      <RaisedButton style={buttonsStyle} primary>
        Register
      </RaisedButton>,
    ]
    const textFieldLogin = [
      <div>
        <TextField
          id='username'
          floatingLabelText='Username'
          errorText={this.state.errorText}
          value={this.state.username}
          onChange={this.handleChange('username')}
        /><br />
        <TextField
          id='password'
          floatingLabelText='Password'
          errorText={this.state.errorText}
          type='password'
          onChange={this.handleChange('password')}
        />
      </div>
    ]
    const textFieldRegister = [
      <div>
        <TextField
          id='username'
          floatingLabelText='New Username'
          errorText={this.state.errorText}
          value={this.state.username}
          onChange={this.handleChange('username')}
        /><br />
        <TextField
          id='password'
          floatingLabelText='New Password'
          errorText={this.state.errorText}
          type='password'
          onChange={this.handleChange('password')}
        />
        <TextField
          id='password'
          floatingLabelText='Confirm Password'
          errorText={this.state.errorText}
          type='password'
          onChange={this.handleChange('password')}
        />
      </div>
    ]
    return (
      <div>
        <RaisedButton onClick={this.handleClickOpen}>Login</RaisedButton>
        <Dialog open={this.state.open} title={this.state.register ? 'Register' : 'Login'}
                contentStyle={customContentStyle} actions={this.state.register ? actionsRegister : actionLogin}
                onRequestClose={this.handleRequestClose}>
          {this.state.register ? textFieldRegister : textFieldLogin}
          <br />
          <br />
        </Dialog>
      </div>
    )
  }
}

LoginComponent.propTypes = {
  logged: PropTypes.func,
  users: PropTypes.array,
  setLoggedUser: PropTypes.func,
  registerUser: PropTypes.func
}

export default LoginComponent
