




export const weatherService = {
    getCityCurrWeather,
    getCityByName,
    getWeatherForecast,
    getWeatherIcon,
    getCityByCoords,
    convertCelsiusToFahrenheit,
    getApiKey
}

var API_KEY = null

async function getCityCurrWeather(locationKey) {
    if (!API_KEY) getApiKey()
try {
    const cityCurrWeather = await _HTTPget(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`)
    return cityCurrWeather
} catch (err) {
    console.log(err)
    throw err
}
}



async function getWeatherForecast(locationKey, isCelsius = true) {
    if (!API_KEY) getApiKey()
    try {
    const cityForecast = await _HTTPget(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=${isCelsius}`)
    return cityForecast
} catch (err) {
    console.log(err)
    throw err
}
}

async function getCityByCoords(lat, lng) {
    if (!API_KEY) getApiKey()
    try {
        const city = await _HTTPget(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lng}`)
        return city
    } catch (err) {
        console.log(err)
        throw err
    }
}


async function getCityByName(partialName) {
    if (!API_KEY) getApiKey()
    try {
        const cities = await _HTTPget(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${partialName}`)
        return cities

    } catch (err) {
        console.log(err)
        throw err
    }
}

function convertCelsiusToFahrenheit(degrees) {
    return Math.round((degrees * (9 / 5) + 32) * 10) / 10
}

function getWeatherIcon(iconNum) {
    if (iconNum < 10) iconNum = '0' + iconNum
    return `https://developer.accuweather.com/sites/default/files/${iconNum}-s.png`
}

async function _HTTPget(url) {
    let data;
    const res = await fetch(url)
    data = await res.json()
    return data
}

async function getApiKey() {

    const apiKeys = ['x6SNjBEgOiwSoE0Sm7AFRco0OWsPxKcT', 'jbQCGr5hw3CneCAiXlvKodc3ASLREpxy', '17nM18URNW0l13ncG90uLIxINREYuwzk']
    for (let i = 0; i < apiKeys.length; i++) {
        try {
            await _HTTPget(`https://dataservice.accuweather.com/currentconditions/v1/215836?apikey=${apiKeys[i]}&details=true`)
            
            return API_KEY = apiKeys[i]
        } catch (err) {
            console.log(err)
        }
    }    
    console.log('no keys')
    return 'No keys available'
}