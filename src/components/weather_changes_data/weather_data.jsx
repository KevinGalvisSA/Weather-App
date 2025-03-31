import React, { useEffect, useState } from "react";
import './weather_data.css';
import airIcon from '../../storage/img/air.png';

const WeatherChanges = () => {
    const [weatherData, setWeatherData] = useState(null); // ? Estado para almacenar los datos del clima
    const [previousData, setPreviousData] = useState({ // ? Estado para almacenar datos climáticos anteriores
        wind_kph: null,
        pressure_mb: null,
        precip: null,
        uv: null,
    });

    useEffect(() => {
        // * Función para obtener datos del clima de la API
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    'http://api.weatherapi.com/v1/current.json?key=7af1b748bc5245ed8ed163507253103&q=Bucaramanga&lang=es'
                );
                if (!response.ok) {
                    throw new Error('Error fetching weather data'); // * Manejo de errores si la respuesta no es exitosa
                }
                const data = await response.json();

                // * Calcular las variaciones respecto a los datos anteriores
                const windVariation = previousData.wind_kph !== null ? (data.current.wind_kph - previousData.wind_kph).toFixed(1) : null;
                const pressureVariation = previousData.pressure_mb !== null ? (data.current.pressure_mb - previousData.pressure_mb).toFixed(1) : null;
                const precipVariation = previousData.precip !== null ? (data.current.precip_mm - previousData.precip).toFixed(1) : null;
                const uvVariation = previousData.uv !== null ? (data.current.uv - previousData.uv).toFixed(1) : null;

                setWeatherData(data); // * Almacenar los datos actuales del clima
                setPreviousData({ // * Actualizar los datos anteriores con los actuales
                    wind_kph: data.current.wind_kph,
                    pressure_mb: data.current.pressure_mb,
                    precip: data.current.precip_mm,
                    uv: data.current.uv,
                });

                return { windVariation, pressureVariation, precipVariation, uvVariation };
            } catch (error) {
                console.error("Error fetching weather data", error); // * Manejo de errores
            }
        };

        fetchWeatherData(); // * Llamar a la función para obtener datos del clima
    }, [previousData]); // * Dependencia para ejecutar la useEffect cuando previousData cambie

    if (!weatherData) {
        return <div>Loading...</div>; // * Mensaje de carga mientras se obtienen los datos
    }

    const { wind_kph, pressure_mb, precip_mm, uv } = weatherData.current; // * Desestructuración de datos del clima actual

    // * Calcular las variaciones de los datos
    const windVariation = previousData.wind_kph !== null ? (wind_kph - previousData.wind_kph).toFixed(1) : null;
    const pressureVariation = previousData.pressure_mb !== null ? (pressure_mb - previousData.pressure_mb).toFixed(1) : null;
    const precipVariation = previousData.precip !== null ? (precip_mm - previousData.precip).toFixed(1) : null;
    const uvVariation = previousData.uv !== null ? (uv - previousData.uv).toFixed(1) : null;

    return (
        <div className="weather-container">
          {/* Velocidad del viento */}
          <div className="weather-box">
            <div className="icon-text">
              <img src={airIcon} alt="Wind speed icon" />
            </div>
            <div className="weather-data">
              <span>Wind speed</span>
              <span>{wind_kph} km/h</span> {/* Mostrar velocidad del viento */}
            </div>
            <div className="weather-var">
              {windVariation !== null && (
                <small className={windVariation >= 0 ? "positive" : "negative"}>
                  {windVariation >= 0 ? `↑ ${windVariation} km/h` : `↓ ${Math.abs(windVariation)} km/h`} {/* Mostrar variación */}
                </small>
              )}
            </div>
          </div>
    
          {/* Probabilidad de lluvia */}
          <div className="weather-box">
            <div className="icon-text">
              <img src={airIcon} alt="Rain chance icon" />
            </div>
            <div className="weather-data">
              <span>Rain chance</span>
              <span>{precip_mm} mm</span> {/* Mostrar probabilidad de lluvia */}
            </div>
            <div className="weather-var">
              {precipVariation !== null && (
                <small className={precipVariation >= 0 ? "positive" : "negative"}>
                  {precipVariation >= 0 ? `↑ ${precipVariation} mm` : `↓ ${Math.abs(precipVariation)} mm`} {/* Mostrar variación */}
                </small>
              )}
            </div>
          </div>
    
          {/* Presión */}
          <div className="weather-box">
            <div className="icon-text">
              <img src={airIcon} alt="Pressure icon" />
            </div>
            <div className="weather-data">
              <span>Pressure</span>
              <span>{pressure_mb} hPa</span> {/* Mostrar presión */}
            </div>
            <div className="weather-var">
              {pressureVariation !== null && (
                <small className={pressureVariation >= 0 ? "positive" : "negative"}>
                  {pressureVariation >= 0 ? `↑ ${pressureVariation} hPa` : `↓ ${Math.abs(pressureVariation)} hPa`} {/* Mostrar variación */}
                </small>
              )}
            </div>
          </div>
    
          {/* Índice UV */}
          <div className="weather-box">
            <div className="icon-text">
              <img src={airIcon} alt="UV Index icon" />
            </div>
            <div className="weather-data">
              <span>UV Index</span>
              <span>{uv}</span> {/* Mostrar índice UV */}
            </div>
            <div className="weather-var">
              {uvVariation !== null && (
                <small className={uvVariation >= 0 ? "positive" : "negative"}>
                  {uvVariation >= 0 ? `↑ ${uvVariation}` : `↓ ${Math.abs(uvVariation)}`} {/* Mostrar variación */}
                </small>
              )}
            </div>
          </div>
        </div>
    );
};

export default WeatherChanges;
