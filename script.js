async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const apiKey = 'your_actual_api_key'; // Replace this with your real key
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = "<p>⚠️ Please enter a city name!</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // Debug: see what you get back

    if (data.cod === 200) {
      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="Weather icon">
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>☁️ Weather: ${data.weather[0].description}</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
      `;
      document.body.style.backgroundImage = getBackgroundImage(data.weather[0].main);
    } else {
      resultDiv.innerHTML = `<p>❌ City not found (${data.message})</p>`;
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    resultDiv.innerHTML = "<p>🚫 Failed to fetch weather data.</p>";
  }
}

function getBackgroundImage(condition) {
  switch (condition.toLowerCase()) {
    case 'clear':
      return "url('https://source.unsplash.com/1600x900/?clear-sky')";
    case 'clouds':
      return "url('https://source.unsplash.com/1600x900/?cloudy')";
    case 'rain':
    case 'drizzle':
      return "url('https://source.unsplash.com/1600x900/?rain')";
    case 'thunderstorm':
      return "url('https://source.unsplash.com/1600x900/?thunderstorm')";
    case 'snow':
      return "url('https://source.unsplash.com/1600x900/?snow')";
    case 'mist':
    case 'fog':
      return "url('https://source.unsplash.com/1600x900/?fog')";
    default:
      return "url('https://source.unsplash.com/1600x900/?weather')";
  }
}
