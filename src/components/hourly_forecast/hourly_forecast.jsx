import React, { useEffect, useState } from "react";
import './hourly_forecast.css';
import history from "../../storage/img/history_toggle_off.png";

const HourlyForecast = () => {
  const [forecastData, setForecastData] = useState([]); // * Estado para almacenar los datos del pronóstico
  const [loading, setLoading] = useState(true); // * Estado para controlar la carga de datos
  const icon = history; // * Icono para la cabecera del pronóstico

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch(
          "http://api.weatherapi.com/v1/forecast.json?key=7af1b748bc5245ed8ed163507253103&q=Bucaramanga&lang=es&days=14" // * URL de la API para obtener el pronóstico
        );

        if (!response.ok) {
          throw new Error('Network response was not ok'); // * Manejo de errores en la respuesta
        }

        const data = await response.json(); // * Convertir la respuesta en JSON
        const hours = data.forecast.forecastday[0].hour.map((hour) => ({
          time: hour.time.split(" ")[1], // * Obtener solo la hora de la fecha
          icon: `https:${hour.condition.icon}`, // * URL del icono del clima
          temperature: hour.temp_c // * Temperatura en Celsius
        }));
        
        setForecastData(hours); // * Actualizar el estado con los datos del pronóstico por hora
      } catch (error) {
        console.error("Error fetching weather data:", error); // * Mostrar error en la consola
      } finally {
        setLoading(false); // * Finalizar la carga de datos
      }
    };

    fetchForecastData(); // * Llamar a la función para obtener los datos
  }, []);

  // * Variables para controlar el desplazamiento con el ratón
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => { // * Iniciar desplazamiento
    isDown = true;
    startX = e.pageX - e.currentTarget.offsetLeft;
    scrollLeft = e.currentTarget.scrollLeft;
    e.currentTarget.style.cursor = 'grabbing'; // * Cambiar el cursor
  };

  const handleMouseLeave = (e) => { // * Al salir del área, detener desplazamiento
    isDown = false;
    e.currentTarget.style.cursor = 'grab'; // * Cambiar el cursor
  };

  const handleMouseUp = (e) => { // * Al soltar el botón del ratón, detener desplazamiento
    isDown = false;
    e.currentTarget.style.cursor = 'grab'; // * Cambiar el cursor
  };

  const handleMouseMove = (e) => { // * Manejar el movimiento del ratón para desplazarse
    if (!isDown) return; // * No hacer nada si no se está desplazando
    e.preventDefault(); // * Prevenir el comportamiento predeterminado
    const x = e.pageX - e.currentTarget.offsetLeft; // * Calcular la posición del ratón
    const walk = (x - startX) * 2; // * Calcular la distancia desplazada
    e.currentTarget.scrollLeft = scrollLeft - walk; // * Actualizar la posición de desplazamiento
  };

  return (
    <div className="forecast-container"> {/* * Contenedor principal del pronóstico */}
      <div className="forecast-header"> {/* * Cabecera del pronóstico */}
        <img src={icon} alt="Forecast icon" /> {/* * Icono del pronóstico */}
        <span>Hourly forecast</span> {/* * Título del pronóstico */}
      </div>
      {loading ? ( // * Mostrar carga mientras se obtienen los datos
        <div className="loading">Loading...</div>
      ) : (
        <div
          className="forecast-hours" // * Contenedor para horas del pronóstico
          onMouseDown={handleMouseDown} // * Manejar el inicio del desplazamiento
          onMouseLeave={handleMouseLeave} // * Manejar cuando se sale del área
          onMouseUp={handleMouseUp} // * Manejar cuando se suelta el botón del ratón
          onMouseMove={handleMouseMove} // * Manejar el movimiento del ratón
          style={{ cursor: 'grab' }} // * Estilo del cursor
        >
          {forecastData.map((hour, index) => ( // * Mapear los datos de pronóstico por hora
            <div key={index} className="forecast-hour"> {/* * Contenedor de cada hora */}
              <span className="hour">{hour.time}</span> {/* * Mostrar la hora */}
              <img src={hour.icon} alt={`${hour.time} weather`} className="weather-icon" /> {/* * Icono del clima */}
              <span className="temperature">{hour.temperature}°</span> {/* * Mostrar temperatura */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HourlyForecast;
