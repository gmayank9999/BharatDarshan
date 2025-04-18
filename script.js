const GEO_API_KEY = CONFIG.GEO_API_KEY;
const WEATHER_API_KEY = CONFIG.WEATHER_API_KEY;


async function searchCity() {
  const city = document.getElementById('cityInput').value;

  // GeoDB Cities API
  const geoURL = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${city}&countryIds=IN&limit=1`;
  const geoOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': GEO_API_KEY,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };

  const geoRes = await fetch(geoURL, geoOptions);
  const geoData = await geoRes.json();

  if (!geoData.data.length) {
    document.getElementById('cityInfo').innerHTML = `<p>No city found.</p>`;
    return;
  }

  const cityData = geoData.data[0];

  document.getElementById('cityInfo').innerHTML = `
    <h2>${cityData.city}, ${cityData.country}</h2>
    <p>Population: ${cityData.population.toLocaleString()}</p>
    <p>Region: ${cityData.region}</p>
    <p>Latitude: ${cityData.latitude}</p>
    <p>Longitude: ${cityData.longitude}</p>
  `;

  // Weather API
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.latitude}&lon=${cityData.longitude}&appid=${WEATHER_API_KEY}&units=metric`;

  const weatherRes = await fetch(weatherURL);
  const weatherData = await weatherRes.json();

  document.getElementById('weatherInfo').innerHTML = `
    <h2>Weather in ${weatherData.name}</h2>
    <p>${weatherData.weather[0].main} - ${weatherData.weather[0].description}</p>
    <p>🌡️ Temp: ${weatherData.main.temp} °C</p>
    <p>💨 Wind: ${weatherData.wind.speed} m/s</p>
    <p>🌫️ Humidity: ${weatherData.main.humidity}%</p>
  `;
}
