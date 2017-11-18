import React from 'react'
import {IndexLink, Link} from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'
import AppBar from 'material-ui/AppBar'
import {FlatButton, IconButton} from 'material-ui'
import {NavigationClose} from 'material-ui/svg-icons/index'
import {Logged} from './components/Logged'
import DATA from '../../data'

class PageLayout extends React.Component {

  constructor() {
    super();
    this.state = {
      logged: false
    }
    this.changeLogged = this.changeLogged.bind(this);
  }

  changeLogged() {
    this.setState({
      logged: !this.state.logged
    })
  }

  getLinks() {
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

  render() {
    return (
      <div>
        <AppBar
          title={DATA[0].userName}
          conElementLeft={<IconButton><NavigationClose/></IconButton>}
          iconElementRight={this.state.logged ? <Logged logged={this.changeLogged}/> :
            <FlatButton onClick={this.changeLogged} label='Login'/>}
        />
        {this.state.logged ? this.getLinks() : null}
      </div>)
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
