import React from 'react';
import './CityInput.css';

const CityInput = (props) => {
    const onClickHandler = async (e) => {
        e.persist();
        const eventKey = e.which ? e.which : e.keyCode;

        if(eventKey !== 13) {
            return
        }

        const city = e.target.value;
        e.target.placeholder = 'Введите город...';

        if (!/^[а-яА-Яa-zA-Z]+$/.test(city)) {
            e.target.placeholder = 'Пожалуйста, введите действительное название города...';
        }

        e.target.classList.add('loading');

        const data = await props.makeApiCall(city)

        console.log('data', data)

        if (data) {
            e.target.placeholder = 'Введите город...';
        } else {
            e.target.placeholder = 'Город не найден, попробуйте еще раз...';
        }

        e.target.classList.remove('loading');
        e.target.value = '';
    };

    const style = {
      top: props.city ? '-380px' : '-20px',
      width: '600px',
      display: 'inline-block',
      padding: '10px 0 10px 30px',
      lineHeight: '120%',
      position: 'relative',
      borderRadius: '20px',
      outline: 'none',
      fontSize: '20px',
      transition: 'all 0.5s ease-out'
    };

  return (
      <input
        className='city-input'
        style={style}
        type='text'
        placeholder='Введите город...'
        onKeyPress={onClickHandler}
      />)
}

export default CityInput
