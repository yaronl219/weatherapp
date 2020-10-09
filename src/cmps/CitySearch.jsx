import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { weatherService } from '../service/weatherService'
import { setCurrCity } from '../store/actions/cityActions'


class _CitySearch extends Component {
    state = {
        searchField: '',
        cities: [],
        isCitiesListOpen: false
    }

    ref = React.createRef()

    getCitiesByName = async () => {
        const cities = await weatherService.getCityByName(this.state.searchField)
        if (!cities) return
        const isCitiesListOpen = Boolean(cities.length)
        this.setState({ cities, isCitiesListOpen })
    }

    onSelectCity = (ev,cityName) => {
        if (!cityName) return
        const city = this.state.cities.find(city => city.LocalizedName === cityName)
        this.props.setCurrCity(city)
        this.onCloseCitiesList()

    }

    onOpenCitiesList = () => {
        if (!this.state.cities || this.state.cities.length) return
        this.setState({ isCitiesListOpen: true })
    }

    onCloseCitiesList = () => {
        this.setState({ isCitiesListOpen: false })
    }

    onChange = (ev) => {
        this.setState({ searchField: ev.target.value }, this.getCitiesByName)
    }



    render() {
        return (
            <div className="search-container">
                <Autocomplete
                    onChange={this.onSelectCity}
                    style={{width:'100%', maxWidth: '768px'}}
                    options={this.state.cities.map((city) => city.LocalizedName)}
                    renderInput={(params) => (
                        <TextField {...params} value={this.state.searchField} onChange={this.onChange} label="Find city" style={{width: '100%'}} margin="normal" variant="outlined" />
                    )}
                />
            </div>
        )
    }
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
