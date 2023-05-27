import React from 'react';
import './WeatherBox.css';

const WeatherBox = (props) => {

    const getDay = date => {
        let weekday = new Array(7);
        weekday[0] = 'Воскресенье';
        weekday[1] = 'Понедельник';
        weekday[2] = 'Вторник';
        weekday[3] = 'Среда';
        weekday[4] = 'Четверг';
        weekday[5] = 'Пятница';
        weekday[6] = 'Суббота';

        return weekday[new Date(date).getDay()];
    };

    return (
        <div className='weather-box'>
            <h1>{props.date ? getDay(props.date) : ''}</h1>
            <img
                src={
                    props.icon
                        ? require(`../../images/${props.icon}.svg`)
                        : require('../../images/01d.svg')
                }
                alt='sun'
            />
            <span className='temp'>{Math.round(props.temp - 273.15)}°C</span>
        </div>
    );
}

export default WeatherBox
