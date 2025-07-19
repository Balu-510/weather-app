class WeatherApp {
    constructor() {
        // API Configuration - Replace with your actual API key
        this.API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Get this from openweathermap.org
        this.BASE_URL = 'https://api.openweathermap.org/data/2.5';
        
        // App state
        this.currentUnit = 'metric'; // 'metric' for Celsius, 'imperial' for Fahrenheit
        this.currentWeatherData = null;
        
        // Weather icon mapping
        this.weatherIcons = {
            '01d': '☀️', '01n': '🌙', // clear sky
            '02d': '⛅', '02n': '☁️', // few clouds
            '03d': '☁️', '03n': '☁️', // scattered clouds
            '04d': '☁️', '04n': '☁️', // broken clouds
            '09d': '🌧️', '09n': '🌧️', // shower rain
            '10d': '🌦️', '10n': '🌧️', // rain
            '11d': '⛈️', '11n': '⛈️', // thunderstorm
            '13d': '❄️', '13n': '❄️', // snow
            '50d': '🌫️', '50n': '🌫️'  // mist
        };
        
        // Initialize when DOM is ready
        this.init();
    }
    
    /**
     * Initialize the application
     */
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApp());
        } else {
            this.setupApp();
        }
    }
    
    /**
     * Setup application after DOM is loaded
     */
    setupApp() {
        // Get DOM elements
        this.getDOMElements();
        
        // Load user preferences
        this.loadPreferences();
        
        // Bind event listeners
        this.bindEventListeners();
        
        // Update current date/time
        this.updateCurrentDateTime();
        
        console.log('Weather App initialized successfully!');
    }
    
    /**
     * Get all required DOM elements
     */
    getDOMElements() {
        // Form element
