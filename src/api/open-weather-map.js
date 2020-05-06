import axios from 'axios';

// TODO replace the key with yours
const key = '26095c7a432f6299543a2a5d3eb2c8e4';
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${key}`;
const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=${key}`;

export function getWeatherGroup(code) {
    let group = 'na';
    if (200 <= code && code < 300) {
        group = 'thunderstorm';
    } else if (300 <= code && code < 400) {
        group = 'drizzle';
    } else if (500 <= code && code < 600) {
        group = 'rain';
    } else if (600 <= code && code < 700) {
        group = 'snow';
    } else if (700 <= code && code < 800) {
        group = 'atmosphere';
    } else if (800 === code) {
        group = 'clear';
    } else if (801 <= code && code < 900) {
        group = 'clouds';
    }
    return group;
}

export function capitalize(string) {
    return string.replace(/\b\w/g, l => l.toUpperCase());
}

let weatherSource = axios.CancelToken.source();

export function getWeather(city, unit) {
    var url = `${baseUrl}&q=${encodeURIComponent(city)}&units=${unit}`;

    console.log(`Making request to: ${url}`);

    return axios.get(url, {cancelToken: weatherSource.token}).then(function(res) {
        if (res.data.cod && res.data.message) {
            throw new Error(res.data.message);
        } else {
            return {
                city: capitalize(city),
                code: res.data.weather[0].id,
                group: getWeatherGroup(res.data.weather[0].id),
                description: res.data.weather[0].description,
                temp: res.data.main.temp,
                unit: unit // or 'imperial'
            };
        }
    }).catch(function(err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export function cancelWeather() {
    weatherSource.cancel('Request canceled');
}

let forecastSource = axios.CancelToken.source();

export function getForecast(city, unit) {
    // TODO
    var url = `${forecastUrl}&q=${encodeURIComponent(city)}&unit=${unit}`;
    console.log(`Making request to: ${url}`);

    return axios.get(url, {cancelToken: forecastSource.token}).then(function(res) {
        if (res.data.cod && res.data.message) {
            throw new Error(res.data.message);
            
        } else {
            return {
                city: capitalize(city),
                
                dtFirst: res.data.list[0].dt,
                codeFirst: res.data.list[0].weather[0].id,
                groupFirst: getWeatherGroup(res.data.list[0].weather[0].id),
                descriptionFirst: res.data.list[0].weather[0].description,
                tempFirst: res.data.list[0].main.temp,

                dtSecond: res.data.list[8].dt,
                codeSecond: res.data.list[8].weather[0].id,
                groupSecond: getWeatherGroup(res.data.list[8].weather[0].id),
                descriptionSecond: res.data.list[8].weather[0].description,
                tempSecond: res.data.list[8].main.temp,

                dtThird: res.data.list[15].dt,
                codeThird: res.data.list[15].weather[0].id,
                groupThird: getWeatherGroup(res.data.list[15].weather[0].id),
                descriptionThird: res.data.list[15].weather[0].description,
                tempThird: res.data.list[15].main.temp,

                dtFourth: res.data.list[23].dt,
                codeFourth: res.data.list[23].weather[0].id,
                groupFourth: getWeatherGroup(res.data.list[23].weather[0].id),
                descriptionFourth: res.data.list[23].weather[0].description,
                tempFourth: res.data.list[23].main.temp,

                dtFifth: res.data.list[31].dt,
                codeFifth: res.data.list[31].weather[0].id,
                groupFifth: getWeatherGroup(res.data.list[31].weather[0].id),
                descriptionFifth: res.data.list[31].weather[0].description,
                tempFifth: res.data.list[31].main.temp,
                unit: unit // or 'imperial'
                
            };
        }
    }).catch(function(err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export function cancelForecast() {
    // TODO
    forecastSource.cancel('Request canceled');
}
