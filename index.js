window.onload = function () {
  function getWeather(latitude, longitude) {
    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`);
    document.getElementById("loading-message").style.display = "block";

    const apiKey = "15f3924c615083852ae4bd2e08e025ec";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("loading-message").style.display = "none";

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

        document.getElementById("city").textContent = data.name;
        document.getElementById("country").textContent = data.sys.country;
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
        
        if (data.name.toLowerCase() !== "Gorakhpur".toLowerCase()) {
          // Display a message to inform the user about the approximate location
          const approximateLocationMsg = `Weather information is based on the nearest available location (${data.name}, ${data.sys.country}). Actual location may vary.`;
          document.getElementById("approximate-location").textContent = approximateLocationMsg;
          document.getElementById("approximate-location").style.display = "block"; // Show the element
        } else {
          document.getElementById("approximate-location").style.display = "none"; // Hide the element if the location is accurate
        }
        
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("loading-message").style.display = "none";

      });
  }


  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          getWeather(latitude, longitude);
        },
        (error) => {
          console.error(error);
          // Fallback to a default location
          const defaultLatitude = 37.7749;
          const defaultLongitude = -122.4194;
  
          // Display an error message or take other appropriate action
          // You can show a message on the webpage or handle the error in a desired way
  
          // Call the getWeather() function with the default location
          getWeather(defaultLatitude, defaultLongitude);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Fallback to a default location
      const defaultLatitude = 37.7749;
      const defaultLongitude = -122.4194;
  
      // Display an error message or take other appropriate action
      // You can show a message on the webpage or handle the error in a desired way
  
      // Call the getWeather() function with the default location
      getWeather(defaultLatitude, defaultLongitude);
    }
  }
  
  

  getLocation();
};




// window.onload = function() {
//   function getWeather(latitude, longitude) {
//     console.log(`Latitude: ${latitude}`);
//     console.log(`Longitude: ${longitude}`);
//     document.getElementById("loading-message").style.display = "block";

//     const apiKey = "15f3924c615083852ae4bd2e08e025ec";
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         document.getElementById("loading-message").style.display = "none";

//         console.log("Weather data:", data);
//         const location = `${data.name}, ${data.sys.country}`;
//         console.log("Location:", location);
//         const icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
//         console.log("Icon URL:", icon);
//         const temperature = `${Math.round(data.main.temp)}°C`;
//         console.log("Temperature:", temperature);
//         const description = data.weather[0].description;
//         console.log("Description:", description);
//         const minTemp = `${Math.round(data.main.temp_min)}°C`;
//         console.log("Min Temperature:", minTemp);
//         const maxTemp = `${Math.round(data.main.temp_max)}°C`;
//         console.log("Max Temperature:", maxTemp);
//         const windSpeed = `${data.wind.speed} m/s`;
//         console.log("Wind Speed:", windSpeed);
//         const humidity = `${data.main.humidity}%`;
//         console.log("Humidity:", humidity);

//         document.getElementById("city").textContent = data.name;
//         document.getElementById("country").textContent = data.sys.country;
//         document.getElementById("icon").innerHTML = `<img src="${icon}">`;
//         document.getElementById("temperature").textContent = temperature;
//         document.getElementById("description").textContent = description;

//         document.getElementById("min-temp").textContent = `Min Temp: ${minTemp}`;
//         document.getElementById("max-temp").textContent = `Max Temp: ${maxTemp}`;
//         document.getElementById("wind-speed").textContent = `Wind Speed: ${windSpeed} `;
//         document.getElementById("humidity").textContent = `Humidity: ${humidity}`;

//         const nearestCity = findNearestCity(latitude, longitude);
//         if (nearestCity && nearestCity.toLowerCase() !== data.name.toLowerCase()) {
//           // Display a message to inform the user about the approximate location
//           const approximateLocationMsg = `Weather information is based on the nearest available location (${nearestCity}, ${data.sys.country}). Actual location may vary.`;
//           document.getElementById("approximate-location").textContent = approximateLocationMsg;
//           document.getElementById("approximate-location").style.display = "block"; // Show the element
//         } else {
//           document.getElementById("approximate-location").style.display = "none"; // Hide the element if the location is accurate
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         document.getElementById("loading-message").style.display = "none";
//       });
//   }

//   function findNearestCity(latitude, longitude) {
//     // Implement your logic to find the nearest city based on latitude and longitude
//     // You can use external APIs or databases to retrieve the nearest city information
//     // Here, you can return a hardcoded nearest city for demonstration purposes
//     // Replace this with your actual logic to find the nearest city dynamically
//     return "Gorakhpur";
//   }

//   function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
  
//           getNearestCity(latitude, longitude);
//         },
//         (error) => {
//           console.error(error);
//           // Fallback to a default location
//           const defaultLatitude = 37.7749;
//           const defaultLongitude = -122.4194;
  
//           // Display an error message or take other appropriate action
//           // You can show a message on the webpage or handle the error in a desired way
  
//           // Call the getWeather() function with the default location
//           getWeather(defaultLatitude, defaultLongitude);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//       // Fallback to a default location
//       const defaultLatitude = 37.7749;
//       const defaultLongitude = -122.4194;
  
//       // Display an error message or take other appropriate action
//       // You can show a message on the webpage or handle the error in a desired way
  
//       // Call the getWeather() function with the default location
//       getWeather(defaultLatitude, defaultLongitude);
//     }
//   }
  
//   function getNearestCity(latitude, longitude) {
//     // Use reverse geocoding to find the nearest city based on latitude and longitude
//     // Implement your code here to find the nearest city dynamically
//     // You can use external APIs or libraries that provide reverse geocoding services
//     // Once you have the nearest city, call the getWeather() function with its coordinates
  
//     const nearestCity = "Gorakhpur"; // Replace this with the actual nearest city
  
//     getWeather(latitude, longitude, nearestCity);
//   }
  
//   function getWeather(latitude, longitude, city) {
//     // Use the provided city or the nearest city to fetch weather information
//     // Implement your code here to fetch weather data for the given city
  
//     console.log(`Latitude: ${latitude}`);
//     console.log(`Longitude: ${longitude}`);
//     console.log(`City: ${city}`);
  
//     // Rest of the code to fetch weather data and update the UI
//     // ...
//   }
  
//   getLocation();
  