import { useState } from 'react'
import './App.css'
import Top from './components/top/weather_top'
import Buttons from './components/slide_button/slide_button'
import WeatherChanges from './components/weather_changes_data/weather_data'
import HourlyForecast from './components/hourly_forecast/hourly_forecast'
import ForecastChart from './components/graph_forecast/graph_forecast'

function App() {

  return (
    <>
      <Top></Top>
      <Buttons></Buttons>
      <WeatherChanges></WeatherChanges>
      <HourlyForecast></HourlyForecast>
      <ForecastChart></ForecastChart>
    </>
  )
}

export default App
