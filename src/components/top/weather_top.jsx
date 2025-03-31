import React, { useState, useEffect, useContext } from "react";
import { CityContext } from "../../citycontex.jsx"; 
import background from '../../storage/img/background.png';
import './weather_top.css';

function Top({ isScrolled }) {
  const { selectedCity, setSelectedCity } = useContext(CityContext); // Obtén la ciudad del contexto
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const cities = ["Bucaramanga", "Bogotá", "Medellín", "Cali", "Cartagena", "Floridablanca", "Giron", "Nariño", "Piedecuesta", "Santa_Marta"];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=7af1b748bc5245ed8ed163507253103&q=${selectedCity}&lang=es`
        );
        if (!response.ok) throw new Error("Error al obtener los datos del clima");
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedCity]); // * Se ejecuta cuando cambia la ciudad

  const handleCityClick = (city) => {
    setSelectedCity(city); 
    setShowDropdown(false);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return weatherData ? (
    <div className={`top ${isScrolled ? 'scrolled sticky' : ''}`}>
      <div className="title">
        <p>{weatherData.location.name}, {weatherData.location.country}</p>
        <i
          className='bx bx-search-alt-2'
          onClick={() => setShowDropdown(!showDropdown)}
        ></i>
        {showDropdown && (
          <ul className="dropdown">
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
  ) : null;
}

export default Top;
