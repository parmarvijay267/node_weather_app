const request = require('request')

const geocode = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidmlqYXlwYXJtYXIiLCJhIjoiY2s0dGJoeXc4MGRiZTNrbWs3N2xjaHM4MiJ9.H4hwj7ctEGB6Mwjfp0IXag&limit=1'
    request({ url:geocodeUrl, json:true}, (error, { body }) => {
        if (error){
            callback('Unable to connect!', undefined)
        }
        else if (body.features.length === 0){
            callback('Invalid Address!', undefined)
        }
        else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode