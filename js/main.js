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
function cityWeather() {
    const today = forecastDays[0];
    console.log(today);
    chanceRain.innerHTML = today.day.daily_chance_of_rain;
    cityTemp.innerHTML = today.day.avgtemp_f;
    cityImgState.src = `${today.day.condition.icon}`;
    cityForecast();
}
function cityForecast() {
    const todayForcast = forecastDays[0].hour;

    console.log(todayForcast[0]);

    let forcastHours = '';
    for (let i = 6; i < todayForcast.length; i += 3) {
        forcastHours += `<div class="col-2 text-center border-end border-secondary overflow-hidden">
       <p>${dateFormat(todayForcast[i].time)}</p>
       <img src="${todayForcast[i].condition.icon}" alt="" />
       <h2>${todayForcast[i].temp_c}</h2>
   </div>`;
    }
    forcastScroll.innerHTML = forcastHours;
}
function dateFormat(date) {
    let time = date.slice(11);
    let hours = Number(time.slice(0, 2));
    if (hours <= 12) {
        return `${hours}:00 AM `;
    } else {
        return `${hours - 12}:00 PM`;
    }
}
