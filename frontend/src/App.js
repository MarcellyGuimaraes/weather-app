import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const formatNumber = (value) => Math.round(parseFloat(value || 0));

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError("Por favor, insira o nome de uma cidade");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/weather",
        {
          city: cityName,
        },
        {
          headers: {
            Authorization:
              "Bearer 1|azzU7QLNlyzt8xHIpd1Pr9iQagn5VH4CpiVOJk4d1ed5398d", // Substitua pelo token válido
            "Content-Type": "application/json",
          },
        },
      );
      const { data } = response;
      setWeatherData({
        ...data,
        temperature: formatNumber(data.temperature),
        wind_speed: formatNumber(data.wind_speed * 3.6),
        humidity: formatNumber(data.humidity),
        clouds: formatNumber(data.clouds),
      });
      setError("");
    } catch (err) {
      setError(
        "Erro ao buscar dados do clima. Verifique a cidade e tente novamente.",
      );
      setWeatherData(null);
    }
  };

  // Carregar dados de São Paulo ao montar o componente
  useEffect(() => {
    fetchWeather("São Paulo");
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather(city);
    }
  };

  const handleBlur = () => {
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="weather-app">
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar por localidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyPress}
          className="search-input"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {weatherData && (
        <div
          className="weather-card"
          style={{
            backgroundImage: `url('/assets/images/default-bg.png')`,
          }}
        >
          <div className="weather-header">
            <div className="image-container">
              <img
                src={getWeatherIconUrl(weatherData.weather.icon)}
                alt={weatherData.weather.description}
                className="weather-icon"
              />
            </div>
            <div className="location">
              <span>{weatherData.location}</span>
            </div>
          </div>

          <div className="weather-info">
            <div className="temperature">
              {weatherData.temperature}
              <span className="degree">°C</span>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <img
                src="/assets/images/image-1.png"
                alt="Vento"
                className="detail-icon weather"
              />
              <div className="detail-text">
                <span className="detail-label">Vento</span>
                <div className="detail-value">
                  <span>{weatherData.wind_speed}</span>
                  <span className="unit">km/h</span>
                </div>
              </div>
            </div>

            <div className="detail-item">
              <img
                src="/assets/images/image-2.png"
                alt="Umidade"
                className="detail-icon weather"
              />
              <div className="detail-text">
                <span className="detail-label">Umidade</span>
                <div className="detail-value">
                  <span>{weatherData.humidity}</span>
                  <span className="unit">%</span>
                </div>
              </div>
            </div>

            <div className="detail-item">
              <img
                src="/assets/images/image-3.png"
                alt="Chance de chuva"
                className="detail-icon weather"
              />
              <div className="detail-text">
                <span className="detail-label">Chuva</span>
                <div className="detail-value">
                  <span>{weatherData.clouds || 0}</span>
                  <span className="unit">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
