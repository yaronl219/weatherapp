import React, { useState } from 'react'
import { connect } from 'react-redux'
import MenuIcon from '@material-ui/icons/Menu';
import { FormControlLabel, FormGroup, IconButton, Menu, MenuItem, Switch, Tooltip } from '@material-ui/core';
import { setDarkMode, setCelsius } from '../store/actions/userPrefsActions'

function _UserPrefToggles(props) {
    const [isOpen, setOpen] = useState(false)
    const ref = React.useRef()

    return (
        <div className="user-pref-toggles">
            <Tooltip title="User Preferences">
                <IconButton ref={ref} onClick={() => setOpen(true)}>
                    <MenuIcon />
                </IconButton>
            </Tooltip>
            <Menu anchorEl={ref.current} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }} 
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={isOpen} onClose={() => setOpen(false)}>
                <FormGroup>
                    <MenuItem className="menu-item">
                        <span className="switch-off-state">Light Mode</span>
                        <FormControlLabel
                            control={<Switch checked={props.darkMode} onChange={(ev) => props.setDarkMode(ev.target.checked)} />}
                        />
                        <span>Dark Mode</span>
                    </MenuItem>
                    <MenuItem>
                        <span className="switch-off-state">Fahrenheit</span>
                        <FormControlLabel
                            control={<Switch checked={props.isCelsius} onChange={(ev) => props.setCelsius(ev.target.checked)} />}
                        />
                        <span>Celsius</span>
                    </MenuItem>
                </FormGroup>
            </Menu>
        </div>
    )
}


const mapStateToProps = (state) => ({
    darkMode: state.userPrefsReducer.darkMode,
    isCelsius: state.userPrefsReducer.isCelsius
})

const mapDispatchToProps = {
    setDarkMode,
    setCelsius

}


export const UserPrefToggles = connect(mapStateToProps, mapDispatchToProps)(_UserPrefToggles)