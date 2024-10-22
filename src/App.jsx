import { useState, useEffect } from 'react';
import './App.css';
import Top from './components/top/weather_top';
import Buttons from './components/slide_button/slide_button';
import WeatherChanges from './components/weather_changes_data/weather_data';
import HourlyForecast from './components/hourly_forecast/hourly_forecast';
import ForecastChart from './components/graph_forecast/graph_forecast';
import Bar_Chart from './components/bar_chart/bar_chart';
import TenDaysForecast from './components/tendays_forecast/tendays_forecast';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTenDays, setShowTenDays] = useState(false); // Estado para mostrar el pronóstico de 10 días

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

  const handleTenDaysClick = () => {
    setShowTenDays(true); // Cambia el estado para mostrar el componente de 10 días
  };

  const handleTodayClick = () => {
    setShowTenDays(false); // Cambia el estado para ocultar el componente de 10 días
  };

  return (
    <>
      <Top isScrolled={isScrolled} />
      <Buttons 
        isScrolled={isScrolled} 
        onTodayClick={handleTodayClick} 
        onTenDaysClick={handleTenDaysClick} 
      />
      {showTenDays ? (
        <TenDaysForecast /> // Muestra el componente de 10 días si se ha hecho clic
      ) : (
        <>
          <WeatherChanges />
          <HourlyForecast />
          <ForecastChart />
          <Bar_Chart />
        </>
      )}
    </>
  );
}

export default App;
