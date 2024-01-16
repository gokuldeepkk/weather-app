import express from "express";
import path from "path";
import hbs from 'hbs';
import { fileURLToPath } from "url";
import forecast from './utils/forecast.js';
import geocode from './utils/geocode.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
app.use(express.static(publicDirectory));
hbs.registerPartials(partialsDirectory);

//WEB PAGES
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        description: 'Forecast Made Easy'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page'
    })
});

//API
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address Needs to be sent'
        })
    }

    geocode(req.query.address.trim(), (err, {latitude, longitude} = {}) => {
        if(err) {
            return res.send({
                error: err
            });
        }
        forecast(latitude, longitude, (forecastErr, forecastData) => {
            if(forecastErr) {
                return res.send({
                    error: forecastErr
                });
            }
            res.send(forecastData);
        })
    })
});

//Not found Page Handling
app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: 'Help Article Page Not Found'
    })
});

app.get('*', (req, res) => {
    res.render('not-found', {
        title: '404 Error - Page Not Found'
    })
});

app.listen(4000, () => {
    console.log('Server running on Port 4000');
})