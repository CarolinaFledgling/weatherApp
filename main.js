
// const { default: axios } = require("axios")

const input = document.querySelector('.main-info__input')
const btn = document.querySelector('.main-info__btn')
const cityName = document.querySelector('.main-info__title')
const warning = document.querySelector('.main-info__warning')
const photo = document.querySelector('.main-info__img')
const weather = document.querySelector('.weather-info__weather')
const temperature = document.querySelector('.weather-info__temperature')
const humidity = document.querySelector('.weather-info__humidity')


// 1 ) Step by step 
// Użwamy API  z openWeather.org 
// API call mówi nam jak będziemy sie odwoływac
// Tworzymy nasz apiLink dzięki któremu będziemy mogli pobierac dane 
// Zmieniamy defoultowe jednostki na C (units=metric)
// Nasz Link będzie wyglądał ApiLink +&ApiKey +&units

const apiLink = 'api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'fa7a6052a41b9493569175c0523e195d';
const units = '&units=metric';

// 2) Następnie tworzymy dwie zmienne city - będzie przechowywać to co wpiszemy w input , a url przechwuje nasz link 

let city;
let url;

//  3 ) Następnie tworzymy funkcję getWeather która będzie pobierać nasze dane z API

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const getWeather = () => {
    city = (!input.value) ? 'New York' : input.value;
    url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}${units}`;

    axios.get(url)
        // .then(res => res.json())
        .then(res => { // res jest to nasz obiekt ktory pobralismy z  naszego API 
            console.log(res);
            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            const status = Object.assign({}, ...res.data.weather)
            cityName.textContent = res.data.name;
            temperature.textContent = Math.floor(temp) + ' ℃'
            humidity.textContent = Math.floor(hum) + ' %'

            console.log(res.data.weather) // mamy tablice w której jest obiekt ,potrzebujemy miec tylko obiekt aby móc dostac sie to Id , musimy zamienic ja na obiekt ( operator spread i object assign)
            console.log(status)
            weather.textContent = status.main

            // 4 )następnie potrzebujemy zrobic instrukcje warunkowa która w zależnosci od pobranego id bedzie otrzymywac inne zdjecie 

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
        .catch(() => warning.textContent = 'Please enter a valid City')
}

//  7) Pogoda ma sie nam pobrac z naszego API po naciśnieciu guzika SEND, wiec tworzymy funkcję enterCheck 

const enterCheck = (event) => {
    if (event.keyCode === 13) {
        getWeather()
    }
}



getWeather() //  6 )musi byc wywołać osobno tą funkcje  żeby pobierała  domyślne wartości po wczytaniu 

btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enterCheck);

// 5 ) mamy problem bo użytkownik po wejściu na naszą app nic nie dostaj ,brak obrazka , musimy ustawić wartości domyślne i użyć operatora warunkowego 
// operator warunkowy () ?  true: false ,który będzie nam sprawdzał że jeżeli nasz input.value jest pusty ustaw wartosc domyślna jesli nie to weź to co wpisaliśmy 



// clinet side // to co sie uruchomi w przegladarce 
// zapytanie do serwera fetch ... daj mi cos / 