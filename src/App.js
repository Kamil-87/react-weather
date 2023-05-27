import React, {useState} from 'react';
import './App.css';
import MainWeatherWindow from './components/MainWeatherWindow/MainWeatherWindow';
import CityInput from './components/CityInput/CityInput';
import WeatherBox from './components/WeatherBox/WeatherBox';

const apiKey = '59107744621adfa52e8d9b4c92768fb5' // '6557810176c36fac5f0db536711a6c52'

const App = () => {
  const [state, setState] = useState({
    city: '',
    days: []
  })

  const updateState = data => {
    const city = data.city.name;
    const days = [];
    const dayIndices = getDayIndices(data);

    for (let i = 0; i < 4; i++) {
      days.push({
        date: data.list[dayIndices[i]].dt_txt,
        weather_desc: data.list[dayIndices[i]].weather[0].description,
        icon: data.list[dayIndices[i]].weather[0].icon,
        temp: data.list[dayIndices[i]].main.temp
      });
    }

    setState({
      city: city,
      days: days
    });
  };

  const makeApiCall = async city => {
    const api_data = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&lang=ru`
    ).then(resp => resp.json());


    if (api_data.cod !== '200') {
      return false
    }

    await updateState(api_data);
  };

  const getDayIndices = data => {
    let dayIndices = [];
    dayIndices.push(0);

    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);

    for (let i = 0; i < 4; i++) {
      while (
          tmp === data.list[index].dt_txt.slice(8, 10) ||
          data.list[index].dt_txt.slice(11, 13) !== '15'
          ) {
        index++;
      }
      dayIndices.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    return dayIndices;
  };

  const WeatherBoxes = () => {
    const weatherBoxes = state.days.map((day, index) => (
        <li key={index}>
          <WeatherBox {...day} />
        </li>
    ));

    return <ul className='weather-box-list'>{weatherBoxes}</ul>;
  };

  return (
      <div className='App'>
        <header className='App-header'>
          <MainWeatherWindow data={state.days[0]} city={state.city}>
            <CityInput city={state.city} makeApiCall={makeApiCall} />
            <WeatherBoxes />
          </MainWeatherWindow>
        </header>
      </div>
  );
}

export default App;
