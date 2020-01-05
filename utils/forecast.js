const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const forcastUrl = 'https://api.darksky.net/forecast/2a9bbc4f02522914c1a1e0d0b5c7b002/' + longitude + ',' + latitude
    debugger
    request({url: forcastUrl, json:true },(error, { body })=>{
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ', It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')   
        }
    })
}

module.exports = forecast