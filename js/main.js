const cityName = document.querySelector('.cityName');
const chanceRain = document.querySelector('.chanceRain');
const cityTemp = document.querySelector('.cityTemp');
const cityImgState = document.querySelector('.cityImgState');
const forcastScroll = document.querySelector('.forcastScroll');
const airCondationPart = document.querySelector('.airCondationPart');
const weekForcast = document.querySelector('.weekForcast');
let forecastDays = [];
let locations = '';
//fetch date from api
async function getData() {
    const res = await fetch(
        'http://api.weatherapi.com/v1/forecast.json?key=5b18c12fbe1b4ac3b6a154430232912&q=cai&days=8&aqi=no&alerts=no'
        //
    );
    const data = await res.json();
    console.log(data.location.region);
    forecastDays = await data.forecast.forecastday;
    locations = data.location.region;
    cityWeather();
    cityForecast();
    AirCondation();
    displayWeekForcast();
}
getData();
function cityWeather() {
    const today = forecastDays[0];
    // console.log(today);
    cityName.innerHTML = locations;
    chanceRain.innerHTML = today.day.daily_chance_of_rain;
    cityTemp.innerHTML = today.day.avgtemp_c;
    cityImgState.src = `${today.day.condition.icon}`;
}
// Display city Today weather forcast
function cityForecast() {
    const todayForcast = forecastDays[0].hour;

    // console.log(todayForcast[0]);

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
// to return the Hours in 12 hours format
function dateFormat(date) {
    let time = date.slice(11);
    let hours = Number(time.slice(0, 2));
    if (hours <= 12) {
        return `${hours}:00 AM `;
    } else {
        return `${hours - 12}:00 PM`;
    }
}

function AirCondation() {
    const dateNow = new Date();
    let hourNow = dateNow.getHours();

    const thisHourData = forecastDays[0].hour[hourNow];

    console.log(forecastDays);
    airCondationPart.innerHTML = `
       <div
                                                            class="d-flex justify-content-between pb-3 align-content-center"
                                                        >
                                                            <p class="m-0 pt-2">
                                                                Air Condations
                                                            </p>
                                                            <button
                                                                class="btn btn-primary rounded-pill"
                                                            >
                                                                see more
                                                            </button>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <h5>
                                                                <i
                                                                    class="fa-solid fa-temperature-half"
                                                                ></i>
                                                                Real Feel
                                                                <h2
                                                                    class="ps-4 text-white"
                                                                >
                                                                    ${thisHourData.feelslike_c}°
                                                                </h2>
                                                            </h5>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <h5>
                                                                <i
                                                                    class="fa-solid fa-droplet"
                                                                ></i>
                                                                Chance of Rain
                                                                <h2
                                                                    class="ps-4 text-white"
                                                                >
                                                                    ${thisHourData.chance_of_rain}%
                                                                </h2>
                                                            </h5>
                                                        </div>

                                                        <div class="col-sm-6">
                                                            <h5>
                                                                <i
                                                                    class="fa-solid fa-wind"
                                                                ></i>
                                                                Wind
                                                                <h2
                                                                    class="ps-4 text-white"
                                                                >
                                                                    ${thisHourData.wind_kph}
                                                                    km/h
                                                                </h2>
                                                            </h5>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <h5>
                                                                UV index
                                                                <h2
                                                                    class="ps-4 text-white"
                                                                >
                                                                    3
                                                                </h2>
                                                            </h5>
                                                        </div>
    `;
}
function displayWeekForcast() {
    let allWeekForcast = '';
    console.log(forecastDays);
    for (let i = 0; i < forecastDays.length; i++) {
        allWeekForcast += `
        <div
                                                class="row align-items-center border-bottom border-secondary pb-2"
                                            >
                                                <div class="col-3">${
                                                    i == 0 ? 'Today' : i
                                                }</div>
                                                <div
                                                    class="col-6 d-flex align-items-center"
                                                >
                                             <img
                                 src="${forecastDays[i].day.condition.icon}"
                                                        alt=""
                                                    />
                                                    <span> ${
                                                        forecastDays[i].day
                                                            .condition.text
                                                    }</span>
                                                </div>
                                                <div class="col-3">
                                                    <span class="text-light">
                                                        ${
                                                            forecastDays[i].day
                                                                .maxtemp_c
                                                        } </span
                                                    >/ ${
                                                        forecastDays[i].day
                                                            .mintemp_c
                                                    }
                                                </div>
                                            </div>
        `;
    }
    weekForcast.innerHTML = allWeekForcast;
}
