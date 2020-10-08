import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { CityMinified } from '../cmps/CityMinified';
import { EmptyState } from '../cmps/EmptyState';
import { setCurrCity } from '../store/actions/cityActions';
import { getFavoritesFromStorage, setFavorites } from '../store/actions/favoriteActions';

function _Favorites(props) {


    const history = useHistory()

    useEffect(() => {
        props.getFavoritesFromStorage()
    }, [])

    function onRemoveFavorite(locationKey) {
        let favorites = [...props.favorites];
        favorites = favorites.filter(city => city.Key !== locationKey)
        props.setFavorites(favorites)
    }

    function onSelectCity(city) {
        props.setCurrCity(city)
        history.push('/city')
    }

    return (
        <main className="favorites-section">
            {(props.favorites.length) ? (props.favorites.map(city => <CityMinified 
            key={city.Key} 
            isCelsius={props.isCelsius} 
            onRemoveFavorite={onRemoveFavorite} 
            darkMode={props.darkMode} 
            onSelectCity={onSelectCity} 
            city={city} />)) : <EmptyState />}
        </main>
    )
}

const mapStateToProps = state => {
    return {
        favorites: state.favoriteReducer.favorites,
        isCelsius: state.userPrefsReducer.isCelsius,
        darkMode: state.userPrefsReducer.darkMode
    }
}
const mapDispatchToProps = {
    setFavorites,
    setCurrCity,
    getFavoritesFromStorage
}
export const Favorites = connect(mapStateToProps, mapDispatchToProps)(_Favorites)