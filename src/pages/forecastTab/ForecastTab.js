import React, {useState, useEffect} from 'react';
import './ForecastTab.css';
import axios from "axios";

const apiKey = '4b8466682d07ef8592271c0136a98757';

function ForecastTab({coordinates}) {
  const [ forecast, setForecast ] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${apiKey}&lang=nl`);
        console.log(result.data);
        setForecast(result.data.daily.slice(1, 6));
      } catch (e) {
        console.error(e);
      }
    }

    if (coordinates) {
      fetchData();
    }

  }, [coordinates]);

  function createDateString(timestamp) {
    const day = new Date(timestamp * 1000);
    return day.toLocaleDateString('nl-NL', { weekday: 'long'});
  }

  return (
    <div className="tab-wrapper">
      {forecast && forecast.map((day) => {
        return (
          <article className="forecast-day">
            <p className="day-description">
              {createDateString(day.dt)}
            </p>

            <section className="forecast-weather">
            <span>
              {day.temp.day}
            </span>
              <span className="weather-description">
              {day.weather[0].description}
            </span>
            </section>
          </article>
        )
        })}
    </div>
  );
};

export default ForecastTab;
