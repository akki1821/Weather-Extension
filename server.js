const express = require('express');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(__dirname));

// Define API endpoint
app.get('/weather', (req, res) => {
  // Get latitude and longitude from the request query parameters
  const latitude = req.query.lat;
  const longitude = req.query.lon;

  // Make API request to fetch weather data
  const apiKey = "15f3924c615083852ae4bd2e08e025ec";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  // Dynamic import of node-fetch
  require('node-fetch').default(url)
    .then(response => response.json())
    .then(data => {
      // Process the weather data and send the response
      res.json(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
