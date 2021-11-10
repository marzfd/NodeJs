import express from 'express';

const app = express();
const port = 3000

// Body parser middleware
app.use(express.json());

// Index Route
app.get('/', (req, res) => {
  res.send('Hello from Backend to Frontend !')
})

// Weather Route
app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  res.send(`The weather in ${cityName} is sunny`);
})

// Start Server
app.listen(port, () =>
  console.log(`Server is running on port: ${port}`)
)