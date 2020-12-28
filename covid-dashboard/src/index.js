import createDeathComponent from './deaths/deaths.block';

import './assets/styles/styles.scss';

// Chart script snd styles
import getResponse from './components/chart/script';

import SearchInput from './views/SearchInput';
import CountryListItem from './views/CountryListItem';
import CountryList from './views/CountryList';
import CountryBlock from './views/CountryBlock';
import CountryBlockController from './controllers/CountryBlockController';
import STORAGE from './models/storage';
import GlobalBlockController from './controllers/GlobalBlockController';
import GlobalBlock from './views/GlobalBlock';
import createMap from './views/MapBlock';
import TabsBlock from './views/TabsBlock';
import Tab from './views/Tab';

// createDeathComponent();

STORAGE.bindInitialized(() => {
  const items = STORAGE.countries.filter((country) => country.summaryStat).map(
    (country) => new CountryListItem(country),
  );

  const tabsBlock = new TabsBlock(
    TabsBlock.getKeys()
      .map((key) => new Tab(key)),
  );

  const list = new CountryList(...items);
  const countryBlockController = new CountryBlockController(
    new CountryBlock(new SearchInput(), list, tabsBlock), STORAGE,
  );
  const globalBlockController = new GlobalBlockController(new GlobalBlock(), STORAGE);
});

STORAGE.bindInitialized(() => { createMap(STORAGE); });
document.querySelector('#country .block__tabs').addEventListener('click', (event) => {
  if (event.target.textContent.length < 20) {
    createMap(STORAGE, event.target.textContent);
  }
});

STORAGE.bindInitialized(() => { createDeathComponent(STORAGE); });
STORAGE.bindTargetCountryChanged(() => { getResponse(STORAGE); });
STORAGE.bindTargetCountryChanged(() => { createDeathComponent(STORAGE); });

STORAGE.init();
