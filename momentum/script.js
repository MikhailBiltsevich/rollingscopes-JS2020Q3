const time  = document.querySelector(".time");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const focus = document.querySelector(".focus");
const updateButton = document.querySelector(".update-image-button");
const blockquote = document.querySelector(".blockquote");
const refreshButton = document.querySelector(".refresh-button");
const submitButton = document.querySelector(".forecast-form__submit");

const forecastForm = document.querySelector(".forecast-form");
const forecastInput = document.querySelector(".forecast-form__input");
const currentWeatherInfo = document.querySelector(".current-weather-info");
const forecastInfo = document.querySelector(".forecast-info");

const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg'];
let indexImage = Math.floor(Math.random() * images.length);
let imageDirectory;

function setTime() {
  let date = new Date(),
      day = date.getDate(),
      dayOfWeek = getDayOfWeek(date.getDay()),
      month = getMonth(date.getMonth()),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();

  time.innerHTML = `
    <div>${dayOfWeek}, ${day} ${month}</div>
    <div>${hours}:${addZero(minutes)}:${addZero(seconds)}</div>`;

  setTimeout(setTime, 1000);
  updateGreeting();
}

function addZero(num) {
  return +num < 10 ? `0${num}` : `${num}`;
}

function getDayOfWeek(num) {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return days[num];
}

function getMonth(num) {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[num];
}

function setGreeting(){
  let date = new Date(),
      hours = date.getHours();

  let greetingText;

  if (hours < 6) {
    greetingText = "Good night, ";
    imageDirectory = "./assets/images/night";
    setBackgroundImage();
  } else if (hours < 12) {
    greetingText = "Good morning, ";
    imageDirectory = "./assets/images/morning";
    setBackgroundImage();
  } else if (hours < 18) {
    greetingText = "Good afternoon, ";
    imageDirectory = "./assets/images/afternoon";
    setBackgroundImage();
  } else if (hours < 24) {
    greetingText = "Good evening, ";
    imageDirectory = "./assets/images/evening";
    setBackgroundImage();
  }

  greeting.textContent = greetingText;
}

function setBackgroundImage () {
  let img = document.createElement("img");
  let src = `${imageDirectory}/${getImageName()}`;
  
  img.src = src;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${src})`;
  };

  updateButton.disabled = true;
  setTimeout(() => {  updateButton.disabled = false; }, 1000);
}

async function updateGreeting() {
  let date = new Date();

  if (date.getMinutes() === 0 && date.getSeconds() === 0) {
    setGreeting();
  }
}

function getImageName() {
  let path = images[indexImage % images.length];
  indexImage++;
  return path;
}

function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Enter Name]"
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

function setName(e) {
  if (e.type === "focus") {
    if(name.textContent !== "") {
      name.textContent = "";
    }

  } else if (e.type === "blur") {
    if (name.textContent.trim() !== "") {
      localStorage.setItem("name", name.textContent);
    }

    getName();
  }
}

function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Enter Focus]"
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

function setFocus(e) {
  if (e.type === "focus") {
    if(focus.textContent !== "") {
      focus.textContent = "";
    }

  } else if (e.type === "blur") {
    if (focus.textContent.trim() !== "") {
      localStorage.setItem("focus", focus.textContent);
    }

    getFocus();
  }
}

async function getAdvice() {
  refreshButton.style.animation = "1s linear infinite rotation";
  
  const response = await fetch("https://api.adviceslip.com/advice");
  const advice = (await response.json()).slip.advice;
  blockquote.textContent = advice;
  
  refreshButton.style.animation = "";
}

async function getForecast(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  if(forecastInput.value === "") {
    return;
  }

  submitButton.style.animation = "1s linear infinite rotation";
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8ae0c5c8cbc14f1fa32163939202510&q=${forecastInput.value}&days=3`);
    if(response.status === 400) {
      throw new BadRequest();
    }
    const forecast = (await response.json());
  
    currentWeatherInfo.innerHTML = `
      <img src="${forecast.current.condition.icon}">
      <div>${forecast.current.condition.text}</div>
      <div>${forecast.current.temp_c} &deg;C</div>
      <div>${forecast.current.wind_dir} ${forecast.current.wind_kph} kph</div>
      <div>${forecast.current.humidity}%</div>`;
  
    forecastHTMLText = "";
    for(let i = 0; i < forecast.forecast.forecastday.length; i++) {
      let forecastday = forecast.forecast.forecastday[i].day;
      let date = new Date(forecast.forecast.forecastday[i].date);
  
      forecastHTMLText += `
        <div class="forecast-day-info">
          <div>${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</div>
          <img src="${forecastday.condition.icon}">
          <div>${forecastday.condition.text}</div>
          <div>${forecastday.avgtemp_c} &deg;C</div>
          <div>${forecastday.maxwind_kph} kph</div>
          <div>${forecastday.avghumidity}%</div>
        </div>`;

      forecastInfo.innerHTML = forecastHTMLText;
    }
  } catch (error) {
    let popup = document.createElement("div");
    popup.classList.add("popup");
    popup.textContent = "Error in getting weather request. Please make sure the city name is correct or try again later.";
    document.body.append(popup);
    setTimeout(() => { popup.remove(); }, 5000);
  } finally {
    submitButton.style.animation = "";
  }

}

function getCity() {
  if (localStorage.getItem("city") !== null) {
    forecastInput.value = localStorage.getItem("city");
  }
}

function setCity(e) {
  if (e.type === "focus") {
    forecastInput.value = "";
  } else if (e.type === "blur") {
    if (forecastInput.value.trim() !== "") {
      localStorage.setItem("city", forecastInput.value);
    } else {
      forecastInput.value = "";
    }

    getCity();
  }
}

name.addEventListener("focus", setName);
name.addEventListener("blur", setName);
focus.addEventListener("focus", setFocus);
focus.addEventListener("blur", setFocus);
forecastInput.addEventListener("focus", setCity);
forecastInput.addEventListener("blur", setCity);
updateButton.addEventListener("click", setBackgroundImage);
refreshButton.addEventListener("click", getAdvice);
forecastForm.addEventListener("submit", getForecast);

getAdvice();
setTime();
setGreeting();
getName();
getFocus();
getCity();
getForecast();