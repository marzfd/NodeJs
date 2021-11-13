import express from 'express';
import fetch from 'node-fetch';
import keys from './sources/keys.js';

const app = express();

// Body parser middleware
app.use(express.json());

// Index Route
app.get('/', (req, res) => {
  res.send('Hello from Backend to Frontend !')
})

// Weather Route
app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}`;
  fetch(url)
  if (cityName) {
    fetch(url)
    .then(res => res.json())
    .then(data => res.send({
      cityName,
      temperature : data.main.temp
    }))
    .then(res.sendStatus(200))
    .catch(err =>res.send(err))
  }
  else {
    res.send('City is not found!')
  }
})

export default app;