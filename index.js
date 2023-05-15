window.onload = function () {
  function getWeather(latitude, longitude) {
    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`);
    const apiKey = "15f3924c615083852ae4bd2e08e025ec";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Weather data:", data);
        const location = `${data.name}, ${data.sys.country}`;
        console.log("Location:", location);
        const icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        console.log("Icon URL:", icon);
        const temperature = `${Math.round(data.main.temp)}°C`;
        console.log("Temperature:", temperature);
        const description = data.weather[0].description;
        console.log("Description:", description);
        const minTemp = `${Math.round(data.main.temp_min)}°C`;
        console.log("Min Temperature:", minTemp);
        const maxTemp = `${Math.round(data.main.temp_max)}°C`;
        console.log("Max Temperature:", maxTemp);
        const windSpeed = `${data.wind.speed} m/s`;
        console.log("Wind Speed:", windSpeed);
        const humidity = `${data.main.humidity}%`;
        console.log("Humidity:", humidity);

        document.getElementById("location").textContent = location;
        document.getElementById("icon").innerHTML = `<img src="${icon}">`;
        document.getElementById("temperature").textContent = temperature;
        document.getElementById("description").textContent = description;

        document.getElementById(
          "min-temp"
        ).textContent = `Min Temp: ${minTemp}`;
        document.getElementById(
          "max-temp"
        ).textContent = `Max Temp: ${maxTemp}`;
        document.getElementById(
          "wind-speed"
        ).textContent = `Wind Speed: ${windSpeed} `;
        document.getElementById(
          "humidity"
        ).textContent = `Humidity: ${humidity}`;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);

          getWeather(latitude, longitude);
        },
        (error) => {
          console.error(error);
          const defaultLatitude = 37.7749;
          const defaultLongitude = -122.4194;
          console.log("Using default location");
          getWeather(defaultLatitude, defaultLongitude);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  getLocation();
};