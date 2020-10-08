


const apiKeys = ['x6SNjBEgOiwSoE0Sm7AFRco0OWsPxKcT','jbQCGr5hw3CneCAiXlvKodc3ASLREpxy','17nM18URNW0l13ncG90uLIxINREYuwzk']

const API_KEY = apiKeys[0]

export const weatherService = {
    getCityCurrWeather,
    getCityByName,
    getWeatherForecast,
    getWeatherIcon,
    getCityByCoords,
    convertCelsiusToFahrenheit
}

async function getCityCurrWeather(locationKey) {

    const cityCurrWeather = await HTTPget(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`)
    
    return cityCurrWeather
}



async function getWeatherForecast(locationKey, isCelsius = true) {

    const cityForecast = await HTTPget(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=${isCelsius}`)
    return cityForecast
}

async function getCityByCoords(lat, lng) {

    const city = await HTTPget(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lng}`)
    return city
}


async function getCityByName(partialName) {
    try {


        const cities = await HTTPget(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${partialName}`)

        return cities

    } catch (err) {
        console.log(err)
    }
}

function convertCelsiusToFahrenheit(degrees) {
    return Math.round((degrees * (9/5) + 32) * 10) / 10
}

function getWeatherIcon(iconNum) {
    if (iconNum < 10) iconNum = '0' + iconNum
    return `https://developer.accuweather.com/sites/default/files/${iconNum}-s.png`
}

async function HTTPget(url) {
    let data;
    try {
        const res = await fetch(url)
        data = await res.json()
    } catch (err) {
        data = []
        console.log(err)
    }
    return data
}