import { useState } from 'react'
import './App.css'
import Top from './components/top/weather_top'
import Buttons from './components/slide_button/slide_button'
import WeatherChanges from './components/weather_changes_data/weather_data'
import HourlyForecast from './components/hourly_forecast/hourly_forecast'
import ForecastChart from './components/graph_forecast/graph_forecast'
import Bar_Chart from './components/bar_chart/bar_chart'

function App() {

  return (
    <>
      <Top></Top>
      <Buttons></Buttons>
      <WeatherChanges></WeatherChanges>
      <HourlyForecast></HourlyForecast>
      <ForecastChart></ForecastChart>
      <Bar_Chart></Bar_Chart>
    </>
  )
}

export default App
