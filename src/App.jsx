import { useState, useEffect } from 'react';
import Top from './components/top/weather_top';
import Buttons from './components/slide_button/slide_button';
import WeatherChanges from './components/weather_changes_data/weather_data';
import HourlyForecast from './components/hourly_forecast/hourly_forecast';
import ForecastChart from './components/graph_forecast/graph_forecast';
import Bar_Chart from './components/bar_chart/bar_chart';
import TenDaysForecast from './components/tendays_forecast/tendays_forecast';

function App() {
  // ? Estado para manejar la posición de desplazamiento
  const [isScrolled, setIsScrolled] = useState(false);
  // ? Estado para alternar la visibilidad del pronóstico de diez días
  const [showTenDays, setShowTenDays] = useState(false);

  useEffect(() => {
    // * Manejar el evento de desplazamiento para actualizar el estado isScrolled
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true); // El usuario ha desplazado hacia abajo
      } else {
        setIsScrolled(false); // El usuario está en la parte superior
      }
    };

    // * Adjuntar el listener del evento de desplazamiento
    window.addEventListener('scroll', handleScroll);

    // * Limpiar el listener del evento al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // * Array de dependencias vacío para ejecutar solo al montar

  // ? Función para mostrar el pronóstico de diez días
  const handleTenDaysClick = () => {
    setShowTenDays(true); // Mostrar pronóstico de diez días
  };

  // ? Función para mostrar el pronóstico de hoy
  const handleTodayClick = () => {
    setShowTenDays(false); // Ocultar pronóstico de diez días
  };

  return (
    <>
      {/* * Renderizar el componente Top, pasando el estado de desplazamiento */}
      <Top isScrolled={isScrolled} />
      {/* * Renderizar los botones con controladores de clic */}
      <Buttons 
        isScrolled={isScrolled} 
        onTodayClick={handleTodayClick} 
        onTenDaysClick={handleTenDaysClick} 
      />
      {/* * Renderizado condicional de los componentes de pronóstico */}
      {showTenDays ? (
        <TenDaysForecast /> 
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
