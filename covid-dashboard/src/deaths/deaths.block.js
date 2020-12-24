import arrPopulation from './dataCountries';

export default function createDeathComponent(STORAGE) {
  function createDeathCard(country, countryName, isForAllPeople, isForTheLastDay, population) {
    const DIVIDER = 100000;

    const listItem = document.createElement('div');
    listItem.classList.add('list__item');

    const stateEl = document.createElement('div');
    stateEl.classList.add('state');

    const stateRow = document.createElement('div');
    stateRow.classList.add('state__row');

    const stateConfirmed = document.createElement('span');
    stateConfirmed.classList.add('state__confirmed');

    stateConfirmed.innerHTML = `  ${country.summaryStat.totalConfirmed} Confirmed`;
    stateRow.append(stateConfirmed);

    const stateDeaths = document.createElement('span');
    stateDeaths.classList.add('state__deaths');
    stateDeaths.innerHTML = `  ${country.summaryStat.totalDeaths} Deaths`;
    stateRow.append(stateDeaths);

    const stateRecovered = document.createElement('span');
    stateRecovered.classList.add('state__recovered');
    stateRecovered.innerHTML = `  ${country.summaryStat.totalRecovered} Recovered`;
    stateRow.append(stateRecovered);
    stateEl.append(stateRow);

    if (isForAllPeople && isForTheLastDay) {
      stateConfirmed.innerHTML = `  ${country.summaryStat.newConfirmed} Confirmed`;
      stateDeaths.innerHTML = `  ${country.summaryStat.newDeaths} Deaths`;
      stateRecovered.innerHTML = `  ${country.summaryStat.newRecovered} Recovered`;
    }
    if (!isForAllPeople && isForTheLastDay) {
      stateConfirmed.innerHTML = `  ${Math.floor((country.summaryStat.newConfirmed * DIVIDER) / population)} Confirmed`;
      stateDeaths.innerHTML = `  ${Math.floor((country.summaryStat.newDeaths * DIVIDER) / population)} Deaths`;
      stateRecovered.innerHTML = `  ${Math.floor((country.summaryStat.newRecovered * DIVIDER) / population)} Recovered`;
    }
    if (!isForAllPeople && !isForTheLastDay) {
      stateConfirmed.innerHTML = `  ${Math.floor((country.summaryStat.totalConfirmed * DIVIDER) / population)} Confirmed`;
      stateDeaths.innerHTML = `  ${Math.floor((country.summaryStat.totalDeaths * DIVIDER) / population)} Deaths`;
      stateRecovered.innerHTML = `  ${Math.floor((country.summaryStat.totalRecovered * DIVIDER) / population)} Recovered`;
    }

    const stateRowSecond = document.createElement('div');
    stateRowSecond.classList.add('state__row');

    const stateCountry = document.createElement('span');
    stateCountry.classList.add('state__country');
    stateCountry.innerHTML = `${countryName}`;
    stateRowSecond.append(stateCountry);
    stateEl.append(stateRowSecond);
    listItem.append(stateEl);
    const cardListEl = document.querySelector('.list__first');
    cardListEl.append(listItem);

    listItem.addEventListener('click', () => {
      // eslint-disable-next-line no-param-reassign
      STORAGE.targetCountry = country;
    });
  }

  function createCardList(objCards, isForAllPeople, isForTheLastDay) {
    if (!isForTheLastDay && isForAllPeople) {
      document.querySelector('#info').querySelector('.block__tabs').querySelector('.active').classList.remove('active');
      document.querySelector('.button__total').classList.add('active');
    }

    const cardsListEl = document.querySelector('.list__first');
    while (cardsListEl.firstChild) {
      cardsListEl.removeChild(cardsListEl.firstChild);
    }
    const cardsList1 = objCards.countries;

    const cardsList = cardsList1.filter((country) => country.summaryStat);
    cardsList.sort((a, b) => b.summaryStat.totalDeaths - a.summaryStat.totalDeaths);
    cardsList.forEach((item) => {
      let population;
      arrPopulation.forEach((countryPopulationEl) => {
        if (countryPopulationEl.name === item.title) {
          population = countryPopulationEl.population;
        }
      });
      if ((!STORAGE.targetCountry || STORAGE.targetCountry === item) && item.summaryStat) {
        createDeathCard(item, item.title, isForAllPeople, isForTheLastDay, population);
      }
    });
  }

  createCardList(STORAGE, true);

  const buttonTotal = document.querySelector('.button__total');
  buttonTotal.addEventListener('click', () => {
    if (!buttonTotal.classList.contains('active')) {
      buttonTotal.parentNode.querySelector('.active').classList.remove('active');
      buttonTotal.classList.add('active');
      const isForAllPeople = true;
      const isForTheLastDay = false;
      createCardList(STORAGE, isForAllPeople, isForTheLastDay);
    }
  });

  const buttonDay = document.querySelector('.button__day');
  buttonDay.addEventListener('click', () => {
    if (!buttonDay.classList.contains('active')) {
      buttonDay.parentNode.querySelector('.active').classList.remove('active');
      buttonDay.classList.add('active');
      const isForAllPeople = true;
      const isForTheLastDay = true;
      createCardList(STORAGE, isForAllPeople, isForTheLastDay);
    }
  });

  const buttonPerCapitaDay = document.querySelector('.button__per-capita-day');
  buttonPerCapitaDay.addEventListener('click', () => {
    if (!buttonPerCapitaDay.classList.contains('active')) {
      buttonPerCapitaDay.parentNode.querySelector('.active').classList.remove('active');
      buttonPerCapitaDay.classList.add('active');
      const isForAllPeople = false;
      const isForTheLastDay = true;
      createCardList(STORAGE, isForAllPeople, isForTheLastDay);
    }
  });

  const buttonPerCapita = document.querySelector('.button__per-capita');
  buttonPerCapita.addEventListener('click', () => {
    if (!buttonPerCapita.classList.contains('active')) {
      buttonPerCapita.parentNode.querySelector('.active').classList.remove('active');
      buttonPerCapita.classList.add('active');
      const isForAllPeople = false;
      const isForTheLastDay = false;
      createCardList(STORAGE, isForAllPeople, isForTheLastDay);
    }
  });
}
