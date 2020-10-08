const { storageService } = require("./storageService");

export const favoriteService = {
    setFavorites,
    getFavorites
}

function setFavorites(favorites) {
    return new Promise(resolve => {
        storageService.saveToStorage('favorites', favorites)
        resolve(true)
    })
}

function getFavorites() {
    return new Promise(resolve => {
        let favorites = storageService.loadFromStorage('favorites')
        if (!favorites) favorites = []
        return resolve(favorites)
    })
}