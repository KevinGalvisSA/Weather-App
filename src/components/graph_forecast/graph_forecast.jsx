import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import './graph_forecast.css';
import calendar from '../../storage/img/calendar_month.png';

const data = [
  { day: 'Mon', temp: -5 },
  { day: 'Tue', temp: -3 },
  { day: 'Wen', temp: 0 },
  { day: 'Thu', temp: 3 },
  { day: 'Fri', temp: 1 },
  { day: 'Sat', temp: -2 },
  { day: 'Sun', temp: 0 }
];

const ForecastChart = () => {
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
            <Line type="monotone" dataKey="temp" stroke="#000" strokeWidth={2} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastChart;
