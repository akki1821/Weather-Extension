// Server-side code
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS

app.use(express.static(__dirname));
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'interest-cohort=()');
  next();
});

app.get('/weather', (req, res) => {
  const { lat, lon } = req.query;
  
  const apiKey = process.env.apiKey; // Use "apiKey" instead of "APIKEY"
  console.log(apiKey);
  
  const url = `httpS://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log('Weather data:', data); // Add this line
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
