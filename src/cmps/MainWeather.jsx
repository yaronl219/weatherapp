import { CircularProgress, IconButton } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { weatherService } from '../service/weatherService'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { setFavorites } from '../store/actions/favoriteActions';
import { MinifiedWeather } from './MinifiedWeather';
import { setCurrCity } from '../store/actions/cityActions';

export class _MainWeather extends Component {

    state = {
        currWeather: null,
        weatherForecast: null
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.setUserLocation)
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.currCity !== this.props.currCity) {
            this.getCityWeather()
            this.getWeatherForecast()
        }
    }

    setUserLocation = async(loc) => {
        const {latitude,longitude} = loc.coords
        const city = await  weatherService.getCityByCoords(latitude,longitude)
        this.props.setCurrCity(city)
    }


    toggleFavoriteStatus = (shouldAddFavorite) => {
        let favorites = [...this.props.favorites];
        if (shouldAddFavorite) {
            favorites.push(this.props.currCity)
        } else {
            favorites = favorites.filter(city => city.Key !== this.props.currCity.Key)
        }
        this.props.setFavorites(favorites)
    }

    getFavoriteIcon = () => {
        const isFavorite = Boolean(this.props.favorites.findIndex(city => city.Key === this.props.currCity.Key) >= 0)
        return (<IconButton onClick={() => this.toggleFavoriteStatus(!isFavorite)}>
                    { (isFavorite) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>)
    }

    getCurrentDegrees = () => {
        const currWeather = this.state.currWeather
        if (!currWeather) return <CircularProgress />

        return (<React.Fragment>
            {(this.props.isCelsius) ? `${currWeather.Temperature.Metric.Value} C` : `${currWeather.Temperature.Imperial.Value} F`}
        </React.Fragment>)
    }


    getWeatherForecast = async() => {
        const weatherForecast = await weatherService.getWeatherForecast(this.props.currCity.Key,this.props.isCelsius)
        console.log(weatherForecast)
        this.setState({weatherForecast})
    }

    getCityWeather = async () => {
        const currWeather = await weatherService.getCityCurrWeather(this.props.currCity.Key)
        this.setState({ currWeather:currWeather[0] })
    }

    getIsDay = () => {
        const {currWeather} = this.state
        if (!currWeather) return
        return (currWeather.IsDayTime) ? 'day-time' : 'night-time'
    }

    render() {
        const { currCity } = this.props
        if (!currCity) return <React.Fragment />
        return (
            <main className={`weather-container ${this.getIsDay()}`}>
                <div className="weather-top">
                    <div className="city-details">
                        <div className="city-name">{currCity.LocalizedName}, {currCity.Country.LocalizedName}</div>
                        <div className="city-degrees">{this.getCurrentDegrees()}</div>
                    </div>
                    <div className="favorite-container">
                        {this.getFavoriteIcon()}
                    </div>
                </div>
                
                    <div className="weather-main">
                    {(this.state.currWeather) ? (<React.Fragment>
                        <img src={weatherService.getWeatherIcon(this.state.currWeather.WeatherIcon)} alt="weather-icon"/>
                    <h2>{this.state.currWeather.WeatherText}</h2>
                    </React.Fragment>
                    ) : <CircularProgress />
                    }
                </div> 
                
                <div className="weather-forecast">
                 {(this.state.weatherForecast) ? this.state.weatherForecast.DailyForecasts.map(day => <MinifiedWeather key={day.EpochDate} darkMode={this.props.darkMode} isCelsius={this.props.isCelsius} dailyForecast={day} /> ) : <CircularProgress />}
                </div>
            </main>
        )
    }
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