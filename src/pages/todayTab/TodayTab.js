import React, {useEffect, useState} from 'react';
import './TodayTab.css';
import axios from "axios";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import createTimeString from "../../helpers/createTimeString";

function TodayTab({coordinates}) {
	const [forecast, setForecast] = useState([]);
	const [error, toggleError] = useState(false);
	const [loading, toggleLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			toggleError(false);
			toggleLoading(true);
			try {
				const result = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,daily&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);
				setForecast([
					result.data.hourly[3],
					result.data.hourly[5],
					result.data.hourly[7],
				])
				console.log(result.data);
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

	return(
		<div className="tab-wrapper">
			<div className="chart">
				{forecast.map((forecast) => {
					return <WeatherDetail
						key={forecast.dt}
						temp={forecast.temp}
						type={forecast.weather[0].main}
						description={forecast.weather[0].description}
					/>
				})}
			</div>
			<div className="legend">
				{forecast.map((forecast) => {
					return <span key={`${forecast.dt}-timestamp`}>{createTimeString(forecast.dt)}</span>
				})}
			</div>
			{error && <span>Het ophalen van de voorspellingen is mislukt. probeer het opnieuw.</span>}
			{loading && <span>Loading...</span>}
		</div>
  );
}

export default TodayTab;
