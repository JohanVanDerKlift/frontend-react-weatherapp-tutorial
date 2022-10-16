import React, {useState, useEffect} from 'react';
import './ForecastTab.css';
import axios from "axios";
import kelvinToCelsius from "../../helpers/kelvinToCelsius";
import createDateString from "../../helpers/createDateString";

function ForecastTab({coordinates}) {
  const [forecast, setForecast] = useState([]);
  const [error, toggleError] = useState(false);
  const [loading, toggleLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      toggleError(false);
      toggleLoading(true);
      try {
        const result = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${process.env.REACT_APP_API_KEY}`);
        setForecast(result.data.daily.slice(1, 6));
      } catch (e) {
        console.error(e);
        toggleError(true);
      }
      toggleLoading(false);
    }

    if (coordinates) {
      fetchData();
    }

  }, [coordinates]);

  return (
    <div className="tab-wrapper">
      {error &&
        <span>
          Er is iets misgegaan bij het ophalen van de data
        </span>
      }

      {forecast.length === 0 && !error &&
        <span className="no-forecast">
          Zoek eerst een locatie om het weer voor deze week te bekijken
        </span>
      }

      {loading &&
        <span>Loading...</span>
      }

      {forecast && forecast.map((day) => {
        return (
          <article className="forecast-day">
            <p className="day-description">
              {createDateString(day.dt)}
            </p>

            <section className="forecast-weather">
            <span>
              {kelvinToCelsius(day.temp.day)}
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
