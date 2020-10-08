import { CircularProgress, Tooltip } from '@material-ui/core'
import { weatherService } from '../service/weatherService'
import FavoriteIcon from '@material-ui/icons/Favorite';

import React, { useEffect, useState } from 'react'


export function CityMinified({ city, onRemoveFavorite, isCelsius, darkMode, onSelectCity }) {

    const [currWeather, setCurrWeather] = useState(null)
    

    useEffect(() => {
        if (!currWeather) _setCurrWeather()

    }, [city])


    function getIsDay() {
        if (!currWeather) return
        return (currWeather.IsDayTime) ? 'day-time' : 'night-time'
    }

    function onUnfavorite(ev) {
        ev.stopPropagation()
        onRemoveFavorite(city.Key)
    }

    async function _setCurrWeather() {
        const cityCurrWeather = await weatherService.getCityCurrWeather(city.Key)
        setCurrWeather(cityCurrWeather[0])
    }

    function getWeatherInScale() {
        const { Metric, Imperial } = currWeather.Temperature
        return (isCelsius) ? `${Metric.Value}${Metric.Unit}` : `${Imperial.Value}${Imperial.Unit}`
    }
    
    return (

        <div onClick={() => onSelectCity(city)} className={`mini-city-container ${(darkMode) ? 'dark' : 'light'} ${getIsDay()}`} >
            <div className="unfavorite-container">
                <Tooltip title="Unfavorite city">
                        <FavoriteIcon onClick={onUnfavorite}/>
                </Tooltip>
            </div>
            <div className="mini-city-title">
                <h4>{city.LocalizedName}</h4>
                <h5>{city.Country.LocalizedName}</h5>
            </div>
            <div className="mini-city-weather">
                {(currWeather) ? (
                    <React.Fragment>
                        <div className="temp">{getWeatherInScale()}</div><div className="icon">
                            <img src={weatherService.getWeatherIcon(currWeather.WeatherIcon)} alt="weather-icon" />
                        </div>
                    </React.Fragment>)
                    : <CircularProgress />}
            </div>
        </div>
    )
}
