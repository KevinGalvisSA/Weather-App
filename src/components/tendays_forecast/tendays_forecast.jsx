import React, { useState, useEffect, useContext } from "react";
import { CityContext } from "../../citycontex.jsx"; // 👈 Importa el contexto
import "./tendays_forecast.css";

const TenDaysForecast = () => {
  const { selectedCity } = useContext(CityContext); // 👈 Obtiene la ciudad global
  const [forecast, setForecast] = useState([]); // Estado para almacenar el pronóstico
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    if (!selectedCity) return; // 👈 Previene ejecutar si no hay ciudad seleccionada

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=7af1b748bc5245ed8ed163507253103&q=${selectedCity}&lang=es&days=10`
        );
        const data = await response.json();
        setForecast(data.forecast?.forecastday || []); // Manejo seguro de datos
        setLoading(false);
      } catch (error) {
        setError("Error al obtener los datos del clima");
        setLoading(false);
      }
    };

    fetchData(); // Llamar a la API cuando cambie la ciudad
  }, [selectedCity]); // 👈 Se ejecuta cada vez que `selectedCity` cambia

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!forecast.length) return <div>No hay datos disponibles</div>;

  return (
    <div className="weather-forecast">
      <h3>Pronóstico de 10 días para {selectedCity}</h3> {/* 👈 Muestra la ciudad */}
      {forecast.map(({ date, day }) => (
        <div className="weather-widget" key={date}>
          <div className="weather-info">
            <h3>{date}</h3>
            <p>{day.condition.text}</p>
          </div>
          <div className="weather-temps">
            <span className="temp-high">{day.maxtemp_c}°C</span>
            <span className="temp-low">{day.mintemp_c}°C</span>
          </div>
          <div className="weather-icon">
            <img src={`https:${day.condition.icon}`} alt="Weather Icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TenDaysForecast;
