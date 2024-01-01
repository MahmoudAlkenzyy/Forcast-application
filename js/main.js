const cityName = document.querySelector('.cityName');
const chanceRain = document.querySelector('.chanceRain');
const cityTemp = document.querySelector('.cityTemp');
const cityImgState = document.querySelector('.cityImgState');
const forcastScroll = document.querySelector('.forcastScroll');
const airCondationPart = document.querySelector('.airCondationPart');
const weekForcast = document.querySelector('.weekForcast');
const input = document.querySelector('input');
const modalBody = document.querySelector('.modal-body');
const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
let forecastDays = [];
let locations = '';
//fetch date from api
async function getData(querySearch) {
    // console.log(querySearch);
    const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=5b18c12fbe1b4ac3b6a154430232912&q=${querySearch}&days=7&aqi=no&alerts=no`
        //
    );
    const data = await res.json();
    // console.log(data.location);
    forecastDays = await data.forecast.forecastday;
    locations = data.location.name;
    cityWeather();
    cityForecast();
    AirCondation();
    displayWeekForcast();
}
navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(position) {
    querySearch = `${position.coords.latitude},${position.coords.longitude}`;
    getData(querySearch);
}
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
        forcastHours += `<div class="col-2 text-center  ${
            i == todayForcast.length - 3 ? '' : ' border-end border-secondary'
        } overflow-hidden">
       <p>${dateFormat(todayForcast[i].time)}</p>
       <img src="${todayForcast[i].condition.icon}" alt="${
            todayForcast[i].condition.text
        }" />
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

    // console.log(thisHourData);
    airCondationPart.innerHTML = `
      <div
                                                            class="d-flex justify-content-between pb-3 align-content-center"
                                                        >
                                                            <p class="m-0 pt-2">
                                                                Air Condations
                                                            </p>
                                                            <button
                                                            onClick={seeMore()}
                                                                type="button"
                                                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                                class="btn btn-primary rounded-pill seemore"
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
    // console.log(forecastDays);
    for (let i = 0; i < forecastDays.length; i++) {
        const date = new Date('July 21, 1983 01:15:00');
        let day = date.getDay();
        allWeekForcast += `
        <div class="pt-3 row row-gap-1 align-items-center ${
            i == forecastDays.length - 1
                ? ''
                : ' border-bottom border-secondary'
        } pb-2">
                                            
                         <div class="col-3 col-lg-6 col-xl-3 ">${
                             i == 0 ? 'Today' : days[day]
                         }</div>
                             <div class="col-xl-6 col-lg-12 col-6 order-lg-first p-0 d-flex align-items-center">
                                 <img src="${
                                     forecastDays[i].day.condition.icon
                                 }" alt=""/>
                                                    <span> ${
                                                        forecastDays[i].day
                                                            .condition.text
                                                    }</span>
                                                </div>
                                                <div class="col-3 col-lg-6 col-xl-3 p-0">
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

input.addEventListener('keyup', function (e) {
    if (e.target.value.length >= 3) {
        getData(e.target.value);
    }
});

function seeMore() {
    const data = forecastDays[0];
    console.log(data);
    modalBody.innerHTML = `
  <div class='row p-3'>
   <div class='col-lg-6  '>
   <div class='row '>
   <div class='col-6 p-0'>
  <h3> <i class="bi bi-sunrise "></i> sunrise:</h3>
  <h3> <i class="bi bi-sunset text-white-emphasis"></i> sunset: </h3>
  <h3> <i class="bi bi-moon-stars"></i> moonrise:</h3>
  <h3> <i class="bi bi-moon"></i> moonset:</h3>
   </div>
   
   <div class='col-6 p-0'>
   <h3> ${data.astro.sunrise}</h3>
   <h3> ${data.astro.sunset}</h3>
   <h3>  ${data.astro.moonrise}</h3>
   <h3> ${data.astro.moonset}</h3>
   </div>
   
    
   </div>

   </div>
   <div class='col-lg-1'>
   <img src='${data.day.condition.icon}' class='w-100' />
   </div>

  </div>
  
    `;
}
