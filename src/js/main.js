import {sayHi} from '../js/someFns/simpleFn'
sayHi()

import '../scss/style.scss'

// Global variables 
const input = document.querySelector('.main-info__input')
const btn = document.querySelector('.main-info__btn')
const cityName = document.querySelector('.main-info__title')
const warning = document.querySelector('.main-info__warning')
const photo = document.querySelector('.main-info__img')
const weather = document.querySelector('.weather-info__weather')
const temperature = document.querySelector('.weather-info__temperature')
const humidity = document.querySelector('.weather-info__humidity')

const apiLink = 'api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'fa7a6052a41b9493569175c0523e195d';
const units = '&units=metric';



const getWeather = () => {
    const city = (!input.value) ? 'New York' : input.value; // operator warunkowy : po wejsciu na strone sprawdzamy czy input jest pusty jesli, tak to ładuje New York jesli nie to nasza wartość  
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}${units}`;


    fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            const temp = res.main.temp;
            const hum = res.main.humidity;
            const status = Object.assign({}, ...res.weather)
            cityName.textContent = res.name;
            temperature.textContent = Math.floor(temp) + ' ℃';
            humidity.textContent = Math.floor(hum) + ' %';
            weather.textContent = status.main;
            input.value = '';
            warning.textContent = '';

            if (status.id >= 200 && status.id < 300) {
                photo.setAttribute('src', './img/thunderstorm.png');
            } else if (status.id >= 300 && status.id < 400) {
                photo.setAttribute('src', './img/drizzle.png');
            } else if (status.id >= 500 && status.id < 600) {
                photo.setAttribute('src', './img/rain.png');
            } else if (status.id >= 600 && status.id < 700) {
                photo.setAttribute('src', './img/ice.png');
            } else if (status.id >= 700 && status.id < 800) {
                photo.setAttribute('src', './img/fog.png');
            } else if (status.id === 800) {
                photo.setAttribute('src', './img/sun.png');
            } else if (status.id > 800 && status.id < 900) {
                photo.setAttribute('src', './img/cloud.png');
            } else {
                photo.setAttribute('src', './img/unknown.png');
            };
        })
        .catch((err) => {
            console.log('bład z catch', err)
            warning.textContent = 'Please enter a valid City'
        })
}

const enterCheck = (event) => {
    if (event.keyCode === 13) {
        getWeather()
    }
}


getWeather()

btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enterCheck);


const someFn = function () {
    console.log('some function from main.js here')
}

someFn()