import React, { useEffect, useState } from 'react';
import './bar_chart.css'; // Importa el archivo CSS
import rainy from '../../storage/img/rainy.png';

const Bar_Chart = () => {
    const [data, setData] = useState([]); // Estado para almacenar los datos de la API
    const [loading, setLoading] = useState(true); // Estado de carga
    const [isDragging, setIsDragging] = useState(false); // Estado para saber si se está arrastrando
    const [startY, setStartY] = useState(0); // Posición inicial del mouse
    const [scrollTop, setScrollTop] = useState(0); // Posición de desplazamiento

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=246a52abe74049febc222157242210&q=Bucaramanga&lang=es&days=1`);
                const weatherData = await response.json();

                // Obtén la probabilidad de lluvia para las horas
                const hourlyData = weatherData.forecast.forecastday[0].hour.map(hour => ({
                    time: hour.time.split(' ')[1], // Obtén solo la hora
                    chance: hour.chance_of_rain // Obtiene la probabilidad de lluvia
                }));

                setData(hourlyData); // Almacena los datos en el estado
            } catch (error) {
                console.error('Error fetching weather data:', error);
            } finally {
                setLoading(false); // Cambia el estado de carga
            }
        };

        fetchWeatherData();
    });

    // Manejo del arrastre vertical
    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartY(e.pageY - e.currentTarget.offsetTop);
        setScrollTop(e.currentTarget.scrollTop);
    };

    const onMouseLeave = () => {
        setIsDragging(false);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const y = e.pageY - e.currentTarget.offsetTop;
        const walk = (y - startY) * 1.5; // Cambia el número para ajustar la velocidad de desplazamiento
        e.currentTarget.scrollTop = scrollTop - walk; // Ajusta el desplazamiento
    };

    return (
        <div
            className="bar-chart_container"
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >
            <div className='bar_title'>
                <img className='bar_image' src={rainy} alt="" />
                <h2 className="tittle">Chance of Rain</h2>
            </div>
            {loading ? (
                <div className="loading">Cargando...</div> // Mensaje de carga
            ) : (
                data.map((item) => (
                    <div key={item.time} className="bar">
                        <span className="label">{item.time}</span>
                        <div className="progress-container">
                            <div className="progress" style={{ width: `${item.chance}%` }}></div>
                        </div>
                        <span className="percentage">{item.chance}%</span>
                    </div>
                ))
            )}
        </div>
    );
};

export default Bar_Chart;
