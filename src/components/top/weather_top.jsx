import React, { useState, useEffect } from "react";
import background from '../../storage/img/background.png';
import './weather_top.css';

function Top({ isScrolled }) {
  const [weatherData, setWeatherData] = useState(null); // ? Estado para almacenar los datos del clima
  const [loading, setLoading] = useState(true); // ? Estado para controlar la carga de datos
  const [error, setError] = useState(null); // ? Estado para manejar errores

  useEffect(() => {
    // * Función para obtener datos del clima desde la API
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'http://api.weatherapi.com/v1/current.json?key=246a52abe74049febc222157242210&q=Bucaramanga&lang=es'
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos del clima"); // * Manejo de errores si la respuesta no es exitosa
        }
        const data = await response.json();
        setWeatherData(data); // * Almacenar los datos del clima en el estado
        setLoading(false); // * Cambiar el estado de carga a falso
      } catch (error) {
        setError(error.message); // * Almacenar el mensaje de error en el estado
        setLoading(false); // * Cambiar el estado de carga a falso
      }
    };

    fetchWeatherData(); // * Llamar a la función para obtener los datos del clima
  }, []); // * Ejecutar este efecto solo una vez al montar el componente

  if (loading) {
    return <p>Cargando...</p>; // * Mensaje de carga mientras se obtienen los datos
  }

  if (error) {
    return <p>Error: {error}</p>; // * Mostrar mensaje de error si hay un problema
  }

  if (weatherData) {
    return (
      <div className={`top ${isScrolled ? 'scrolled sticky' : ''}`}> {/* * Cambia la clase según el estado de desplazamiento */}
        <div className="title">
          <p>{weatherData.location.name}, {weatherData.location.country}</p> {/* * Mostrar la ubicación */}
          <i className='bx bx-search-alt-2'></i> {/* * Icono de búsqueda */}
        </div>
        <div className="weather_info">
          <div className="info_data">
            <h1>{weatherData.current.temp_c}°</h1> {/* * Mostrar temperatura actual */}
            <p>Feels like {weatherData.current.feelslike_c}°</p> {/* * Mostrar sensación térmica */}
          </div>
          <div className="info_image">
            <img className="weather" src={`http:${weatherData.current.condition.icon}`} alt="clima" /> {/* * Mostrar icono del clima */}
            <p>{weatherData.current.condition.text}</p> {/* * Mostrar descripción del clima */}
          </div>
        </div>
        <div className="weather_date">
          <p>{weatherData.location.localtime}</p> {/* * Mostrar la hora local */}
          <h6>Día {weatherData.current.temp_c}° <br /> Noche -1°</h6> {/* * Mostrar temperaturas diurna y nocturna */}
        </div>
        {!isScrolled && <img className="background" src={background} alt="fondo" />} {/* * Mostrar fondo solo si no se ha desplazado */}
      </div>
    );
  }

  return null; // * Retornar null si no hay datos de clima
}

export default Top;
