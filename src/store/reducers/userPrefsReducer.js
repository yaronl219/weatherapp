const initialState = {
    darkMode: false,
    isCelsius: true
}

export function userPrefsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_DEGREE_SCALE':
            return {
                ...state,
                isCelsius: action.isCelsius
            }
        case 'SET_DARK_MODE':
            return {
                ...state,
                darkMode: action.isDark
            }
        default:
            return state
    }
}