import React, { useEffect, useState, useContext } from "react";
import { CityContext } from "../../citycontex.jsx"; // Importar el contexto de la ciudad
import "./weather_data.css";
import airIcon from "../../storage/img/air.png";

const WeatherChanges = () => {
  const { selectedCity } = useContext(CityContext); // Obtener la ciudad seleccionada del contexto
  const [weatherData, setWeatherData] = useState(null);
  const [previousData, setPreviousData] = useState({
    wind_kph: null,
    pressure_mb: null,
    precip: null,
    uv: null,
  });

  useEffect(() => {
    if (!selectedCity) return; // Evitar hacer la solicitud si no hay ciudad seleccionada

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=7af1b748bc5245ed8ed163507253103&q=${selectedCity}&lang=es`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos del clima");
        }
        const data = await response.json();

        setWeatherData(data);
        setPreviousData((prev) => ({
          wind_kph: data.current.wind_kph,
          pressure_mb: data.current.pressure_mb,
          precip: data.current.precip_mm,
          uv: data.current.uv,
        }));
      } catch (error) {
        console.error("Error al obtener los datos del clima", error);
      }
    };

    fetchWeatherData();
  }, [selectedCity]); // Se ejecuta cuando cambia la ciudad seleccionada

  if (!weatherData) {
    return <div className="loading">Cargando...</div>;
  }

  const { wind_kph, pressure_mb, precip_mm, uv } = weatherData.current;

  // Calcular las variaciones respecto a los datos anteriores
  const windVariation =
    previousData.wind_kph !== null
      ? (wind_kph - previousData.wind_kph).toFixed(1)
      : null;
  const pressureVariation =
    previousData.pressure_mb !== null
      ? (pressure_mb - previousData.pressure_mb).toFixed(1)
      : null;
  const precipVariation =
    previousData.precip !== null
      ? (precip_mm - previousData.precip).toFixed(1)
      : null;
  const uvVariation =
    previousData.uv !== null ? (uv - previousData.uv).toFixed(1) : null;

  return (
    <div className="weather-container">
      {/* Velocidad del viento */}
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
              {windVariation >= 0
                ? `↑ ${windVariation} km/h`
                : `↓ ${Math.abs(windVariation)} km/h`}
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
          <span>{precip_mm} mm</span>
        </div>
        <div className="weather-var">
          {precipVariation !== null && (
            <small className={precipVariation >= 0 ? "positive" : "negative"}>
              {precipVariation >= 0
                ? `↑ ${precipVariation} mm`
                : `↓ ${Math.abs(precipVariation)} mm`}
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
          <span>{pressure_mb} hPa</span>
        </div>
        <div className="weather-var">
          {pressureVariation !== null && (
            <small className={pressureVariation >= 0 ? "positive" : "negative"}>
              {pressureVariation >= 0
                ? `↑ ${pressureVariation} hPa`
                : `↓ ${Math.abs(pressureVariation)} hPa`}
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
          <span>{uv}</span>
        </div>
        <div className="weather-var">
          {uvVariation !== null && (
            <small className={uvVariation >= 0 ? "positive" : "negative"}>
              {uvVariation >= 0
                ? `↑ ${uvVariation}`
                : `↓ ${Math.abs(uvVariation)}`}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherChanges;
