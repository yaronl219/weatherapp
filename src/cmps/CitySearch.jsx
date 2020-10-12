import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import { connect } from 'react-redux'
import { weatherService } from '../service/weatherService'
import { setCurrCity } from '../store/actions/cityActions'

function _CitySearch(props) {

    const [searchField,setSearchField] = React.useState('')
    const [cities, setCities] = React.useState([])

    async function getCitiesByName(query) {
        const citiesForDisplay = await weatherService.getCityByName(query)
        if (!citiesForDisplay) return
        setCities(citiesForDisplay)
    }

    function onSelectCity(ev,cityName) {
        if (!cityName) return
        const city = cities.find(city => city.LocalizedName === cityName)
        props.setCurrCity(city)
    }

    function onChange(ev) {
        setSearchField(ev.target.value)
        getCitiesByName(ev.target.value)
    }

        return (
            <div className="search-container">
                <Autocomplete
                    onChange={onSelectCity}
                    style={{width:'100%', maxWidth: '768px'}}
                    options={cities.map((city) => city.LocalizedName)}
                    renderInput={(params) => (
                        <TextField {...params} value={searchField} onChange={onChange} label="Find city" style={{width: '100%'}} margin="normal" variant="outlined" />
                    )}
                />
            </div>
        )
    
}


const mapDispatchToProps = {
    setCurrCity
}

const mapStateToProps = state => {
    return {
        currCity: state.cityReducer.currCity,
        darkMode: state.userPrefsReducer.darkMode
    }
}

export const CitySearch = connect(mapStateToProps, mapDispatchToProps)(_CitySearch)
