const cityName = document.querySelector('.cityName');
const chanceRain = document.querySelector('.chanceRain');
const cityTemp = document.querySelector('.cityTemp');
const cityImgState = document.querySelector('.cityImgState');
const forcastScroll = document.querySelector('.forcastScroll');

//fetch date from api
let forecastDays = [];
async function getData() {
    const res = await fetch(
        'http://api.weatherapi.com/v1/forecast.json?key=5b18c12fbe1b4ac3b6a154430232912&q=cairo&days=5&aqi=no&alerts=no'
        //
    );
    const data = await res.json();
    // console.log(data.forecast.forecastday);
    forecastDays = await data.forecast.forecastday;
    cityWeather();
}
getData();
