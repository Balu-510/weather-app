from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__, static_folder='.', template_folder='.')

API_KEY = "your_actual_api_key"  # Replace with your OpenWeatherMap API key

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['POST'])
def weather():
    city = request.json.get('city')
    if not city:
        return jsonify({"error": "City name is required"}), 400

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    try:
        response = requests.get(url)
        data = response.json()
        if data.get("cod") != 200:
            return jsonify({"error": data.get("message", "City not found")}), 404
        return jsonify(data)
    except Exception:
        return jsonify({"error": "Failed to fetch weather data"}), 500

if __name__ == '__main__':
    app.run(debug=True)
