import React, { useEffect, useState } from 'react'; 
import './bar_chart.css'; 
import rainy from '../../storage/img/rainy.png';

const Bar_Chart = () => {
    const [data, setData] = useState([]); // * Estado para almacenar datos de lluvia
    const [loading, setLoading] = useState(true); // * Estado para controlar la carga de datos
    const [isDragging, setIsDragging] = useState(false); // * Estado para controlar si se está arrastrando
    const [startY, setStartY] = useState(0); // * Almacenar la posición inicial del mouse en Y
    const [scrollTop, setScrollTop] = useState(0); // * Almacenar la posición de desplazamiento actual

    useEffect(() => {
        const fetchWeatherData = async () => { // * Función asíncrona para obtener datos del clima
            try {
                const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=246a52abe74049febc222157242210&q=Bucaramanga&lang=es&days=1`); // * URL de la API
                const weatherData = await response.json(); // * Convertir la respuesta a JSON
                const hourlyData = weatherData.forecast.forecastday[0].hour.map(hour => ({ // * Mapear datos horarios
                    time: hour.time.split(' ')[1], // * Obtener solo la hora
                    chance: hour.chance_of_rain // * Obtener la probabilidad de lluvia
                }));
                setData(hourlyData); // * Actualizar el estado con los datos
            } catch (error) {
                console.error('Error fetching weather data:', error); // * Mostrar error en consola
            } finally {
                setLoading(false); // * Finalizar la carga de datos
            }
        };

        fetchWeatherData(); // * Llamar a la función para obtener datos
    }, []); // * Asegurarse de que se ejecute solo una vez al montar el componente

    // * Controladores de eventos para arrastrar
    const onMouseDown = (e) => {
        setIsDragging(true); // * Indicar que se está arrastrando
        setStartY(e.pageY - e.currentTarget.offsetTop); // * Obtener la posición Y inicial
        setScrollTop(e.currentTarget.scrollTop); // * Almacenar la posición de desplazamiento
    };

    const onMouseLeave = () => {
        setIsDragging(false); // * Detener el arrastre al salir del área
    };

    const onMouseUp = () => {
        setIsDragging(false); // * Detener el arrastre al soltar el mouse
    };

    const onMouseMove = (e) => {
        if (!isDragging) return; // * Salir si no se está arrastrando
        e.preventDefault(); // * Prevenir comportamiento por defecto
        const y = e.pageY - e.currentTarget.offsetTop; // * Obtener la posición Y actual
        const walk = (y - startY) * 1.5; // * Calcular el desplazamiento
        e.currentTarget.scrollTop = scrollTop - walk; // * Ajustar el desplazamiento
    };

    return (
        <div
            className="bar-chart_container" // * Contenedor principal del gráfico de barras
            onMouseDown={onMouseDown} // * Controlador de mouse down
            onMouseLeave={onMouseLeave} // * Controlador de mouse leave
            onMouseUp={onMouseUp} // * Controlador de mouse up
            onMouseMove={onMouseMove} // * Controlador de mouse move
        >
            <div className='bar_title'> {/* * Título del gráfico */}
                <img className='bar_image' src={rainy} alt="" /> {/* * Imagen de lluvia */}
                <h2 className="tittle">Chance of Rain</h2> {/* * Título del gráfico */}
            </div>
            {loading ? ( // * Mostrar carga mientras se obtienen los datos
                <div className="loading">Cargando...</div>
            ) : (
                data.map((item) => ( 
                    <div key={item.time} className="bar"> {/* * Contenedor para cada barra */}
                        <span className="label">{item.time}</span> {/* * Hora */}
                        <div className="progress-container"> {/* * Contenedor de la barra de progreso */}
                            <div className="progress" style={{ width: `${item.chance}%` }}></div> {/* * Barra de progreso */}
                        </div>
                        <span className="percentage">{item.chance}%</span> {/* * Porcentaje de probabilidad */}
                    </div>
                ))
            )}
        </div>
    );
};

export default Bar_Chart;
