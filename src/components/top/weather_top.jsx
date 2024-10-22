import React, { useState, useEffect } from "react";
import background from '../../storage/img/background.png';
import './weather_top.css';

function Top({ isScrolled }) {
  const [weatherData, setWeatherData] = useState(null); // * Estado para almacenar los datos del clima
  const [loading, setLoading] = useState(true); // * Estado para controlar la carga de datos
  const [error, setError] = useState(null); // * Estado para manejar errores
  const [selectedCity, setSelectedCity] = useState("Bucaramanga"); // *Estado para la ciudad seleccionada
  const [showDropdown, setShowDropdown] = useState(false); // * Estado para mostrar/ocultar el dropdown

  // Lista de ciudades de Colombia
  const cities = ["Bucaramanga", "Bogotá", "Medellín", "Cali", "Cartagena", "Floridablanca", "Giron", "Nariño", "Piedecuesta", "Santa_Marta"];

  useEffect(() => {
    // * Función para obtener datos del clima desde la API
    const fetchWeatherData = async () => {
      try {
        setLoading(true); 
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=246a52abe74049febc222157242210&q=${selectedCity}&lang=es`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos del clima");
        }
        const data = await response.json();
        setWeatherData(data); // Almacenar los datos del clima en el estado
        setLoading(false); 
      } catch (error) {
        setError(error.message); 
        setLoading(false); 
      }
    };

    fetchWeatherData(); // * Llamar a la función para obtener los datos del clima
  }, [selectedCity]); // * Ejecutar este efecto cuando la ciudad seleccionada cambie

  const handleCityClick = (city) => {
    setSelectedCity(city); 
    setShowDropdown(false);
  };

  if (loading) {
    return <p>Cargando...</p>; // Mensaje de carga mientras se obtienen los datos
  }

  if (error) {
    return <p>Error: {error}</p>; // Mostrar mensaje de error si hay un problema
  }

  if (weatherData) {
    return (
      <div className={`top ${isScrolled ? 'scrolled sticky' : ''}`}>
        <div className="title">
          <p>{weatherData.location.name}, {weatherData.location.country}</p>
          <i
            className='bx bx-search-alt-2'
            onClick={() => setShowDropdown(!showDropdown)} // Mostrar u ocultar el dropdown al hacer clic
          ></i>
          {showDropdown && (
            <ul className="dropdown"> {/* Menú desplegable para seleccionar ciudad */}
              {cities.map(city => (
                <li key={city} onClick={() => handleCityClick(city)}>
                  {city}
                </li>
              ))}
            </ul>
          )}
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
          <h6>Día {weatherData.current.temp_c}° <br /> Noche -1°</h6>
        </div>
        {!isScrolled && <img className="background" src={background} alt="fondo" />}
      </div>
    );
  }

  return null; // Retornar null si no hay datos de clima
}

export default Top;
