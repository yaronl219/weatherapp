import { favoriteService } from "../../service/favoriteService"

export  function setFavorites(favorites) {
    return async dispatch => {
        await favoriteService.setFavorites(favorites)
        dispatch({type:'SET_FAVORITES',favorites})
    }
}

export function getFavoritesFromStorage() {
    return async dispatch => {
        const favorites = await favoriteService.getFavorites()
        dispatch({type:'SET_FAVORITES',favorites})
    }
}