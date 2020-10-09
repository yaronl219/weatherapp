
export const weatherService = {
    getCityCurrWeather,
    getCityByName,
    getWeatherForecast,
    getWeatherIcon,
    getCityByCoords,
    convertCelsiusToFahrenheit,
    getApiKey
}

var API_KEY = getApiKey()

async function getCityCurrWeather(locationKey) {
    const apiKey = await API_KEY
try {
    const cityCurrWeather = await _HTTPget(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`)
    return cityCurrWeather
} catch (err) {
    console.log(err)
    throw err
}
}

async function getWeatherForecast(locationKey, isCelsius = true) {
    const apiKey = await API_KEY
    
    try {
    const cityForecast = await _HTTPget(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&metric=${isCelsius}`)
    return cityForecast
} catch (err) {
    console.log(err)
    throw err
}
}

async function getCityByCoords(lat, lng) {
    const apiKey = await API_KEY
    
    try {
        const city = await _HTTPget(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lng}`)
        return city
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function getCityByName(partialName) {
    const apiKey = await API_KEY
    try {
        const cities = await _HTTPget(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${partialName}`)
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
    
    try {

        const res = await fetch(url)
        data = await res.json()
        return data
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function getApiKey() {
  
    // // I added this in order to bypass the 50 calls per day per API key.

    return new Promise(async (resolve,reject) => {
        const apiKeys = ['x6SNjBEgOiwSoE0Sm7AFRco0OWsPxKcT', 'jbQCGr5hw3CneCAiXlvKodc3ASLREpxy', '17nM18URNW0l13ncG90uLIxINREYuwzk']
        for (let i = 0; i < apiKeys.length; i++) {
            try {
                await _HTTPget(`https://dataservice.accuweather.com/currentconditions/v1/215836?apikey=${apiKeys[i]}&details=true`)
                resolve(apiKeys[i])
                return apiKeys[i]
            } catch (err) {
                console.log('API key not working - switching to next one')
            }
        }    
        console.log('no keys')
        reject()
        return 'No keys available'
    })
}