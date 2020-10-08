import { combineReducers } from 'redux';
import { favoriteReducer } from './favoritesReducer';
import { cityReducer } from './CityReducer'
import { userPrefsReducer} from './userPrefsReducer'

const rootReducer = combineReducers({
    favoriteReducer,
    cityReducer,
    userPrefsReducer
})

export default rootReducer;