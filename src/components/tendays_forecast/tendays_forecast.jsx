import React, { useState, useEffect } from "react";
import './tendays_forecast.css';

const TenDaysForecast = () => {
  const [forecast, setForecast] = useState([]); // Estado para almacenar los datos del pronóstico
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Hacer fetch de los datos de la API al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://api.weatherapi.com/v1/forecast.json?key=246a52abe74049febc222157242210&q=Bucaramanga&lang=es&days=10'
        );
        const data = await response.json();
        setForecast(data.forecast.forecastday); // Guardamos los 10 días del pronóstico
        setLoading(false); // Terminamos de cargar
      } catch (error) {
        setError("Error al obtener los datos del clima");
        setLoading(false); // Terminamos de cargar aunque haya error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <div className="weather-forecast">
      {forecast.map((day) => {
        const { date, day: dayInfo } = day;
        const { maxtemp_c, mintemp_c, condition } = dayInfo;
        const { text, icon } = condition;

        return (
          <div className="weather-widget" key={date}>
            <div className="weather-info">
              <h3>{date}</h3>
              <p>{text}</p>
            </div>
            <div className="weather-temps">
              <span className="temp-high">{maxtemp_c}°C</span>
              <span className="temp-low">{mintemp_c}°C</span>
            </div>
            <div className="weather-icon">
              <img src={`https:${icon}`} alt="Weather Icon" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TenDaysForecast;
