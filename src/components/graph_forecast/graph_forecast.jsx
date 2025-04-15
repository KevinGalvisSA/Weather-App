import React, { useEffect, useState, useContext } from "react";
import { CityContext } from "../../citycontex.jsx"; // Importar el contexto de la ciudad
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./graph_forecast.css";
import calendar from "../../storage/img/calendar_month.png";

const ForecastChart = () => {
  const { selectedCity } = useContext(CityContext); // Obtener la ciudad seleccionada del contexto
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (!selectedCity) return; // Evitar hacer la solicitud si no hay ciudad seleccionada

    const fetchForecastData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=7af1b748bc5245ed8ed163507253103&q=${selectedCity}&lang=es&days=7`
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del clima");
        }

        const data = await response.json();
        const days = data.forecast.forecastday.map((day) => ({
          day: new Date(day.date).toLocaleString("es-ES", { weekday: "short" }),
          temp: day.day.avgtemp_c, // Temperatura promedio del día
        }));

        setData(days);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecastData();
  }, [selectedCity]); // Se ejecuta cuando cambia la ciudad seleccionada

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  // Obtener valores mínimos y máximos para ajustar el eje Y
  const minTemp = Math.min(...data.map((d) => d.temp)) - 2;
  const maxTemp = Math.max(...data.map((d) => d.temp)) + 2;

  return (
    <div className="chart-container">
      <img className="chart_icon" src={calendar} alt="calendar" />
      <h3>Pronóstico de temperatura en {selectedCity}</h3>
      <div style={{ display: "flex", justifyContent: "start" }}>
        <ResponsiveContainer width="90%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis domain={[minTemp, maxTemp]} /> {/* Eje Y ajustado dinámicamente */}
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

const CustomLabel = ({ value, x, y }) => {
  return (
    <text x={x} y={y} fill="#000" fontSize={12} textAnchor="middle" dy={-10}>
      {value}°C
    </text>
  );
};

export default ForecastChart;
