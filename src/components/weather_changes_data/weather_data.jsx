import React, { useEffect, useState } from "react";
import './weather_data.css';
import airIcon from '../../storage/img/air.png';

const WeatherChanges = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [previousData, setPreviousData] = useState({
        wind_kph: null,
        pressure_mb: null,
        precip: null,
        uv: null,
    });

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    'http://api.weatherapi.com/v1/current.json?key=246a52abe74049febc222157242210&q=Bucaramanga&lang=es'
                );
                if (!response.ok) {
                    throw new Error('Error fetching weather data');
                }
                const data = await response.json();

                // Calculamos las variaciones antes de actualizar el estado
                const windVariation = previousData.wind_kph !== null ? (data.current.wind_kph - previousData.wind_kph).toFixed(1) : null;
                const pressureVariation = previousData.pressure_mb !== null ? (data.current.pressure_mb - previousData.pressure_mb).toFixed(1) : null;
                const precipVariation = previousData.precip !== null ? (data.current.precip_mm - previousData.precip).toFixed(1) : null;
                const uvVariation = previousData.uv !== null ? (data.current.uv - previousData.uv).toFixed(1) : null;

                // Actualizamos el estado
                setWeatherData(data);
                setPreviousData({
                    wind_kph: data.current.wind_kph,
                    pressure_mb: data.current.pressure_mb,
                    precip: data.current.precip_mm,
                    uv: data.current.uv,
                });

                return { windVariation, pressureVariation, precipVariation, uvVariation };
            } catch (error) {
                console.error("Error fetching weather data", error);
            }
        };

        fetchWeatherData();
    }, [previousData]);

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    const { wind_kph, pressure_mb, precip_mm, uv } = weatherData.current;

    const windVariation = previousData.wind_kph !== null ? (wind_kph - previousData.wind_kph).toFixed(1) : null;
    const pressureVariation = previousData.pressure_mb !== null ? (pressure_mb - previousData.pressure_mb).toFixed(1) : null;
    const precipVariation = previousData.precip !== null ? (precip_mm - previousData.precip).toFixed(1) : null;
    const uvVariation = previousData.uv !== null ? (uv - previousData.uv).toFixed(1) : null;

    return (
        <div className="weather-container">
          {/* Wind speed */}
          <div className="weather-box">
            <div className="icon-text">
              <img src={airIcon} alt="Wind speed icon" />
            </div>
            <div className="weather-data">
              <span>Wind speed</span>
              <span>{wind_kph} km/h</span>
            </div>
            <div className="weather-var">
              {windVariation !== null && (
                <small className={windVariation >= 0 ? "positive" : "negative"}>
                  {windVariation >= 0 ? `↑ ${windVariation} km/h` : `↓ ${Math.abs(windVariation)} km/h`}
                </small>
              )}
            </div>
          </div>
    
          {/* Rain chance */}
          <div className="weather-box">
            <div className="icon-text">
              <img src={airIcon} alt="Rain chance icon" />
            </div>
            <div className="weather-data">
              <span>Rain chance</span>
              <span>{precip_mm} mm</span>
            </div>
            <div className="weather-var">
              {precipVariation !== null && (
                <small className={precipVariation >= 0 ? "positive" : "negative"}>
                  {precipVariation >= 0 ? `↑ ${precipVariation} mm` : `↓ ${Math.abs(precipVariation)} mm`}
                </small>
              )}
            </div>
          </div>
    
          {/* Pressure */}
          <div className="weather-box">
            <div className="icon-text">
              <img src={airIcon} alt="Pressure icon" />
            </div>
            <div className="weather-data">
              <span>Pressure</span>
              <span>{pressure_mb} hPa</span>
            </div>
            <div className="weather-var">
              {pressureVariation !== null && (
                <small className={pressureVariation >= 0 ? "positive" : "negative"}>
                  {pressureVariation >= 0 ? `↑ ${pressureVariation} hPa` : `↓ ${Math.abs(pressureVariation)} hPa`}
                </small>
              )}
            </div>
          </div>
    
          {/* UV Index */}
          <div className="weather-box">
            <div className="icon-text">
              <img src={airIcon} alt="UV Index icon" />
            </div>
            <div className="weather-data">
              <span>UV Index</span>
              <span>{uv}</span>
            </div>
            <div className="weather-var">
              {uvVariation !== null && (
                <small className={uvVariation >= 0 ? "positive" : "negative"}>
                  {uvVariation >= 0 ? `↑ ${uvVariation}` : `↓ ${Math.abs(uvVariation)}`}
                </small>
              )}
            </div>
          </div>
        </div>
    );
};

export default WeatherChanges;
