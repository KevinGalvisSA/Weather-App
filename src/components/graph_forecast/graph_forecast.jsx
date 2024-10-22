import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';
import './graph_forecast.css';
import calendar from '../../storage/img/calendar_month.png';

const ForecastChart = () => {
  const [data, setData] = useState([]); // Estado para almacenar los datos del pronóstico
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Función para obtener datos de la API
    const fetchForecastData = async () => {
      try {
        const response = await fetch(
          "http://api.weatherapi.com/v1/forecast.json?key=246a52abe74049febc222157242210&q=Bucaramanga&lang=es&days=7" // Cambia el número de días según sea necesario
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Extraer la información diaria del pronóstico
        const days = data.forecast.forecastday.map((day) => ({
          day: new Date(day.date).toLocaleString('en-US', { weekday: 'short' }), // Obtener el nombre del día
          temp: day.day.avgtemp_c // Temperatura promedio en °C
        }));

        setData(days); // Actualizar el estado con los datos obtenidos
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false); // Cambiar el estado de carga a false al final
      }
    };

    fetchForecastData(); // Llamar a la función para obtener los datos
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  if (loading) {
    return <div className="loading">Loading...</div>; // Mostrar estado de carga
  }

  return (
    <div className="chart-container">
      <img className='chart_icon' src={calendar} alt="calendar" />
      <h3>Day forecast</h3>
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <ResponsiveContainer width="90%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis domain={[-10, 10]} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#000" 
              strokeWidth={2} 
              dot={{ r: 5 }} 
              label={<CustomLabel />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Componente Label Personalizado
const CustomLabel = ({ value }) => {
  return (
    <text
      x={0}
      y={0}
      fill="#000"
      fontSize={12}
      textAnchor="middle"
      dy={-10} // Ajuste de posición vertical
    >
      {value}
    </text>
  );
};

export default ForecastChart;
