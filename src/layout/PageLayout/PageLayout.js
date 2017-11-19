import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'
import AppBar from 'material-ui/AppBar'
import { IconButton } from 'material-ui'
import { NavigationClose } from 'material-ui/svg-icons/index'
import { Logged } from './components/Logged'
import axios from 'axios'
import LoginComponent from './components/LoginComponent'

class PageLayout extends React.Component {

  constructor () {
    super()
    this.state = {
      logged: false,
      users: []
    }
    this.changeLogged = this.changeLogged.bind(this)
    this.loadUsers = this.loadUsers.bind(this)
    this.addUser = this.addUser.bind(this)
  }

  loadUsers () {
    axios.get('http://localhost:8888/api/users')
      .then(res => {
        this.setState({users: res.data})
      })
  }

  addUser (user) {
    axios.post('http://localhost:8888/api/users', user)
      .then(res => {
        this.setState({users: res})
      })
      .catch(err => {
        console.error(err)
      })
  }

  changeLogged () {
    this.setState({
      logged: !this.state.logged
    })
  }

  getLinks () {
    return (
      <div>
        <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
        {' · '}
        <Link to='/counter' activeClassName='page-layout__nav-item--active'>Counter</Link>
        <div className='page-layout__viewport'>
          {this.props.children}
        </div>
      </div>
    )
  }

  componentWillMount () {
    this.loadUsers()
  }

  getUserName() {
    let userName
    this.state.users.length > 0 ? userName = this.state.users[0].user : userName = ''
    return userName
  }

  render () {
    return (
      <div>
        <AppBar
          title={this.getUserName()}
          iconElementLeft={<IconButton><NavigationClose/></IconButton>}
          iconElementRight={this.state.logged ? <Logged logged={this.changeLogged}/> :
            <LoginComponent logged={this.changeLogged}/>}
        />
        {this.state.logged ? this.getLinks() : null}
      </div>)
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
