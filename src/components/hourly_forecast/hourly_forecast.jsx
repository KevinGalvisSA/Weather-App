import React, { useEffect, useState, useContext } from "react";
import { CityContext } from "../../citycontex.jsx"; // Importa el contexto de la ciudad
import "./hourly_forecast.css";
import history from "../../storage/img/history_toggle_off.png";

const HourlyForecast = () => {
  const { selectedCity } = useContext(CityContext); // Obtiene la ciudad del contexto
  const [forecastData, setForecastData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para manejar errores
  const icon = history;

  useEffect(() => {
    if (!selectedCity) return; // Evita hacer la solicitud si no hay ciudad seleccionada

    const fetchForecastData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=7af1b748bc5245ed8ed163507253103&q=${selectedCity}&lang=es&days=1`
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del clima");
        }

        const data = await response.json();
        const hours = data.forecast.forecastday[0].hour.map((hour) => ({
          time: hour.time.split(" ")[1],
          icon: `https:${hour.condition.icon}`,
          temperature: hour.temp_c,
        }));

        setForecastData(hours);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecastData();
  }, [selectedCity]); // Se ejecuta cuando cambia la ciudad seleccionada

  // Lógica de desplazamiento con el mouse
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - e.currentTarget.offsetLeft;
    scrollLeft = e.currentTarget.scrollLeft;
    e.currentTarget.style.cursor = "grabbing";
  };

  const handleMouseLeave = (e) => {
    isDown = false;
    e.currentTarget.style.cursor = "grab";
  };

  const handleMouseUp = (e) => {
    isDown = false;
    e.currentTarget.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2;
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="forecast-container">
      <div className="forecast-header">
        <img src={icon} alt="Forecast icon" />
        <span>Hourly Forecast - {selectedCity}</span>
      </div>
      {loading ? (
        <div className="loading">Cargando...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div
          className="forecast-hours"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ cursor: "grab" }}
        >
          {forecastData.map((hour) => (
            <div key={hour.time} className="forecast-hour">
              <span className="hour">{hour.time}</span>
              <img src={hour.icon} alt={`${hour.time} weather`} className="weather-icon" />
              <span className="temperature">{hour.temperature}°</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HourlyForecast;
