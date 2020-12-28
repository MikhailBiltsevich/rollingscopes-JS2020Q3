import Chart from 'chart.js';

let response;
let content = {};

let chartProp = {};

let comulDeathsNum = [];
let dates = [];
let comulCasesNum = [];
let deathsNum = [];
let casesNum = [];
let logNum = [];
let chartTitle = '';

let showingData = [];

let chart;

const arrayOfSTATE = [
  'Daily cases',
  'Daily deaths',
  'Cumulative cases',
  'Cumulative deaths',
  'Log cases'];

let STATE = 'Daily cases';

function makeArrayOfPersons(allContent, calculateDeaths) {
  const arrayOfNumbers = [];
  for (let i = 0; i < allContent.length; i += 1) {
    if (calculateDeaths === 1) {
      arrayOfNumbers[i] = allContent[i].Confirmed;
    } else if (calculateDeaths === 2) {
      arrayOfNumbers[i] = allContent[i].Deaths;
    } else if (calculateDeaths === 5) {
      arrayOfNumbers[i] = Math.log(allContent[i].Confirmed);
    }
  }
  for (let i = 1; i < content.length; i += 1) {
    if (calculateDeaths === 4) {
      arrayOfNumbers[i] = content[i].Deaths - content[i - 1].Deaths;
    } else if (calculateDeaths === 3) {
      arrayOfNumbers[i] = content[i].Confirmed - content[i - 1].Confirmed;
    }
  }
  return arrayOfNumbers;
}

function makeArrayOfDates(allContent) {
  const datesArray = [];
  for (let i = 0; i < allContent.length; i += 1) {
    const dt = new Date(allContent[i].Date);
    datesArray[i] = dt.toDateString().substr(4);
  }
  return datesArray;
}

function makeChart() {
  const ctx = document.querySelector('.chart__canvas').getContext('2d');

  // eslint-disable-next-line max-len
  // ctx.clearRect(0, 0, document.querySelector('.chart__canvas').width, document.querySelector('.chart__canvas').height);

  if (STATE === 'Daily cases' || STATE === 'Daily deaths') {
    chartProp = {

      type: 'bar',

      data: {
        labels: dates,
        datasets: [{
          label: chartTitle,
          backgroundColor: 'rgb(245, 121, 5, 1)',
          borderColor: 'rgb(245, 1, 5, 1)',
          data: showingData,
        }],
      },

      options: {
        scales: {
          xAxes: [
            { gridLines: { color: 'rgb(255, 255, 255, 0.5)' } },
          ],
          yAxes: [
            { gridLines: { color: 'rgb(255, 255, 255, 0.5)' } },
          ],
        },
      },
    };
  } else {
    chartProp = {

      type: 'line',

      data: {
        labels: dates,
        datasets: [{
          label: chartTitle,
          borderColor: 'rgb(245, 1, 5, 1)',
          data: showingData,
        }],
      },

      options: {
        scales: {
          xAxes: [
            { gridLines: { color: 'rgb(255, 255, 255, 0.5)' } },
          ],
          yAxes: [
            { gridLines: { color: 'rgb(255, 255, 255, 0.5)' } },
          ],
        },
      },
    };
  }

  // eslint-disable-next-line no-undef
  chart = new Chart(ctx, chartProp);
  // eslint-disable-next-line no-undef
  Chart.defaults.global.defaultFontColor = '#fff';

  const TITLE = document.querySelector('.chart__nav_title');
  TITLE.innerHTML = STATE;
}

export default async function getResponse(STORAGE) {
  if (STORAGE.targetCountry) {
    const targetCountry = STORAGE.targetCountry.slug;
    // response = await fetch('https://api.covid19api.com/dayone/country/south-africa');
    response = await fetch(`https://api.covid19api.com/dayone/country/${targetCountry}`);
    content = await response.json();

    dates = makeArrayOfDates(content);
    comulCasesNum = makeArrayOfPersons(content, 1);
    comulDeathsNum = makeArrayOfPersons(content, 2);
    casesNum = makeArrayOfPersons(content, 3);
    deathsNum = makeArrayOfPersons(content, 4);
    logNum = makeArrayOfPersons(content, 5);

    chartTitle = content[0].Country;

    showingData = casesNum;

    makeChart();
  }
}

function drawChart(STATEMENT) {
  switch (STATEMENT) {
    case 'Daily cases':
      showingData = casesNum;
      break;
    case 'Daily deaths':
      showingData = deathsNum;
      break;
    case 'Cumulative cases':
      showingData = comulCasesNum;
      break;
    case 'Cumulative deaths':
      showingData = comulDeathsNum;
      break;
    case 'Log cases':
      showingData = logNum;
      break;
    default:
  }
}

function changeState(stateIndex, isNextBtClicked) {
  let index = stateIndex;
  if (isNextBtClicked) {
    switch (stateIndex) {
      case arrayOfSTATE.length - 1:
        index = 0;
        break;
      default:
        index += 1;
    }
  } else {
    switch (stateIndex) {
      case 0:
        index = arrayOfSTATE.length - 1;
        break;
      default:
        index -= 1;
    }
  }
  STATE = arrayOfSTATE[index];

  drawChart(STATE);
}

function findState(isNextBtClicked) {
  let stateIndex = 0;
  for (let i = 0; i < arrayOfSTATE.length; i += 1) {
    if (STATE === arrayOfSTATE[i]) {
      stateIndex = i;
      break;
    }
  }

  changeState(stateIndex, isNextBtClicked);
}

document.addEventListener('click', (ev) => {
  const BTN_PREV = document.querySelector('.chart__btn--prev');
  const BTN_NEXT = document.querySelector('.chart__btn--next');

  if (ev.target === BTN_PREV) {
    findState(false);
    chart.destroy();
    makeChart(content);
  } else if (ev.target === BTN_NEXT) {
    findState(true);
    chart.destroy();
    makeChart(content);
  }
});
