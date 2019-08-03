const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2e46e9d140211b75ca47a160ab77d8b9/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const todayForecast = body.daily.data[0];
            const currentForecast =  body.currently;
            const currentTemperature = 'It is currently ' + currentForecast.temperature + ' degrees out.';
            const precipitationProbability = 'There is a ' + currentForecast.precipProbability + '% chance of rain.';

            callback(undefined, todayForecast.summary + ' ' + currentTemperature + ' ' + precipitationProbability);
        }
    });
};

module.exports = forecast;