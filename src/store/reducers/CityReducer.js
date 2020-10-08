const initialState = {
    currCity: null
}

export function cityReducer(state = initialState, action) {
    
    switch (action.type) {
        case 'SET_CITY':
            return {
                ...state,
                currCity: action.city
            }
        default:
            return state
    }
}