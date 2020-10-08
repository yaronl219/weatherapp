export function setCelsius(isCelsius) {
    return dispatch => {
        dispatch({type:'SET_DEGREE_SCALE',isCelsius})
    }
}

export function setDarkMode(isDark) {
    return dispatch => {
        dispatch({type:'SET_DARK_MODE',isDark})
    }
}