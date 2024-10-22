import { useState, useEffect } from 'react';
import './App.css';
import Top from './components/top/weather_top';
import Buttons from './components/slide_button/slide_button';
import WeatherChanges from './components/weather_changes_data/weather_data';
import HourlyForecast from './components/hourly_forecast/hourly_forecast';
import ForecastChart from './components/graph_forecast/graph_forecast';
import Bar_Chart from './components/bar_chart/bar_chart';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar cuando se hace scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Top isScrolled={isScrolled} />
      <Buttons isScrolled={isScrolled} />
      <WeatherChanges />
      <HourlyForecast />
      <ForecastChart />
      <Bar_Chart />
    </>
  );
}

export default App;
