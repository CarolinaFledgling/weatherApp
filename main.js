// const axios = require('axios');
// const app = axios()





const input = document.querySelector('.main-info__input')
const btn = document.querySelector('.main-info__btn')
const cityName = document.querySelector('.main-info__title')
const warning = document.querySelector('.main-info__warning')
const photo = document.querySelector('.main-info__img')
const weather = document.querySelector('.weather-info__weather')
const temperature = document.querySelector('.weather-info__temperature')
const humidity = document.querySelector('.weather-info__humidity')


// Step by step 
// Użwamy API  z openWeather.org 
// API call mówi nam jak będziemy sie odwoływac
// Tworzymy nasz apiLink dzięki któremu będziemy mogli sie odwoływać (appiCall) i tworzymy tez apiKey
// Zmieniamy defoultowe jednostki na C (units=metric)
// Nasz Link będzie wyglądał ApiLink +&ApiKey +&units

const apiLink = 'api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'fa7a6052a41b9493569175c0523e195d';
const units = '&units=metric';

// Następnie tworzymy dwie zmienne city - będzie przechowywać to co wpisaliśmy ulr bedzie przechowywac nasz link 

let city;
let url;

// Następnie tworzymy funkcję getWeather która będzie pobierać nasze dane z API

const getWeather = () => {
    // city = input.nodeValue;
    city = 'London';

    url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}${units}`


    // fetch(url)
    //     // res tutaj to odpowiedz z naszego API 
    //     .then(res => res.json())
    //     .then(res => console.log(res))

    axios.get(url)
        .then(res => {  // res jest to nasz obiekt krory pobralismy z  naszego API 
            console.log(res.data.main);
            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            cityName.textContent = res.data.name;
            temperature.textContent = Math.floor(temp) + ' ℃';
            humidity.textContent = Math.floor(hum) + ' %';
        })
}

getWeather()