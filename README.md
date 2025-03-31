# 🌦️ Weather App

## 📌 Descripción
Weather App es una aplicación web que permite visualizar datos meteorológicos en tiempo real, incluyendo temperatura, presión, viento y pronósticos semanales. Los usuarios pueden consultar el clima actual de cualquier ciudad y ver un pronóstico de 7, 10 días.

## 🚀 Tecnologías Utilizadas
- **Frontend**: React.js (Context API para manejar la ciudad seleccionada)
- **Gráficos**: Recharts para visualizar datos del clima
- **Backend**: API externa de WeatherAPI
- **Estado Global**: Context API para gestionar la ciudad seleccionada

## 🌍 Características Principales
- ✅ **Consultar el clima actual de cualquier ciudad**  
- ✅ **Ver un pronóstico de 7 días**  
- ✅ **Mostrar variaciones en el clima**  
- ✅ **Gráfico interactivo de temperatura**  

---

## 🔧 Instalación

### 1️⃣ Requisitos Previos
- Node.js 18+
- API Key de [WeatherAPI](https://www.weatherapi.com/)

### 2️⃣ Clonar el Repositorio
```sh
git clone https://github.com/usuario/weather-app.git
cd weather-app
```

### 3️⃣ Instalar Dependencias

```sh
npm install
```

### 4️⃣ Ejecutar el Proyecto

```sh
npm run dev
```

## 🌐 Algunas solicitudes API de WeatherAPI

### 1️⃣ Obtener Clima Deseado

```sh
Para utilizar la api es necesario tener una cuenta en WeatherAPI y copiar/pegar la "key" entregada y remplazarla.

http://api.weatherapi.com/v1/current.json?key=INSERTAR_KEY&q=INSERTAR_CIUDAD&lang=es
```

**Ejemplo de Respuesta**:

```json
{
  "location": {
    "name": "Bucaramanga",
    "region": "Santander",
    "country": "Colombia",
    "lat": 7.1297,
    "lon": -73.1258,
    "tz_id": "America/Bogota",
    "localtime_epoch": 1743444840,
    "localtime": "2025-03-31 13:14"
  },
  "current": {
    "last_updated_epoch": 1743444000,
    "last_updated": "2025-03-31 13:00",
    "temp_c": 22.1,
    "temp_f": 71.8,
    "is_day": 1,
    "condition": {
      "text": "Niebla moderada",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/248.png",
      "code": 1135
    },
    "wind_mph": 3.1,
    "wind_kph": 5,
    "wind_degree": 261,
    "wind_dir": "W",
    "pressure_mb": 1016,
    "pressure_in": 30,
    "precip_mm": 0.42,
    "precip_in": 0.02,
    "humidity": 41,
    "cloud": 75,
    "feelslike_c": 24.6,
    "feelslike_f": 76.2,
    "windchill_c": 22.7,
    "windchill_f": 72.8,
    "heatindex_c": 24.9,
    "heatindex_f": 76.8,
    "dewpoint_c": 20.1,
    "dewpoint_f": 68.1,
    "vis_km": 8,
    "vis_miles": 4,
    "uv": 8.1,
    "gust_mph": 3.6,
    "gust_kph": 5.8
  }
}
```

### 2️⃣ Obtener Pronóstico de 7 días (Para graficos)

```sh
http://api.weatherapi.com/v1/forecast.json?key=INSERTAR_KEY&q=INSERTAR_CIUDAD&lang=es&days=7
```

**Ejemplo de Respuesta**:

```json
{
  "location": {
    "name": "Bucaramanga",
    "region": "Santander",
    "country": "Colombia",
    "lat": 7.1297,
    "lon": -73.1258,
    "tz_id": "America/Bogota",
    "localtime_epoch": 1743444952,
    "localtime": "2025-03-31 13:15"
  },
  "current": {
    "last_updated_epoch": 1743444900,
    "last_updated": "2025-03-31 13:15",
    "temp_c": 22.1,
    "temp_f": 71.8,
    "is_day": 1,
    "condition": {
      "text": "Niebla moderada",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/248.png",
      "code": 1135
    },
    "wind_mph": 3.1,
    "wind_kph": 5,
    "wind_degree": 261,
    "wind_dir": "W",
    "pressure_mb": 1016,
    "pressure_in": 30,
    "precip_mm": 0.42,
    "precip_in": 0.02,
    "humidity": 41,
    "cloud": 75,
    "feelslike_c": 24.6,
    "feelslike_f": 76.2,
    "windchill_c": 22.7,
    "windchill_f": 72.8,
    "heatindex_c": 24.9,
    "heatindex_f": 76.8,
    "dewpoint_c": 20.1,
    "dewpoint_f": 68.1,
    "vis_km": 8,
    "vis_miles": 4,
    "uv": 8.1,
    "gust_mph": 3.6,
    "gust_kph": 5.8
  },
  "forecast": {
    "forecastday": [
      {
        "date": "2025-03-31",
        "date_epoch": 1743379200,
        "day": {
          "maxtemp_c": 23,
          "maxtemp_f": 73.5,
          "mintemp_c": 16.3,
          "mintemp_f": 61.4,
          "avgtemp_c": 20.2,
          "avgtemp_f": 68.3,
          "maxwind_mph": 3.1,
          "maxwind_kph": 5,
          "totalprecip_mm": 21.87,
          "totalprecip_in": 0.86,
          "totalsnow_cm": 0,
          "avgvis_km": 8.8,
          "avgvis_miles": 5,
          "avghumidity": 91,
          "daily_will_it_rain": 1,
          "daily_chance_of_rain": 99,
          "daily_will_it_snow": 0,
          "daily_chance_of_snow": 0,
          "condition": {
            "text": "Fuertes lluvias",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/308.png",
            "code": 1195
          },
          "uv": 1.7
        },
...
```

## 📦 Arquitectura del Proyecto

La arquitectura del proyecto sigue el modelo **Componentes Funcionales + Context API** para gestionar el estado global.

### Estructura de Carpetas

```sh
📦 Weather_API
├── 📂 node_modules            # Dependencias del proyecto (manejadas por npm)
├── 📂 public                  # Archivos estáticos de acceso público
├── 📂 src                     # Código fuente principal
│   ├── 📂 assets              # Recursos estáticos como imágenes y fuentes
│   ├── 📂 components          # Componentes reutilizables de la aplicación
│   │   ├── 📂 bar_chart       # Gráficos de barras para datos climáticos
│   │   ├── 📂 graph_forecast  # Gráficos de pronóstico
│   │   ├── 📂 hourly_forecast # Pronóstico por horas
│   │   ├── 📂 slide_button    # Botón deslizante interactivo
│   │   ├── 📂 tendays_forecast # Pronóstico de 10 días
│   │   ├── 📂 top             # Sección superior de la aplicación
│   │   ├── 📂 weather_changes_data # Datos de cambios climáticos
│   ├── 📂 storage             # Almacenamiento de datos estáticos
│   │   ├── 📂 font            # Fuentes personalizadas
│   │   ├── 📂 img             # Imágenes utilizadas en la aplicación
│   ├── 📄 App.jsx             # Componente principal de la aplicación
│   ├── 📄 citycontex.jsx      # Contexto global para manejar datos de ciudades
│   ├── 📄 index.css           # Estilos globales de la aplicación
│   ├── 📄 main.jsx            # Punto de entrada principal de React
├── 📄 .gitignore              # Archivos y carpetas ignorados por Git
├── 📄 eslint.config.js        # Configuración de ESLint para el código
├── 📄 index.html              # Archivo HTML principal
├── 📄 package-lock.json       # Bloqueo de dependencias de npm
├── 📄 package.json            # Información del proyecto y dependencias
├── 📄 README.md               # Documentación general del proyecto
├── 📄 vite.config.js          # Configuración de Vite para el desarrollo
---
```

## Hecho por



- [Kevin Santiago Galvis Arias - M3](https://github.com/KevinGalvisSA)

# Campuslands



[![Logo](https://camo.githubusercontent.com/b408f619e6da9b521f6d61f02bf78ef695b5ef45cfad6bc7ef4ea33f45975c8b/68747470733a2f2f656e637279707465642d74626e302e677374617469632e636f6d2f696d616765733f713d74626e3a414e643947635453597373546951482d65496c735a4b515a6d2d69594b6b65592d5632365f4e4d662d512673)](https://camo.githubusercontent.com/b408f619e6da9b521f6d61f02bf78ef695b5ef45cfad6bc7ef4ea33f45975c8b/68747470733a2f2f656e637279707465642d74626e302e677374617469632e636f6d2f696d616765733f713d74626e3a414e643947635453597373546951482d65496c735a4b515a6d2d69594b6b65592d5632365f4e4d662d512673)