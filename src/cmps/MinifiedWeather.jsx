import React from 'react'
import { weatherService } from '../service/weatherService'

export function MinifiedWeather({dailyForecast,darkMode,isCelsius}) {
    
    const day = new Date(dailyForecast.EpochDate * 1000).toDateString()
    const scale = (isCelsius) ? 'C' : 'F'
    
    function getMinMaxTemperature() {
        const temp = dailyForecast.Temperature
        const minTemp = (isCelsius) ? temp.Minimum.Value : weatherService.convertCelsiusToFahrenheit(temp.Minimum.Value)
        const maxTemp = (isCelsius) ? temp.Maximum.Value : weatherService.convertCelsiusToFahrenheit(temp.Maximum.Value)
        return `${minTemp}${scale} - ${maxTemp}${scale}` 
    }


    return (
        <div className={'daily-forecast-day'}>
            <div className={`daily-forecast-bg ${(darkMode) ? 'dark' : 'light'}`} />
            <div className="daily-forecast-date">
                {day}
            </div>
            <div className="daily-forecast-temp">
                {getMinMaxTemperature()}
            </div>
            <div className="daily-forecast-icon">
                <img src={weatherService.getWeatherIcon(dailyForecast.Day.Icon)} alt="weather" />
            </div>
        </div>
    )
}
