import { CircularProgress, IconButton } from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { weatherService } from '../service/weatherService'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { setFavorites } from '../store/actions/favoriteActions';
import { MinifiedWeather } from './MinifiedWeather';
import { setCurrCity } from '../store/actions/cityActions';

export function _MainWeather(props) {

    const [currWeather, setCurrWeather] = React.useState(null)
    const [weatherForecast, setWeatherForecast] = React.useState(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(setUserLocation)
    }, [])
    

    useEffect(() => {
        if (props.currCity) {
            getCityWeather()
            getWeatherForecast()
        }
    }, [props.currCity])


    async function setUserLocation(loc) {
        const {latitude,longitude} = loc.coords
        const city = await  weatherService.getCityByCoords(latitude,longitude)
        props.setCurrCity(city)
    }

    async function toggleFavoriteStatus(shouldAddFavorite) {
        let favorites = [...props.favorites];
        if (shouldAddFavorite) {
            favorites.push(props.currCity)
        } else {
            favorites = favorites.filter(city => city.Key !== props.currCity.Key)
        }
        props.setFavorites(favorites)
    }

    function getFavoriteIcon() {
        const isFavorite = Boolean(props.favorites.findIndex(city => city.Key === props.currCity.Key) >= 0)
        return (<IconButton onClick={() => toggleFavoriteStatus(!isFavorite)}>
                    { (isFavorite) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>)
    }

    function getCurrentDegrees(){
        if (!currWeather) return <CircularProgress />
        return (<React.Fragment>
            {(props.isCelsius) ? `${currWeather.Temperature.Metric.Value} C` : `${currWeather.Temperature.Imperial.Value} F`}
        </React.Fragment>)
    }

    async function getWeatherForecast() {
        const weatherForecast = await weatherService.getWeatherForecast(props.currCity.Key,props.isCelsius)
        setWeatherForecast(weatherForecast)
    }

    async function getCityWeather() {
        const currWeather = await weatherService.getCityCurrWeather(props.currCity.Key)
        setCurrWeather(currWeather[0])
    }

    function getIsDay() {
        if (!currWeather) return
        return (currWeather.IsDayTime) ? 'day-time' : 'night-time'
    }

    const { currCity } = props
    if (!currCity) return <React.Fragment />
        return (
            <main className={`weather-container ${getIsDay()}`}>
                <div className="weather-top">
                    <div className="city-details">
                        <div className="city-name">{currCity.LocalizedName}, {currCity.Country.LocalizedName}</div>
                        <div className="city-degrees">{getCurrentDegrees()}</div>
                    </div>
                    <div className="favorite-container">
                        {getFavoriteIcon()}
                    </div>
                </div>
                    <div className="weather-main">
                    {(currWeather) ? (<React.Fragment>
                        <img src={weatherService.getWeatherIcon(currWeather.WeatherIcon)} alt="weather-icon"/>
                    <h2>{currWeather.WeatherText}</h2>
                    </React.Fragment>
                    ) : <CircularProgress />
                    }
                </div>  
                <div className="weather-forecast">
                 {(weatherForecast) ? weatherForecast.DailyForecasts.map(day => <MinifiedWeather key={day.EpochDate} darkMode={props.darkMode} isCelsius={props.isCelsius} dailyForecast={day} /> ) : <CircularProgress />}
                </div>
            </main>
        )
}

const mapStateToProps = state => {
    return {
        currCity: state.cityReducer.currCity,
        isCelsius: state.userPrefsReducer.isCelsius,
        favorites: state.favoriteReducer.favorites,
        darkMode: state.userPrefsReducer.darkMode
    }
}

const mapDispatchToProps = {
    setFavorites,
    setCurrCity
}

export const MainWeather = connect(mapStateToProps,mapDispatchToProps)(_MainWeather)