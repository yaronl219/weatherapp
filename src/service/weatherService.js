import Axios from "axios";


const API_KEY = 'jbQCGr5hw3CneCAiXlvKodc3ASLREpxy'

export const weatherService = {
    getCityCurrWeather,
    getCityByName,
    getWeatherForecast,
    getWeatherIcon,
    getCityByCoords,
    convertCelsiusToFahrenheit
}

async function getCityCurrWeather(locationKey) {
    // for development
    // const cityCurrWeather = {
    //     data: [
    //         {
    //             "LocalObservationDateTime": "2020-10-07T08:55:00-04:00",
    //             "EpochTime": 1602075300,
    //             "WeatherText": "Sunny",
    //             "WeatherIcon": 1,
    //             "HasPrecipitation": false,
    //             "PrecipitationType": null,
    //             "IsDayTime": true,
    //             "Temperature": {
    //                 "Metric": {
    //                     "Value": 21.1,
    //                     "Unit": "C",
    //                     "UnitType": 17
    //                 },
    //                 "Imperial": {
    //                     "Value": 70,
    //                     "Unit": "F",
    //                     "UnitType": 18
    //                 }
    //             },
    //             "MobileLink": "http://m.accuweather.com/en/ve/caracas/353020/current-weather/353020?lang=en-us",
    //             "Link": "http://www.accuweather.com/en/ve/caracas/353020/current-weather/353020?lang=en-us"
    //         }
    //     ]
    // }


    const cityCurrWeather = await Axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`)
    
    return cityCurrWeather.data

}



async function getWeatherForecast(locationKey, isCelsius = true) {
    // const cityForecast = {
    //     data: {
    //         "Headline": {
    //             "EffectiveDate": "2020-10-10T07:30:00-04:00",
    //             "EffectiveEpochDate": 1602329400,
    //             "Severity": 5,
    //             "Text": "A thunderstorm Saturday",
    //             "Category": "thunderstorm",
    //             "EndDate": "2020-10-10T19:30:00-04:00",
    //             "EndEpochDate": 1602372600,
    //             "MobileLink": "http://m.accuweather.com/en/ve/caracas/353020/extended-weather-forecast/353020?unit=c&lang=en-us",
    //             "Link": "http://www.accuweather.com/en/ve/caracas/353020/daily-weather-forecast/353020?unit=c&lang=en-us"
    //         },
    //         "DailyForecasts": [
    //             {
    //                 "Date": "2020-10-07T07:00:00-04:00",
    //                 "EpochDate": 1602068400,
    //                 "Temperature": {
    //                     "Minimum": {
    //                         "Value": 20.4,
    //                         "Unit": "C",
    //                         "UnitType": 17
    //                     },
    //                     "Maximum": {
    //                         "Value": 28.1,
    //                         "Unit": "C",
    //                         "UnitType": 17
    //                     }
    //                 },
    //                 "Day": {
    //                     "Icon": 17,
    //                     "IconPhrase": "Partly sunny w/ t-storms",
    //                     "HasPrecipitation": true,
    //                     "PrecipitationType": "Rain",
    //                     "PrecipitationIntensity": "Light"
    //                 },
    //                 "Night": {
    //                     "Icon": 42,
    //                     "IconPhrase": "Mostly cloudy w/ t-storms",
    //                     "HasPrecipitation": true,
    //                     "PrecipitationType": "Rain",
    //                     "PrecipitationIntensity": "Light"
    //                 },
    //                 "Sources": [
    //                     "AccuWeather"
    //                 ],
    //                 "MobileLink": "http://m.accuweather.com/en/ve/caracas/353020/daily-weather-forecast/353020?day=1&unit=c&lang=en-us",
    //                 "Link": "http://www.accuweather.com/en/ve/caracas/353020/daily-weather-forecast/353020?day=1&unit=c&lang=en-us"
    //             },
    //             {
    //                 "Date": "2020-10-08T07:00:00-04:00",
    //                 "EpochDate": 1602154800,
    //                 "Temperature": {
    //                     "Minimum": {
    //                         "Value": 19.3,
    //                         "Unit": "C",
    //                         "UnitType": 17
    //                     },
    //                     "Maximum": {
    //                         "Value": 28.7,
    //                         "Unit": "C",
    //                         "UnitType": 17
    //                     }
    //                 },
    //                 "Day": {
    //                     "Icon": 15,
    //                     "IconPhrase": "Thunderstorms",
    //                     "HasPrecipitation": true,
    //                     "PrecipitationType": "Rain",
    //                     "PrecipitationIntensity": "Light"
    //                 },
    //                 "Night": {
    //                     "Icon": 36,
    //                     "IconPhrase": "Intermittent clouds",
    //                     "HasPrecipitation": false
    //                 },
    //                 "Sources": [
    //                     "AccuWeather"
    //                 ],
    //                 "MobileLink": "http://m.accuweather.com/en/ve/caracas/353020/daily-weather-forecast/353020?day=2&unit=c&lang=en-us",
    //                 "Link": "http://www.accuweather.com/en/ve/caracas/353020/daily-weather-forecast/353020?day=2&unit=c&lang=en-us"
    //             },
    //             {
    //                 "Date": "2020-10-09T07:00:00-04:00",
    //                 "EpochDate": 1602241200,
    //                 "Temperature": {
    //                     "Minimum": {
    //                         "Value": 18.9,
    //                         "Unit": "C",
    //                         "UnitType": 17
    //                     },
    //                     "Maximum": {
    //                         "Value": 28.2,
    //                         "Unit": "C",
    //                         "UnitType": 17
    //                     }
    //                 },
    //                 "Day": {
    //                     "Icon": 4,
    //                     "IconPhrase": "Intermittent clouds",
    //                     "HasPrecipitation": true,
    //                     "PrecipitationType": "Rain",
    //                     "PrecipitationIntensity": "Light"
    //                 },
    //                 "Night": {
    //                     "Icon": 36,
    //                     "IconPhrase": "Intermittent clouds",
    //                     "HasPrecipitation": false
    //                 },
    //                 "Sources": [
    //                     "AccuWeather"
    //                 ],
    //                 "MobileLink": "http://m.accuweather.com/en/ve/caracas/353020/daily-weather-forecast/353020?day=3&unit=c&lang=en-us",
    //                 "Link": "http://www.accuweather.com/en/ve/caracas/353020/daily-weather-forecast/353020?day=3&unit=c&lang=en-us"
    //             },
    //             {
    //                 "Date": "2020-10-10T07:00:00-04:00",
    //                 "EpochDate": 1602327600,
    //                 "Temperature": {
    //                     "Minimum": {
    //                         "Value": 19,
    //                         "Unit": "C",
    //                         "UnitType": 17
    //                     },
    //                     "Maximum": {
    //                         "Value": 27.3,
    //                         "Unit": "C",
    //                         "UnitType": 17
    //                     }
    //                 },
    //                 "Day": {
    //                     "Icon": 4,
    //                     "IconPhrase": "Intermittent clouds",
    //                     "HasPrecipitation": true,
    //                     "PrecipitationType": "Rain",
    //                     "PrecipitationIntensity": "Moderate"
    //                 },
    //                 "Night": {
    //                     "Icon": 35,
    //                     "IconPhrase": "Partly cloudy",
    //                     "HasPrecipitation": false
    //                 },
    //                 "Sources": [
    //                     "AccuWeather"
    //                 ],
    //                 "MobileLink": "http://m.accuweather.com/en/ve/caracas/353020/daily-weather-forecast/353020?day=4&unit=c&lang=en-us",
    //                 "Link": "http://www.accuweather.com/en/ve/caracas/353020/daily-weather-forecast/353020?day=4&unit=c&lang=en-us"
    //             },
    //             {
    //                 "Date": "2020-10-11T07:00:00-04:00",
    //                 "EpochDate": 1602414000,
    //                 "Temperature": {
    //                     "Minimum": {
    //                         "Value": 19,
    //                         "Unit": "C",
    //                         "UnitType": 17
    //                     },
    //                     "Maximum": {
    //                         "Value": 27.9,
    //                         "Unit": "C",
    //                         "UnitType": 17
    //                     }
    //                 },
    //                 "Day": {
    //                     "Icon": 6,
    //                     "IconPhrase": "Mostly cloudy",
    //                     "HasPrecipitation": true,
    //                     "PrecipitationType": "Rain",
    //                     "PrecipitationIntensity": "Moderate"
    //                 },
    //                 "Night": {
    //                     "Icon": 35,
    //                     "IconPhrase": "Partly cloudy",
    //                     "HasPrecipitation": false
    //                 },
    //                 "Sources": [
    //                     "AccuWeather"
    //                 ],
    //                 "MobileLink": "http://m.accuweather.com/en/ve/caracas/353020/daily-weather-forecast/353020?day=5&unit=c&lang=en-us",
    //                 "Link": "http://www.accuweather.com/en/ve/caracas/353020/daily-weather-forecast/353020?day=5&unit=c&lang=en-us"
    //             }
    //         ]
    //     }
    // }


    const cityForecast = await Axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=${isCelsius}`)
    return cityForecast.data
}

async function getCityByCoords(lat, lng) {
// for development

// const city = {data: {
//     "Version": 1,
//     "Key": "1494045",
//     "Type": "City",
//     "Rank": 65,
//     "LocalizedName": "Ras el-Barr",
//     "EnglishName": "Ras el-Barr",
//     "PrimaryPostalCode": "",
//     "Region": {
//       "ID": "AFR",
//       "LocalizedName": "Africa",
//       "EnglishName": "Africa"
//     },
//     "Country": {
//       "ID": "EG",
//       "LocalizedName": "Egypt",
//       "EnglishName": "Egypt"
//     },
//     "AdministrativeArea": {
//       "ID": "DT",
//       "LocalizedName": "Damietta",
//       "EnglishName": "Damietta",
//       "Level": 1,
//       "LocalizedType": "Governorate",
//       "EnglishType": "Governorate",
//       "CountryID": "EG"
//     },
//     "TimeZone": {
//       "Code": "EET",
//       "Name": "Africa/Cairo",
//       "GmtOffset": 2,
//       "IsDaylightSaving": false,
//       "NextOffsetChange": null
//     },
//     "GeoPosition": {
//       "Latitude": 31.514,
//       "Longitude": 31.83,
//       "Elevation": {
//         "Metric": {
//           "Value": 6,
//           "Unit": "m",
//           "UnitType": 5
//         },
//         "Imperial": {
//           "Value": 19,
//           "Unit": "ft",
//           "UnitType": 0
//         }
//       }
//     },
//     "IsAlias": false,
//     "ParentCity": {
//       "Key": "127663",
//       "LocalizedName": "Izbat al Burj",
//       "EnglishName": "Izbat al Burj"
//     },
//     "SupplementalAdminAreas": [],
//     "DataSets": [
//       "AirQualityCurrentConditions",
//       "AirQualityForecasts"
//     ],
//     "Details": {
//       "Key": "1494045",
//       "StationCode": "EG0016",
//       "StationGmtOffset": 2,
//       "BandMap": "EG",
//       "Climo": "HEPS",
//       "LocalRadar": "",
//       "MediaRegion": null,
//       "Metar": "HEPS",
//       "NXMetro": "",
//       "NXState": "",
//       "Population": null,
//       "PrimaryWarningCountyCode": "",
//       "PrimaryWarningZoneCode": "",
//       "Satellite": "AFRN",
//       "Synoptic": "62332",
//       "MarineStation": "EGM004",
//       "MarineStationGMTOffset": 2,
//       "VideoCode": "",
//       "LocationStem": "eg/ras-el-barr/1494045",
//       "PartnerID": null,
//       "Sources": [
//         {
//           "DataType": "CurrentConditions",
//           "Source": "AccuWeather",
//           "SourceId": 1
//         },
//         {
//           "DataType": "DailyForecast",
//           "Source": "AccuWeather",
//           "SourceId": 1
//         },
//         {
//           "DataType": "HourlyForecast",
//           "Source": "AccuWeather",
//           "SourceId": 1
//         },
//         {
//           "DataType": "AirQualityCurrentConditions",
//           "Source": "Plume Labs",
//           "SourceId": 63
//         },
//         {
//           "DataType": "AirQualityForecasts",
//           "Source": "Plume Labs",
//           "SourceId": 63
//         }
//       ],
//       "CanonicalPostalCode": "",
//       "CanonicalLocationKey": "127663"
//     }
//   }}


    const city = await Axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lng}`)
    return city.data
}


async function getCityByName(partialName) {
    try {

        // for development purpose
        // const cities = {
        //     data:
        //         [{ "Version": 1, "Key": "2580066", "Type": "City", "Rank": 15, "LocalizedName": "Enshi Prefecture", "Country": { "ID": "CN", "LocalizedName": "China" }, "AdministrativeArea": { "ID": "HB", "LocalizedName": "Hubei" } }, { "Version": 1, "Key": "52478", "Type": "City", "Rank": 21, "LocalizedName": "Edmonton", "Country": { "ID": "CA", "LocalizedName": "Canada" }, "AdministrativeArea": { "ID": "AB", "LocalizedName": "Alberta" } }, { "Version": 1, "Key": "206937", "Type": "City", "Rank": 21, "LocalizedName": "Erbil", "Country": { "ID": "IQ", "LocalizedName": "Iraq" }, "AdministrativeArea": { "ID": "AR", "LocalizedName": "Erbil" } }, { "Version": 1, "Key": "59268", "Type": "City", "Rank": 23, "LocalizedName": "Ezhou", "Country": { "ID": "CN", "LocalizedName": "China" }, "AdministrativeArea": { "ID": "HB", "LocalizedName": "Hubei" } }, { "Version": 1, "Key": "233934", "Type": "City", "Rank": 25, "LocalizedName": "Ecatepec de Morelos", "Country": { "ID": "MX", "LocalizedName": "Mexico" }, "AdministrativeArea": { "ID": "MEX", "LocalizedName": "México" } }, { "Version": 1, "Key": "327336", "Type": "City", "Rank": 30, "LocalizedName": "Edinburgh", "Country": { "ID": "GB", "LocalizedName": "United Kingdom" }, "AdministrativeArea": { "ID": "EDH", "LocalizedName": "City of Edinburgh" } }, { "Version": 1, "Key": "252750", "Type": "City", "Rank": 31, "LocalizedName": "Enugu", "Country": { "ID": "NG", "LocalizedName": "Nigeria" }, "AdministrativeArea": { "ID": "EN", "LocalizedName": "Enugu" } }, { "Version": 1, "Key": "317798", "Type": "City", "Rank": 31, "LocalizedName": "Elazig", "Country": { "ID": "TR", "LocalizedName": "Turkey" }, "AdministrativeArea": { "ID": "23", "LocalizedName": "Elazığ" } }, { "Version": 1, "Key": "317825", "Type": "City", "Rank": 31, "LocalizedName": "Erzurum", "Country": { "ID": "TR", "LocalizedName": "Turkey" }, "AdministrativeArea": { "ID": "25", "LocalizedName": "Erzurum" } }, { "Version": 1, "Key": "317856", "Type": "City", "Rank": 31, "LocalizedName": "Eskisehir", "Country": { "ID": "TR", "LocalizedName": "Turkey" }, "AdministrativeArea": { "ID": "26", "LocalizedName": "Eskişehir" } }]
        // }


        const cities = await Axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${partialName}`)

        return cities.data

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

