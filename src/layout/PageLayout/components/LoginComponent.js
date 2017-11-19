/**
 * Created by swpmr on 11/19/2017.
 */
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import PropTypes from 'prop-types'
import { FlatButton, TextField } from 'material-ui'

class LoginComponent extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      open: false,
      username: '',
      password: '',
      errorText: ''
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleRequestLogin = this.handleRequestLogin.bind(this)
  }

  handleClickOpen = () => {
    this.setState({open: true})
  }

  handleRequestClose = () => {
    this.setState({open: false})
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
    const actions = [
      <RaisedButton onClick={this.handleRequestClose} secondary={true}>
        Cancel
      </RaisedButton>,
      <RaisedButton onClick={this.handleRequestLogin} primary={true}>
        Login
      </RaisedButton>
    ]
    return (
      <div>
        <RaisedButton onClick={this.handleClickOpen}>Login</RaisedButton>
        <Dialog open={this.state.open} title='Login' actions={actions} onRequestClose={this.handleRequestClose}>
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
          <br />
          <FlatButton label='Register' primary={true}/>
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
