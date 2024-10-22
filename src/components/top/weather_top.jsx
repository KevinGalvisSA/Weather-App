import React from "react";
import background from '../../storage/img/background.png'
import cloudy from '../../storage/img/cloudy.png'
import './weather_top.css'

function Top() {
    return (
        <div className="top">
            <div className="title">
            <p>Kharkiv, Ukraine</p>
            <i className='bx bx-search-alt-2'></i>
            </div>
            <div className="weather_info">
                <div className="info_data">
                <h1>3°</h1>
                <p>Feels like -2°</p>
                </div>
                <div className="info_image">
                    <img className="weather" src={cloudy} alt="clima" />
                    <p>Cloudy</p>
                </div>
            </div>
            <div className="weather_date">
                <p>January 18, 16:14</p>
                <h6>Day 3° <br /> Night -1°</h6>
            </div>
            <img className="background" src={background} alt="fondo" />
        </div>
    );
}

export default Top;