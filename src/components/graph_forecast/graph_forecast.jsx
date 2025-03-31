import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './graph_forecast.css';
import calendar from '../../storage/img/calendar_month.png';

const ForecastChart = () => {
  const [data, setData] = useState([]); // * Estado para almacenar los datos del pronóstico
  const [loading, setLoading] = useState(true); // * Estado para controlar la carga de datos

  useEffect(() => {
    const fetchForecastData = async () => { // * Función asíncrona para obtener datos
      try {
        const response = await fetch(
          "http://api.weatherapi.com/v1/forecast.json?key=7af1b748bc5245ed8ed163507253103&q=Bucaramanga&lang=es&days=7" // * URL de la API para obtener el pronóstico de 7 días
        );

        if (!response.ok) {
          throw new Error('Network response was not ok'); // * Manejo de errores en la respuesta
        }

        const data = await response.json(); // * Convertir la respuesta en JSON
        const days = data.forecast.forecastday.map((day) => ({ // * Mapear los días del pronóstico
          day: new Date(day.date).toLocaleString('en-US', { weekday: 'short' }), // * Obtener el día de la semana en formato corto
          temp: day.day.avgtemp_c // * Obtener la temperatura promedio del día
        }));

        setData(days); // * Actualizar el estado con los datos del pronóstico
      } catch (error) {
        console.error("Error fetching weather data:", error); // * Mostrar error en la consola
      } finally {
        setLoading(false); // * Finalizar la carga de datos
      }
    };

    fetchForecastData(); // * Llamar a la función para obtener los datos
  }, []);

  if (loading) { // * Mostrar carga mientras se obtienen los datos
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="chart-container"> {/* * Contenedor principal del gráfico */}
      <img className='chart_icon' src={calendar} alt="calendar" /> {/* * Icono del calendario */}
      <h3>Day forecast</h3> {/* * Título del pronóstico diario */}
      <div style={{ display: 'flex', justifyContent: 'start' }}> {/* * Contenedor para el gráfico */}
        <ResponsiveContainer width="90%" height={200}> {/* * Contenedor responsivo para el gráfico */}
          <LineChart data={data}> {/* * Gráfico de líneas */}
            <XAxis dataKey="day" /> {/* * Eje X: días de la semana */}
            <YAxis domain={[-10, 10]} /> {/* * Eje Y: dominio de temperatura */}
            <Tooltip /> {/* * Tooltip que aparece al pasar el ratón */}
            <Line 
              type="monotone" // * Tipo de línea
              dataKey="temp" // * Clave de los datos para el gráfico
              stroke="#000" // * Color de la línea
              strokeWidth={2} // * Grosor de la línea
              dot={{ r: 5 }} // * Radio de los puntos en la línea
              label={<CustomLabel />} // * Componente de etiqueta personalizado
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomLabel = ({ value }) => { // * Componente para etiquetas personalizadas en el gráfico
  return (
    <text
      x={0}
      y={0}
      fill="#000" // * Color del texto
      fontSize={12} // * Tamaño de la fuente
      textAnchor="middle" // * Anclaje del texto en el centro
      dy={-10} // * Desplazamiento vertical del texto
    >
      {value} {/* * Valor a mostrar */}
    </text>
  );
};

export default ForecastChart; 
