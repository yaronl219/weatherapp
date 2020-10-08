const initialState = {
    favorites: []
}

export function favoriteReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_FAVORITES':
            return {
                ...state,
                favorites: action.favorites
            }
        default:
            return state
    }
}