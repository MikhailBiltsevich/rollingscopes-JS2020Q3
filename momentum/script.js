const time  = document.querySelector(".time");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const focus = document.querySelector(".focus");

const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg'];
let indexImage = Math.floor(Math.random() * images.length);

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
    document.body.style.color = "white";
    document.body.style.backgroundImage = `url(./assets/images/night/${getImageName()})`;
  } else if (hours < 12) {
    greetingText = "Good morning, ";
    document.body.style.backgroundImage = `url(./assets/images/morning/${getImageName()})`;
  } else if (hours < 18) {
    greetingText = "Good afternoon, ";
    document.body.style.backgroundImage = `url(./assets/images/afternoon/${getImageName()})`;
  } else if (hours < 24) {
    greetingText = "Good evening, ";
    document.body.style.backgroundImage = `url(./assets/images/evening/${getImageName()})`;
    document.body.style.color = "white";
  }

  greeting.textContent = greetingText;
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

name.addEventListener("focus", setName);
name.addEventListener("blur", setName);
focus.addEventListener("focus", setFocus);
focus.addEventListener("blur", setFocus);

setTime();
setGreeting();
getName();
getFocus();