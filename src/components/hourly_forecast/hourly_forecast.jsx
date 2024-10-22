import React, { useEffect, useState } from "react";
import './hourly_forecast.css'; // Asegúrate de enlazar el archivo CSS correcto
import clouds from "../../storage/img/Clouds.png";
import cloudy from '../../storage/img/cloudy.png';
import history from "../../storage/img/history_toggle_off.png";

const HourlyForecast = () => {
  // Estado para almacenar los datos del pronóstico
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const icon = history;

  useEffect(() => {
    // Función para obtener datos de la API
    const fetchForecastData = async () => {
      try {
        const response = await fetch(
          "http://api.weatherapi.com/v1/forecast.json?key=246a52abe74049febc222157242210&q=Floridablanca&lang=es&days=14"
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // Extraer la información horaria del pronóstico
        const hours = data.forecast.forecastday[0].hour.map((hour) => ({
          time: hour.time.split(" ")[1], // Solo la hora
          icon: `//cdn.weatherapi.com/weather/64x64/${hour.is_day ? 'day' : 'night'}/${hour.condition.code}.png`, // Icono basado en el estado
          temperature: hour.temp_c // Temperatura en °C
        }));
        
        setForecastData(hours); // Actualizar el estado con los datos obtenidos
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false); // Cambiar el estado de carga a false al final
      }
    };

    fetchForecastData(); // Llamar a la función para obtener los datos
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  // Variables para el manejo del desplazamiento
  let isDown = false;
  let startX;
  let scrollLeft;

  // Funciones para el manejo de eventos de desplazamiento
  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - e.currentTarget.offsetLeft;
    scrollLeft = e.currentTarget.scrollLeft;
    e.currentTarget.style.cursor = 'grabbing'; // Cambia el cursor al arrastrar
  };

  const handleMouseLeave = (e) => {
    isDown = false;
    e.currentTarget.style.cursor = 'grab'; // Cambia el cursor de nuevo al salir
  };

  const handleMouseUp = (e) => {
    isDown = false;
    e.currentTarget.style.cursor = 'grab'; // Cambia el cursor de nuevo al soltar
  };

  const handleMouseMove = (e) => {
    if (!isDown) return; // Detener si no se está arrastrando
    e.preventDefault(); // Prevenir la selección de texto
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2; // Factor de velocidad (ajusta como desees)
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="forecast-container">
      <div className="forecast-header">
        <img src={icon} alt="Forecast icon" />
        <span>Hourly forecast</span>
      </div>
      {loading ? ( // Mostrar el estado de carga
        <div className="loading">Loading...</div> // Aquí puedes agregar un spinner si lo deseas
      ) : (
        <div
          className="forecast-hours"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ cursor: 'grab' }} // Estilo del cursor
        >
          {forecastData.map((hour, index) => (
            <div key={index} className="forecast-hour">
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
