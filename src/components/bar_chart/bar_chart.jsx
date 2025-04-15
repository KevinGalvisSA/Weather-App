import React, { useEffect, useState, useContext } from 'react';
import { CityContext } from '../../citycontex.jsx'; // Importar el contexto de la ciudad
import './bar_chart.css'; 
import rainy from '../../storage/img/rainy.png';

const Bar_Chart = () => {
    const { selectedCity } = useContext(CityContext); // Obtener la ciudad del contexto
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Estado para manejar errores
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        if (!selectedCity) return; // Evita hacer la solicitud si no hay ciudad seleccionada

        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/forecast.json?key=246a52abe74049febc222157242210&q=${selectedCity}&lang=es&days=1`
                );

                if (!response.ok) {
                    throw new Error("Error al obtener los datos del clima");
                }

                const weatherData = await response.json();
                const hourlyData = weatherData.forecast.forecastday[0].hour.map(hour => ({
                    time: hour.time.split(' ')[1],
                    chance: hour.chance_of_rain
                }));

                setData(hourlyData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [selectedCity]); // Se ejecuta cuando cambia la ciudad seleccionada

    // Controladores de eventos para arrastrar
    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartY(e.pageY - e.currentTarget.offsetTop);
        setScrollTop(e.currentTarget.scrollTop);
    };

    const onMouseLeave = () => setIsDragging(false);
    const onMouseUp = () => setIsDragging(false);

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const y = e.pageY - e.currentTarget.offsetTop;
        const walk = (y - startY) * 1.5;
        e.currentTarget.scrollTop = scrollTop - walk;
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
                <h2 className="tittle">Chance of Rain - {selectedCity}</h2>
            </div>
            {loading ? (
                <div className="loading">Cargando...</div>
            ) : error ? (
                <div className="error">{error}</div>
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
