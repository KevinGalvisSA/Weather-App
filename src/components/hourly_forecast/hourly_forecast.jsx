import React from "react";
import './hourly_forecast.css'; // Asegúrate de enlazar el archivo CSS correcto
import clouds from "../../storage/img/Clouds.png"
import cloudy from '../../storage/img/cloudy.png'
import history from "../../storage/img/history_toggle_off.png"


const HourlyForecast = () => {
  // Datos de ejemplo estáticos
  const forecastData = [
    { time: "Now", icon: clouds, temperature: "25" },
    { time: "2PM", icon: clouds, temperature: "26" },
    { time: "3PM", icon: cloudy, temperature: "27" },
    { time: "4PM", icon: clouds, temperature: "28" },
    { time: "5PM", icon: cloudy, temperature: "29" },
  ];
  
  const icon = history

  return (
    <div className="forecast-container">
      <div className="forecast-header">
        <img src={icon} alt="Forecast icon" />
        <span>Hourly forecast</span>
      </div>
      <div className="forecast-hours">
        {forecastData.map((hour, index) => (
          <div key={index} className="forecast-hour">
            <span className="hour">{hour.time}</span>
            <img src={hour.icon} alt={`${hour.time} weather`} className="weather-icon" />
            <span className="temperature">{hour.temperature}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
