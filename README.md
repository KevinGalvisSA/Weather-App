# Weather App

Una aplicación de pronóstico del tiempo que muestra datos climáticos actuales y pronósticos para varios días y horas. La aplicación utiliza la API de WeatherAPI para obtener información sobre el clima en Bucaramanga.

## Características

- **Clima Actual:** Muestra la temperatura actual y la sensación térmica.
- **Pronóstico a 10 Días:** Proporciona un pronóstico detallado para los próximos 10 días.
- **Pronóstico Horario:** Muestra la temperatura y la probabilidad de lluvia para cada hora del día.
- **Gráficos Interactivos:** Visualiza la temperatura promedio diaria en un gráfico de líneas y la probabilidad de lluvia en un gráfico de barras.

## Tecnologías Utilizadas

- **React:** Biblioteca de JavaScript para construir interfaces de usuario.
- **Recharts:** Biblioteca para gráficos de datos en React, utilizada para mostrar el pronóstico diario y la probabilidad de lluvia en gráficos interactivos.
- **CSS:** Para estilos personalizados y diseño de la aplicación.

## Instalación

Para instalar y ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/KevinGalvisSA/Weather-App.git
   cd Weather-App
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia la aplicación:

   ```
   npm run dev
   ```

La aplicación debería abrirse en el puerto `http://localhost:5173/`.

## Uso

- Al cargar la aplicación, verás el clima actual en Bucaramanga.
- Puedes desplazarte hacia abajo para ver el pronóstico y demás información relevante.
- Puedes utilizar el buscador para consultar la información de otras localidades
- Puedes darle al botón de "10 days" para ver el pronóstico de los próximos 10 días.
- Al hacer clic en el pronóstico horario, puedes arrastrar para explorar las temperaturas y probabilidades de lluvia para cada hora.

## API

La aplicación utiliza la API de [WeatherAPI](https://www.weatherapi.com/) para obtener datos climáticos. Asegúrate de registrar una cuenta y obtener una clave de API y colocarla en la url si deseas realizar modificaciones.

### Endpoints utilizados

- Clima actual: `http://api.weatherapi.com/v1/current.json?key=[API Key]&q="ciudad"`
- Pronóstico: `http://api.weatherapi.com/v1/forecast.json?key=[API Key]&q="ciudad"&lang=es&days="numero de dias deseados por ver"`
## Hecho por

- [Kevin Santiago Galvis Arias - M3](https://github.com/KevinGalvisSA)


# Campuslands
![Logo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSYssTiQH-eIlsZKQZm-iYKkeY-V26_NMf-Q&s)

