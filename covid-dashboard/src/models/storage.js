import COVID_API from './api';
import Country from './country';
import SummaryStat from './summaryStat';

const STORAGE = {
  initializedHandlers: [],
  targetCountryChangedHandlers: [],
  country: undefined,

  set targetCountry(value) {
    this.country = value;
    this.targetCountryChangedHandlers.forEach((handler) => handler());
  },

  get targetCountry() {
    return this.country;
  },

  init() {
    COVID_API.getCountries()
      .then((value) => {
        this.countries = value.map((item) => Country.parse(item));
      })
      .then(() => COVID_API.getSummary())
      .then((value) => {
        const obj = value;
        this.globalStat = SummaryStat.parse(obj.Global);
        return obj.Countries;
      })
      .then((obj) => {
        obj.forEach((countryStat) => {
          this.countries.find((country) => country.slug === countryStat.Slug)
            .summaryStat = SummaryStat.parse(countryStat);
        });
      })
      .then(() => {
        this.initializedHandlers.forEach((handler) => handler());
      });
  },

  bindInitialized(callback) {
    this.initializedHandlers.push(callback);
  },

  bindTargetCountryChanged(callback) {
    this.targetCountryChangedHandlers.push(callback);
  },
};

export default STORAGE;
