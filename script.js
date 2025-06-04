async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = 'your_api_key_here'; // Replace with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  const resultDiv = document.getElementById('weatherResult');

  if (data.cod === 200) {
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="${iconUrl}" alt="Weather icon">
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>☁️ Weather: ${data.weather[0].description}</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
    `;
    resultDiv.innerHTML = weatherHTML;
    document.body.style.backgroundImage = getBackgroundImage(data.weather[0].main);
    document.body.style.backgroundSize = 'cover';
  } else {
    resultDiv.innerHTML = "<p>❌ City not found!</p>";
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
