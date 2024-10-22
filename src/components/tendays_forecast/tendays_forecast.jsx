import React, { useState, useEffect } from "react";
import './tendays_forecast.css';

const TenDaysForecast = () => {
  const [forecast, setForecast] = useState([]); // ? Estado para almacenar el pronóstico del tiempo
  const [loading, setLoading] = useState(true); // ? Estado para controlar la carga de datos
  const [error, setError] = useState(null); // ? Estado para manejar errores

  useEffect(() => {
    // * Función para obtener datos del pronóstico de los próximos 10 días desde la API
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://api.weatherapi.com/v1/forecast.json?key=246a52abe74049febc222157242210&q=Bucaramanga&lang=es&days=10'
        );
        const data = await response.json();
        setForecast(data.forecast.forecastday); // * Almacenar el pronóstico en el estado
        setLoading(false); // * Cambiar el estado de carga a falso
      } catch (error) {
        setError("Error al obtener los datos del clima"); // * Manejo de errores
        setLoading(false); // * Cambiar el estado de carga a falso
      }
    };

    fetchData(); // * Llamar a la función para obtener los datos del pronóstico
  }, []); // * Ejecutar este efecto solo una vez al montar el componente

  if (loading) {
    return <div>Cargando...</div>; // * Mensaje de carga mientras se obtienen los datos
  }

  if (error) {
    return <div>{error}</div>; // * Mostrar mensaje de error si hay un problema
  }

  if (!forecast || forecast.length === 0) {
    return null; // * Retornar null si no hay pronóstico disponible
  }

  return (
    <div className="weather-forecast">
      {forecast.map((day) => {
        const { date, day: dayInfo } = day; // * Desestructuración para obtener fecha y datos del día
        const { maxtemp_c, mintemp_c, condition } = dayInfo; // * Desestructuración para obtener temperatura máxima, mínima y condición del clima
        const { text, icon } = condition; // * Desestructuración para obtener texto y icono de la condición

        return (
          <div className="weather-widget" key={date}> {/* * Usar fecha como clave para cada widget de clima */}
            <div className="weather-info">
              <h3>{date}</h3> {/* * Mostrar la fecha */}
              <p>{text}</p> {/* * Mostrar la condición del clima */}
            </div>
            <div className="weather-temps">
              <span className="temp-high">{maxtemp_c}°C</span> {/* * Mostrar temperatura máxima */}
              <span className="temp-low">{mintemp_c}°C</span> {/* * Mostrar temperatura mínima */}
            </div>
            <div className="weather-icon">
              <img src={`https:${icon}`} alt="Weather Icon" /> {/* * Mostrar icono del clima */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TenDaysForecast; 
