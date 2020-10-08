import React from 'react'
import { CitySearch } from '../cmps/CitySearch'
import { MainWeather } from '../cmps/MainWeather'

export function Weather(props) {

    return (
        <main>
            <CitySearch />
            <MainWeather />
        </main>
    )
}

