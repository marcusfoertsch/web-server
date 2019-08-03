const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');

console.log(publicDirectoryPath);
app.use(express.static(publicDirectoryPath));

app.get('/weather', (req, res) => {
    const address = req.query.address;
    

    if(!address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({
                error: error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }

            return res.send({
                forecast: forecastData,
                location: location,
                address: address
            });
        })
    });

    
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);

    return res.send({
        products: []
    }); 
});

app.listen(3000, () => {
   console.log('Server is up on port 3000');
});