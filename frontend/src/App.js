// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/weather', {
                city: city
            }, {
                headers: {
                    'Authorization': 'Bearer 1|azzU7QLNlyzt8xHIpd1Pr9iQagn5VH4CpiVOJk4d1ed5398d', // Substitua pelo token válido
                    'Content-Type': 'application/json'
                }
            });
            setWeatherData(response.data);
            setError('');
        } catch (err) {
            setError('Erro ao buscar dados do clima. Verifique a cidade e tente novamente.');
            setWeatherData(null);
        }
    };

    return (
        <div style={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '20px' }}>
            <h1>Consulta de Clima</h1>
            <input
                type="text"
                placeholder="Digite o nome da cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Buscar Clima</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weatherData && (
                <div>
                    <h2>{weatherData.city}</h2>
                    <p>Temperatura: {weatherData.temperature}</p>
                    <p>Descrição: {weatherData.description}</p>
                    <p>Umidade: {weatherData.humidity}</p>
                    <p>Vento: {weatherData.wind_speed}</p>
                </div>
            )}
        </div>
    );
};

export default App;