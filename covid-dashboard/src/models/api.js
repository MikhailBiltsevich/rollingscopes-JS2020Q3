const COVID_API = {
  caseTypes: {
    confirmed: 'confirmed',
    deaths: 'deaths',
    recovered: 'recovered',
  },

  /**
   * A summary of new and total cases per country updated daily.
   */
  async getSummary() {
    const response = await fetch('https://api.covid19api.com/summary', {
      method: 'GET',
    });

    if (response.status !== 200) throw new Error('Server error.');

    return response.json();
  },

  /**
    * Returns all the available countries and provinces,
    * as well as the country slug for per country requests.
   */
  async getCountries() {
    const response = await fetch('https://api.covid19api.com/countries', {
      method: 'GET',
    });

    if (response.status !== 200) throw new Error('Server Error');

    return response.json();
  },

  /**
   * Returns all cases by case type for a country from the first recorded case.
   * Country must be the Slug from /countries or /summary.
   * Cases must be one of: confirmed, recovered, deaths
   * @param {string} country Must be slug.
   * Example:
   * {
      "Country": "Lithuania",
      "Slug": "lithuania",
      "ISO2": "LT"
    }
   * @param {string} caseType Must be one of: confirmed/recovered/deaths.
    Please use 'caseType' value
   */
  async getDayOne(country, caseType) {
    const response = await fetch(`https://api.covid19api.com/dayone/country/${country}/status/${caseType}`, {
      method: 'GET',
    });

    if (response.status !== 200) throw new Error('Server Error');

    return response.json();
  },

  /**
   * Returns all cases for a country from the first recorded case.
   * Country must be the Slug from /countries or /summary.
   * Cases must be one of: confirmed, recovered, deaths
   * @param {string} country Must be slug.
   * Example:
   * {
      "Country": "Lithuania",
      "Slug": "lithuania",
      "ISO2": "LT"
    }
   */
  async getDayOneAllStatus(country) {
    const response = await fetch(`https://api.covid19api.com/dayone/country/${country}`, {
      method: 'GET',
    });

    if (response.status !== 200) throw new Error('Server Error');

    return response.json();
  },

  /**
   * Returns all total cases by case type for a country from the first recorded case.
   * Country must be the Slug from /countries or /summary.
   * Cases must be one of: confirmed, recovered, deaths
   * @param {string} country Must be slug.
   * Example:
   * {
      "Country": "Lithuania",
      "Slug": "lithuania",
      "ISO2": "LT"
    }
   * @param {string} caseType You can use caseType from property.
    Please use 'caseType' value
   */
  async getDayOneTotal(country, caseType) {
    const response = await fetch(`https://api.covid19api.com/total/dayone/country/${country}/status/${caseType}`, {
      method: 'GET',
    });

    if (response.status !== 200) throw new Error('Server Error');

    return response.json();
  },

  /**
   * Returns all total cases for a country from the first recorded case.
   * Country must be the Slug from /countries or /summary.
   * Cases must be one of: confirmed, recovered, deaths
   * @param {string} country Must be slug.
   * Example:
   * {
      "Country": "Lithuania",
      "Slug": "lithuania",
      "ISO2": "LT"
    }
   */
  async getDayOneTotalAllStatus(country) {
    const response = await fetch(`https://api.covid19api.com/total/dayone/country/${country}`, {
      method: 'GET',
    });

    if (response.status !== 200) throw new Error('Server Error');

    return response.json();
  },

  /**
   * Returns all cases by case type for a country.
   * Country must be the slug from /countries or /summary.
   * Cases must be one of: confirmed, recovered, deaths
   * @param {string} country Must be slug
   * @param {string} caseType You can use caseType from property
   * @param {Date} from
   * @param {Date} to
   */
  async getByCountry(country, caseType, from, to) {
    const response = await fetch(`https://api.covid19api.com/country/${country}/status/${caseType}?from=${from.toISOString()}&to=${to.toISOString()}`, {
      method: 'GET',
    });

    if (response.status !== 200) throw new Error('Server Error');

    return response.json();
  },

  /**
   * Returns all cases for a country.
   * Country must be the slug from /countries or /summary.
   * Cases must be one of: confirmed, recovered, deaths
   * @param {string} country Must be slug
   * @param {Date} from
   * @param {Date} to
   */
  async getByCountryAllStatus(country, from, to) {
    const response = await fetch(`https://api.covid19api.com/country/${country}?from=${from.toISOString()}&to=${to.toISOString()}`, {
      method: 'GET',
    });

    if (response.status !== 200) throw new Error('Server Error');

    return response.json();
  },

  /**
   * Returns all total cases by case type for a country.
   * Country must be the slug from /countries or /summary.
   * Cases must be one of: confirmed, recovered, deaths
   * @param {string} country Must be slug
   * @param {string} caseType You can use caseType from property
   * @param {Date} from
   * @param {Date} to
   */
  async getByCountryTotal(country, caseType, from, to) {
    const response = await fetch(`https://api.covid19api.com/total/country/${country}/status/${caseType}?from=${from.toISOString()}&to=${to.toISOString()}`, {
      method: 'GET',
    });

    if (response.status !== 200) throw new Error('Server Error');

    return response.json();
  },

  /**
   * Returns all total cases for a country.
   * Country must be the slug from /countries or /summary.
   * Cases must be one of: confirmed, recovered, deaths
   * @param {string} country Must be slug
   * @param {Date} from
   * @param {Date} to
   */
  async getByCountryTotalAllStatus(country, from, to) {
    const response = await fetch(`https://api.covid19api.com/total/country/${country}?from=${from.toISOString()}&to=${to.toISOString()}`, {
      method: 'GET',
    });

    if (response.status !== 200) throw new Error('Server Error');

    return response.json();
  },
};

export default COVID_API;
