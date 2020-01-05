const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')

const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const staticAssetsPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(viewsPath))
app.use(express.static(staticAssetsPath));
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        placeholder: 'location',
        name: 'Search'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/*', (req, res) => {
    res.send('Under development... Try agin later...')
})

app.listen(3000)