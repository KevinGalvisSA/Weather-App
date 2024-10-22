import React, { useState, useEffect } from "react";
import background from '../../storage/img/background.png';
import './weather_top.css';

function Top({ isScrolled }) {
  const [weatherData, setWeatherData] = useState(null); // Estado para almacenar los datos del clima
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Se ejecuta cuando el componente se monta
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'http://api.weatherapi.com/v1/current.json?key=246a52abe74049febc222157242210&q=Floridablanca&lang=es'
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos del clima");
        }
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  // Mostrar un mensaje de carga
  if (loading) {
    return <p>Cargando...</p>;
  }

  // Mostrar un mensaje de error
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Si los datos están cargados, mostrar la información del clima
  if (weatherData) {
    return (
      <div className={`top ${isScrolled ? 'scrolled sticky' : ''}`}>
        <div className="title">
          <p>{weatherData.location.name}, {weatherData.location.country}</p>
          <i className='bx bx-search-alt-2'></i>
        </div>
        <div className="weather_info">
          <div className="info_data">
            <h1>{weatherData.current.temp_c}°</h1>
            <p>Feels like {weatherData.current.feelslike_c}°</p>
          </div>
          <div className="info_image">
            <img className="weather" src={`http:${weatherData.current.condition.icon}`} alt="clima" />
            <p>{weatherData.current.condition.text}</p>
          </div>
        </div>
        <div className="weather_date">
          <p>{weatherData.location.localtime}</p>
          <h6>Día {weatherData.current.temp_c}° <br /> Noche -1°</h6> {/* Este dato es ficticio, puedes ajustarlo */}
        </div>
        {/* Ocultar la imagen de fondo si está desplazado */}
        {!isScrolled && <img className="background" src={background} alt="fondo" />}
      </div>
    );
  }

  return null;
}

export default Top;
