

export function setCurrCity(city) {
    return dispatch => {
        dispatch({type:'SET_CITY',city})
    }
}