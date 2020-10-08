import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { Navbar } from './cmps/Navbar';
import { Favorites } from './pages/Favorites';
import { Weather } from './pages/Weather';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { UserPrefToggles } from './cmps/UserPrefToggles';
import { connect } from 'react-redux';
const logo = require('./assets/imgs/logo.svg')

function _App(props) {

  const [view, setView] = useState(0)
  const history = useHistory()
  const location = useLocation()
  
  useEffect(() => {
    const view = (location.pathname === '/favorites') ? 1 : 0
    setView(view)

  }, [location.pathname])

  const handleChange = (newValue) => {
    const path = (!newValue) ? 'city' : 'favorites'
    history.push(path)
  };

  const displayMode = (props.darkMode) ? 'dark' : 'light'

  return (
    <div className={`App ${displayMode}`}>
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
        <Navbar />
        <UserPrefToggles />
      </header>
      <SwipeableViews index={view} onSwitching={handleChange} enableMouseEvents={true} >
        
          <Weather />
          <Favorites />
        
      </SwipeableViews>
      <div className="bottom-navigation">
        <BottomNavigation className={displayMode} value={view} onChange={(event, newValue) => handleChange(newValue)}>
          <BottomNavigationAction className={displayMode} label="City View" icon={<WbSunnyIcon />} />
          <BottomNavigationAction className={displayMode} label="Favorites" icon={<FavoriteBorderIcon />} />
        </BottomNavigation>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
    darkMode: state.userPrefsReducer.darkMode
})

export const App = connect(mapStateToProps)(_App)
