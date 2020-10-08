import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


function _Navbar() {

    return (
        <nav>
            <div className="navbar">
                <NavLink activeClassName="navlink-active" className="navlink" to="/city">
                    City View
                </NavLink>
                <NavLink activeClassName="navlink-active" className="navlink" to="/favorites">
                    Favorites
                </NavLink>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => ({
    darkMode: state.userPrefsReducer.darkMode,
    isCelsius: state.userPrefsReducer.isCelsius    
})


export const Navbar = connect(mapStateToProps)(_Navbar)