import express from 'express';
import fetch from 'node-fetch';
import exphbs from 'express-handlebars';
import keys from './sources/keys.js';

const app = express();

// Set the view engine to handlebars
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: false }));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Index/Home Route
app.get('/', (req, res) => {
  res.render('index')
})

// Weather Route
app.post('/weather', async (req, res) => {
  const cityName = req.body.cityName;

  if (cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${keys.API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const weather = {
      cityName,
      country: data.sys.country,
      temp: data.main.temp,
      description: data.weather[0].description,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      visibility: (data.visibility)/1000,
    }



    res.render('index', { weather });
  }
  else {
    res.render('index', { error: 'City not found !' });
  }
})


export default app;