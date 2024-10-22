import React from "react";
import './weather_data.css';
import airIcon from '../../storage/img/air.png'

const WeatherChanges = () => {
    return (
        <div className="weather-container">
          {/* Wind speed */}
          <div className="weather-box">
            <div className="icon-text">
              <img src={airIcon} alt="Wind speed icon" />
            </div>
            <div className="weather-data">
              <span>Wind speed</span>
              <span>12km/h</span>
            </div>
            <div className="weather-var">
              <small className="positive">↑ 2 km/h</small>
            </div>
          </div>
    
          {/* Rain chance */}
          <div className="weather-box">
            <div className="icon-text">
              <img src={airIcon} alt="Rain chance icon" />
            </div>
            <div className="weather-data">
              <span>Rain chance</span>
              <span>24%</span>
            </div>
            <div className="weather-var">
              <small className="negative">↓ 10%</small>
            </div>
          </div>
    
          {/* Pressure */}
          <div className="weather-box">
            <div className="icon-text">
              <img src={airIcon} alt="Pressure icon" />
            </div>
            <div className="weather-data">
              <span>Pressure</span>
              <span>720 hpa</span>
            </div>
            <div className="weather-var">
              <small className="positive">↑ 32 hpa</small>
            </div>
          </div>
    
          {/* UV Index */}
          <div className="weather-box">
            <div className="icon-text">
              <img src={airIcon} alt="UV Index icon" />
            </div>
            <div className="weather-data">
              <span>UV Index</span>
              <span>2,3</span>
            </div>
            <div className="weather-var">
              <small className="negative">↓ 0.3</small>
            </div>
          </div>
        </div>
      );
};

export default WeatherChanges;
