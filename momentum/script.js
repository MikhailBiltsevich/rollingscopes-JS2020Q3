const time  = document.querySelector(".time");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const focus = document.querySelector(".focus");
const updateButton = document.querySelector(".update-image-button");

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
    document.body.style.color = "white";
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
    document.body.style.color = "white";
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

name.addEventListener("focus", setName);
name.addEventListener("blur", setName);
focus.addEventListener("focus", setFocus);
focus.addEventListener("blur", setFocus);
updateButton.addEventListener("click", setBackgroundImage);

setTime();
setGreeting();
getName();
getFocus();