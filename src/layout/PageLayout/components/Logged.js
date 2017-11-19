import {IconButton, IconMenu, MenuItem} from 'material-ui';
import * as React from 'react';
import PropTypes from 'prop-types'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

export const Logged = (props) => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon/></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText='Refresh'/>
    <MenuItem primaryText='Help'/>
    <MenuItem onClick={props.logOut} primaryText='Sign out'/>
  </IconMenu>
)

Logged.propTypes = {
  logOut: PropTypes.func,
}
